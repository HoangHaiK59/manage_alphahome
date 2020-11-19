import React from 'react';
import { withRouter } from 'react-router';
import { Nav, Navbar } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import '../../sidebar.scss';

class SidebarElement extends React.Component {
    constructor(props) {
        super(props)
    }
    render() {
        return (
            <div id="sidebar-menu" className='sideBarMenuContainer'>
                <Navbar fluid className='sidebar' inverse >

                    <Navbar.Header>
                        <Navbar.Brand>
                            <a href="/">User Name</a>
                        </Navbar.Brand>
                        <Navbar.Toggle />
                    </Navbar.Header>

                    <Navbar.Collapse>
                        <Navbar.Text className='userMenu'>
                            <Navbar.Link href="#"><FontAwesomeIcon icon={faPlus}/></Navbar.Link>
                            <Navbar.Link href="#"><FontAwesomeIcon icon={faPlus}/></Navbar.Link>
                        </Navbar.Text>
                        <Nav>
                            {/* <NavItem eventKey={2}>Item 2</NavItem>
                            <NavItem eventKey={3}>Item 3</NavItem> */}
                        </Nav>
                    </Navbar.Collapse>

                </Navbar>
            </div>
        )
    }
}

export default withRouter(SidebarElement);

