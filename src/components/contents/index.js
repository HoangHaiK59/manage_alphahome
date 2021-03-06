import { Container } from 'react-bootstrap';
import React from 'react';
import { instance } from '../../helper';
import * as queryString from 'querystring';
import { Row, Col } from 'react-bootstrap';
import './content.scss';
import { Loading } from '../loading';
class Content extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            offSet: 0,
            pageSize: 20,
            data: null,
            loading: true
        }
    }

    componentDidMount() {
        this.subscription = this.props.userContext.currentUser.subscribe( x => {
            this.props.updateContextValue({...this.props.userContext, currentUserValue: x});
            this.getManagerPage();
        });
    }

    hideLoading() {
        this.setState({loading: false});
    }

    componentWillUnmount() {
        this.subscription.unsubscribe();
    }

    getManagerPage() {
        const { offSet, pageSize } = this.state;
        const queryParams = queryString.stringify({ offSet, pageSize })
        instance.get(`Manager/GetManagerPage?${queryParams}`).then(res => {
            if (res.data.status === 'success') {
                const { data } = res.data;
                data.services.forEach(s => {
                    if(s.url.indexOf('https') === -1) {
                        s.url = 'https://localhost:44352' + s.url;
                    }
                });
                data.projects.forEach(s => {
                    if(s.url.indexOf('https') === -1) {
                        s.url = 'https://localhost:44352' + s.url;
                    }
                });
                data.posts.forEach(s => {
                    if(s.url.indexOf('https') === -1) {
                        s.url = 'https://localhost:44352' + s.url;
                    }
                });
                this.setState({ data })
            }
        })
        .catch(error => {

        })
    }

    render() {
        return this.state.data ? <Container fluid>
            <div className="section">
                <Row>
                    <Col>
                        <h3>Dịch vụ</h3>
                    </Col>
                </Row>
                <Row>
                    {
                        this.state.data?.services.filter((v, i) => i === 0).map((d, id) => 
                        <Col key={id} sm={12} md={6} lg={6}>
                            <div className="content">
                                <img src={d?.url} alt="" width="100%" />
                                <h5>{d?.name}</h5>
                            </div>

                         </Col>)
                    }

                        <Col sm={12} md={6} lg={6}>
                            
                            <Row>
                                {
                                    this.state.data?.services.filter((v, i) => i !== 0).map((d, id) => <Col key={id} sm={12} md={6} lg={6}>
                                    <img src={d?.url} alt="" width="100%" height="235px" />
                                    <h5>{d?.name}</h5>
                                </Col>)
                                }
                            </Row>
                            
                        </Col>

                </Row>
            </div>

            <div className="section">
                <Row>
                    <Col>
                        <h3>Dự án</h3>
                    </Col>
                </Row>
                <Row>
                    {
                        this.state.data?.projects.filter((v, i) => i === 0).map((d, id) => 
                        <Col key={id} sm={12} md={6} lg={6}>
                            <div className="content">
                                <img src={d?.url} alt="" width="100%" />
                                <h5>{d?.name}</h5>
                            </div>

                         </Col>)
                    }

                        <Col sm={12} md={6} lg={6}>
                            
                            <Row>
                                {
                                    this.state.data?.projects.filter((v, i) => i !== 0).map((d, id) => <Col key={id} sm={12} md={6} lg={6}>
                                    <img src={d?.url} alt="" width="100%" height="235px" />
                                    <h5>{d?.name}</h5>
                                </Col>)
                                }
                            </Row>
                            
                        </Col>

                </Row>
            </div>

            <div className="section">
                <Row>
                    <Col>
                        <h3>Tin tức</h3>
                    </Col>
                </Row>
                <Row>
                    {
                        this.state.data?.posts.filter((v, i) => i === 0).map((d, id) => 
                        <Col key={id} sm={12} md={6} lg={6}>
                            <div className="content">
                                <img src={d?.url} alt="" width="100%" />
                                <h5>{d?.name}</h5>
                            </div>

                         </Col>)
                    }

                        <Col sm={12} md={6} lg={6}>
                            
                            <Row>
                                {
                                    this.state.data?.posts.filter((v, i) => i !== 0).map((d, id) => <Col key={id} sm={12} md={6} lg={6}>
                                    <img src={d?.url} alt="" width="100%" height="235px" />
                                    <h5>{d?.name}</h5>
                                </Col>)
                                }
                            </Row>
                            
                        </Col>

                </Row>
            </div>
        </Container>: <Loading done={this.state.data ? true: false} hideLoading={this.hideLoading.bind(this)}/>
    }
}

export default Content;