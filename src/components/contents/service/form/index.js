import React from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { Container } from 'react-bootstrap';
import { Form, Button } from 'react-bootstrap';

export default class FormService extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            description: '',
            url: '',
            images: [],
            content: '<p>Hello from CKEditor 5!</p>',
            imagesText: ''
        }
    }

    onSubmit() {
        console.log(this.state)
    }

    handleChange(key, e) {
        if(key === 'name') {
            this.setState({name: e.target.value})
        } else if(key === 'description') {
            this.setState({description: e.target.value})
        } else if(key === 'url') {
            this.setState({url: e.target.value})
        } else if(key === 'imagesText') {
            this.setState({imagesText: e.target.value})
        }
    }

    render() {
        return (
            <Container>
              <Form>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Tiêu đề</Form.Label>
                    <Form.Control placeholder="Nhập tiêu đề" onChange={(event) => this.handleChange('name', event)}/>
                    {/* <Form.Text className="text-muted">
                    We'll never share your email with anyone else.
                    </Form.Text> */}
                    <Form.Label>Mô tả</Form.Label>
                    <Form.Control as="textarea" placeholder="Nhập mô tả" multiple onChange={(event) => this.handleChange('description', event)}/>
                    <Form.Label>Ảnh cover</Form.Label>
                    <Form.Control placeholder="Ảnh cover" onChange={(event) => this.handleChange('url', event)}/>
                    <Form.Label>Danh sách link ảnh</Form.Label>
                    <Form.Control as="textarea" placeholder="Danh sách link ảnh" multiple onChange={(event) => this.handleChange('imagesText', event)}/>
                </Form.Group>

                <CKEditor controlId="formBasicEditor"
                editor={ ClassicEditor }
                data={this.state.content}
                onReady={ editor => {
                    // You can store the "editor" and use when it is needed.
                    console.log( 'Editor is ready to use!', editor );
                } }
                onChange={ ( event, editor ) => {
                    const data = editor.getData();
                    console.log( { event, editor, data } );
                    this.setState({content: data})
                } }
                onBlur={ ( event, editor ) => {
                    console.log( 'Blur.', editor );
                } }
                onFocus={ ( event, editor ) => {
                    console.log( 'Focus.', editor );
                } }
                />
                <Button variant="primary" type="button" onClick={this.onSubmit.bind(this)}>
                    Submit
                </Button>
              </Form>
            </Container>
        )
    }
}