import React from 'react';
import copy from 'copy-to-clipboard';
import  { Container, Segment, Popup, Icon, Divider } from 'semantic-ui-react'

const Option = ({ title, option, onOptionClick, id, onTitleClick, onDeleteClick, onEditClick, }) => {
    const clickATitle = (id) => () => {
        onTitleClick(id)
    };
    const optionClick = (option, id) => () => {
        copy(option.option)
        onOptionClick(option, id)
    };
    const onEdit = (option, titleId) => () => {
        onEditClick(option, titleId)
    };
    const onDelete = (option, titleId) => () => {
        onDeleteClick(option, titleId)
    };
    const options = option && option.map((o, index) => (
        <Container
            className='option'
            key={index}
        >
            <Segment onClick={optionClick(o, id)}>
                <Popup trigger={<p>{o.option}</p>} content='text copied' on='click' hideOnScroll />

            </Segment>
            {o.selected &&
                <Container>
                    <Popup trigger={<Icon name='check' color='green' />} content='option copied' />
                    <Popup trigger={<Icon name='edit' color='blue' onClick={onEdit(o.id, id)} />} content='edit this option' />
                    <Popup trigger={<Icon name='delete' color='red' onClick={onDelete(o.id, id)} />} content='delete this option' />
                </Container>}

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
                    <Popup trigger={<Icon name='angle double up' color='teal' onClick={clickATitle(id)} />} content='close title' />
                </h3>
                {options}
            </Container>
        </div>

    )
}

export default Option;