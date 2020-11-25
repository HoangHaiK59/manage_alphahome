import React from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { Container } from 'react-bootstrap';
import { Form, Button } from 'react-bootstrap';
import { instance } from '../../../../helper/axios';
import { uploadAdapterPlugin } from '../../../../helper/upload';
import viewToPlainText from '@ckeditor/ckeditor5-clipboard/src/utils/viewtoplaintext';
export default class FormService extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            description: '',
            url: '',
            images: [],
            content: '<p>Hello from CKEditor 5!</p>',
            serviceTypeId: '',
            serviceTypes: []
        }
        this.editor = null;
    }

    onSubmit() {
        console.log(viewToPlainText(this.editor.editing.view.document.getRoot()))
    }

    componentDidMount() {
        this.getServiceType();
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
        } else if(key === 'serviceType') {
            this.setState({serviceTypeId: e.target.value})
        }
    }

    getServiceType() {
        instance.get('Manager/GetServiceType').then(res => {
            if(res.data.status === 'success') {
                const { data } = res.data;
                this.setState({serviceTypes: data})
            }
        })
    }

    handleUpload(e) {
        const formData = new FormData();
        formData.append('formFile', e.target.files[0])
        instance.post('Upload/UploadImage', formData)
        .then(res => {
            if(res.data.status === 'success') {
                const { data } = res.data;
                this.setState({url: data})
            } else {
                alert('Upload error')
            }
        })
        .catch(error => {
            console.log(error)
        })
    }

    handleUploadMulti(e) {
        const formData = new FormData();
        const fileList = [...e.target.files];
        for(const file of fileList) {
            formData.append('formFiles', file);
        }
        instance.post('Upload/UploadMultiImage', formData, {headers: {'content-type': 'multipart/form-data'}})
        .then(res => {
            if(res.data.status === 'success') {
                const { data } = res.data;
                this.setState({images: data})
            } else {
                alert('Upload error')
            }
        })
        .catch(error => {
            console.log(error)
        })
    }

    // shouldComponentUpdate(prevProps, prevState) {
    //     if(prevState.content !== this.state.content) {
    //         return false;
    //     }
    //     return true;
    // }

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
                    <Form.Label>Loại dịch vụ</Form.Label>
                    <Form.Control id="serviceType" as="select" placeholder="Chọn loại dịch vụ" onChange={(event) => this.handleChange('serviceType', event)} >
                        {
                            this.state.serviceTypes.map((s, id) => <option key={id} value={s?.uid}>{s?.name}</option>)
                        }
                    </Form.Control>
                    <Form.Label>Ảnh cover</Form.Label>
                    <Form.File id="cover" onChange={e => this.handleUpload(e)} accept="image/*"/>
                    <Form.Label>Danh sách link ảnh</Form.Label>
                    <Form.File id="images" onChange={e => this.handleUploadMulti(e)} multiple accept="image/*"/>
                </Form.Group>

                <CKEditor controlId="formBasicEditor"
                editor={ ClassicEditor }
                data={this.state.content}
                config={{
                }}
                onReady={ editor => {
                    // You can store the "editor" and use when it is needed.
                    uploadAdapterPlugin(editor)
                    this.editor = editor;
                    console.log( 'Editor is ready to use!', editor );
                } }
                onChange={ ( event, editor ) => {
                    // const data = editor.getData();
                    // console.log(viewToPlainText(editor.editing.view.document.getRoot()))
                    // editor.editing.view.change(writer => {
                    //     const viewEditableRoot = editor.editing.view.document.getRoot();
                    //     console.log(viewToPlainText(viewEditableRoot))
                    //     console.log(writer)
                    //     this.setState({content: viewToPlainText(viewEditableRoot)})
                    // });
                    // console.log(viewToPlainText(editor.editing.view.document.getRoot()))
                    // console.log( { event, editor, data } );
                    // this.setState({content: data})
                    this.setState({content: editor.getData()})
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