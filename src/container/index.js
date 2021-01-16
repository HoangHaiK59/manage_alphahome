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
import FormEditProject from '../components/contents/projects/form-edit';
import FormEditPost from '../components/contents/news/form-edit';
import Ads from '../components/ads';
import UserContext from '../components/context/user-context';
class ContainerElement extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentUser: null
        }
    }

    componentDidMount() {
        this.subscription = authenticationService.currentUser.subscribe(x => {
            this.setState({currentUser: x})
        })
    }

    logout() {
        authenticationService.logout();
        this.props.history.push('/login');
    }

    componentWillUnmount() {
        this.subscription.unsubscribe();
    }

    render() {
        // const { currentUser } = this.state;
        return (
            <UserContext.Consumer>
                { context => {
                    return (
                        <Container fluid style={{minHeight: '100vh', paddingLeft:0 , paddingRight: 0}}>
                        <NavbarElement {...context}/>
                        <Container fluid className="main">
                            <Row>
                                <SidebarElement {...context} logout={this.logout.bind(this)}/>
                                <main className={context.userContext.currentUserValue ? "col-md-10 col-lg-10 px-1 ml-sm-auto": "col-md-12 col-lg-12 p-0"}>
                                    <Switch>
                                            <PrivateRoute exact path="/" component={Content} {...context} title="Home" />
                                            <PrivateRoute exact path="/services" component={Services} {...context} title="Services" />
                                            <PrivateRoute exact path="/projects" component={Projects} {...context} title="Projects" />
                                            <PrivateRoute exact path="/services/new-post" component={FormService} {...context} title="Add new post services" />
                                            <PrivateRoute exact path="/services/edit-post/:id" component={FormEditService} {...context} title="Edit service" />
                                            <PrivateRoute exact path="/projects/new-post" component={FormProject} {...context} title="Add new project" />
                                            <PrivateRoute exact path="/projects/edit-post/:pId" component={FormEditProject} {...context} title="Edit project" />
                                            <PrivateRoute exact path="/news" component={News} {...context} title="Services" />
                                            <PrivateRoute exact path="/news/new-post" component= {FormPost} {...context} title="Add new post" />
                                            <PrivateRoute exact path="/news/edit-post/:postId" component= {FormEditPost} {...context} title="Edit post" />
                                            <PrivateRoute exact path="/ads" component={Ads} {...context} title="Ads" />
                                            <Route path='/login' component={Login} {...context}/>
                                    </Switch>
                                </main>
                            </Row>
                        </Container>
                    </Container>
                    )
                }
            }

            </UserContext.Consumer>
        )
    }
}

export default withRouter(ContainerElement);