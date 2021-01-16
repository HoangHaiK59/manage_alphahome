import React from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { Container } from 'react-bootstrap';
import { Form, Button } from 'react-bootstrap';
import { instance } from '../../../../helper';
import { uploadAdapterPlugin } from '../../../../helper';
import viewToPlainText from '@ckeditor/ckeditor5-clipboard/src/utils/viewtoplaintext';
import * as queryString from 'querystring';
import '../../image.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
export default class FormEditService extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: 0,
            name: '',
            description: '',
            url: '',
            images: [],
            content: '',
            serviceTypeId: '',
            serviceTypes: []
        }
        this.editor = null;
        this.baseUrl = process.env.NODE_ENV === 'development' ? process.env.REACT_APP_API_DEV_BASE_URL: process.env.REACT_APP_API_DEV_BASE_URL
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

    clearCover() {
        this.setState({url: ''});
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
                    serviceId: this.state.id,
                    content: listCaption ? listCaption[0].match(regexGetTag)[0].replace(/^>+/g,'').replace(/<+$/g,''): '',
                    url: listImage ? listImage[0].split('"')[1].replace(/https:\/\/localhost:44352/g, ''): '',
                    serviceTypeId: this.state.serviceTypeId
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
        delete params.serviceTypes;
        instance.post('Manager/UpdateService', params)
        .then(res => {
            if (res.data.success) {
                this.props.history.push('/services');
            }
        })
        .catch(error => console.log(error))
        //console.log(listCaption)

        // console.log(viewToPlainText(this.editor.editing.view.document.getRoot()))
    }

    componentDidMount() {
        this.subscription = this.props.userContext.currentUser.subscribe( x => {
            this.props.updateContextValue({...this.props.userContext, currentUserValue: x});
            this.getServiceById();
        });
        // const imageElem = document.getElementById("cover");
        // imageElem.addEventListener('change', e => {
        //     console.log(e)
        // }, false)
    }

    handleChange(e) {
        this.setState({[e.target.id]: e.target.value})
    }

    getServiceById() {
        const queryParams = queryString.stringify(this.props.match.params);
        instance.get(`Manager/GetServiceById?${queryParams}`).then(res => {
            if(res.data.status === 'success') {
                let dataRes = res.data.data;
                let images = '';
                for(const image of dataRes.images) {
                    images += `<figure class="image"><img alt="" src="${image.url.indexOf('http') > -1 ? image.url: this.baseUrl + image.url}" /><figcaption>${image.content}</figcaption></figure>`
                }
                dataRes = {...dataRes, content: dataRes.content + images}
                instance.get('Manager/GetServiceType').then(result => {
                    if(result.data.status === 'success') {
                        const { data } = result.data;
                        this.setState({
                            serviceTypes: data,
                            id: dataRes.id,
                            name: dataRes.name,
                            description: dataRes.description,
                            content: dataRes.content,
                            url: dataRes.url,
                            images: dataRes.images,
                            serviceTypeId: dataRes.serviceTypeId
                        })
                    }
                })
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

    componentWillUnmount() {
        this.subscription.unsubscribe();
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
                <div className="text-center">
                    <Form.Label>
                        <h3>Sửa dịch vụ</h3>
                    </Form.Label>
                </div>
                <Form.Group>
                    <Form.Label>Tiêu đề</Form.Label>
                    <Form.Control id="name" placeholder="Nhập tiêu đề" defaultValue={this.state.name} onChange={(event) => this.handleChange(event)}/>
                    {/* <Form.Text className="text-muted">
                    We'll never share your email with anyone else.
                    </Form.Text> */}
                    <Form.Label>Mô tả</Form.Label>
                    <Form.Control id="description" as="textarea" defaultValue={this.state.description}  placeholder="Nhập mô tả" multiple onChange={(event) => this.handleChange(event)}/>
                    <Form.Label>Loại dịch vụ</Form.Label>
                    <Form.Control id="serviceTypeId" as="select" value={this.state.serviceTypeId}  placeholder="Chọn loại dịch vụ" onChange={(event) => this.handleChange(event)} >
                        {
                            this.state.serviceTypes.map((s, id) => <option key={id} value={s?.uid}>{s?.name}</option>)
                        }
                    </Form.Control>
                    {/* <Form.Label>Ảnh cover</Form.Label>
                    <Form.File id="cover" onChange={e => this.handleUpload(e)} accept="image/*"/> */}
                    <Form.Label>Ảnh cover</Form.Label>
                    {
                        this.state.url === '' ? <Form.File id="cover" onChange={e => this.handleUpload(e)} accept="image/*"/>
                        : <div className="img-block">
                        <img src={this.state.url.indexOf('http') > -1 ? this.state.url: this.baseUrl + this.state.url} alt="" />
                        <div className="clr-btn">
                            <Button variant="danger" onClick={() => this.clearCover()}><FontAwesomeIcon icon={faTimes} /></Button>
                        </div>
                    </div>
                    }
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
                on
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

                    // get image tag
                    for(let image of document.images) {
                        if(image.src.indexOf('http') === -1) {
                            // image.src = image.src.replace(/http:\/\/localhost:3000/g, 'https://localhost:44352')
                        } else {
                            if (image.src.indexOf('user') > -1) {
                            } else {
                                image.src = image.src.replace(/http:\/\/localhost:3000/g, this.baseUrl)
                            }
                        }
                    }
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