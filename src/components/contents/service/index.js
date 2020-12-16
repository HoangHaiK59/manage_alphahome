import { Container } from 'react-bootstrap';
import React from 'react';
import { Row, Col, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { withRouter } from 'react-router';
import { instance } from '../../../helper';
import * as queryString from 'querystring';
import '../custom.scss';
import { authenticationService } from '../../services';
import { Loading } from '../../loading';
class Services extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: []
        }
        this.offSet = 0;
        this.pageSize = 20;
        this.baseUrl = process.env.NODE_ENV === 'development' ? process.env.REACT_APP_API_DEV_BASE_URL: process.env.REACT_APP_API_DEV_BASE_URL;
    }

    componentDidMount() {
        this.subscription = authenticationService.currentUser.subscribe(x => {
            this.currentUser = x;
            if (this.currentUser) {
                this.getServices();
            }
        });
        document.addEventListener('scroll', this.listener.bind(this))
    }

    listener = e => {
        console.log(e)
        if(window.innerHeight + window.scrollY === (document.body.scrollHeight - 150)) {
            this.offSet += this.pageSize;
            this.getServices()
        }
    }

    componentWillUnmount() {
        this.subscription.unsubscribe();
        document.removeEventListener('scroll', this.listener.bind(this))
    }


    addPost() {
        this.props.history.push('services/new-post')
    }

    editPost(id) {
        this.props.history.push(`services/edit-post/${id}`)
    }

    getServices() {
        const queryParams = queryString.stringify({offSet: this.offSet, pageSize: this.pageSize});
        instance.get(`Manager/GetServices?${queryParams}`).then(res => {
            const result = res.data;
            if(result.status === 'success') {
                result.data.forEach(d => {
                    if(d.url.indexOf('http') > -1) {

                    } else {
                        d.url = this.baseUrl + d.url;
                    }
                })
                this.setState(state =>({data: state.data.concat(result.data)}));
            }
        })
    }

    render() {
        return this.state.data ? <Container fluid>
            <Row style={{height: '50px'}}>
                <Col md={3} sm={6}>
                    <Button variant="primary" onClick={this.addPost.bind(this)}>
                        <FontAwesomeIcon icon={faPlus} /> Thêm mới
                    </Button>
                </Col>
                <Col md={9} sm={6} className="d-flex justify-content-end">
                </Col>
            </Row>
            <Row className="position-sticky sticky-row shadow">
                <Col sm={1} md={1} lg={1} xs={1}>
                    <input type="checkbox" />
                </Col>
                <Col sm={1} md={1} lg={1} xs={1}><h5>Ảnh</h5></Col>
                <Col sm={5} md={5} lg={5} xs={2}>
                    <Row>
                        <Col>
                            <h5>Tên</h5>
                        </Col>
                    </Row>
                </Col>
                <Col sm={2} md={2} lg={2} xs={2}>
                    <h5>Loại</h5>
                </Col>
                <Col sm={1} md={1} lg={1} xs={3}><h5>Lượt xem</h5></Col>
                <Col sm={1} md={1} lg={1} xs={1}><h5>Action</h5></Col>
            </Row>
            <Row>
                {
                    this.state.data.map((d, id) => <Col md={12} lg={12} className="shadow mt-1 item" key={id}>
                        <Row>
                            <Col sm={1} md={1} lg={1}>
                                <input type="checkbox" />
                            </Col>
                            <Col sm={1} md={1} lg={1} className="cover">
                                <img src={d?.url} style={{width: '100%', height: '100%'}} alt=""/>
                            </Col>
                            <Col sm={5} md={5} lg={5}>
                                <Row>
                                    <Col md={12} lg={12}>
                                        <span>{d?.name}</span>
                                    </Col>
                                    <Col md={12} lg={12}>
                                        <span>{d?.description}</span>
                                    </Col>
                                </Row>
                            </Col>
                            <Col sm={2} md={2} lg={2}>
                                <span className="category">{d?.serviceTypeName}</span>
                            </Col>
                            <Col sm={1} md={1} lg={1}>
                                <span>{d?.view}</span>
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
        </Container> : <Loading />
    }
}

export default withRouter(Services);