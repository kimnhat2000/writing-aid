import React from 'react'
import { Button, Icon, Popup, Segment, Input, TextArea, Form } from 'semantic-ui-react'

const QuestionRender = ({ questionExpansion, questionExpansionClick }) => (
    questionExpansion ? 
    <Segment.Group>
        <Segment.Group horizontal>
            <Segment>
                <Input fluid placeholder="name..." size='mini'/>
            </Segment>
            <Segment>
                <Input fluid label='http://' placeholder="link..." size='mini'/>
            </Segment>
            <Segment>
                <Popup
                    trigger={
                        <Button floated='right' onClick={() => questionExpansionClick()} size='mini'>
                            <Icon name='arrow down' />
                        </Button>}
                    content='collapse'
                />
            </Segment>
        </Segment.Group>
        
        <Form>
            <TextArea placeholder='Question...' style={{ minHeight: 175 }} />
        </Form>
        
    </Segment.Group>
    :
    <Segment textAlign='right'>
        <Popup
            trigger={
                <Button onClick={() => questionExpansionClick()} size='mini'>
                    <Icon name='arrow up' />
                </Button>}
            content='open question'
        />
    </Segment>
)

export default QuestionRender;