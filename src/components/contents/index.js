import { Container } from 'react-bootstrap';
import React from 'react';
import { instance } from '../../helper/axios';
import * as queryString from 'querystring';
import { Row, Col } from 'react-bootstrap';
import './content.scss';
class Content extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            offSet: 0,
            pageSize: 20,
            data: []
        }
    }

    componentDidMount() {
        this.getServices();
    }

    getServices() {
        const { offSet, pageSize } = this.state;
        const queryParams = queryString.stringify({ offSet, pageSize })
        instance.get(`Manager/GetServices?${queryParams}`).then(res => {
            const {data} = res.data;
            this.setState({data})
        })
    }

    render() {
        return <Container>
            <Row>
                {
                    this.state.data.map(d => 
                        <Col lg={12} sm={12} md={12}>
                            <Row>
                                <Col sm={4} md={4}>
                                    <div className="content">
                                        <img src={d.url} width="100%"/>
                                    </div>
                                </Col>
                                <Col sm={8} md={8}>
                                    <h5>{d.name}</h5>
                                </Col>
                            </Row>
                        </Col>)
                }
            </Row>
        </Container>
    }
}

export default Content;