import React from 'react';
import { Container, Header, Button, Grid, Divider, Segment, GridColumn } from 'semantic-ui-react';

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

    onOptionClick = (d, t, i) => {
        const chosenOption = {...this.state.chosenOption, id: d.id, option: d.option, title: t};
        const selectedTitle = this.state.data.filter(data => data.id === i);
        const selectedOption = selectedTitle[0].possibleAnswers.map( data => data.id === d.id ? {...data, selected: !data.selected} : data );
        const chosenData = d.selected ? this.state.chosenData.filter(data => data.id !== d.id) : [...this.state.chosenData, chosenOption];
        const data = this.state.data.map(data => data.id === i ? {...data, possibleAnswers: selectedOption} : data)

        this.setState({ chosenData, data });
        console.log(d.id)
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
                        />
                    </Grid.Column>
                    <Grid.Column>
                        <TextRendering
                            text = {chosenData ? chosenData : 'select your option'}
                        />
                    </Grid.Column>
                </Grid>
                <Divider vertical>editor</Divider>
            </Segment>
        )
    }
}

export default WritingAidMain;

const AvailableOptions = ({ data, onOptionClick, chosenData }) => {

    const availableOptions = data.map((d,i) => (
        <Container
            key={i}
        >
            <Option
                title = {d.title}
                option={d.possibleAnswers}
                onOptionClick={onOptionClick}
                id={d.id}
            />
        </Container>
    )
    )

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

    const options = option.map((option,index) => (
        <Container 
            key = {index}
            onClick = {onClick(option, title, id)}
        >
            <Container>
                {option.option}
            </Container>
            {option.selected && 
                <Button.Group>
                    <Button icon='play' />
                    <Button icon='pause' />
                    <Button icon='shuffle' />
                </Button.Group>
            }

            <Divider/>
        </Container>

    ))
    return (
        <div>
            <Container>
                <Header as='h2'>{title}</Header>
                {options}
            </Container>
        </div>

    )
}

const TextRendering = ({ text }) => {
    const options = text ? text.map((t,i) => (
        <Container
            key={i}
        >
            <p>{t.option}</p>
        </Container>
    )) : ''
    return (
        <div>
            {options}
        </div>
    )
}