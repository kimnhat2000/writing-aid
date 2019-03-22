import React from 'react'
import { Form, Icon, Popup, Container, Input, Button } from 'semantic-ui-react'
import uuid from 'uuid'

class AppForm extends React.Component {
  constructor (props) {
    super(props)
    const { optionToEdit, titleToAddOptionTo } = this.props
    console.log('from props: ', titleToAddOptionTo.id)
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
          : {},
      content: optionToEdit.option ? optionToEdit.option : '',
      submitCheck: true,
      newTopic: {},
      cancelSubmit: false,
      showPossibleMatchForm: !!titleToAddOptionTo
    }
  }

  componentDidUpdate (prevProps) {
    if (this.props.optionToEdit !== prevProps.optionToEdit) {
      this.setState({
        showPossibleMatchForm: false,
        possibleMatch: {},
        answer: '',
        title: '',
        content: '',
        submitCheck: true,
        newTopic: {},
        cancelSubmit: false
      })
      console.log(this.props.optionToEdit)
    }
  }

  onTitleInput = e => {
    this.setState({ title: e.target.value }, () =>
      this.state.title === '' || this.state.content === ''
        ? this.setState({ submitCheck: true })
        : this.setState({ submitCheck: false })
    )
  }

  onContentInput = e => {
    this.setState({ content: e.target.value }, () =>
      this.state.content === '' || this.state.title === ''
        ? this.setState({ submitCheck: true })
        : this.setState({ submitCheck: false })
    )
  }

  onFormSubmit = e => {
    e.preventDefault()
    const { title, content, possibleMatch, cancelSubmit } = this.state
    const {
      onFormOpen,
      onAddtitle,
      optionToEdit,
      editChange,
      titleToAddOptionTo,
      onAddOptionToTitle
    } = this.props

    if (cancelSubmit) {
      onFormOpen()
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
      onFormOpen()
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
          label='Title'
          placeholder='title...'
          value={title}
          onChange={this.onTitleInput}
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
            label='alternative search terms'
            value={possibleMatch.value}
            onChange={this.onContentInput}
          />
        )}

        <Form.TextArea
          style={{ minHeight: 300 }}
          placeholder='what is the best way to respond to questions?...'
          value={content}
          onChange={this.onContentInput}
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
