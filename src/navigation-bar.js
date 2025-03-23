import React from 'react'
import logo from './commons/images/icon.png';

import {
    //Button,
    //DropdownItem,
    DropdownMenu,
    DropdownToggle,
    Nav,
    Navbar,
    NavbarBrand,
    //NavLink,
    UncontrolledDropdown
} from 'reactstrap';

const textStyle = {
    color: 'white',
    textDecoration: 'none',
    fontFamily: "Merriweather",
};

const textStyleButton = {
    color: 'black',
    textDecoration: 'none',
    fontFamily: "Merriweather",
};


function NavigationBar({ connectToHM10, disconnectFromHM10 }) {
    return (
        <div>
            <Navbar color="dark" light expand="md">
                <NavbarBrand href="/">
                    <img src={logo} width={"50"}
                         height={"35"} alt={"logo"}/>
                </NavbarBrand>
                <Nav className="mr-auto" navbar>

                    <UncontrolledDropdown nav inNavbar>
                        <DropdownToggle style={textStyle} nav caret>
                            Menu
                        </DropdownToggle>
                        <DropdownMenu right>
                            <button style={textStyleButton} onClick={connectToHM10} className="dropdown-item">Connect device</button>
                            <button style={textStyleButton} onClick={disconnectFromHM10} className="dropdown-item">Disconnect</button>
                        </DropdownMenu>
                    </UncontrolledDropdown>
                </Nav>
            </Navbar>
        </div>
    );
}

export default NavigationBar
