import React from 'react'
import { Container, Header, Grid, Icon, Segment } from 'semantic-ui-react'
import copy from 'copy-to-clipboard'
import uuid from 'uuid'

import {
  dummyData,
  dummyDraftData,
  dummyTemplateData,
  dummyDraftDataDefault
} from './tools'
import Responses from './Responses'
import TextEditor from './TextEditor'
import AppForm from './Form'
import FunctionMenu from './FunctionMenu'
import QuestionRender from './Question'
import Drafts from './Drafts'
import DraftEditForm from './DraftEditForm'
import Templates from './Templates'
import Statistic from './Statistic'

import Test from './Test'

const today = new Date()
const createdAt =
  today.getFullYear() +
  '-' +
  (today.getMonth() + 1) +
  '-' +
  today.getDate() +
  '/' +
  today.getHours() +
  ':' +
  today.getMinutes()

class WritingAidMain extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      data: dummyData,
      onConfirmShow: false,
      onDeleteTitleShow: false,
      onConfirm: false,
      onFormOpen: false,
      activeComponent: 'drafts',
      optionToEdit: {},
      showTextEditor: true,
      drafts: dummyDraftData,
      openDraftForm: false,
      titleToAddOptionTo: {},
      draftToEdit: {},
      templatesData: dummyTemplateData,
      draftInfo: {},
      questionInfo: {}
    }
  }

  onTitleClick = id => {
    const data = this.state.data.map(title =>
      title.id === id ? { ...title, collapse: !title.collapse } : title
    )
    this.setState({ data })
  }

  addOptionToTitleClick = title => {
    const { onFormOpen } = this.state
    this.setState({
      onFormOpen: !onFormOpen,
      showTextEditor: !!onFormOpen,
      optionToEdit: {}
    })
    const titleToAddOptionTo = { ...title, possibleAnswers: [] }
    this.setState({ titleToAddOptionTo })
  }

  onAddOptionToTitle = option => {
    const data = this.state.data.map(title =>
      title.id === option.id
        ? {
          ...title,
          possibleAnswers: [option.possibleAnswers, ...title.possibleAnswers],
          collapse: true
        }
        : title
    )
    this.setState({ data, onFormOpen: false, showTextEditor: true })
  }

  handleDeleteTitleConfirm = titleId => {
    const data = this.state.data.filter(item => item.id !== titleId)
    this.setState({ data, onDeleteTitleShow: false })
  }

  onOptionClick = (d, i) => {
    const data = this.state.data.map(item =>
      item.id === i
        ? {
          ...item,
          possibleAnswers: item.possibleAnswers.map(i =>
            i.id === d.id
              ? { ...i, selected: !i.selected }
              : { ...i, selected: false }
          )
        }
        : {
          ...item,
          possibleAnswers: item.possibleAnswers.map(unit => ({
            ...unit,
            selected: false
          }))
        }
    )
    copy(d.option)
    this.setState({
      data,
      onFormOpen: false,
      showTextEditor: true,
      openDraftForm: false
    })
  }

  onEditOptionButtonClick = (option, titleId) => {
    const { data, onFormOpen } = this.state
    const filterTitleContentsOption = data.filter(title => title.id === titleId)
    const optionToEdit = filterTitleContentsOption[0].possibleAnswers.filter(
      option => option.selected === true
    )
    this.setState({
      onFormOpen: !onFormOpen,
      showTextEditor: onFormOpen,
      titleToAddOptionTo: {},
      openDraftForm: onFormOpen && false,
      optionToEdit: {
        ...optionToEdit[0],
        title: filterTitleContentsOption[0].title,
        possibleMatch: filterTitleContentsOption[0].possibleMatch,
        titleId
      }
    })
  }

  editChange = change => {
    const data = this.state.data.map(item =>
      item.id === change.titleId
        ? {
          ...item,
          title: change.title,
          possibleMatch: change.possibleMatch,
          possibleAnswers: [
            ...item.possibleAnswers.map(option =>
              option.id === change.possibleAnswers.id
                ? {
                  ...option,
                  option: change.possibleAnswers.option,
                  selected: false,
                  iconClicked: false
                }
                : option
            )
          ]
        }
        : item
    )
    this.setState({
      data,
      onFormOpen: false,
      showTextEditor: true,
      openDraftForm: false
    })
  }

  editDraftButtonClick = draft => {
    this.setState({
      onFormOpen: false,
      showTextEditor: this.state.openDraftForm,
      openDraftForm: !this.state.openDraftForm,
      draftToEdit: draft
    })
  }

  handleConfirm = (optionId, titleId) => {
    const data = this.state.data.map(item =>
      item.id === titleId
        ? {
          ...item,
          possibleAnswers: item.possibleAnswers.filter(
            i => i.id !== optionId
          )
        }
        : item
    )
    this.setState({
      data,
      onConfirmShow: false,
      onDeleteTitleShow: false,
      onFormOpen: false
    })
  }

  editedDraft = newDraft => {
    const drafts =
      this.state.drafts &&
      this.state.drafts.map(draft =>
        draft.draftId === newDraft.draftId
          ? { ...draft, draftContent: newDraft.content }
          : draft
      )
    this.setState({
      drafts,
      onFormOpen: false,
      showTextEditor: true,
      openDraftForm: false
    })
  }

  addTextToDraft = (writingTime, draftContent) => {
    const draftInfo = {
      ...dummyDraftDataDefault,
      ...this.state.questionInfo,
      writingTime,
      draftContent,
      createdAt,
      draftId: uuid()
    }
    const drafts = [draftInfo, ...this.state.drafts]
    this.setState({ drafts })
  }

  render () {
    const {
      data,
      onConfirmShow,
      onDeleteTitleShow,
      onFormOpen,
      activeComponent,
      optionToEdit,
      drafts,
      openDraftForm,
      showTextEditor,
      titleToAddOptionTo,
      draftToEdit,
      templatesData
    } = this.state
    return (
      <Container>
        <Header as='h2' dividing>
          <Icon name='write' />
          <Header.Content>CS: GO</Header.Content>
        </Header>
        <Grid columns='equal'>
          <Grid.Column>
            <Segment>
              <FunctionMenu
                activeComponent={name =>
                  this.setState({ activeComponent: name })
                }
                shownComponentName={this.state.activeComponent}
                expandTitles={() =>
                  this.setState({
                    data: data.map(data => ({ ...data, collapse: true }))
                  })
                }
                collapseTitles={() =>
                  this.setState({
                    data: data.map(data => ({ ...data, collapse: false }))
                  })
                }
                addTitles={() =>
                  this.setState({
                    onFormOpen: true,
                    showTextEditor: false,
                    openDraftForm: false,
                    optionToEdit: {}
                  })
                }
                searchData={data}
                expandDrafts={() =>
                  this.setState({
                    showTextEditor: true,
                    onFormOpen: false,
                    openDraftForm: false,
                    drafts: drafts.map(draft => ({
                      ...draft,
                      openDraft: true,
                      draftClick: false,
                      question: { ...draft.question, open: true }
                    }))
                  })
                }
                collapseDrafts={() =>
                  this.setState({
                    showTextEditor: true,
                    onFormOpen: false,
                    openDraftForm: false,
                    drafts: drafts.map(draft => ({
                      ...draft,
                      openDraft: false,
                      draftClick: false,
                      question: { ...draft.question, open: false }
                    }))
                  })
                }
              />

              {activeComponent === 'public' && <Test />}

              {activeComponent === 'responses' && (
                <Responses
                  data={data}
                  onTitleClick={title => this.onTitleClick(title)}
                  clickOnAddOptionToTitle={titleToAddOptionTo =>
                    this.addOptionToTitleClick(titleToAddOptionTo)
                  }
                  onOptionClick={this.onOptionClick}
                  onEditOptionButtonClick={this.onEditOptionButtonClick}
                  onDeleteOptionButtonClick={() =>
                    this.setState({ onConfirmShow: true })
                  }
                  onConfirmShow={onConfirmShow}
                  cancelButton={() =>
                    this.setState({
                      onConfirmShow: false,
                      onDeleteTitleShow: false
                    })
                  }
                  confirmButton={this.handleConfirm}
                  onDeleteTitleShow={onDeleteTitleShow}
                  handleDeleteTitleConfirm={this.handleDeleteTitleConfirm}
                  onDeleteTitleClick={() =>
                    this.setState({ onDeleteTitleShow: true })
                  }
                />
              )}

              {activeComponent === 'drafts' && (
                <Drafts
                  drafts={drafts}
                  openDraftForm={openDraftForm}
                  editDraftButtonClick={this.editDraftButtonClick}
                  deleteOptionButtonClick={() =>
                    this.setState({ onConfirmShow: true })
                  }
                  deleteDraftButtonConfirm={drafts => {
                    this.setState({
                      drafts,
                      onConfirmShow: false,
                      onFormOpen: false,
                      showTextEditor: true,
                      openDraftForm: false
                    })
                  }}
                  cancelButton={() => this.setState({ onConfirmShow: false })}
                  onConfirmShow={onConfirmShow}
                  onShowDrafts={drafts =>
                    this.setState({
                      drafts,
                      onFormOpen: false,
                      showTextEditor: true,
                      openDraftForm: false
                    })
                  }
                  onDraftClick={drafts =>
                    this.setState({
                      drafts,
                      onFormOpen: false,
                      showTextEditor: true,
                      openDraftForm: false
                    })
                  }
                  onOpenQuestion={drafts => this.setState({ drafts })}
                />
              )}

              {activeComponent === 'templates' && (
                <Templates templatesData={templatesData} />
              )}

              {activeComponent === 'statistic' && (
                <Statistic/>
              )}
            </Segment>
            <QuestionRender
              questionInfo={questionInfo => this.setState({ questionInfo })}
            />
          </Grid.Column>
          <Grid.Column width={10}>
            {onFormOpen && (
              <AppForm
                onFormClose={() =>
                  this.setState({
                    onFormOpen: false,
                    showTextEditor: true,
                    openDraftForm: false
                  })
                }
                onAddtitle={newTitle =>
                  this.setState({
                    data: [{ ...newTitle, collapse: true }, ...data]
                  })
                }
                optionToEdit={optionToEdit}
                titleToAddOptionTo={titleToAddOptionTo}
                onAddOptionToTitle={this.onAddOptionToTitle}
                editChange={this.editChange}
              />
            )}

            {openDraftForm && (
              <DraftEditForm
                draftToEdit={draftToEdit}
                closeForm={() =>
                  this.setState({
                    openDraftForm: false,
                    showTextEditor: true,
                    onFormOpen: false
                  })
                }
                editedDraft={this.editedDraft}
              />
            )}

            {showTextEditor && (
              <TextEditor
                senToDraft={() => this.sendTextToDraft}
                addTextToDraft={(writingTime, draftContent) =>
                  this.addTextToDraft(writingTime, draftContent)
                }
              />
            )}
          </Grid.Column>
        </Grid>
      </Container>
    )
  }
}

export default WritingAidMain
