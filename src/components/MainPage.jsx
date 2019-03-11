import React from 'react';
import { Container, Header, Grid, Icon, Segment, Breadcrumb } from 'semantic-ui-react';
import copy from 'copy-to-clipboard';

import { dummyData } from './tools';
import AvailableOptions from './Title';
import TextEditor from './TextEditor';

class WritingAidMain extends React.Component {
    constructor (props) {
        super (props);
        this.state = {
            data: dummyData,
        }
    }

    onTitleClick = (id) => {
        const data = this.state.data.map(item => item.id === id ? {...item, collapse: !item.collapse} : item)
        this.setState({ data })
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
                { ...unit, option: 'this option is edited'} : unit)} : item)
        this.setState({ data: newData }, () => {console.log('edited option: ', data[0].possibleAnswers)})
    }

    onDeleteOptionButtonClick = (option, titleId) => {
        const data = this.state.data.map(item => item.id === titleId ? { ...item, possibleAnswers: item.possibleAnswers.filter(i => i.id !== option)} : item)
        this.setState({ data }, () => {console.log('log of data from state', this.state.data[0].possibleAnswers)})
    }
              
    render () {
        const { data } = this.state;
        return (

                <Container>
                    <Header as='h2' dividing>
                        <Icon name='write' />
                        <Header.Content>Improve Guarantee</Header.Content>
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
                                <AvailableOptions
                                    data={data}
                                    onOptionClick={this.onOptionClick}
                                    onTitleClick={this.onTitleClick}
                                    onEditOptionButtonClick={this.onEditOptionButtonClick}
                                    onDeleteOptionButtonClick={this.onDeleteOptionButtonClick}
                                />
                            </Segment>


                        </Grid.Column>
                        <Grid.Column width={10}>
                            <TextEditor/>
                        </Grid.Column>
                    </Grid>

                </Container>
 
        )
    }
}

export default WritingAidMain;

