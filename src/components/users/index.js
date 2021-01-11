import React from 'react';
import { withRouter } from "react-router";
import { Form, Button, Card, Toast } from 'react-bootstrap';
import { authenticationService } from '../services';
import './user.scss';
class Login extends React.Component {
    constructor(props) {
        super(props);
        this.refEmail = React.createRef(null);
        this.refPW = React.createRef(null);
        this.state = {
            showToast: false,
        }
        this.validated = false
    }

    componentDidMount() {
        if (authenticationService.currentUserValue) { 
            this.props.history.push('/');
        }
    }
    submit = (e) => {
        const form = e.currentTarget;
        this.validated = true;
        if (!form.checkValidity()) {
            e.stopPropagation();
            this.validated = false;
        }
        e.preventDefault();
        authenticationService.login(this.refEmail.current.value, this.refPW.current.value)
        .then(result => {
            if (result.userId) {
                this.props.history.push('/home');
            } else {
                // this.validated = false;
            }
        })
        .catch()
    }
    render () {
        return (
            <div className="position-relative">
                <div style={{position: 'absolute', top: 0, right: '50%'}}>
                    <Toast show={this.state.showToast}  delay={3000} autohide onClose={() => this.setState({showToast: false})}>
                        <Toast.Header>
                            <strong className="mr-auto">Đăng nhập</strong>
                            <small>bây giờ</small>
                        </Toast.Header>
                        <Toast.Body>Không thành công</Toast.Body>
                    </Toast>
                </div>
                <section id="cover-bg">
                    <div id="cover-caption">
                        <div id="container" className="container">
                            <div className="row">
                                <div className="col-sm-6 offset-sm-3 text-center">
                                    <Card style={{paddingTop: '10px'}}>
                                        <Card.Title><h3 style={{textTransform: 'uppercase'}}>Alphahome</h3></Card.Title>
                                        <Card.Body>
                                            <div className="info-form" style={{padding: '0 20%'}}>
                                                <Form validated={this.validated}  onSubmit={(e) => this.submit(e)}>
                                                    <Form.Group controlId="formBasicEmail">
                                                        <Form.Control ref={this.refEmail} required type="email" placeholder="Enter email" />
                                                    </Form.Group>

                                                    <Form.Group controlId="formBasicPassword">
                                                        <Form.Control ref={this.refPW} required type="password" autoComplete="off" placeholder="Password" />
                                                    </Form.Group>

                                                    <Form.Control.Feedback type="invalid">Email</Form.Control.Feedback>
                                                    
                                                    <Button variant="primary" type="submit">
                                                        Submit
                                                    </Button>
                                                </Form>
                                            </div>
                                        </Card.Body>
                                    </Card>
                                    <br />
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        )
    }
}

export default withRouter(Login)