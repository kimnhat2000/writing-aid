import React from 'react'
import { Segment, Header, Container, Icon, Popup } from 'semantic-ui-react'
import copy from 'copy-to-clipboard'

import { dummyDraftData } from './tools'

class Drafts extends React.Component {
  constructor (props) {
    const today = new Date()
    console.log(
      today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate()
    )
    super(props)
    this.state = {
      drafts: dummyDraftData,
      openForm: false
    }
  }

  onDraftClick = draft => {
    const drafts = this.state.drafts.map(data =>
      data.draftId === draft.draftId
        ? { ...data, contentClick: true }
        : { ...data, contentClick: false }
    )
    this.setState({ drafts, openForm: false }, () => {
      console.log(draft.contentClick)
    })
    copy(draft.draftContent)
  }

  onEditDraft = draft => {
    this.setState({openForm:!this.state.openForm})
  }

  openQuestion = draftId => {
    const drafts = this.state.drafts.map(draft =>
      draft.draftId === draftId
        ? {
          ...draft,
          question: { ...draft.question, open: !draft.question.open }
        }
        : draft
    )
    this.setState({ drafts })
  }

  render () {
    const { drafts, openForm } = this.state
    const draftRender = drafts.map((draft, index) => (
      <Segment key={index} className='title'>
          <Header as='h4' dividing>
            <Icon name='firstdraft' />
            <Header.Content>
              {draft.customer
                ? `Draft in response for ${draft.customer} question`
                : `no customer name`}
              <Header.Subheader>
                <a
                  href={`https://${draft.link}`}
                  rel='noopener noreferrer'
                  target='_blank'
                >
                  {draft.link}
                </a>
              </Header.Subheader>
              <Header.Subheader>{draft.createdAt}</Header.Subheader>
            </Header.Content>
            <p onClick={() => this.openQuestion(draft.draftId)}>
              {draft.question.open ? (
                <span>{draft.question.questionContent}</span>
              ) : (
                <Icon name='question' />
              )}
            </p>
          </Header>
          <p onClick={() => this.onDraftClick(draft)}>
            {draft.draftContent} {index + 1} / {dummyDraftData.length}
          </p>
        {draft.contentClick && (
          <Container>
            <Popup
              trigger={<Icon name='check' color='green' />}
              content='draft copied'
            />
            <Popup
              trigger={
                <Icon
                  name='edit'
                  color={openForm ? 'grey' : 'blue'}
                  onClick={()=>this.onEditDraft(draft)}
                />
              }
              content='edit this draft'
            />
            <Popup
              trigger={<Icon name='delete' color='red' />}
              content='delete this draft'
            />
          </Container>
        )}
      </Segment>
    ))
    return <Container>{draftRender}</Container>
  }
}

export default Drafts
