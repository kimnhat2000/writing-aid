import React from 'react'
import { Button, Icon } from 'semantic-ui-react'

const QuestionRender = () => 

    <Button animated='vertical' fluid>
        <Button.Content visible>Open Question</Button.Content>
        <Button.Content hidden>
            <Icon name='external square alternate' />
        </Button.Content>
    </Button>

export default QuestionRender