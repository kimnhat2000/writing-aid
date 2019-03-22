import React from 'react'
import { Container, Header, Grid, Icon, Segment } from 'semantic-ui-react'
import copy from 'copy-to-clipboard'

import { dummyData, mainDropdownMenu, dummyDraftData } from './tools'
import Responses from './Responses'
import TextEditor from './TextEditor'
import AppForm from './Form'
import FunctionMenu from './FunctionMenu'
import QuestionRender from './Question'
import Drafts from './Drafts'
import DraftEditForm from './DraftEditForm'

import Test from './Test'

class WritingAidMain extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      data: dummyData,
      onConfirmShow: false,
      onDeleteTitleShow: false,
      onConfirm: false,
      onFormOpen: false,
      activeComponent: 'Responses',
      mainMenuItem: mainDropdownMenu,
      questionExpansion: false,
      timerClick: false,
      optionToEdit: {},
      showTextEditor: true,
      drafts: dummyDraftData,
      openDraftForm: false,
      titleToAddOptionTo: {}
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
          possibleAnswers: [option.possibleAnswers, ...title.possibleAnswers], collapse: true

        }
        : title
    )
    console.log('added option: ', data[0])
    this.setState({ data, onFormOpen: false, showTextEditor: true })
  }

  handleDeleteTitleConfirm = titleId => {
    const data = this.state.data.filter(item => item.id !== titleId)
    this.setState({ data, onDeleteTitleShow: false })
  }

  onOptionClick = (d, i) => {
    console.log(this.state.data)
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
    this.setState(
      {
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
      },
      () => console.log('showTextEditor: ', this.state.showTextEditor)
    )
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
    console.log('clicked: ', optionId, 'titleID:', titleId, data)
    this.setState({
      data,
      onConfirmShow: false,
      onDeleteTitleShow: false,
      onFormOpen: false
    })
  }

  render () {
    const {
      data,
      onConfirmShow,
      onDeleteTitleShow,
      onFormOpen,
      activeComponent,
      mainMenuItem,
      timerClick,
      questionExpansion,
      optionToEdit,
      drafts,
      openDraftForm,
      showTextEditor,
      titleToAddOptionTo
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
                menuItems={mainMenuItem}
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

              {activeComponent === 'Public' && <DraftEditForm />}

              {activeComponent === 'Responses' && (
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

              {activeComponent === 'Drafts' && (
                <Drafts
                  drafts={drafts}
                  openDraftForm={openDraftForm}
                  editDraftButtonClick={() =>
                    this.setState({
                      onFormOpen: false,
                      showTextEditor: openDraftForm,
                      openDraftForm: !openDraftForm
                    })
                  }
                  deleteOptionButtonClick={() =>
                    this.setState({ onConfirmShow: true })
                  }
                  deleteDraftButtonConfirm={drafts => {
                    this.setState({ drafts, onConfirmShow: false })
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
            </Segment>
            <QuestionRender
              questionExpansionClick={() =>
                this.setState({ questionExpansion: !questionExpansion })
              }
              questionExpansion={questionExpansion}
            />
          </Grid.Column>
          <Grid.Column width={10}>
            {onFormOpen && (
              <AppForm
                onFormOpen={() =>
                  this.setState({
                    onFormOpen: false,
                    showTextEditor: true,
                    openDraftForm: false
                  })
                }
                onAddtitle={newTitle =>
                  this.setState({ data: [newTitle, ...data] }, () =>
                    console.log(data)
                  )
                }
                optionToEdit={optionToEdit}
                titleToAddOptionTo={titleToAddOptionTo}
                onAddOptionToTitle={this.onAddOptionToTitle}
                editChange={this.editChange}
              />
            )}

            {openDraftForm && <DraftEditForm />}

            {showTextEditor && (
              <TextEditor
                onTimerClick={() => this.setState({ timerClick: !timerClick })}
                startTimer={timerClick}
              />
            )}
          </Grid.Column>
        </Grid>
      </Container>
    )
  }
}

export default WritingAidMain
