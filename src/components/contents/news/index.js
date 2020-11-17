import { instance } from '../../../helper/axios';
import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
class News extends React.Component {
    constructor(props) {
        super(props);

    }

    addPost() {
        this.props.history.push('news/new-post')
    }

    render() {
        return (
            <Container>
                <Row>
                    <Col className="text-right">
                        <Button variant="primary" onClick={this.addPost.bind(this)}>
                            <FontAwesomeIcon icon={faPlus} />
                        </Button>
                    </Col>
                </Row>
            </Container>
        )
    }
}

export default News;