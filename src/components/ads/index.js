import React from 'react';
import { from } from 'rxjs';
import { authenticationService } from '../services';
import { Row, Col, Container, Button, Modal, Form } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome' 
import { faEdit, faUpload, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Loading } from '../loading';
import { instance } from '../../helper';

export default class Ads extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            data: null,
            open: false
        }
    }

    componentDidMount() {
        this.subscription = authenticationService.currentUser.subscribe(x => {
            this.currentUser = x;
            if (this.currentUser) {
                this.getAdsVideo();
            }
        });
    }

    upload() {
        this.setState({open: true})
    }

    onHide() {
        this.setState({open: false})
    }

    getAdsVideo() {
        instance.get('Manager/ManageAdsVideo')
        .then(result => {
            if (result.data.status === 'success' ) {
                const { data } = result.data;
                this.setState({data})
            }
        })
    }

    handleUpload(e) {
        const formData = new FormData();
        const fileList = [...e.target.files];
        for(const file of fileList) {
            formData.append('formFiles', file);
        }
        instance.post('Upload/UploadVideoAds', formData, {headers: {'content-type': 'multipart/form-data'
        }})
        .then(res => {
            if(res.data.status === 'success') {
                const { data } = res.data;
                this.setState({images: data, open: false})
            } else {
                alert('Upload error')
            }
        })
        .catch(error => {
            console.log(error)
        })
    }

    render() {
        return this.state.data ? <Container fluid>
        <Row style={{height: '50px'}}>
            <Col md={3} sm={6}>
                <Button variant="primary" onClick={this.upload.bind(this)}>
                    <FontAwesomeIcon icon={faUpload} /> Tải lên
                </Button>
            </Col>
            <Col md={9} sm={6} className="d-flex justify-content-end">
            </Col>
        </Row>
        <Row className="position-sticky sticky-row shadow">
            <Col sm={1} md={1} lg={1} xs={1}>
                <input type="checkbox" />
            </Col>
            <Col sm={9} md={9} lg={9} xs={2}>
                <Row>
                    <Col>
                        <h5>File name</h5>
                    </Col>
                </Row>
            </Col>
            <Col sm={1} md={1} lg={1} xs={3}><h5>Queue</h5></Col>
            <Col sm={1} md={1} lg={1} xs={1}><h5>Action</h5></Col>
        </Row>
        <Row>
            {
                this.state.data.map((d, id) => <Col md={12} lg={12} className="shadow mt-1 item" key={id}>
                    <Row>
                        <Col sm={1} md={1} lg={1}>
                            <input type="checkbox" />
                        </Col>
                        <Col sm={9} md={9} lg={9}>
                            <Row>
                                <Col md={12} lg={12}>
                                    <span>{d?.name}</span>
                                </Col>
                            </Row>
                        </Col>
                        <Col sm={1} md={1} lg={1}>
                            <span>{d?.queue}</span>
                        </Col>
                        <Col sm={1} md={1} lg={1}>
                            <div className="d-flex">
                                <Button variant="primary" onClick={() => this.editPost(d.id)}><FontAwesomeIcon icon={faEdit}/></Button>
                                <Button variant="danger" className="ml-1"><FontAwesomeIcon icon={faTrash}/></Button>
                            </div>
                        </Col>
                    </Row>
                </Col>)
            }
        </Row>
        <Modal
        show={this.state.open}
        size="md"
        onHide={this.onHide.bind(this)}
        aria-labelledby="contained-modal-title-vcenter"
        centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                Tải lên video
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group>
                        <Form.File id="uploadAds" label="Upload ads video" accept=".mp4" multiple onChange={e => this.handleUpload(e)} />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={this.onHide.bind(this)}>Close</Button>
            </Modal.Footer>
        </Modal>
    </Container> : <Loading />
    }
}