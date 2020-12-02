import { Container } from 'react-bootstrap';
import React from 'react';
import { Row, Col, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { withRouter } from 'react-router';
import { instance } from '../../../helper';
import * as queryString from 'querystring';
import '../custom.scss';
class Projects extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            offSet: 0,
            pageSize: 20, 
            data: []
        }
    }

    componentDidMount() {
        this.getProjects();
    }

    addPost() {
        this.props.history.push('projects/new-post')
    }

    getProjects() {
        const { offSet, pageSize } = this.state;
        const queryParams = queryString.stringify({offSet, pageSize});
        instance.get(`Manager/GetProjectPage?${queryParams}`).then(res => {
            const result = res.data;
            if(result.status === 'success') {
                result.data.forEach(r => {
                    if(r.url.indexOf('http') > -1) {

                    } else {
                        r.url = 'https://localhost:44352' + r.url;
                    }
                })
                this.setState({data: result.data})
            }
        })
    }

    render() {
        return <Container fluid>
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
                                    <Button variant="primary"><FontAwesomeIcon icon={faEdit}/></Button>
                                    <Button variant="danger" className="ml-1"><FontAwesomeIcon icon={faTrash}/></Button>
                                </div>
                            </Col>
                        </Row>
                    </Col>)
                }
            </Row>
        </Container>
    }
}

export default withRouter(Projects);