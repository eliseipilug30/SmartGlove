import React from 'react'
import logo from './commons/images/icon.png';

import {
    Button,
    DropdownItem,
    DropdownMenu,
    DropdownToggle,
    Nav,
    Navbar,
    NavbarBrand,
    NavLink,
    UncontrolledDropdown
} from 'reactstrap';

const textStyle = {
    color: 'white',
    textDecoration: 'none'
};

function NavigationBar({isLoggedIn, currentRole, logout}) {
    return (
        <div>
            <Navbar color="dark" light expand="md">
                <NavbarBrand href="/">
                    <img src={logo} width={"50"}
                         height={"35"}/>
                </NavbarBrand>
                <Nav className="mr-auto" navbar>
                    {!isLoggedIn && <Button color="success" href="/login">Login</Button>}
                    {isLoggedIn && <Button color="danger" href="/" onClick={logout}>Logout</Button>}

                    {isLoggedIn &&
                    <UncontrolledDropdown nav inNavbar>
                        <DropdownToggle style={textStyle} nav caret>
                            Menu
                        </DropdownToggle>
                        <DropdownMenu right>

                            <DropdownItem>
                                <NavLink href="/profile">Personal page</NavLink>
                            </DropdownItem>

                        </DropdownMenu>
                    </UncontrolledDropdown>}
                </Nav>
            </Navbar>
        </div>
    );
}

export default NavigationBar
