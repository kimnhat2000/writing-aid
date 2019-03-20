import React from 'react'
import { Segment, Header, Container, Icon, Popup } from 'semantic-ui-react'
import copy from 'copy-to-clipboard'

class Drafts extends React.Component {
  constructor (props) {
    const today = new Date()
    console.log(
      today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate()
    )
    super(props)
    this.state = {
      drafts: this.props.drafts,
      openDraftForm: this.props.openDraftForm
    }
  }

  showDraft = draftId => {
    const drafts = this.state.drafts.map(draft => draft.draftId === draftId ? { ...draft, openDraft: !draft.openDraft, draftClick: !draft.draftClick } : draft)
    this.setState({drafts, openDraftForm: false})
  }

  onDraftClick = draft => {
    const drafts = this.state.drafts.map(data =>
      data.draftId === draft.draftId
        ? { ...data, draftClick: true }
        : { ...data, draftClick: false }
    )
    this.setState({ drafts, openDraftForm: false }, () => {
      console.log(draft.draftClick)
    })
    copy(draft.draftContent)
  }

  onEditDraft = draft => {
    this.props.editDraftButtonClick()
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
    const { drafts, openDraftForm } = this.state
    const draftRender = drafts && drafts.map((draft, index) => (
      <Segment key={index} className='title'>
          <Header as='h4' dividing>
            <Icon name='firstdraft' />
            <Header.Content onClick={()=>this.showDraft(draft.draftId)}>
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
          {draft.openDraft&&
          <Popup
          trigger={<p onClick={() => this.onDraftClick(draft)}>
            {draft.draftContent} {index + 1} / {drafts.length}
          </p>}
          content='copied'
          on='click'
          hideOnScroll
          />
}
        {draft.draftClick && (
          <Container>
            <Popup
              trigger={<Icon name='check' color='green' />}
              content='draft copied'
            />
            <Popup
              trigger={
                <Icon
                  name='edit'
                  color={openDraftForm ? 'grey' : 'blue'}
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
