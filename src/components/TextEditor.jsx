import React from 'react'
import { TextArea, Form, Container, Dropdown, Icon } from 'semantic-ui-react'

import Timer from './Timer'
import { textEditorDropdownMenu } from './tools'

const defaultState = {
  content: '',
  timeRecord: '',
  record: false
}

class TextEditor extends React.Component {
  constructor (props) {
    super(props)
    this.state = defaultState
  }

  onContentChange = e => {
    this.setState({ content: e.target.value })
  }

  onselectAnAction = value => {
    const { timeRecord, content } = this.state
    if (value === 3) {
      this.setState({record: true}, console.log(this.props.test))
      this.props.draftInfo(timeRecord, content)
    }
  }

  render () {
    const { content, record } = this.state
    return (
      <Container>
      
        <Form>
          <TextArea
            className='break-line'
            placeholder='start writing here'
            style={{ minHeight: 450 }}
            value={content}
            onChange={this.onContentChange}
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
                  onClick={() => this.onselectAnAction(item.value)}
                />
              ))}
            </Dropdown.Menu>
          </Dropdown>
          <Timer
            recordTime={timeRecord =>
              this.setState({ timeRecord, record: false })
            }
            record={record}
          />
        </Container>
      </Container>
    )
  }
}

export default TextEditor
