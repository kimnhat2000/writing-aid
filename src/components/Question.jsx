import React from 'react'
import { Button, Input, TextArea, Form } from 'semantic-ui-react'

const defaultState = {
  name: '',
  link: '',
  question: '',
  questionExpansion: false
}

class QuestionRender extends React.Component {
  constructor (props) {
    super(props)
    this.state = defaultState
  }

  onSubmit = () => {
    const { name, link, question } = this.state
    const questionInfo = {
      customer: name,
      link,
      question: { open: false, questionContent: question }
    }
    this.props.questionInfo(questionInfo)
  }

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value })
    if (this.state.question === '') {
    } else {
      this.onSubmit()
    }
  }

  render () {
    const { name, link, question, questionExpansion } = this.state

    return questionExpansion ? (
      <Form onSubmit={this.onSubmit}>
        <Form.Group>
          <Form.Input width={6}>
            <Input
              name='name'
              value={name}
              onChange={this.handleChange}
              fluid
              placeholder='name...'
              size='mini'
            />
          </Form.Input>

          <Form.Input width={8}>
            <Input
              name='link'
              value={link}
              onChange={this.handleChange}
              fluid
              label='http://'
              placeholder='link...'
              size='mini'
            />
          </Form.Input>

          <Button.Group floated='left' size='tiny'>
            {(name || link || question) && <Button icon='erase' onClick={()=>this.setState({...defaultState, questionExpansion})}/>}

            <Button
              onClick={() =>
                this.setState({ questionExpansion: !questionExpansion })
              }
              icon='expand'
            />
          </Button.Group>
        </Form.Group>

        <TextArea
          name='question'
          value={question}
          onChange={this.handleChange}
          placeholder='Question...'
          style={{ minHeight: 175 }}
        />
      </Form>
    ) : (
      <Button
        fluid
        onClick={() => this.setState({ questionExpansion: !questionExpansion })}
        icon='expand arrows alternate'
        labelPosition='right'
        content="Click to open question' s details"
      />
    )
  }
}

export default QuestionRender
