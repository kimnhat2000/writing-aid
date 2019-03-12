import React from 'react';
import { Form, Icon, Popup, Container, Input } from 'semantic-ui-react';
import uuid from 'uuid';


class AppForm extends React.Component {
  state = {
    fuzzyTitles: [],
    answer:'',
  }

  addFuzzyTitle = () => {
    this.setState({ fuzzyTitles: [...this.state.fuzzyTitles, {id: uuid(), value:''}] });
  }

  removeFuzzyTitle = (titleId) => {
    const fuzzyTitles = this.state.fuzzyTitles.filter(title => title.id !== titleId)
    this.setState({ fuzzyTitles })
  }

  onInputValueChange = (e) => {
    const id = Number(e.target.id);
    const fuzzyTitles = this.state.fuzzyTitles.map((value, index) => index === id ? {...value, value: e.target.value} : value)
    this.setState({ fuzzyTitles })
    console.log(this.state.fuzzyTitles)
  }

  render() {

    const fuzzyTitles = this.state.fuzzyTitles && this.state.fuzzyTitles.map((title, index) => {
      return(
      <Container key = {index}>
        <Input icon={<Icon name='minus' inverted circular link onClick={() => this.removeFuzzyTitle(title.id)}/>} fluid label={`match search ${index + 1} / ${this.state.fuzzyTitles.length}`} placeholder='title...' 
          id={index}
          type='text'
          value={title.value}
          onChange={this.onInputValueChange}
        />
      </Container>
    )})
    return (
      <Form>
          <Form.Input fluid label='Title' placeholder='title...' /> 
          <Popup trigger={<Icon name='plus' onClick={this.addFuzzyTitle} link/>} content='add fuzzy search' />
          {fuzzyTitles}
        <Form.TextArea label='Suitable answer to this question' placeholder='what is the best way to respond to questions?...' />

        <Form.Button>Submit</Form.Button>
      </Form>
    )
  }
}

export default AppForm