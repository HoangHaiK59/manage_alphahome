import React from 'react';
import { withRouter } from "react-router";
import { Form, Button } from 'react-bootstrap';
import { authenticationService } from '../services';
import './user.scss';
const Login = (props) => {
    const refEmail = React.createRef(null);
    const refPW = React.createRef(null);
    const submit = (e) => {
        e.preventDefault();
        authenticationService.login(refEmail.current.value, refPW.current.value)
    }
    return (
        <section id="cover">
            <div id="cover-caption">
                <div id="container" className="container">
                    <div className="row">
                        <div className="col-sm-10 offset-sm-1 text-center">
                            <h1 className="display-3 shadow">Welcome to Alphahome</h1>
                            <div className="info-form" style={{padding: '0 20%'}}>
                                <Form onSubmit={(e) => submit(e)}>
                                    <Form.Group controlId="formBasicEmail">
                                        <Form.Control ref={refEmail}  type="email" placeholder="Enter email" />
                                        <Form.Text className="text-muted">
                                        We'll never share your email with anyone else.
                                        </Form.Text>
                                    </Form.Group>

                                    <Form.Group controlId="formBasicPassword">
                                        <Form.Control ref={refPW} type="password" placeholder="Password" />
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

export default withRouter(Login)