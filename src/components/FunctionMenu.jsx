import React from 'react'
import { Input, Menu, Dropdown } from 'semantic-ui-react'


const FunctionMenu = ({ activeItem, menuItem }) => {

    const handleItemClick = (e, { name }) => {activeItem(name)}

    const dropdown = menuItem && menuItem.map((item, index) => (
        <Dropdown.Item key={index} name={item} onClick={handleItemClick}>{item}</Dropdown.Item>
    ))
    return (
        <Menu secondary stackable>
            <Dropdown item icon='wrench'>
                <Dropdown.Menu>
                    {dropdown}
                </Dropdown.Menu>
            </Dropdown>
            <Menu.Menu position='right'>
                <Menu.Item>
                    <Input icon='search' placeholder='Search...' />
                </Menu.Item>
            </Menu.Menu>
        </Menu>
        
    )
}

export default FunctionMenu;