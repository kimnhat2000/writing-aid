import React from 'react'
import {
  Container,
  Confirm,
  Popup,
  Icon,
  Divider,
  Button,
  Header,
  Segment,
  Dropdown
} from 'semantic-ui-react'

const Responses = ({
  data,
  onTitleClick,
  onOptionClick,
  onConfirmShow,
  cancelButton,
  confirmButton,
  editOptionButtonStatus,
  onEditOptionButtonClick,
  onDeleteOptionButtonClick,
  onDeleteTitleShow,
  handleDeleteTitleConfirm,
  onDeleteTitleClick,
  clickOnAddOptionToTitle
}) => {
  const render =
    data &&
    data.map((title, index) => (
      <Container fluid key={index}>
        <Segment>
          <Container className='title'>
            <Header as='h4' dividing>
              <Dropdown
                icon={title.collapse ? 'caret square up' : 'caret square down'}
              >
                <Dropdown.Menu>
                  <Dropdown.Item
                    icon='add'
                    text='Add option to this title'
                    onClick={() => clickOnAddOptionToTitle(title)}
                  />
                  <Dropdown.Item icon='conversation' text='Discussion' />
                  <Dropdown.Item
                    icon='remove'
                    text='Delete this title'
                    onClick={event => {
                      event.stopPropagation()
                      onDeleteTitleClick()
                    }}
                  />
                  {onDeleteTitleShow && (
                    <Dropdown.Item>
                      <Button
                        icon='check'
                        content='Delete'
                        onClick={() => handleDeleteTitleConfirm(title.id)}
                        size='mini'
                        color='red'
                      />
                      <Button
                        icon='cancel'
                        content='Cancel'
                        size='mini'
                        color='green'
                      />
                    </Dropdown.Item>
                  )}
                </Dropdown.Menu>
              </Dropdown>

              <Header.Content onClick={() => onTitleClick(title.id)}>
                {title.title} {index + 1 + '/' + data.length}
              </Header.Content>
            </Header>
          </Container>

          {title.collapse &&
            title.possibleAnswers &&
            title.possibleAnswers.map((answer, index) => (
              <Container className='option' key={index}>
                <Container>
                  <Popup
                    trigger={
                      <Segment
                        className='break-line'
                        onClick={() => {
                          onOptionClick(answer, title.id)
                        }}
                      >
                        {answer.option}
                      </Segment>
                    }
                    content='text copied'
                    on='click'
                    hideOnScroll
                  />

                  {answer.selected && (
                    <Container>
                      <Popup
                        trigger={<Icon name='check' color='green' />}
                        content='option copied'
                      />
                      <Popup
                        trigger={
                          <Icon
                            name='edit'
                            color={editOptionButtonStatus ? 'grey' : 'blue'}
                            onClick={() =>
                              onEditOptionButtonClick(answer.id, title.id)
                            }
                          />
                        }
                        content='edit this option'
                      />
                      <Popup
                        trigger={
                          <Icon
                            name='delete'
                            color='red'
                            onClick={() => onDeleteOptionButtonClick()}
                          />
                        }
                        content='delete this option'
                      />
                      <Confirm
                        open={onConfirmShow}
                        content='are you sure you want to delete this item?'
                        cancelButton='Never mind'
                        confirmButton="Let's do it"
                        onCancel={() => cancelButton()}
                        onConfirm={() => confirmButton(answer.id, title.id)}
                      />
                    </Container>
                  )}
                </Container>

                <Divider horizontal>
                  {index + 1} / {title.possibleAnswers.length}
                </Divider>
              </Container>
            ))}
        </Segment>
      </Container>
    ))
  return <Container className='container-overflow'>{render}</Container>
}

export default Responses
