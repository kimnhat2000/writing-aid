import React from 'react'
import {
  Segment,
  Header,
  Container,
  Icon,
  Popup,
  Confirm
} from 'semantic-ui-react'
import copy from 'copy-to-clipboard'

class Drafts extends React.Component {
  constructor (props) {
    const today = new Date()
    console.log(
      today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate()
    )
    super(props)
    this.state = {
      drafts: this.props.drafts
    }
  }

  showDrafts = draftId => {
    const drafts = this.props.drafts.map(draft =>
      draft.draftId === draftId
        ? {
          ...draft,
          openDraft: !draft.openDraft,
          draftClick: !draft.draftClick
        }
        : draft
    )
    this.props.onShowDrafts(drafts)
  }

  onDraftClick = draft => {
    const drafts = this.props.drafts.map(data =>
      data.draftId === draft.draftId
        ? { ...data, draftClick: true }
        : { ...data, draftClick: false }
    )
    this.props.onDraftClick(drafts)
    copy(draft.draftContent)
  }

  onEditDraftClick = draftId => {
    this.props.editDraftButtonClick()
  }

  onDeleteDraft = draftId => {
    const drafts =
      this.props.drafts &&
      this.props.drafts.filter(draft => draft.draftId !== draftId)
    this.props.deleteDraftButtonConfirm(drafts)
  }

  openQuestion = draftId => {
    const drafts = this.props.drafts.map(draft =>
      draft.draftId === draftId
        ? {
          ...draft,
          question: { ...draft.question, open: !draft.question.open }
        }
        : draft
    )
    this.props.onOpenQuestion(drafts)
  }

  render () {
    const {
      cancelButton,
      onConfirmShow,
      deleteOptionButtonClick,
      drafts
    } = this.props
    const draftRender =
      drafts &&
      drafts.map((draft, index) => (
        <Segment key={index} className='title'>
          <Header as='h4' dividing>
            <Icon name='firstdraft' />
            <Header.Content onClick={() => this.showDrafts(draft.draftId)}>
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
              <Header.Subheader>Written in {draft.writingTime}</Header.Subheader>
            </Header.Content>
            <p onClick={() => this.openQuestion(draft.draftId)}>
              {draft.question.open ? (
                <span>{draft.question.questionContent}</span>
              ) : (
                <Icon name='question' />
              )}
            </p>
          </Header>
          {draft.openDraft && (
            <Popup
              trigger={
                <p onClick={() => this.onDraftClick(draft)}>
                  {draft.draftContent} {index + 1} / {drafts.length}
                </p>
              }
              content='copied'
              on='click'
              hideOnScroll
            />
          )}
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
                    color={this.props.openDraftForm ? 'grey' : 'blue'}
                    onClick={() => this.onEditDraftClick(draft)}
                  />
                }
                content='edit this draft'
              />
              <Popup
                trigger={
                  <Icon
                    name='delete'
                    color='red'
                    onClick={deleteOptionButtonClick}
                  />
                }
                content='delete this draft'
              />
              {onConfirmShow && (
                <Confirm
                  open={onConfirmShow}
                  content='are you sure you want to delete this item?'
                  cancelButton='Never mind'
                  confirmButton="Let's do it"
                  onCancel={() => cancelButton()}
                  onConfirm={() => this.onDeleteDraft(draft.draftId)}
                />
              )}
            </Container>
          )}
        </Segment>
      ))
    return <Container>{draftRender}</Container>
  }
}

export default Drafts
