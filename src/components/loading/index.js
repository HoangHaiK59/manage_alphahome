import { Modal, Spinner } from 'react-bootstrap';
import React from 'react';
export const Loading = props => {
    const onShow = () => {
        if (props.done) {
            props.hideLoading();
        }
    }
    return (
        <Modal show={props.done} {...props} onShow={onShow} centered size="sm" aria-labelledby="contained-modal-title-vcenter">
            <Modal.Body>
                <Spinner animation="grow" variant="primary" />
                <Spinner animation="grow" variant="secondary" />
                <Spinner animation="grow" variant="success" />
            </Modal.Body>
        </Modal>
    )
}