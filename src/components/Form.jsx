import React from 'react';
import { Form, Icon, Popup, Container, Input, Modal, Button, Header } from 'semantic-ui-react';
import uuid from 'uuid';


class AppForm extends React.Component {
  state = {
    fuzzyTitles: [],
    answer:'',
    title:'',
    content:'',
    warning:'',
    showConfirm: false
  }

  addFuzzyTitle = () => {
    this.setState({ fuzzyTitles: [...this.state.fuzzyTitles, {id: uuid(), value:''}] });
    console.log(this.state.fuzzyTitles)
  }

  removeFuzzyTitle = (titleId) => {
    console.log(titleId)
    const fuzzyTitles = this.state.fuzzyTitles.filter(title => title.id !== titleId)
    this.setState({ fuzzyTitles })
  }

  onTitleInput = (e) => {
    this.setState({ title: e.target.value })
  }

  onContentInput = (e) => {
    this.setState({ content: e.target.value })
  }

  onMatchSearchInput = (e) => {
    
    const id = Number(e.target.id);
    const fuzzyTitles = this.state.fuzzyTitles.map((value, index) => index === id ? {...value, value: e.target.value} : value)
    this.setState({ fuzzyTitles })
  }

  onFormSubmit = (e) => {
    const {title, content} = this.state
    e.preventDefault()
    if (!title) {
      this.setState({ showConfirm: true, warning: 'please enter a topic' })
      return;
    } else if (!content) {
      this.setState({ showConfirm: true, warning: 'please enter suitable answers to this topic' })
      return;
    } 
  }

  render() {

    const { title, content, warning, showConfirm, fuzzyTitles} = this.state

    const possibleMatches = fuzzyTitles && fuzzyTitles.map((item, index) => {
      return(
      <Container key = {index}>
        <Input 
          icon={<Icon name='minus' inverted circular link onClick={() => this.removeFuzzyTitle(item.id)}/>} fluid label={`match search ${index + 1} / ${this.state.fuzzyTitles.length}`} placeholder='title...' 
          id={index}
          type='text'
          value={item.value}
          onChange={this.onMatchSearchInput}
        />
      </Container>
    )})
    return (
      <Form onSubmit={this.onFormSubmit}>

        <Form.Input 
          fluid label='Title' 
          placeholder='title...' 
          value={title} 
          onChange={this.onTitleInput} 
        />

        <Popup trigger={<Icon name='plus' onClick={this.addFuzzyTitle} link/>} content='add fuzzy search' />

        {possibleMatches}

        <Form.TextArea 
          label='Suitable answer to this topic' 
          placeholder='what is the best way to respond to questions?...' 
          value={content} 
          onChange={this.onContentInput} 
        />

        <Form.Button>Submit</Form.Button>

        <Modal open={showConfirm} basic size='small'>
          <Header icon='warning' content='Missing fields' />
          <Modal.Content>
            <p>
              {warning}
            </p>
          </Modal.Content>
          <Modal.Actions>
            <Button basic color='red' inverted onClick={() => this.setState({ showConfirm: false })}>
              <Icon name='remove'/> Sure!
            </Button>
          </Modal.Actions>
        </Modal>

      </Form>
    )
  }
}

export default AppForm