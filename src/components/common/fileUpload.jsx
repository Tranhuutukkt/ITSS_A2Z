import React, {useState} from "react";
import uploadFileToBlob ,{isStorageConfigured} from '../../services/storage';
const storageConfigured = isStorageConfigured();

function FileUpload({data}) {
    // all blobs in container
    const [blobList, setBlobList] = useState([]);

    // current file to upload into container
    const [fileSelected, setFileSelected] = useState(null);

    // UI/form management
    const [uploading, setUploading] = useState(false);
    const [inputKey, setInputKey] = useState(Math.random().toString(36));

    const onFileChange = (e) => {
        // capture file into state
        setFileSelected(e.target.files[0]);
    };

    const onFileUpload = async () => {
        // prepare UI
        setUploading(true);

        // *** UPLOAD TO AZURE STORAGE ***

        const blobsInContainer = await uploadFileToBlob(fileSelected);
        // prepare UI for results
        setBlobList(blobsInContainer);

        // reset state/form
        setUploading(false);
        setInputKey(Math.random().toString(36));
    };

    const DisplayForm = () => (
        <div>
            <input type="file" onChange={onFileChange} key={inputKey || ''} />
            <button type="submit" onClick={onFileUpload}>
                Upload!
            </button>
        </div>
    );



    return (
        <div>
            {!uploading && DisplayForm()}
            {uploading && <div>Uploading</div>}
            <hr />
            {<div>Success!</div>}
        </div>
    );
}

export default FileUpload;

