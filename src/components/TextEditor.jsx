import React from 'react';
import { TextArea, Form } from 'semantic-ui-react';

class TextEditor extends React.Component {
    constructor (props) {
        super (props);
        this.state = {
            selectedContent:'',
        }
    }

    onContentChange = (e) => {
        this.setState({ selectedContent: e.target.value })
    }

    render () {
        const { selectedContent } = this.state;
        return(
            <Form>
                <TextArea autoHeight placeholder='start writing here' style={{ minHeight: 500 }} value={selectedContent} onChange={this.onContentChange}/>
            </Form>
        )
    }
}

export default TextEditor;