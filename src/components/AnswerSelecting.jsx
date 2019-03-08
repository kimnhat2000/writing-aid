import React from 'react';
import { Container, Placeholder } from 'semantic-ui-react';

import { dummyData } from './tools';

class WritingAidMain extends React.Component {
    constructor (props) {
        super (props);

        this.state = {
            data: dummyData,
        }
    }

    onOptionClick = (d) => {
        console.log(d)
    }

    render () {
        const { data } = this.state;
        console.log('1')
        return (
            <Placeholder>
                <Placeholder.Header>
                    <Placeholder.Line>
     
                    </Placeholder.Line>
                </Placeholder.Header>
                <AvailableOptions
                    data = {data}
                    onOptionClick = {this.onOptionClick}
                />
            </Placeholder>
        )
    }
}

export default WritingAidMain;

const AvailableOptions = ({ data, onOptionClick }) => {

    const availableOptions = data.map((d,i) => (
        <Container
            key={i}
        >
            <Option
                title = {d.title}
                option={d.possibleAnswers}
                onOptionClick={onOptionClick}
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

const Option = ({ title, option, onOptionClick }) => {
    
    const onClick = (o) => () => {
        onOptionClick(o)
    }

    const options = option.map((o,i) => (
        <div 
            key = {i}
            onClick = {onClick(o)}
        >
            {o.option}
        </div>
    ))
    console.log(title, option)
    return (
        <div>
        {title}
            {options}
        </div>
    )
}