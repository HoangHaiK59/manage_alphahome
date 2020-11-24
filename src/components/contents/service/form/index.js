import React from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { Container } from 'react-bootstrap';
import { Form, Button } from 'react-bootstrap';
import { instance } from '../../../../helper/axios';

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

    componentDidMount() {
        // const imageElem = document.getElementById("cover");
        // imageElem.addEventListener('change', e => {
        //     console.log(e)
        // }, false)
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

    handleUpload(e) {
        console.log(e.target.files[0])
        const formData = new FormData();
        formData.append('formFile', e.target.files[0])
        instance.post('Upload/UploadImage', formData)
        .then(res => {
            if(res.data.status === 'success') {
                alert('Upload success')
            } else {
                alert('Upload error')
            }
        })
        .catch(error => {
            console.log(error)
        })
    }

    handleUploadMulti(e) {
        console.log(e.target.files);
        const formData = new FormData();
        const fileList = [...e.target.files];
        console.log(fileList);
        formData.append('formFiles', fileList)
        instance.post('Upload/UploadMultiImage', formData)
        .then(res => {
            if(res.data.status === 'success') {
                alert('Upload success')
            } else {
                alert('Upload error')
            }
        })
        .catch(error => {
            console.log(error)
        })
    }

    render() {
        return (
            <Container>
              <Form>
                <Form.Group>
                    <Form.Label>Tiêu đề</Form.Label>
                    <Form.Control id="name" placeholder="Nhập tiêu đề" onChange={(event) => this.handleChange('name', event)}/>
                    {/* <Form.Text className="text-muted">
                    We'll never share your email with anyone else.
                    </Form.Text> */}
                    <Form.Label>Mô tả</Form.Label>
                    <Form.Control id="description" as="textarea" placeholder="Nhập mô tả" multiple onChange={(event) => this.handleChange('description', event)}/>
                    <Form.Label>Ảnh cover</Form.Label>
                    <Form.File id="cover" onChange={e => this.handleUpload(e)} accept="image/*"/>
                    <Form.Label>Danh sách link ảnh</Form.Label>
                    <Form.File id="images" onChange={e => this.handleUploadMulti(e)} multiple accept="image/*"/>
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