import React from 'react';
import { withRouter } from 'react-router';
import { Nav } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome, faNewspaper, faUser, faPager } from '@fortawesome/free-solid-svg-icons';
import '../../sidebar.scss';

class SidebarElement extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }
    render() {
        return (
            <nav className="col-md-1 d-none d-md-block bg-light sidebar">
                <div className="sidebar-sticky">
                    <ul className="nav flex-column">
                        <li className="nav-item">
                            <a className='nav-link active' href="/"><FontAwesomeIcon className="mr-2" icon={faHome} />Home</a>
                        </li>
                        <li className="nav-item">
                            <a className='nav-link' href="/"><FontAwesomeIcon className="mr-2" icon={faUser} />Dịch vụ</a>
                        </li>
                        <li className="nav-item">
                            <a className='nav-link' href="/"><FontAwesomeIcon className="mr-2" icon={faPager} />Dự án</a>
                        </li>
                        <li className="nav-item">
                            <a className='nav-link' href="/"><FontAwesomeIcon className="mr-2" icon={faNewspaper} />Tin tức</a>
                        </li>
                    </ul>
                </div>
            </nav>
        )
    }
}

export default withRouter(SidebarElement);

