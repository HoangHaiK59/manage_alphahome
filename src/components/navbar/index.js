import { Navbar, Nav } from 'react-bootstrap';
const NavbarElement = (props) => {
    return (
        props.userContext.currentUser ? <Navbar collapseOnSelect expand bg="white" variant="light" fixed="top" className="shadow">
            <Navbar.Brand href="#home"><img alt="" src={process.env.PUBLIC_URL + '/favicon.ico'} /></Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" className="border-0"/>
            <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="mr-auto">
                <Nav.Item style={{minWidth: '20rem'}}>
                    <input className="form-control w-100 border-0" type="text" placeholder="Search" aria-label="search"/>
                </Nav.Item>
                {/* <NavDropdown title="Dropdown" id="collasible-nav-dropdown">
                    <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                    <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                    <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
                </NavDropdown> */}
                </Nav>
                <Nav>
                <Nav.Link href="#deets">More deets</Nav.Link>
                <Nav.Link eventKey={2} href="#memes">
                    Dank memes
                </Nav.Link>
                </Nav>
            </Navbar.Collapse>
        </Navbar>: null
    )
}

export default NavbarElement;