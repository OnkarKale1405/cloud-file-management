import { useRef, useState } from "react";
import useAuth from "../hooks/useAuth";

const Uploadbox = () => {
    const { auth } = useAuth();
    const [files, setFiles] = useState([]);
    const [currentFile, setCurrentFile] = useState(null);
    const [showProgress, setShowProgress] = useState(false);
    const [uploadProgress, setUploadProgress] = useState(0); // Track upload progress
    const fileInputRef = useRef(null);

    const handleFileInputChange = (e) => {
        const selectedFiles = Array.from(e.target.files);
        setFiles([...files, ...selectedFiles]);
        setCurrentFile(selectedFiles[selectedFiles.length - 1]); // Set the latest selected file as the current file
    }

    const handleUpload = async () => {
        if (!currentFile) {
            console.log('No file selected.');
            return;
        }

        console.log('Uploading file:', currentFile);
        try {
            setShowProgress(true);
            console.log(auth);
            const formData = new FormData();
            formData.append('NewFile', currentFile); // Set the field name here
            formData.append('email', auth.email)

            const response = await fetch('http://localhost:8000/api/users/uploadFile', {
                method: 'POST',
                body: formData,
                onUploadProgress: (progressEvent) => {
                    // Calculate and update upload progress
                    const progress = Math.round((progressEvent.loaded / progressEvent.total) * 100);
                    setUploadProgress(progress);
                }
            });

            const result = await response.json();
            console.log('Upload result:', result);
            setShowProgress(false);
            setUploadProgress(0); // Reset upload progress after completion
        } catch (error) {
            console.log('Error uploading file:', error);
            setShowProgress(false);
            setUploadProgress(0); // Reset upload progress in case of error
        }
    }

    return (
        <div className='upload-box w-full' style={{ overflowX: 'hidden' }}>
            <form>
                <div className='w-full h-[12rem] flex justify-center items-center my-4 bg-blue-100 rounded-xl
                    border-2 border-blue-400 relative'
                    onClick={() => fileInputRef.current.click()}>
                    <input type="file" name="file" id="file" hidden ref={fileInputRef} onChange={handleFileInputChange} multiple />
                    <p className="text-xl text-[#323232]">Browse file to upload</p>
                </div>
                <button onClick={handleUpload} disabled={!currentFile} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" type="button">
                    Upload
                </button>
            </form>
            {showProgress && currentFile && (
    <section className='loading-area'>
        <div className='content w-full h-28 bg-blue-100 rounded-lg flex flex-col relative'>
            <div className='file-description w-full h-[60%] flex justify-start'>
                <div className='h-full w-20 flex justify-center items-center'>
                    <div className='w-10 h-10 rounded-full bg-blue-300'></div>
                </div>
                <div className='file-name-size w-[60%] flex flex-col justify-center'>
                    <p className='text-sm'>{`${currentFile.name} - uploading`}</p>
                    <p className='text-xs'>{currentFile.size} bytes</p>
                </div>
                <div className='w-4 h-4 rounded-full bg-blue-300 absolute top-3 right-3'></div>
            </div>
        </div>
    </section>
)}

        </div>
    );
};

export default Uploadbox;
