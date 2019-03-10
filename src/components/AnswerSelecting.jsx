import React from 'react';
import { Container, Header, Grid, Divider, Icon, Popup, Segment, Breadcrumb } from 'semantic-ui-react';
import copy from 'copy-to-clipboard';

import { dummyData } from './tools';
import TextEditor from './TextEditor';

class WritingAidMain extends React.Component {
    constructor (props) {
        super (props);

        this.state = {
            data: dummyData,
            chosenData:[],
            chosenOption:{}
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
        this.setState({data})
    }

    onEditOptionButtonClick = (id) => {
        console.log(id)
    }

    onDeleteOptionButtonClick = (id, titleId) => {
        const data = this.state.data.map(item => item.id === titleId ? {...item, possibleAnswers: item.possibleAnswers.filter(i => i.id !== id)} : item)
        this.setState({ data }, () => {console.log('log of data from state', this.state.data[0].possibleAnswers)})
        console.log(data[0].possibleAnswers)
    }
              
    render () {
        const { data, chosenData } = this.state;
        return (
            <div>
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
                            <TextEditor
                                textData={chosenData}
                            />

                        </Grid.Column>
                    </Grid>

                </Container>
            </div>   
        )
    }
}

export default WritingAidMain;

    // FIRST LAYER OF OPTION

const AvailableOptions = ({ data, onOptionClick, onTitleClick, onDeleteOptionButtonClick, onEditOptionButtonClick }) => {
    const clickATitle = (id) => () => {
        onTitleClick(id)
    };
    const availableOptions = data.map((d,i) => (
        d.collapse ? 
            <Container
                key={i}
            >
            <Option
                title={d.title}
                option={d.possibleAnswers}
                onOptionClick={onOptionClick}
                id={d.id}
                onTitleClick={onTitleClick}
                onDeleteClick={onDeleteOptionButtonClick}
                onEditClick={onEditOptionButtonClick}
            />

            </Container>
            :
            <Container
                className='title'
                key={i}
            >
                <h3 className='title'>
                    {d.title}
                   
                    <Popup trigger={<Icon name='angle double down' color='teal' onClick={clickATitle(d.id)}/>} content='open title' />
                    <Popup trigger={<Icon name='edit' color='blue'/>} content='edit title' />
                    <Popup trigger={<Icon name='delete' color='red'/>} content='delete title' />
                </h3>
            </Container>
    ))

    return (
        <div>
            <div>
                {availableOptions}
            </div>
        </div>

    )
}

    // OPTION RENDER

const Option = ({ title, option, onOptionClick, id, onTitleClick, onDeleteClick, onEditClick, }) => {
    const clickATitle = (id) => () => {
        onTitleClick(id)
    };
    const optionClick = (option, id) => () => {
        copy(option.option)
        onOptionClick(option, id )
    };
    const onEdit = (id) => () => {
        onEditClick(id)
    };
    const onDelete = (id, titleId) => () => {
        onDeleteClick(id, titleId)
    };
    const options = option && option.map((o, index) => (
        <Container 
            className = 'option'
            key = {index}
        >
            <Segment onClick={optionClick(o, id)}>
                <Popup trigger={<p>{o.option}</p>} content='text copied' on='click' hideOnScroll/>
                {o.selected &&
                <Container>
                    <Popup trigger={<Icon name='check' color='green'/>} content='option copied' />
                    <Popup trigger={<Icon name='edit' color='blue' onClick={onEdit(o.id)} />} content='edit this option' />
                    <Popup trigger={<Icon name='delete' color='red' onClick={onDelete(o.id, id)} />} content='delete this option' />
                </Container>}
            </Segment>

            {index < option.length - 1 &&
                <Divider horizontal>or</Divider>
            }
        </Container>
    ))
    return (
        <div>
            <Container            
            >
                <h3 className='title'>
                    {title}
                    <Popup trigger={<Icon name='angle double up' color='teal' onClick={clickATitle(id)}/>} content='close title' />
                </h3>
                {options}
            </Container>
        </div>

    )
}