import React from 'react'
import { TextArea, Form, Container, Dropdown, Icon } from 'semantic-ui-react'
import {connect} from 'react-redux'

import Timer from './Timer'
import { textEditorDropdownMenu } from './tools'
import { textEditorAction} from '../redux//timer/timerReducer'

const TextEditor = ({ content, draftContent, addTextToDraft, resetClock, timeRecord, clearContent
}) => {

  const onselectAnAction = value => {
    console.log(content.content)
    const { second, minute, hour } = timeRecord
    const time = `${hour}h${minute}m${second}s`
    if (value === 3) {
      if (!content) {
      } else {
        addTextToDraft(time, content.content)
        resetClock()
        clearContent()
      }
    }
  }
  return (
    <Container>
      <Form>
        <TextArea
          className='break-line'
          placeholder='start writing here'
          style={{ minHeight: 550 }}
          value={content.content}
          onChange={(e) => draftContent(e.target.value)}
        />
      </Form>

      <Container>
        <Dropdown
          trigger={
            <span>
              <Icon name='user' /> Hello, Nhat
              </span>
          }
        >
          <Dropdown.Menu>
            {textEditorDropdownMenu.map(item => (
              <Dropdown.Item
                key={item.value}
                {...item}
                onClick={() => onselectAnAction(item.value)}
              />
            ))}
          </Dropdown.Menu>
        </Dropdown>
        <Timer />
      </Container>
    </Container>
  )
}

const mapStateToProps = ({ timer, textEditor}) => ({
  timeRecord: timer,
  content: textEditor
})

const mapDispatchToProps = dispatch => ({
  resetClock: ()=>dispatch({type: 'RESET'}),
  draftContent: (c) => dispatch(textEditorAction(c)),
  clearContent: () => dispatch({ type: 'CLEAR_CONTENT'})
})

export default connect(mapStateToProps, mapDispatchToProps )(TextEditor)
