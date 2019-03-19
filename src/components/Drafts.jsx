import React from 'react'
import { Segment, Header, Container } from 'semantic-ui-react'

import { dummyDraftData } from './tools'

class Drafts extends React.Component {
  constructor (props) {
    const today = new Date()
    console.log(
      today.getFullYear() +
        '-' +
        (today.getMonth() + 1) +
        '-' +
        today.getDate(),
      dummyDraftData
    )
    super(props)
    this.state = {
      drafts: dummyDraftData
    }
  }

  render () {
    const { drafts } = this.state
    const draftRender =
      drafts &&
      drafts.map((draft, index) => (
        <Segment key={index}>
          <Header as='h3' dividing>
            {draft.customer}
            <Header.Subheader>
                      <a href={`https://${draft.link}`}>{draft.link}</a>
            </Header.Subheader>
            <Header.Subheader>{draft.createdAt}</Header.Subheader>
          </Header>
          {draft.drafts.map((item, index) => (
            <div key={index}>{item.content}</div>
          ))}
        </Segment>
      ))
    return <Container>{draftRender}</Container>
  }
}

export default Drafts
