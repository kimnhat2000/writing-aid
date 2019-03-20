import React from 'react'
import { Form } from 'semantic-ui-react'

class DraftEditForm extends React.Component {
    state = {}

    render() {
        return (
            <Form>
                <Form.Group widths='equal'>
                    <Form.Input fluid label="Customer's name" placeholder='no customer name' />
                    <Form.Input fluid label='Link' placeholder='no link' />
                </Form.Group>
            
                <Form.TextArea label='Question' placeholder='Questomer question...' />
                <Form.TextArea label='Draft' placeholder='Draft...' />
                <Form.Button>Submit</Form.Button>
            </Form>
        )
    }
}
export default DraftEditForm
