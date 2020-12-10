import React from 'react';
import { withRouter } from "react-router";
import { Form, Button } from 'react-bootstrap';
import { authenticationService } from '../services';
import './user.scss';
class Login extends React.Component {
    constructor(props) {
        super(props);
        this.refEmail = React.createRef(null);
        this.refPW = React.createRef(null);
    }

    componentDidMount() {
        if (authenticationService.currentUserValue) { 
            this.props.history.push('/');
        }
    }
    submit = (e) => {
        e.preventDefault();
        authenticationService.login(this.refEmail.current.value, this.refPW.current.value)
        .then(user => {
            this.props.history.push('/')
        })
        .catch()
    }
    render () {
        return (
            <section id="cover-bg">
                <div id="cover-caption">
                    <div id="container" className="container">
                        <div className="row">
                            <div className="col-sm-10 offset-sm-1 text-center">
                                <h1 className="display-3 shadow">Welcome to Alphahome</h1>
                                <div className="info-form" style={{padding: '0 20%'}}>
                                    <Form onSubmit={(e) => this.submit(e)}>
                                        <Form.Group controlId="formBasicEmail">
                                            <Form.Control ref={this.refEmail}  type="email" placeholder="Enter email" />
                                            <Form.Text className="text-muted">
                                            We'll never share your email with anyone else.
                                            </Form.Text>
                                        </Form.Group>

                                        <Form.Group controlId="formBasicPassword">
                                            <Form.Control ref={this.refPW} type="password" placeholder="Password" />
                                        </Form.Group>
                                        <Button variant="primary" type="submit">
                                            Submit
                                        </Button>
                                    </Form>
                                </div>
                                <br />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        )
    }
}

export default withRouter(Login)