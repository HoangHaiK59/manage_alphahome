import React from 'react';
import { Modal, Container, Row, Col } from 'react-bootstrap';
import { instance } from '../../helper';
import './library.scss';

class Library extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: null
        }
        this.baseUrl = process.env.NODE_ENV === 'development' ? process.env.REACT_APP_API_DEV_BASE_URL: process.env.REACT_APP_API_DEV_BASE_URL
    }

    getImages() {
        instance.get('/Manager/Library')
        .then(result => {
            if (result.data.success) {
                const { data } = result.data;
                this.setState({data})
            }
        })
    }

    componentDidMount() {
        this.getImages();
    }

    render() {
        return (
            <Modal {...this.props} size="md" >
                <Container fluid>
                    <Row>
                        {
                            this.state.data && this.state.data.map((d, id) => <Col key={id} sm={6} lg={2} md={2}>
                                <div className="lib-image">
                                    <img src={ this.baseUrl + d.url} alt="" width="100%" height="100%"/>
                                </div>
                            </Col>)
                        }
                    </Row>
                </Container>
            </Modal>
        )
    }
}

export default Library;