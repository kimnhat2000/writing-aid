import React from 'react'
import { Form, Icon, Popup, Button } from 'semantic-ui-react'
import uuid from 'uuid'

class AppForm extends React.Component {
  constructor (props) {
    super(props)
    const { optionToEdit, titleToAddOptionTo } = this.props
    this.state = {
      answer: '',
      title: titleToAddOptionTo.title
        ? titleToAddOptionTo.title
        : optionToEdit.title
          ? optionToEdit.title
          : '',
      possibleMatch: titleToAddOptionTo.possibleMatch
        ? titleToAddOptionTo.possibleMatch
        : optionToEdit.possibleMatch
          ? optionToEdit.possibleMatch
          : '',
      content: optionToEdit.option ? optionToEdit.option : '',
      submitCheck: titleToAddOptionTo.id || optionToEdit.id ? false : true,
      newTopic: {},
      cancelSubmit: false,
      showPossibleMatchForm: !!titleToAddOptionTo
    }
  }

  componentDidUpdate (prevProps) {
    if (this.props.optionToEdit !== prevProps.optionToEdit) {
      this.setState({
        showPossibleMatchForm: false,
        possibleMatch: '',
        answer: '',
        title: '',
        content: '',
        submitCheck: false,
        newTopic: {},
      })
    }
  }

  handleInputChange = e => {
    this.setState({ [e.target.name]: e.target.value }, () =>
      this.state.title === '' || this.state.content === ''
        ? this.setState({ submitCheck: true })
        : this.setState({ submitCheck: false }))
  }

  onFormSubmit = e => {
    e.preventDefault()
    const { title, content, possibleMatch, cancelSubmit } = this.state
    const {
      onFormClose,
      onAddtitle,
      optionToEdit,
      editChange,
      titleToAddOptionTo,
      onAddOptionToTitle
    } = this.props

    if (cancelSubmit) {
      onFormClose()
    } else if (!title) {
    } else if (!content) {
    } else if (optionToEdit.id && !titleToAddOptionTo.id) {
      const change = {
        title: title,
        titleId: optionToEdit.titleId,
        possibleMatch: possibleMatch,
        possibleAnswers: {
          option: content,
          id: optionToEdit.id
        }
      }
      editChange(change)
    } else if (titleToAddOptionTo.id && !optionToEdit.id) {
      const option = {
        ...titleToAddOptionTo,
        title: title,
        possibleMatch: possibleMatch,
        possibleAnswers: {
          option: content,
          id: uuid()
        }
      }
      onAddOptionToTitle(option)
    } else {
      const newTopic = {
        title,
        possibleMatch: possibleMatch,
        createdBy: '',
        icon: '',
        image: '',
        possibleAnswers: [
          {
            option: content,
            id: uuid(),
            selected: false,
            iconClicked: false
          }
        ],
        collapse: false,
        id: uuid()
      }
      this.setState({ submitCheck: false })
      onFormClose()
      onAddtitle(newTopic)
    }
  }

  render () {
    const {
      title,
      content,
      submitCheck,
      showPossibleMatchForm,
      possibleMatch
    } = this.state

    return (
      <Form onSubmit={this.onFormSubmit}>
        <Form.Input
          fluid
          name='title'
          label='Title'
          placeholder='title...'
          value={title}
          onChange={this.handleInputChange}
        />

        <Popup
          trigger={
            <Icon
              name={showPossibleMatchForm ? 'minus' : 'plus'}
              onClick={() =>
                this.setState({
                  showPossibleMatchForm: !showPossibleMatchForm
                })
              }
            />
          }
          content="open question's similar terms"
        />

        {showPossibleMatchForm && (
          <Form.TextArea
            style={{ minHeight: 100 }}
            name='possibleMatch'
            label='alternative search terms'
            value={possibleMatch}
            onChange={this.handleInputChange}
          />
        )}

        <Form.TextArea
          style={{ minHeight: 300 }}
          name='content'
          placeholder='what is the best way to respond to questions?...'
          value={content}
          onChange={this.handleInputChange}
        />
        <Button.Group size='mini' floated='right'>
          {submitCheck ? (
            <Popup
              trigger={<Button>Submit</Button>}
              content='title and content must be filled'
            />
          ) : (
            <Button color='blue'>Submit</Button>
          )}
          <Button.Or />
          <Button
            onClick={() => this.setState({ cancelSubmit: true })}
            color='red'
          >
            Cancel
          </Button>
        </Button.Group>
      </Form>
    )
  }
}

export default AppForm
