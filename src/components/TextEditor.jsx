import React from 'react'
import {
  TextArea,
  Form,
  Container,
  Dropdown,
  Icon,

} from 'semantic-ui-react'

import Timer from './Timer'
import {textEditorDropdownMenu} from './tools'

class TextEditor extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      selectedContent: ''
    }
  }

  onContentChange = e => {
    this.setState({ selectedContent: e.target.value })
  }

  render () {
    const { selectedContent } = this.state
    const { onTimerClick, startTimer } = this.props

    return (
      <Container>
        <Form>
          <TextArea
            className='break-line'
            placeholder='start writing here'
            style={{ minHeight: 550 }}
            value={selectedContent}
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
            options={textEditorDropdownMenu}
          />
          <Timer onTimerClick={onTimerClick} startTimer={startTimer} />
        </Container>
      </Container>
    )
  }
}

export default TextEditor
