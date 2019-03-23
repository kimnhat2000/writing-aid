import React from 'react'
import { Segment, Header, Icon, Container } from 'semantic-ui-react'
import copy from 'copy-to-clipboard'

const Templates = ({ templatesData }) => {

  const templateClick=template=>{
    copy(template.content)
  }

  const templates =
    templatesData &&
    templatesData.map((template, index) => (
      <Segment key={index} className='title'>
        <Header as='h4' dividing>
        <Icon name='theme'/>
          <Header.Content>{template.purpose}</Header.Content>
        </Header>
        <Container onClick={()=>templateClick(template)}>{template.content}</Container>
      </Segment>
    ))

  return (
    <Container className='container-overflow'>
      {templates}
    </Container>
  )
}

export default Templates
