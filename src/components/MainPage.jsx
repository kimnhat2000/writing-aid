import React from 'react'
import { Container, Header, Grid, Icon, Segment } from 'semantic-ui-react'
import copy from 'copy-to-clipboard'

import { dummyData, mainDropdownMenu } from './tools'
import AvailableOptions from './Title'
import TextEditor from './TextEditor'
import AppForm from './Form'
import FunctionMenu from './FunctionMenu'
import QuestionRender from './Question'

import Test from './Test'

class WritingAidMain extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      data: dummyData,
      dataRenderedAfterSearch: [],
      onConfirmShow: false,
      onDeleteTitleShow: false,
      onConfirm: false,
      onFormOpen: false,
      activeComponent: 'Responses',
      mainMenuItem: mainDropdownMenu,
      questionExpansion: false,
      timerClick: false,
      optionToEdit: {}
    }
  }

  onTitleClick = id => {
    const { dataRenderedAfterSearch } = this.state
    const data = this.state.data.map(item =>
      item.id === id ? { ...item, collapse: !item.collapse } : item
    )
    const dataChangeAfterSearch =
      dataRenderedAfterSearch.length >= 1 &&
      dataRenderedAfterSearch.map(item =>
        item.id === id ? { ...item, collapse: !item.collapse } : item
      )
    this.setState({ data, dataRenderedAfterSearch: dataChangeAfterSearch })
  }

  handleDeleteTitleConfirm = titleId => {
    const data = this.state.data.filter(item => item.id !== titleId)
    const dataRenderedAfterSearch =
      this.state.dataRenderedAfterSearch.length >= 1 &&
      this.state.dataRenderedAfterSearch.filter(item => item.id !== titleId)
    this.setState({ data, onDeleteTitleShow: false, dataRenderedAfterSearch })
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
    const searchedTitle = data.filter(item => item.id === i)[0]
    const dataRenderedAfterSearch =
      this.state.dataRenderedAfterSearch.length >= 1 &&
      this.state.dataRenderedAfterSearch.map(item =>
        item.id === searchedTitle.id ? searchedTitle : item
      )
    copy(d.option)
    this.setState({ data, onFormOpen: false, dataRenderedAfterSearch })
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
        optionToEdit: {
          ...optionToEdit[0],
          title: filterTitleContentsOption[0].title,
          possibleMatch: filterTitleContentsOption[0].possibleMatch,
          titleId
        }
      },
      () => console.log('possible match: ', this.state.optionToEdit)
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
    const searchedTitle = data.filter(item => item.id === change.titleId)[0]
    const dataRenderedAfterSearch =
      this.state.dataRenderedAfterSearch.length >= 1 &&
      this.state.dataRenderedAfterSearch.map(item =>
        item.id === searchedTitle.id ? searchedTitle : item
      )
    this.setState({ data, onFormOpen: false, dataRenderedAfterSearch })
  }

  handleConfirm = (option, titleId) => {
    const data = this.state.data.map(item =>
      item.id === titleId
        ? {
          ...item,
          possibleAnswers: item.possibleAnswers.filter(i => i.id !== option)
        }
        : item
    )
    const searchedTitle = data.filter(item => item.id === titleId)[0]
    const dataRenderedAfterSearch =
      this.state.dataRenderedAfterSearch.length >= 1 &&
      this.state.dataRenderedAfterSearch.map(item =>
        item.id === searchedTitle.id ? searchedTitle : item
      )

    this.setState({
      data,
      onConfirmShow: false,
      onDeleteTitleShow: false,
      dataRenderedAfterSearch
    })
  }

  actionAfterSearchData = foundData => {
    this.setState({ dataRenderedAfterSearch: foundData })
    console.log(foundData)
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
      dataRenderedAfterSearch
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
                    data: data.map(data => ({ ...data, collapse: true })),
                    dataRenderedAfterSearch: dataRenderedAfterSearch.map(
                      data => ({ ...data, collapse: true })
                    )
                  })
                }
                collapseTitles={() =>
                  this.setState({
                    data: data.map(data => ({ ...data, collapse: false })),
                    dataRenderedAfterSearch: dataRenderedAfterSearch.map(
                      data => ({
                        ...data,
                        collapse: false
                      })
                    )
                  })
                }
                addTitles={() =>
                  this.setState({ onFormOpen: true, optionToEdit: {} })
                }
                searchData={data}
                foundDataBeingSentBack={this.actionAfterSearchData}
              />

              {activeComponent === 'Public' && <Test />}
              
              {activeComponent === 'Responses' &&
              <AvailableOptions
                data={
                  dataRenderedAfterSearch.length >= 1
                    ? dataRenderedAfterSearch
                    : data
                }
                onOptionClick={this.onOptionClick}
                onTitleClick={this.onTitleClick}
                onDeleteTitleClick={() =>
                  this.setState({ onDeleteTitleShow: true })
                }
                onEditOptionButtonClick={this.onEditOptionButtonClick}
                editOptionButtonStatus={onFormOpen}
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
              />}
            </Segment>
            <QuestionRender
              questionExpansionClick={() =>
                this.setState({ questionExpansion: !questionExpansion })
              }
              questionExpansion={questionExpansion}
            />
          </Grid.Column>
          <Grid.Column width={10}>
            {onFormOpen ? (
              <AppForm
                onFormOpen={() => this.setState({ onFormOpen: false })}
                onAddtitle={newTitle =>
                  this.setState({ data: [newTitle, ...data] }, () =>
                    console.log(data)
                  )
                }
                optionToEdit={optionToEdit}
                editChange={this.editChange}
              />
            ) : (
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
