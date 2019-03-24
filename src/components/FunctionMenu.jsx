import React from 'react'
import { Menu, Dropdown, Icon, Input } from 'semantic-ui-react'
import { mainDropdownMenu } from './tools'

const FunctionMenu = ({
  activeComponent,
  shownComponentName,
  expandTitles,
  collapseTitles,
  addTitles,
  expandDrafts,
  collapseDrafts
}) => {

  return (
    <Menu secondary stackable>

      <Menu.Menu>
        <Dropdown item icon='list'>
          <Dropdown.Menu>
            {mainDropdownMenu.map(item => (
              <Dropdown.Item
                key={item.value}
                {...item}
                onClick={() => activeComponent(item.key)}
              />
            ))}
          </Dropdown.Menu>
        </Dropdown>
      </Menu.Menu>

      <Menu.Menu>
        {shownComponentName === 'responses' && (
          <Dropdown item text={shownComponentName}>
            <Dropdown.Menu>
              <Dropdown.Item onClick={() => addTitles()}>
                <Icon name='add' />
                Add a title
              </Dropdown.Item>
              <Dropdown.Item>
                <Input
                  icon={{ name: 'search', circular: true, link: true }}
                  placeholder='Search...'
                  onClick={event => event.stopPropagation()}
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
        {shownComponentName === 'drafts' && (
          <Dropdown item text={shownComponentName}>
            <Dropdown.Menu>
              <Dropdown.Item>
                <Input
                  icon={{ name: 'search', circular: true, link: true }}
                  placeholder='Search...'
                  onClick={event => event.stopPropagation()}
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
        {shownComponentName === 'templates' && (
          <Dropdown item text={shownComponentName}>
            <Dropdown.Menu>
              <Dropdown.Item>
                <Icon name='add' />
                Add a template
              </Dropdown.Item>
              <Dropdown.Item>
                <Input
                  icon={{ name: 'search', circular: true, link: true }}
                  placeholder='Search...'
                  onClick={event => event.stopPropagation()}
                />
              </Dropdown.Item>
              <Dropdown.Item>
                <Icon name='sort amount down' />
                Expand all templates
              </Dropdown.Item>
              <Dropdown.Item>
                <Icon name='sort amount up' />
                Collapse all templates
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        )}
      </Menu.Menu>
    </Menu>
  )
}

export default FunctionMenu
