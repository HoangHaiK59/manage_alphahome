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
import FormEditService from '../components/contents/service/form-edit';
class ContainerElement extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentUser: null
        }
    }

    componentDidMount() {
        authenticationService.currentUser.subscribe(x => {
            this.setState({currentUser: x})
        })
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
                        <main className={currentUser ? "col-md-10 col-lg-10 px-1 ml-sm-auto": "col-md-12 col-lg-12 p-0"}>
                            <Switch>
                                    <PrivateRoute exact path="/" component={Content} title="Home" />
                                    <PrivateRoute exact path="/services" component={Services}title="Services" />
                                    <PrivateRoute exact path="/projects" component={Projects} title="Projects" />
                                    <PrivateRoute exact path="/services/new-post" component={FormService} title="Add new post services" />
                                    <PrivateRoute exact path="/services/edit-post/:id" component={FormEditService} title="Edit service" />
                                    <PrivateRoute exact path="/projects/new-post" component={FormProject} title="Add new project" />
                                    <PrivateRoute exact path="/news" component={News} title="Services" />
                                    <PrivateRoute exact path="/news/new-post" component= {FormPost} title="Add new post" />
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