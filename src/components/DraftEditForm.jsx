import React from 'react'
import { Form, Button } from 'semantic-ui-react'

class DraftEditForm extends React.Component {
  constructor (props) {
    super(props)
    const { draftToEdit } = this.props
    this.state = {
      createdAt: draftToEdit.createdAt
        ? draftToEdit.createdAt
        : 'No recorded date',
      customer: draftToEdit.customer
        ? draftToEdit.customer
        : "No customer's name",
      link: draftToEdit.link ? draftToEdit.link : 'No link recorded',
      question: draftToEdit.question
        ? draftToEdit.question
        : { open: false, questionContent: 'No question' },
      draftContent: draftToEdit.draftContent
        ? draftToEdit.draftContent
        : 'No content'
    }
  }

  onFormSubmit = e => {
    e.preventDefault()
    const { cancelCliced } = this.state
    if (cancelCliced) {
      this.props.closeForm()
    } else {
      const newDraft = { content: this.state.draftContent, draftId: this.props.draftToEdit.draftId} 
      this.props.editedDraft(newDraft)
    } 
  }

  render () {
    return (
      <Form onSubmit={this.onFormSubmit}>
        <Form.Group widths='equal'>
          <Form.Input
            disabled
            fluid
            icon='calendar alternate outline'
            placeholder='no create date'
            value={this.state.createdAt}
          />
          <Form.Input
            disabled
            fluid
            icon='user'
            placeholder='no customer name'
            value={this.state.customer}
          />
          <Form.Input
            disabled
            fluid
            icon='linkify'
            placeholder='no link'
            value={this.state.link}
          />
        </Form.Group>

        <Form.TextArea
          disabled
          icon='question'
          placeholder='Questomer question...'
          value={this.state.question.questionContent}
        />
        <Form.TextArea
          style={{ minHeight: 300 }}
          value={this.state.draftContent}
          label='Draft'
          placeholder='Draft...'
          onChange={e => this.setState({ draftContent: e.target.value })}
        />
        <Button.Group>
          <Button onClick={() => this.setState({ cancelCliced: true })}>
            Cancel
          </Button>
          <Button.Or />
          {this.state.draftContent === 'No content' ||
          this.state.draftContent === '' ? (
            <Button disabled>OK</Button>
            ) : (
              <Button positive>OK</Button>
            )}
        </Button.Group>
      </Form>
    )
  }
}
export default DraftEditForm
