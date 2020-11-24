import React from 'react';
import { withRouter } from 'react-router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome, faNewspaper, faUser, faPager } from '@fortawesome/free-solid-svg-icons';
import '../../sidebar.scss';
import { Link } from 'react-router-dom'

class SidebarElement extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    componentDidMount() {
        this.initActive();
    }

    initActive() {
        const selectors = document.querySelectorAll('.nav-link');
        if (selectors.length > 0) {
            selectors.forEach(s => {
                if(s.pathname === this.props.location.pathname) {
                    s.classList.add('active');
                } else {
                    s.classList.remove('active');
                }
            })
        }
    }

    clickLink(event) {
        const selectors = document.querySelectorAll('.nav-link');
        if (selectors.length > 0) {
            selectors.forEach(s => s.classList.remove('active'))
        }
        event.target.classList.add('active');
    }

    render() {
        return (
            <nav className="col-md-1 d-none d-md-block bg-light sidebar">
                <div className="sidebar-sticky">
                    <ul className="nav flex-column">
                        <li className="nav-item">
                            <Link className='nav-link active' onClick={e => this.clickLink(e)} to="/"><FontAwesomeIcon className="mr-2" icon={faHome} />Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link className='nav-link' onClick={e => this.clickLink(e)} to="/services"><FontAwesomeIcon className="mr-2" icon={faUser} />Dịch vụ</Link>
                        </li>
                        <li className="nav-item">
                            <Link className='nav-link' onClick={e => this.clickLink(e)} to="/projects"><FontAwesomeIcon className="mr-2" icon={faPager} />Dự án</Link>
                        </li>
                        <li className="nav-item">
                            <Link className='nav-link' onClick={e => this.clickLink(e)} to="/news"><FontAwesomeIcon className="mr-2" icon={faNewspaper} />Tin tức</Link>
                        </li>
                    </ul>
                </div>
            </nav>
        )
    }
}

export default withRouter(SidebarElement);

