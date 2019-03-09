import React from 'react';
import { Container, Header, Button, Grid, Divider, Segment, Icon } from 'semantic-ui-react';

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
        const data = this.state.data.map(item => item.id === id ? {...item, expand: !item.expand} : item)
        this.setState({ data })
    }

    onOptionClick = (d, t, i) => {
        const chosenOption = {...this.state.chosenOption, id: d.id, option: d.option, title: t}; //the current selection
        const selectedTitle = this.state.data.filter(data => data.id === i); //look for the title that contain the option users select, it will return an array with 1 item
        const selectedOption = selectedTitle[0].possibleAnswers.map( data => data.id === d.id ? {...data, selected: !data.selected} : data ); //switching between select or non select an option
        const chosenData = d.selected ? this.state.chosenData.filter(data => data.id !== d.id) : [...this.state.chosenData, chosenOption]; // create an array to render all options to text editor
        const data = this.state.data.map(title => title.id === i ? {...title, possibleAnswers: selectedOption} : title); //replace the item in data that reflects the changes
        this.setState({ chosenData, data });
    }

    render () {
        const { data, chosenData } = this.state;
        return (
            <Segment>
                <Grid columns={2} relaxed='very'>
                    <Grid.Column>
                        <AvailableOptions
                            data={data}
                            onOptionClick={this.onOptionClick}
                            onTitleClick={this.onTitleClick}
                        />
                    </Grid.Column>
                    <Grid.Column>
                        <TextRendering
                            text = {chosenData && chosenData}
                        />
                    </Grid.Column>
                </Grid>
                <Divider vertical>
                    <Icon name='angle double right' size='big'></Icon>
                </Divider>
            </Segment>
        )
    }
}

export default WritingAidMain;

const AvailableOptions = ({ data, onOptionClick, onTitleClick }) => {
    const clickATitle = (id) => () => {
        onTitleClick(id)
    };
    const availableOptions = data.map((d,i) => (
        d.expand ? 
            <Container
                key={i}
                onClick={clickATitle(d.id)}
            >
                <Option
                    title={d.title}
                    option={d.possibleAnswers}
                    onOptionClick={onOptionClick}
                    id={d.id}
                />
            </Container>
            :
            <Container
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

const Option = ({ title, option, onOptionClick, id }) => {
    const onClick = (option, title, id) => () => {
        onOptionClick(option, title, id )
    }
    const options = option && option.map((o, index) => (
        <Container 
            key = {index}
            onClick={onClick(o, title, id)}
        >
            <Container>
                {o.option}
                {o.selected &&
                <Container>
                    <Icon name='arrow alternate circle right' color='blue' />
                </Container>
                }
                {index < option.length-1 &&
                    <Divider horizontal>or</Divider>
                }
            </Container>
        </Container>
    ))
    return (
        <div>
            <Container>
                <Header as='h2'>
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