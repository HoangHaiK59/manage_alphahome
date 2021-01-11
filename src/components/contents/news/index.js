import { instance } from '../../../helper';
import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import * as queryString from 'querystring';
import { Loading } from '../../loading';
class News extends React.Component {
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
        document.addEventListener('scroll', this.listener.bind(this))
    }

    componentWillUnmount() {
        document.removeEventListener('scroll', this.listener.bind(this))
    }

    getPosts() {
        const queryParams = queryString.stringify({offSet: this.offSet, pageSize: this.pageSize});
        instance.get(`Manager/GetPosts?${queryParams}`)
        .then(res => {
            if(res.data.status === 'success') {
                const { data } = res.data;
                data.forEach(d => {
                    if (d.url.indexOf('http') > -1) {

                    } else {
                        d.url = this.baseUrl + d.url;
                    }
                })
                this.setState(state =>({data: state.data.concat(data)}));
            }
        })
    }

    listener = e => {
        console.log(e)
        if(window.innerHeight + window.scrollY === (document.body.scrollHeight - 150)) {
            this.offSet += this.pageSize;
            this.getPosts()
        }
    }

    addPost() {
        this.props.history.push('news/new-post')
    }

    editPost(id) {
        this.props.history.push(`news/edit-post/${id}`)
    }

    render() {
        return (
            this.state.data ?
        <Container fluid>
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
                <Col sm={7} md={7} lg={7} xs={2}>
                    <Row>
                        <Col>
                            <h5>Tên</h5>
                        </Col>
                    </Row>
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
                            <Col sm={7} md={7} lg={7}>
                                <Row>
                                    <Col md={12} lg={12}>
                                        <span>{d?.name}</span>
                                    </Col>
                                    <Col md={12} lg={12}>
                                        <span>{d?.description}</span>
                                    </Col>
                                </Row>
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
        </Container>: <Loading />
        )
    }
}

export default News;