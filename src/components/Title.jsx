import React from 'react';
import { Container, Popup, Icon, Confirm, Divider } from 'semantic-ui-react';

import Option from './Option';


const AvailableOptions = (props) => {
    const clickATitle = (id) => () => {
        props.onTitleClick(id)
    };

    const availableOptions = props.data.map((d,i) => (
        d.collapse ? 
            <Container
                key={i}
            >
                <Option
                    title={d.title}
                    option={d.possibleAnswers}
                    onOptionClick={props.onOptionClick}
                    id={d.id}
                    onTitleClick={props.onTitleClick}
                    onDeleteClick={props.onDeleteOptionButtonClick}
                    onEditClick={props.onEditOptionButtonClick}
                    onConfirmShow={props.onConfirmShow}
                    cancelButton={props.cancelButton}
                    confirmButton={props.confirmButton}
                    editButtonStatus={props.editButtonStatus}
                    onDeleteTitleClick={props.onDeleteTitleClick}
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
                </h3>

                    <Divider horizontal>{i+1 + '/' + props.data.length}</Divider>  
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