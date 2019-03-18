import React, { Component } from 'react'
import { Input } from 'semantic-ui-react'

export default class MySearch extends Component {
  constructor (props) {
    super(props)
    this.state = {
      searchWord: ''
    }
  }
  onSearch = event => {
    const { searchData, foundDataBeingSentBack } = this.props
    const searchWord = event.target.value
    this.setState({ searchWord })
    const foundData = searchData.filter(
      data =>
        data.possibleMatch
          .map(item => item.value)
          .toString()
          .concat(data.title)
          .toLowerCase()
          .search(searchWord && searchWord.toLowerCase()) !== -1
    )
    foundDataBeingSentBack(foundData)
  }

  render () {
    const { searchWord } = this.props
    return (
      <Input
        size='mini'
        icon='search'
        placeholder='Search...'
        value={searchWord}
        onChange={this.onSearch}
        onClick={event => event.stopPropagation()}
      />
    )
  }
}
