import React from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { Container } from 'react-bootstrap';
import { Form, Button } from 'react-bootstrap';
import { uploadAdapterPlugin } from '../../../../helper';
import { instance } from '../../../../helper';
import { authenticationService } from '../../../services';
export default class FormPost extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            description: '',
            url: '',
            images: '',
            content: '',
        }
        this.editor = null;
    }

    handleUpload(e) {
        const formData = new FormData();
        formData.append('formFile', e.target.files[0])
        instance.post('Upload/UploadImage', formData, {
            headers: {
                Authorization: `Bearer ` + this.currentUser.data.token
            }
        })
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

    escapeHTML(s) {
        let lookup = {
            '&': "&amp;",
            '"': "&quot;",
            '<': "&lt;",
            '>': "&gt;"
        };
        return s.replace( /[&"<>]/g, (c) => lookup[c] );
    }

    onSubmit() {
        const images = [];
        const regexFigure = /<\s*figure[^>]*>(.*?)<\/*\s*figure>/g;
        const regexCaption = new RegExp('<\\s*figcaption[^>]*>(.*?)<\\s*/\\s*figcaption>', 'g');
        const regexImage = new RegExp('src\\s*=\\s*"(.+?)"', 'g');
        // const regexGetTextCaption =  /<figcaption[^>]*>(.+?)<\/figcaption>/g;
        const regexGetTag = />[^<]*</g;

        if(regexFigure.test(this.state.content)) {
            const groupItem = this.state.content.match(regexFigure);
            for(const gr of groupItem) {
                const listImage = gr.match(regexImage);
                const listCaption = gr.match(regexCaption);
                const image = {
                    postId: 0,
                    content: listCaption ? listCaption[0].match(regexGetTag)[0].replace(/^>+/g,'').replace(/<+$/g,''): '',
                    url: listImage ? listImage[0].split('"')[1].replace(/https:\/\/localhost:44352/g, ''): '',
                }
                images.push(image)
            }
        }

        // viewToPlainText(this.editor.editing.view.document.getRoot())
        let content = '';
        if(regexFigure.test(this.state.content)) {

            content = this.escapeHTML(this.state.content.replace(regexFigure, ''));
        } else {
            content = this.escapeHTML(this.state.content);
        }
        // const content = this.state.content.replace(regexFigure, '');

        let params = {...this.state, images: JSON.stringify(images), content };
        console.log(params);
        instance.post('Manager/SetPost', params, {
            headers: {
                Authorization: `Bearer ` + this.currentUser.data.token
            }
        })
        .then(res => {
            console.log(res.data);
        })
        .catch(error => console.log(error))
        //console.log(listCaption)

        // console.log(viewToPlainText(this.editor.editing.view.document.getRoot()))
    }

    handleChange(key, e) {
        if(key === 'name') {
            this.setState({name: e.target.value})
        } else if(key === 'description') {
            this.setState({description: e.target.value})
        } else if(key === 'url') {
            this.setState({url: e.target.value})
        }
    }

    componentDidMount() {
        authenticationService.currentUser.subscribe(x => this.currentUser = x);
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
                    <Form.Label>Ảnh cover</Form.Label>
                    <Form.File id="cover" onChange={e => this.handleUpload(e)} accept="image/*"/>
                </Form.Group>

                <CKEditor controlId="formBasicEditor"
                editor={ ClassicEditor }
                data={this.state.content}
                onReady={ editor => {
                    // You can store the "editor" and use when it is needed.
                    uploadAdapterPlugin(editor)
                    this.editor = editor;
                    console.log( 'Editor is ready to use!', editor );
                } }
                onChange={ ( event, editor ) => {
                    const data = editor.getData();
                    console.log( { event, editor, data } );
                    for(let image of document.images) {
                        image.src = image.src.replace(/http:\/\/localhost:3000/g, 'https://localhost:44352')
                    }
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