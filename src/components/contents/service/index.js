import { Container } from 'react-bootstrap';
import React from 'react';
import { Row, Col, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { withRouter } from 'react-router';
class Services extends React.Component {
    constructor(props) {
        super(props);
    }

    addPost() {
        this.props.history.push('services/new-post')
    }

    render() {
        return <Container>
            <Row style={{backgroundColor: '#5b94ba', height: '50px'}}>
                <Col className="text-center">
                    <Button variant="primary" onClick={this.addPost.bind(this)}>
                        <FontAwesomeIcon icon={faPlus} />
                    </Button>
                </Col>
            </Row>
        </Container>
    }
}

export default withRouter(Services);