import React from 'react';
import { TextArea, Form, Container } from 'semantic-ui-react';

import Timer from './Timer';

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
        const { onTimerClick, startTimer } = this.props;

        return(
            <Container>
                <Form>
                    <TextArea autoHeight placeholder='start writing here' style={{ minHeight: 500 }} value={selectedContent} onChange={this.onContentChange} />
                </Form>
                <Timer
                    onTimerClick={onTimerClick}
                    startTimer={startTimer}
                />
            </Container> 
        )
    }
}

export default TextEditor;