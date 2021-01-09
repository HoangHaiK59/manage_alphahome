import { Toast } from 'react-bootstrap';


export default function ToastNotify({show, setShow, message}) {
  
    return (
        <div
        aria-live="polite"
        aria-atomic="true"
        style={{
            position: 'absolute',
            minHeight: '100px',
            width: '200px',
            top: '10%',
            right: '5%',
            zIndex:9999
        }}
        >
        <Toast
            autohide
            delay={2000}
            onClose={() => setShow(false)} 
            show={show}
            style={{
            position: 'absolute',
            top: 0,
            right: 0,
            }}
        >
            <Toast.Header>
            <strong className="mr-auto">Notification</strong>
            </Toast.Header>
            <Toast.Body>{message || 'Success'}</Toast.Body>
        </Toast>
        </div>
    );
  }