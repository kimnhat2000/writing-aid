import React from 'react'
import { Form, Button } from 'semantic-ui-react'

class DraftEditForm extends React.Component {
    state = {}

    render() {
        return (
            <Form>
                <Form.Group widths='equal'>
                    <Form.Input fluid label="Created on" placeholder='no create date' />
                    <Form.Input fluid label="Customer's name" placeholder='no customer name' />
                    <Form.Input fluid label='Link' placeholder='no link' />
                </Form.Group>
            
                <Form.TextArea label='Question' placeholder='Questomer question...' />
                <Form.TextArea style={{minHeight: 300 }} label='Draft' placeholder='Draft...' />
                <Button.Group>
                    <Button>Cancel</Button>
                    <Button.Or />
                    <Button positive>OK</Button>
                </Button.Group> 
            </Form>
        )
    }
}
export default DraftEditForm
