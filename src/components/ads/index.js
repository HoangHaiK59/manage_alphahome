import React from 'react';
import { Row, Col, Container, Button, Modal, Form } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome' 
import { faEdit, faUpload, faTrash } from '@fortawesome/free-solid-svg-icons';
import { instance } from '../../helper';
import ToastNotify from '../toast';

export default class Ads extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            open: false,
            editOpen: false,
            update: null,
            toast: false,
            message: ''
        }
    }

    componentDidMount() {
        this.getAdsVideo();
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
            if (result.data) {
                const res = result.data;
                if (res.status === 'success' ) {
                    const { data } = res;
                    this.setState({data})
                }
            }
        })
        .catch(error => {

        })
    }

    deleteAdsVideo(id) {
        instance.delete('Manager/DeleteAdsVideo', {data: {id}})
        .then(result => {
            const res = result.data;
            if (res.status === 'success') {
                if (res.data.valid) {
                    this.setState({toast: true, message: 'Delete success'})
                    this.getAdsVideo()
                }
            }
        })
        .catch(error => {

        })
    }

    uploadLink(list) {
        instance.post('Manager/UploadLinkAdsVideo', {jdoc: JSON.stringify(list)})
        .then(res => {
            const result = res.data;
            if (result.status === 'success') {
                if (result.data.valid) {
                    // re-sync
                    instance.get('Manager/ManageAdsVideo')
                    .then(response => {
                        const resp = response.data;
                        if (resp.status === 'success' ) {
                            const { data } = resp;
                            this.setState({data, open: false, toast: true, message: 'Upload success'})
                        }
                    })
                }
            }
        })
        .catch(error => {

        })
    }

    handleUpload(e) {
        console.log(e)
        const formData = new FormData();
        const fileList = [...e.target.files];
        for(const file of fileList) {
            formData.append('formFiles', file);
        }
        instance.post('Upload/UploadVideoAds', formData, {headers: {'content-type': 'multipart/form-data'
        }})
        .then(res => {
            const response = res.data;
            if(response.status === 'success') {
                const { data } = response;
                this.uploadLink(data);
            } else {
                alert('Upload error')
            }
        })
        .catch(error => {
            console.log(error)
        })
    }

    handleChange(e) {
        this.setState(state => ({update: {...state.update, queue: +e.target.value}}))
    }

    editQueue(data) {
        this.setState({editOpen: true, update: data})
    }

    onEditHide() {
        this.setState({editOpen: false})
    }

    rangeArrray(start, end) {
        return Array(end - start + 1).fill(v => v).map((_, idx) => start + idx);
    }

    save() {
        instance.put('Manager/SetAdsQueue', this.state.update)
        .then(result => {
            const res = result.data;
            if (res.status === 'success') {
                if (res.data.valid) {
                    this.setState({toast: true, message: 'Change queue success', editOpen: false})
                    this.getAdsVideo();
                }
            }
        })
        .catch(error => {

        })
    }

    setShow(show) {
        this.setState({toast: show})
    }

    render() {
        return <Container fluid>
        <ToastNotify show={this.state.toast} message={this.state.message} setShow={this.setShow.bind(this)} />
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
                                <Button variant="primary" onClick={() => this.editQueue(d)}><FontAwesomeIcon icon={faEdit}/></Button>
                                <Button variant="danger" onClick={() => this.deleteAdsVideo(d.id)} className="ml-1"><FontAwesomeIcon icon={faTrash}/></Button>
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
                <Button variant="secondary" onClick={this.onHide.bind(this)}>Close</Button>
            </Modal.Footer>
        </Modal>
        <Modal
        show={this.state.editOpen}
        size="md"
        onHide={this.onEditHide.bind(this)}
        aria-labelledby="contained-modal-title-vcenter"
        centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                Chỉnh sửa hàng đợi {this.state.update?.name}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group>
                        <Form.Control id="selectas" value={this.state.update?.queue} placeholder="Queue" as="select" onChange={e => this.handleChange(e)}>
                            {this.rangeArrray(0, 10).map((value, id) => <option key={id} value={value}>{value}</option>)}
                        </Form.Control>
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="primary" onClick={this.save.bind(this)}>Save</Button>
                <Button variant="secondary" onClick={this.onEditHide.bind(this)}>Close</Button>
            </Modal.Footer>
        </Modal>
    </Container>
    }
}