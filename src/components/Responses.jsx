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
  onDeleteTitleClick

}) => {
  const render =
    data &&
    data.map((title, index) => (
      <Container fluid key={index}>
        <Segment>
          <Container className="title">
            <Header as="h4" dividing>
              <Dropdown icon={title.collapse ? "caret square up":'caret square down'}>
                <Dropdown.Menu>
                  <Dropdown.Item icon="remove" text="delete this title" onClick={() => onDeleteTitleClick()}/>
                  <Dropdown.Item icon="comment" text="Announcement" />
                  <Dropdown.Item icon="conversation" text="Discussion" />
                </Dropdown.Menu>
              </Dropdown>

              <Header.Content onClick={() => onTitleClick(title.id)}>
                {title.title}
              </Header.Content>

            </Header>
            <Confirm
              open={onDeleteTitleShow}
              content="are you sure you want to delete this title?"
              cancelButton="Never mind"
              confirmButton="Let's do it"
              onCancel={() => cancelButton()}
              onConfirm={() => handleDeleteTitleConfirm(title.id)}
            />
          </Container>


          
          {title.collapse &&
            title.possibleAnswers &&
            title.possibleAnswers.map((answer, index) => (
              <Container className="option" key={index}>
                <Container>
                  <Segment
                    onClick={() => {
                      onOptionClick(answer, title.id);
                    }}
                  >
                    {answer.option}
                  </Segment>

                  {answer.selected && (
                    <Container>
                      <Popup
                        trigger={<Icon name="check" color="green" />}
                        content="option copied"
                      />
                      <Popup
                        trigger={
                          <Icon
                            name="edit"
                            color={editOptionButtonStatus ? "grey" : "blue"}
                            onClick={() =>
                              onEditOptionButtonClick(answer.id, title.id)
                            }
                          />
                        }
                        content="edit this option"
                      />
                      <Popup
                        trigger={
                          <Icon
                            name="delete"
                            color="red"
                            onClick={() => onDeleteOptionButtonClick()}
                          />
                        }
                        content="delete this option"
                      />
                      <Confirm
                        open={onConfirmShow}
                        content="are you sure you want to delete this item?"
                        cancelButton="Never mind"
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
    ));
  return <div>{render}</div>
}

export default Responses
