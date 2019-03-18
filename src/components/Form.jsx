import React from 'react'
import { Form, Icon, Popup, Container, Input, Button } from 'semantic-ui-react'
import uuid from 'uuid'

class AppForm extends React.Component {
  constructor (props) {
    super(props)
    const { optionToEdit } = this.props
    console.log('from props: ', optionToEdit)
    this.state = {
      answer: '',
      title: optionToEdit.title ? optionToEdit.title : '',
      possibleMatch:
        optionToEdit.possibleMatch
          ? optionToEdit.possibleMatch
          : [],
      content: optionToEdit.option ? optionToEdit.option : '',
      submitCheck: true,
      newTopic: {},
      cancelSubmit: false
    }
  }

  componentDidUpdate (prevProps) {
    if (this.props.optionToEdit !== prevProps.optionToEdit) {
      this.setState({
        possibleMatch: [],
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

  addFuzzyTitle = () => {
    this.setState({
      possibleMatch: [...this.state.possibleMatch, { id: uuid(), value: '' }]
    })
    console.log(this.state.possibleMatch)
  }

  removeFuzzyTitle = titleId => {
    console.log(titleId)
    const possibleMatch = this.state.possibleMatch.filter(
      title => title.id !== titleId
    )
    this.setState({ possibleMatch })
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

  onMatchSearchInput = e => {
    const id = Number(e.target.id)
    const possibleMatch = this.state.possibleMatch.map((value, index) =>
      index === id ? { ...value, value: e.target.value } : value
    )
    this.setState({ possibleMatch })
  }

  onFormSubmit = e => {
    e.preventDefault()
    const { title, content, possibleMatch, cancelSubmit } = this.state
    const { onFormOpen, onAddtitle, optionToEdit, editChange } = this.props

    if (cancelSubmit) {
      onFormOpen()
    } else if (!title) {
    } else if (!content) {
    } else if (optionToEdit.id) {
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
    } else {
      const CheckPossibleMatch = possibleMatch.filter(item => item.value !== '') // get rid off emty possible matches if any
      const newTopic = {
        title,
        possibleMatch: CheckPossibleMatch,
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
    const { title, content, submitCheck, possibleMatch } = this.state

    const possibleMatches =
      possibleMatch &&
      possibleMatch.map((item, index) => {
        return (
          <Container key={index}>
            <Input
              icon={
                <Icon
                  name='minus'
                  inverted
                  circular
                  link
                  onClick={() => this.removeFuzzyTitle(item.id)}
                />
              }
              fluid
              label={`match search ${index + 1} / ${
                this.state.possibleMatch.length
              }`}
              placeholder='title...'
              id={index}
              type='text'
              value={item.value}
              onChange={this.onMatchSearchInput}
            />
          </Container>
        )
      })
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
          trigger={<Icon name='plus' onClick={this.addFuzzyTitle} />}
          content='add fuzzy search'
        />

        {possibleMatches}

        <Form.TextArea
          style={{ minHeight: 300 }}
          label='Suitable answer to this topic'
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
