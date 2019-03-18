import React from 'react'
import { Menu, Dropdown } from 'semantic-ui-react'

import MySearch from './Search'

const FunctionMenu = ({
  activeComponent,
  menuItems,
  shownComponentName,
  expandTitles,
  collapseTitles,
  addTitles,
  searchData,
  foundDataBeingSentBack
}) => {
  const dropdown =
    menuItems &&
    menuItems.map((item, index) => (
      <Dropdown.Item
        key={index}
        name={item}
        onClick={() => activeComponent(item)}
      >
        {item}
      </Dropdown.Item>
    ))
  return (
    <Menu secondary stackable>
      <Dropdown item icon='list'>
        <Dropdown.Menu>{dropdown}</Dropdown.Menu>
      </Dropdown>

      <Menu.Menu>
        {shownComponentName === 'Responses' ? (
          <Dropdown item text={shownComponentName}>
            <Dropdown.Menu>
              <Dropdown.Item onClick={() => addTitles()}>
                Add a title
              </Dropdown.Item>
              <Dropdown.Item>
                <MySearch
                  searchData={searchData}
                  foundDataBeingSentBack={foundDataBeingSentBack}
                />
              </Dropdown.Item>
              <Dropdown.Item onClick={() => expandTitles()}>
                Expand all tittles
              </Dropdown.Item>
              <Dropdown.Item onClick={() => collapseTitles()}>
                Collapse all titles
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        ) : (
          <Menu.Item>
            <h4>{shownComponentName}</h4>
          </Menu.Item>
        )}
      </Menu.Menu>
    </Menu>
  )
}

export default FunctionMenu
