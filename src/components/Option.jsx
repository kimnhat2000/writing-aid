import React from 'react';
import copy from 'copy-to-clipboard';
import  { Container, Segment, Popup, Icon, Divider, Confirm } from 'semantic-ui-react'

const Option = ({ 
    title, 
    option, 
    onOptionClick, 
    id, 
    onTitleClick, 
    onDeleteClick, 
    onEditClick, 
    onConfirmShow, 
    cancelButton,
    confirmButton,
    editButtonStatus,
    onDeleteTitleClick,
    handleDeleteTitleConfirm,
    onDeleteTitleShow
}) => {
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
    const handleCancel = () => {
        cancelButton()
    }
    const handleConfirm = (option, titleId) => () => {
        console.log(option)
        confirmButton(option, titleId)
    }
    const deleteTitleClick = () => {
        onDeleteTitleClick()
    };
    const onHandleDeleteTitleConfirm = (titleId) => () => {
        handleDeleteTitleConfirm(titleId)
    }

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
                <Confirm
                    open={onConfirmShow}
                    content='are you sure you want to delete this item?'
                    cancelButton='Never mind'
                    confirmButton="Let's do it"
                    onCancel={handleCancel}
                    onConfirm={handleConfirm(o.id, id)}
                />
                    <Popup trigger={<Icon name='check' color='green' />} content='option copied' />
                {editButtonStatus ? 
                    <Popup trigger={<Icon name='edit' color='grey' onClick={onEdit(o.id, id)} />} content='edit this option' /> :
                    <Popup trigger={<Icon name='edit' color='blue' onClick={onEdit(o.id, id)} />} content='edit this option' />
                }
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
                <h4 className='title'>
                    {title}
                    <Popup trigger={<Icon name='angle double up' color='teal' onClick={clickATitle(id)} />} content='close title' />
                    <Popup trigger={<Icon name='delete' color='red' onClick={deleteTitleClick} />} content='delete title' />
                </h4>
                {options}

                <Confirm
                    open={onDeleteTitleShow}
                    content='are you sure you want to delete this title?'
                    cancelButton='Never mind'
                    confirmButton="Let's do it"
                    onCancel={handleCancel}
                    onConfirm={onHandleDeleteTitleConfirm(id)}
                />

            </Container>
        </div>

    )
}

export default Option;