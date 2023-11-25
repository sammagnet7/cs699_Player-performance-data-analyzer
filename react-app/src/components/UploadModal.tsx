import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';
import Modal from 'react-bootstrap/Modal';
import { Alert } from 'react-bootstrap';
import { saveAs } from 'file-saver';
interface UploadModalProps {
    onHide: () => void;
    show: boolean;
}

const UploadModal: React.FC<UploadModalProps> = (props) => {
    const [file, setFile] = useState<File | null>(null);
    const [showAlert, setShowAlert] = useState(false);
    const [msg, setMsg] = useState("");
    const [alertVariant, setAlertVariant] = useState("danger");
    const [isLoading, setIsLoading] = useState(false);

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
            setIsLoading(true);
            console.log('Uploading file:', file);
            const formData = new FormData();
            formData.append('csv', file);

            fetch('http://localhost:8080/csv/upload', {
                method: 'POST',
                body: formData,
            })
                .then((response) => {
                    if (response.ok) {
                        console.log('File uploaded successfully');
                    } else {
                        console.error('Failed to upload file');
                    }
                    return response.text().then((responseText) => ({
                        text: responseText,
                        status: response.status,
                    }));
                }).then(({ text, status }) => {
                    setIsLoading(false);
                    setMsg(text);
                    if (status == 200)
                        setAlertVariant("success");
                    else {
                        setAlertVariant("danger");
                    }
                    setShowAlert(true);
                })
                .catch((error) => {
                    console.error('Error uploading file:', error);
                })
        }
    };
    const closeAlert = () => {
        props.onHide();
        setShowAlert(false);
    };
    const downloadData = async () => {
        try {
            const response = await fetch('http://localhost:8080/csv/download');
            const blob = await response.blob();

            // Use file-saver to trigger the download
            saveAs(blob, 'player_performance.zip');
        } catch (error) {
            console.error('Error downloading zip file:', error);
        }
    }
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
                <Button variant="success" id="dwnldBtn" onClick={downloadData}>
                    Download
                </Button>
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
                    <Alert variant={alertVariant} onClose={closeAlert} dismissible>
                        {msg}
                    </Alert>
                )}
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={closeAlert}>Close</Button>
                <Button onClick={handleUpload} variant='warning' type='button'>
                    {isLoading && <Spinner
                        animation="border"
                        size="sm"
                        role="status"
                        aria-hidden="true"
                    />}
                    Upload
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default UploadModal;