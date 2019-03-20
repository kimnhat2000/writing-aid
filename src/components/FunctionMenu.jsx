import React from 'react'
import { Menu, Dropdown, Icon } from 'semantic-ui-react'
import MySearch from './Search'

const FunctionMenu = ({
  activeComponent,
  menuItems,
  shownComponentName,
  expandTitles,
  collapseTitles,
  addTitles,
  searchData,
  foundDataBeingSentBack,

  expandDrafts,
  collapseDrafts
}) => {
  const dropdown =
    menuItems &&
    menuItems.map((item, index) => (
      <Dropdown.Item key={index} onClick={() => activeComponent(item.name)}>
        <Icon name={item.icon} />
        {item.name}
      </Dropdown.Item>
    ))
  return (
    <Menu secondary stackable>
      <Dropdown item icon='list'>
        <Dropdown.Menu>{dropdown}</Dropdown.Menu>
      </Dropdown>

      <Menu.Menu>
        {shownComponentName === 'Responses' && (
          <Dropdown item text={shownComponentName}>
            <Dropdown.Menu>
              <Dropdown.Item onClick={() => addTitles()}>
                <Icon name='add' />
                Add a title
              </Dropdown.Item>
              <Dropdown.Item>
                <MySearch
                  searchData={searchData}
                  foundDataBeingSentBack={foundDataBeingSentBack}
                />
              </Dropdown.Item>
              <Dropdown.Item onClick={() => expandTitles()}>
                <Icon name='sort amount down' />
                Expand all tittles
              </Dropdown.Item>
              <Dropdown.Item onClick={() => collapseTitles()}>
                <Icon name='sort amount up' />
                Collapse all titles
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        )}
        {shownComponentName === 'Drafts' && (
          <Dropdown item text={shownComponentName}>
            <Dropdown.Menu>
              <Dropdown.Item>
                <MySearch
                  searchData={searchData}
                  foundDataBeingSentBack={foundDataBeingSentBack}
                />
              </Dropdown.Item>
              <Dropdown.Item onClick={() => expandDrafts()}>
                <Icon name='sort amount down' />
                Expand all drafts
              </Dropdown.Item>
              <Dropdown.Item onClick={() => collapseDrafts()}>
                <Icon name='sort amount up' />
                Collapse all drafts
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        )}
      </Menu.Menu>
    </Menu>
  )
}

export default FunctionMenu
