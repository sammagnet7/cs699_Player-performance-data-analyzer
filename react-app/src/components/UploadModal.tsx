import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Alert } from 'react-bootstrap';

interface UploadModalProps {
    onHide: () => void;
    show: boolean;
}

const UploadModal: React.FC<UploadModalProps> = (props) => {
    const [file, setFile] = useState<File | null>(null);
    const [showAlert, setShowAlert] = useState(false);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = event.target.files && event.target.files[0];
        setFile(selectedFile || null);
    };

    const handleUpload = () => {

        if (!file) {
            setShowAlert(true);
            return;
        }
        else {
            console.log('Uploading file:', file);
        }
        props.onHide();
    };
    const closeAlert = () => {
        setShowAlert(false);
    };
    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Upload files
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <form>
                    <div className="mb-3">
                        <label htmlFor="fileInput" className="form-label">
                            Choose a zip file
                        </label>
                        <input
                            type="file"
                            className="form-control"
                            id="fileInput"
                            accept=".zip"
                            onChange={handleFileChange}
                        />
                    </div>
                </form>
                {showAlert && (
                    <Alert variant="danger" onClose={closeAlert} dismissible>
                        Please choose a file before uploading.
                    </Alert>
                )}
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={props.onHide}>Close</Button>
                <Button onClick={handleUpload} variant='warning' type='button'>Upload</Button>
            </Modal.Footer>
        </Modal>
    );
};

const App: React.FC = () => {
    const [modalShow, setModalShow] = useState(false);

    return (
        <>
            <Button variant="primary" onClick={() => setModalShow(true)}>
                Launch vertically centered modal
            </Button>

            <UploadModal show={modalShow} onHide={() => setModalShow(false)} />
        </>
    );
};

export default UploadModal;