import React from 'react';
import { Container, Popup, Icon } from 'semantic-ui-react';

import Option from './Option';


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

export default AvailableOptions;