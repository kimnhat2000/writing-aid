import React from 'react';
import { Container, Header, Grid, Icon, Segment, Breadcrumb, Search } from 'semantic-ui-react';
import copy from 'copy-to-clipboard';

import { dummyData } from './tools';
import AvailableOptions from './Title';
import TextEditor from './TextEditor';
import AppForm from './Form';

class WritingAidMain extends React.Component {
    constructor (props) {
        super (props);
        this.state = {
            data: dummyData,
            onConfirmShow: false,
            onDeleteTitleShow: false,
            onConfirm: false,
            onEditClick: false,
        }
    }

    onTitleClick = (id) => {
        const data = this.state.data.map(item => item.id === id ? {...item, collapse: !item.collapse} : item)
        this.setState({ data })
    }

    onDeleteTitleClick = () => {
        this.setState({ onDeleteTitleShow:true })
    }

    handleDeleteTitleConfirm = (titleId) => {
        const data = this.state.data.filter(item => item.id !== titleId);
        this.setState({ data })
        console.log(titleId)
    }

    onOptionClick = (d, i) => {
        const data = this.state.data.map(item => item.id === i ? 
            {...item, possibleAnswers: item.possibleAnswers.map(i => i.id === d.id ? 
                {...i, selected: !i.selected} : {...i, selected: false})} : 
                {...item, possibleAnswers: item.possibleAnswers.map(unit=>({...unit, selected: false}))})
        copy(d.option)
        this.setState({data})
    }

    onEditOptionButtonClick = (option, titleId) => {
        const { data } = this.state
        const newData = data.map(item => item.id === titleId ? 
            {...item, possibleAnswers: item.possibleAnswers.map(unit => unit.id === option ? 
                { ...unit} : unit)} : item)
        this.setState({ data: newData, onEditClick: !this.state.onEditClick }, () => {console.log('edited option: ', data[0].possibleAnswers)})
    }

    onDeleteOptionButtonClick = () => {
        this.setState({ onConfirmShow: true });
    }

    handleConfirm = (option, titleId) => {
        const data = this.state.data.map(item => item.id === titleId ? { ...item, possibleAnswers: item.possibleAnswers.filter(i => i.id !== option)} : item)
        this.setState({ data, onConfirmShow: false })
    }

    handleCancel = () => {
        this.setState({ onConfirmShow: false, onDeleteTitleShow: false })
    }

    render () {
        const { data, onConfirmShow, onDeleteTitleShow, onEditClick } = this.state;
        return (

            <Container>
                <Header as='h2' dividing>
                    <Icon name='write' />
                    <Header.Content>WRITING AID</Header.Content>
                </Header>
                <Grid columns='equal'>
                    <Grid.Column>
                        <Breadcrumb size='large'>
                            <Breadcrumb.Section link>Puplic Area</Breadcrumb.Section>
                            <Breadcrumb.Divider />
                            <Breadcrumb.Section active>Sample Answers</Breadcrumb.Section>
                            <Breadcrumb.Divider />
                            <Breadcrumb.Section link>Templates</Breadcrumb.Section>
                            <Breadcrumb.Divider />
                            <Breadcrumb.Section link>my sinppets</Breadcrumb.Section>
                            <Breadcrumb.Section link>anouncement</Breadcrumb.Section>
                        </Breadcrumb>

                        <Segment>
                            <Search/>
                            <AvailableOptions
                                data={data}
                                onOptionClick={this.onOptionClick}
                                onTitleClick={this.onTitleClick}
                                onDeleteTitleClick={this.onDeleteTitleClick}
                                onEditOptionButtonClick={this.onEditOptionButtonClick}
                                editButtonStatus={onEditClick}
                                onDeleteOptionButtonClick={this.onDeleteOptionButtonClick}
                                onConfirmShow={onConfirmShow}
                                cancelButton={this.handleCancel}
                                confirmButton={this.handleConfirm}

                                onDeleteTitleShow={onDeleteTitleShow}
                                handleDeleteTitleConfirm={this.handleDeleteTitleConfirm}

                            />
                        </Segment>

                    </Grid.Column>
                    <Grid.Column width={10}>
                        {onEditClick ? 
                            <AppForm /> : 
                            <TextEditor />}
                    </Grid.Column>
                </Grid>

            </Container>
        )
    }
}

export default WritingAidMain;

