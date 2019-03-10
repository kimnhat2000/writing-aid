import React from 'react';
import { Container, Header, Grid, Divider, Segment, Icon, Sticky, Button, Popup } from 'semantic-ui-react';

import { dummyData } from './tools';

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

    onOptionClick = (d, t, i) => {
        const data = this.state.data.map(item => item.id === i ? 
            {...item, possibleAnswers: item.possibleAnswers.map(i => i.id === d.id ? 
                {...i, selected: !i.selected} : i)} : item)
        const chosenOption = {...this.state.chosenOption, id: d.id, option: d.option, title: t}; //the current selection
        const chosenData = d.selected ? this.state.chosenData.filter(data => data.id !== d.id) : [...this.state.chosenData, chosenOption]; // create an array to render all options to text editor
        this.setState({data, chosenData})
    }

    onEditOptionButtonClick = (id) => {
        console.log(id)
    }

    onDeleteOptionButtonClick = (id, titleId) => {
        const data = this.state.data.map(item => item.id === titleId ? {...item, possibleAnswers: item.possibleAnswers.filter(i => i.id !== id)} : item)
        this.setState({ data }, () => {console.log('log of data from state', this.state.data[0].possibleAnswers)})
        console.log('log of data from data',data[0].possibleAnswers)
    }
              
    render () {
        const { data, chosenData } = this.state;
        return (
            <div>
                <Segment>
                    <Grid columns='equal'>
                        <Grid.Column>
                            <AvailableOptions
                                data={data}
                                onOptionClick={this.onOptionClick}
                                onTitleClick={this.onTitleClick}
                                onEditOptionButtonClick={this.onEditOptionButtonClick}
                                onDeleteOptionButtonClick={this.onDeleteOptionButtonClick}
                            />
                        </Grid.Column>
                        <Grid.Column width={10}>
                            <Sticky>
                                <TextRendering
                                    text={chosenData && chosenData}
                                />
                            </Sticky>
                        </Grid.Column>
                    </Grid>

                </Segment>
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
                <Header 
                    as='h2'
                    onClick={clickATitle(d.id)}
                >
                    {d.title}
                    <Icon name='angle down' color='blue'/>
                </Header>
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

const Option = ({ title, option, onOptionClick, id, onTitleClick, onDeleteClick, onEditClick }) => {
    const clickATitle = (id) => () => {
        onTitleClick(id)
    };
    const optionClick = (option, title, id) => () => {
        onOptionClick(option, title, id )
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
            onClick={optionClick(o, title, id)}
        >
            <Container textAlign='right'>

            </Container>

            <Container>
                <Popup trigger={<p>{o.option}</p>} on='click' hideOnScroll>
                    <Button.Group>
                        <Popup trigger={<Button icon='edit' color='blue' onClick={onEdit(o.id)}/>} content='edit this option' />
                        <Popup trigger={<Button icon='delete' color='red' onClick={onDelete(o.id, id)} />} content='delete this option' />
                    </Button.Group> 
                </Popup>
                {o.selected &&
                <Icon name='check' color='green' size='small' />}      
                {index < option.length-1 &&
                    <Divider horizontal>or</Divider>
                }
            </Container>
        </Container>
    ))
    return (
        <div>
            <Container>
                <Header 
                    as='h2'
                    onClick={clickATitle(id)}
                >
                    {title}
                    <Icon name='angle up' color='blue'/>
                </Header>
                {options}
            </Container>
        </div>

    )
}

const TextRendering = ({ text }) => {
    const options = text && text.map((t,i) => (
        <Container
            key={i}
        >
            <p>{t.option}</p>
        </Container>
    ))
    return (
        <div>
            {options}
        </div>
    )
}