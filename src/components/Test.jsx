import React from 'react';
import {Editor, EditorState} from 'draft-js';

const complete = 'testing'

class Test extends React.Component{
  constructor(props){
    super(props)
    this.state={
      editorState: EditorState.createEmpty()
    }

  }
  
  onChange = (editorState) => this.setState({ editorState });

  render(){
    return(

        <Editor editorState={this.state.editorState} onChange={this.onChange}
          autoComplete={complete}
        />

    )
  }
}

export default Test