import React from 'react';
import { Form, Icon, Popup, Container, Input, Button } from 'semantic-ui-react';
import uuid from 'uuid';


class AppForm extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      possibleMatch: [],
      answer:'',
      title:'',
      content:'',
      submitCheck: true,
      newTopic:{},
    }
  }

  addFuzzyTitle = () => {
    this.setState({ possibleMatch: [...this.state.possibleMatch, {id: uuid(), value:''}] });
    console.log(this.state.possibleMatch)
  }

  removeFuzzyTitle = (titleId) => {
    console.log(titleId)
    const possibleMatch = this.state.possibleMatch.filter(title => title.id !== titleId)
    this.setState({ possibleMatch })
  }

  onTitleInput = (e) => {
    this.setState({ title: e.target.value }, this.state.title === '' || this.state.content === '' ? this.setState({submitCheck: true}) : this.setState({submitCheck: false}))
    
  }

  onContentInput = (e) => {
    this.setState({ content: e.target.value }, this.state.title === '' || this.state.content === '' ? this.setState({ submitCheck: true }) : this.setState({ submitCheck: false }))
  }

  onMatchSearchInput = (e) => {
    const id = Number(e.target.id);
    const possibleMatch = this.state.possibleMatch.map((value, index) => index === id ? {...value, value: e.target.value} : value)
    this.setState({ possibleMatch })
  }

  onFormSubmit = (e) => {
    const { title, content, possibleMatch } = this.state;
    const { onFormOpen } = this.props;
    e.preventDefault()
    if (!title) {
      return;
    } else if (!content) {
      return;
    } else {
      const CheckPossibleMatch = possibleMatch.filter(item => item.value!==''); //get rid off emty possible matches if any
      const newTopic = { 
        title, 
        possibleMatch: CheckPossibleMatch, 
        createdBy:'',
        icon: '',
        image:'',
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
      };
      this.setState({ newTopic, submitCheck: false }, ()=>{
        console.log(this.state.newTopic); onFormOpen();
      });

    }
  }

  render() {

    const { title, content, submitCheck, possibleMatch} = this.state

    const possibleMatches = possibleMatch && possibleMatch.map((item, index) => {
      return(
      <Container key = {index}>
        <Input 
          icon={<Icon name='minus' inverted circular link onClick={() => this.removeFuzzyTitle(item.id)}/>} fluid label={`match search ${index + 1} / ${this.state.possibleMatch.length}`} placeholder='title...' 
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

        <Popup trigger={<Icon name='plus' onClick={this.addFuzzyTitle}/>} content='add fuzzy search' />

        {possibleMatches}

        <Form.TextArea 
          label='Suitable answer to this topic' 
          placeholder='what is the best way to respond to questions?...' 
          value={content} 
          onChange={this.onContentInput} 
        />
        <Button.Group size='mini' floated='right'>
          {submitCheck ? 
            <Popup
              trigger={<Button>Submit</Button>}
              content='title and content must be filled'
            />
           :
            <Button color='blue'>Submit</Button>
          }
          <Button.Or />
          <Button onClick={() => { this.props.onFormOpen() }} color='red'>Cancel</Button>
        </Button.Group>
      </Form>
    )
  }
}

export default AppForm