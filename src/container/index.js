import React from 'react';
import { Container, Row } from 'react-bootstrap';
import NavbarElement from '../components/navbar';
import { Route, Switch, withRouter } from 'react-router-dom';
import Services from '../components/contents/service';
import News from '../components/contents/news';
import Content from '../components/contents';
import FormService from '../components/contents/service/form';
import FormPost from '../components/contents/news/form';
import FormProject from '../components/contents/projects/form';
import SidebarElement from '../components/sidebar';
import  Projects from '../components/contents/projects';
import './container.scss';
import { authenticationService } from '../components/services';
import { PrivateRoute } from '../components/router';
import Login from '../components/users';
class ContainerElement extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentUser: null
        }
    }

    componentDidMount() {
        authenticationService.currentUser.subscribe(x => this.setState({currentUser: x}))
    }

    logout() {
        authenticationService.logout();
        this.props.history.push('/login');
    }

    render() {
        const { currentUser } = this.state;
        return (
            <Container fluid style={{minHeight: '100vh', paddingLeft:0 , paddingRight: 0}}>
                <NavbarElement currentUser={currentUser}/>
                <Container fluid className="main">
                    <Row>
                        <SidebarElement currentUser={currentUser} logout={this.logout.bind(this)}/>
                        <main className={currentUser ? "col-md-10 col-lg-11 px-1 ml-sm-auto": "col-md-12 col-lg-12 p-0"}>
                            <Switch>
                                    <PrivateRoute exact path="/" render={(props) => <Content {...props} currentUser={currentUser} title="Home" />} />
                                    <PrivateRoute exact path="/services" render={(props) => <Services {...props} currentUser={currentUser} title="Services" />} />
                                    <PrivateRoute exact path="/projects" render={(props) => <Projects {...props} currentUser={currentUser} title="Projects" />} />
                                    <PrivateRoute exact path="/services/new-post" render={(props) => <FormService currentUser={currentUser} {...props} title="Add new post services" />
                                    } />
                                    <PrivateRoute exact path="/projects/new-post" render={(props) => <FormProject currentUser={currentUser} {...props} title="Add new project"  /> } />
                                    <PrivateRoute exact path="/news" render={(props) => <News {...props} currentUser={currentUser} title="Services" />} />
                                    <PrivateRoute exact path="/news/new-post" render={(props) => <FormPost currentUser={currentUser} {...props} title="Add new post" />} />
                                    <Route path='/login' component={Login} />
                            </Switch>
                        </main>
                    </Row>
                </Container>
            </Container>
        )
    }
}

export default withRouter(ContainerElement);