import React from 'react'
import copy from 'copy-to-clipboard'
import {
  Container,
  Segment,
  Popup,
  Icon,
  Divider,
  Confirm,
  Button
} from 'semantic-ui-react'

const Option = ({
  title,
  option,
  onOptionClick,
  titleId,
  onTitleClick,
  onDeleteClick,
  onEditOptionButtonClick,
  onConfirmShow,
  cancelButton,
  confirmButton,
  editOptionButtonStatus,
  
  onDeleteTitleClick,
  handleDeleteTitleConfirm,
  onDeleteTitleShow
}) => {
  const optionClick = (option, id) => () => {
    copy(option.option)
    onOptionClick(option, id)
  }

  const options =
    option &&
    option.map((o, index) => (
      <Container className='option' key={index}>
        <Segment onClick={optionClick(o, titleId)}>
          <Popup
            trigger={<p className='break-line'>{o.option}</p>}
            content='text copied'
            on='click'
            hideOnScroll
          />
        </Segment>
        {o.selected && (
          <Container>
            <Confirm
              open={onConfirmShow}
              content='are you sure you want to delete this item?'
              cancelButton='Never mind'
              confirmButton="Let's do it"
              onCancel={() => cancelButton()}
              onConfirm={() => confirmButton(o.id, titleId)}
            />
            <Popup
              trigger={<Icon name='check' color='green' />}
              content='option copied'
            />
            <Popup
              trigger={
                <Icon
                  name='edit'
                  color={editOptionButtonStatus ? 'grey' : 'blue'}
                  onClick={() => onEditOptionButtonClick(o.id, titleId)}
                />
              }
              content='edit this option'
            />
            <Popup
              trigger={
                <Icon
                  name='delete'
                  color='red'
                  onClick={() => onDeleteClick(o.id, titleId)}
                />
              }
              content='delete this option'
            />
          </Container>
        )}

        {index < option.length - 1 && (
          <Divider horizontal>
            {index + 1} / {option.length}
          </Divider>
        )}
      </Container>
    ))
  return (
    <div>
      <Container>
        <h4 className='title'>
          {title}
          <Popup
            trigger={
              <Button size='mini'
                icon
                floated='right'
                onClick={() => onTitleClick(titleId)}
              >
                <Icon name='angle double up' />
              </Button>
            }
            content='close title'
          />
          <Popup
            trigger={
              <Button size='mini' icon floated='right' onClick={() => onDeleteTitleClick()}>
                <Icon name='delete' color='red' />
              </Button>
            }
            content='delete title'
          />
        </h4>
        {options}

        <Confirm
          open={onDeleteTitleShow}
          content='are you sure you want to delete this title?'
          cancelButton='Never mind'
          confirmButton="Let's do it"
          onCancel={() => cancelButton()}
          onConfirm={() => handleDeleteTitleConfirm(titleId)}
        />
      </Container>
    </div>
  )
}

export default Option
