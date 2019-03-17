import React from 'react'
import { Input, Menu, Dropdown } from 'semantic-ui-react'


const FunctionMenu = ({ activeComponent, menuItems, shownComponentName }) => {

    const dropdown = menuItems && menuItems.map((item, index) => (
        <Dropdown.Item key={index} name={item} onClick={()=>activeComponent(item)}>{item}</Dropdown.Item>
    ))
    return (
        <Menu secondary stackable>
            <Dropdown item icon='list'>
                <Dropdown.Menu>
                    {dropdown}
                </Dropdown.Menu>
            </Dropdown>

            <Menu.Menu>
                <Menu.Item>
                    <p>{shownComponentName}</p>
                </Menu.Item>
            </Menu.Menu>

            <Menu.Menu position='right'>
                <Menu.Item>
                    <Input icon='search' placeholder='Search...' />
                </Menu.Item>
            </Menu.Menu>
        </Menu>  
    )
}

export default FunctionMenu;