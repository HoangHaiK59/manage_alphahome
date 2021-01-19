import React from 'react';
import { withRouter } from 'react-router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome, faNewspaper, faUser, faPager, faAd } from '@fortawesome/free-solid-svg-icons';
import '../../sidebar.scss';
import { Link } from 'react-router-dom'
import './sidebar.scss';
class SidebarElement extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }

    }

    componentDidMount() {
        this.initActive();
    }

    shouldComponentUpdate(prevProps, prevState) {
        return true;
    }

    initActive() {
        this.timeout = setTimeout(() => {
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
        }, 200)
    }

    componentWillUnmount() {
        clearTimeout(this.timeout);
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
            this.props.userContext ? <nav className="col-md-2 d-none d-md-block bg-28303b sidebar shadow">
                <div className="sidebar-sticky">
                    <header className="avatar">
                        <img alt="" src={process.env.PUBLIC_URL + '/user.jpg'} />
                        <h4>{this.props.userContext.currentUserValue.firstName + ' ' + this.props.userContext.currentUserValue.lastName}</h4>
                        <button className="btn btn-link" onClick={this.props.logout}>Logout</button>
                    </header>
                    <ul className="nav flex-column">
                        <li className="nav-item">
                            <Link className='nav-link' onClick={e => this.clickLink(e)} to="/"><FontAwesomeIcon className="mr-2" icon={faHome} />Home</Link>
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
                        <li className="nav-item">
                            <Link className='nav-link' onClick={e => this.clickLink(e)} to="/ads"><FontAwesomeIcon className="mr-2" icon={faAd} />Quảng cáo</Link>
                        </li>
                    </ul>
                </div>
            </nav>: null
        )
    }
}

export default withRouter(SidebarElement);

