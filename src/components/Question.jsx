import React from 'react'
import { Button, Icon, Popup, Input, TextArea, Form } from 'semantic-ui-react'

class QuestionRender extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      name:'',
      link:'',
      question:'',
      questionExpansion: false,
    }
  }

  onSubmit =()=>{
    const {name, link, question} = this.state
    const questionInfo = {customer: name, link, question:{open: false, questionContent: question}}
    this.props.questionInfo(questionInfo)
  }

  handleChange = (e)=>{
    this.setState({[e.target.name]:e.target.value})
    if(this.state.question === ''){
      return;
    }else{
      this.onSubmit()
    }
  }

  render () {
    const { questionExpansion } = this.state
    const {name, link, question}=this.state

    return questionExpansion ? (
      <Form onSubmit={this.onSubmit}>
        <Form.Group>
          <Form.Input width={6}>
            <Input name='name' value={name} onChange={this.handleChange} fluid placeholder='name...' size='mini' />
          </Form.Input>

          <Form.Input width={8}>
            <Input name='link' value={link} onChange={this.handleChange} fluid label='http://' placeholder='link...' size='mini' />
          </Form.Input>

          <Popup
            trigger={
              <Button
                floated='right'
                onClick={() => this.setState({questionExpansion: !questionExpansion})}
                size='mini'
              >
                <Icon name='expand' />
              </Button>
            }
            content='collapse'
          />
        </Form.Group>

        <TextArea name='question' value={question} onChange={this.handleChange} placeholder='Question...' style={{ minHeight: 175 }} />
      </Form>
    ) : (
      <Button
        fluid
        onClick={() => this.setState({questionExpansion: !questionExpansion})}
        icon='expand arrows alternate'
        labelPosition='right'
        content="Click to open question' s details"
      />
    )
  }
}

export default QuestionRender
