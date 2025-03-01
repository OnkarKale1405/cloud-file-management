import React, { useState, useEffect, useRef } from 'react';
import { useFiles } from '../context/FilesProvider';
import useAuth from "../hooks/useAuth";
import FileSaver from "file-saver" 

// import useAuth from '../hooks/useAuth';

const FilterDropdown = ({ onChange }) => {
    const [isOpen, setIsOpen] = useState(false);
    


    const handleFilterChange = (option) => {
        onChange(option);
        setIsOpen(false);
    };

    return (
        <div className="relative inline-block text-left">
            <div>
                <button type="button" onClick={() => setIsOpen(!isOpen)} className="inline-flex justify-center w-full px-4 py-2 text-sm font-medium leading-5 text-white transition duration-150 ease-in-out bg-blue-500 border border-transparent rounded-md shadow-sm hover:bg-blue-600 focus:outline-none focus:border-blue-700 focus:shadow-outline-blue active:bg-blue-700" id="options-menu" aria-haspopup="true" aria-expanded="true">
                    Filter
                    <svg className="mt-0.5 ml-1 h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M6.293 7.293a1 1 0 0 1 1.414 0L10 9.586l2.293-2.293a1 1 0 1 1 1.414 1.414l-3 3a1 1 0 0 1-1.414 0l-3-3a1 1 0 0 1 0-1.414z" />
                    </svg>
                </button>
            </div>

            {isOpen && (
                <div className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg">
                    <div className="bg-white rounded-md shadow-xs">
                        <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                            <button onClick={() => handleFilterChange('size')} className="block w-full px-4 py-2 text-sm leading-5 text-gray-700 hover:bg-gray-100 hover:text-gray-900" role="menuitem">Size</button>
                            <button onClick={() => handleFilterChange('uploadAsc')} className="block w-full px-4 py-2 text-sm leading-5 text-gray-700 hover:bg-gray-100 hover:text-gray-900" role="menuitem">Upload Time (Ascending)</button>
                            <button onClick={() => handleFilterChange('uploadDesc')} className="block w-full px-4 py-2 text-sm leading-5 text-gray-700 hover:bg-gray-100 hover:text-gray-900" role="menuitem">Upload Time (Descending)</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

const UploadedFilesTeacher = ({email}) => {
    console.log("page starts here")
    const [files, setFiles] = useState([]);
    const { auth } = useAuth();
    const  [uploadedFiles, setUploadedFiles]= useState([]);
    const [currentFile, setCurrentFile] = useState(null);
    const [showProgress, setShowProgress] = useState(false);
    const [uploadProgress, setUploadProgress] = useState(0); // Track upload progress
    const fileInputRef = useRef(null);

    
    const fetchFiles = async () => {
        console.log("hello1")
        console.log("current file is "+currentFile)
        try {
            const response = await fetch('https://cloud-file-management.onrender.com/api/users/getFile', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email })
            });
            const result = await response.json();
            console.log(result)
            setFiles(result.files);  // Assuming the API returns an array of files
        } catch (error) {
            console.error('Failed to fetch files:', error);
        }

    };

    useEffect(() => {

        fetchFiles();

    }, []);

    
    const handleFileInputChange = (e) => {
        const selectedFiles = Array.from(e.target.files);
        setUploadedFiles([...uploadedFiles, ...selectedFiles]);
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

            const response = await fetch('https://cloud-file-management.onrender.com/api/users/uploadFile', {
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
            fetchFiles();
            setShowProgress(false);
            setUploadProgress(0); // Reset upload progress after completion
        } catch (error) {
            console.log('Error uploading file:', error);
            setShowProgress(false);
            setUploadProgress(0); // Reset upload progress in case of error
        }
    }

    
   
        // {
        //     id: 1,
        //     name: 'Document.pdf',
        //     size: '1.5 MB',
        //     uploadedBy: 'John Doe',
        //     email: 'john@example.com',
        //     uploadDate: '2024-05-03'
        // },
        // {
        //     id: 2,
        //     name: 'Presentation.pptx',
        //     size: '2.3 MB',
        //     uploadedBy: 'Jane Smith',
        //     email: 'jane@example.com',
        //     uploadDate: '2024-05-02'
        // },
        // {
        //     id: 3,
        //     name: 'Image.jpg',
        //     size: '800 KB',
        //     uploadedBy: 'Alice Johnson',
        //     email: 'alice@example.com',
        //     uploadDate: '2024-05-01'
        // }
    
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [searchedFiles, setSearchedFiles] = useState([]);
    const [filterOption, setFilterOption] = useState('');
    const [isFilterOpen, setIsFilterOpen] = useState(false);

    useEffect(() => {
        setSearchedFiles(files?.filter(file =>
            file.fileName.toLowerCase().includes(searchTerm.toLowerCase()) 
            // file.uploadedBy.toLowerCase().includes(searchTerm.toLowerCase()) ||
            // file.email.toLowerCase().includes(searchTerm.toLowerCase())
        ));
    }, [files, searchTerm]);

    const handleDownloadFile = async(fileId,fileURL,fileName) => {
        FileSaver.saveAs(fileURL,fileName);

        console.log('Downloading file with id:', fileId);
        // try {
        //     const secure_url = fileURL; // Assuming fileURL is a valid URL string
        // const response = await fetch('https://cloud-file-management.onrender.com/api/users/downloadFile', {
        //         method: 'POST',
        //         headers: {
        //             'Content-Type': 'application/json'
        //         },
        //         body: JSON.stringify({ secure_url }) // No need for JSON.stringify if secure_url is already a string
        //     });
    
        //     if (!response.ok) {
        //         throw new Error('Failed to delete file');
        //     }
    
        //     const result = await response.json();
        //     console.log(result);
        //     // If you need to perform additional actions after deleting the file
        //     fetchFiles();
        //     // console.log('File deleted successfully:', fileId);
        // } catch (error) {
        //     console.error('Error deleting file:', error);
        // }

    };

    const handleDeleteFile = async (fileId, fileURL) => {
        try {
            const secure_url = fileURL; // Assuming fileURL is a valid URL string
    
            const response = await fetch('https://cloud-file-management.onrender.com/api/users/deleteFile', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ secure_url }) // No need for JSON.stringify if secure_url is already a string
            });
    
            if (!response.ok) {
                throw new Error('Failed to delete file');
            }
    
            const result = await response.json();
            console.log(result);
    
            // If you need to perform additional actions after deleting the file
            fetchFiles();
            // console.log('File deleted successfully:', fileId);
        } catch (error) {
            console.error('Error deleting file:', error);
        }
        console.log('Deleting file with id:', fileId);

    };
    



    const handleDeleteSelectedFiles = () => {
        const remainingFiles = files.filter(file => !selectedFiles.includes(file.id));
        setFiles(remainingFiles);
        setSelectedFiles([]);
        console.log('Deleting selected files:', selectedFiles);
    };

    const toggleSelectFile = (fileId) => {
        setSelectedFiles(prevSelectedFiles => {
            if (prevSelectedFiles.includes(fileId)) {
                return prevSelectedFiles.filter(id => id !== fileId);
            } else {
                return [...prevSelectedFiles, fileId];
            }
        });
    };

    const handleFilterChange = (option) => {
        setFilterOption(option);
        setIsFilterOpen(false);
        switch (option) {
            case 'size':
    setSearchedFiles([...searchedFiles].sort((a, b) => {
        // Function to convert size from bytes to megabytes
        const getSizeInMB = (sizeInBytes) => {
            return parseFloat(sizeInBytes) / (1024 * 1024);
        };

        // Get sizes in MB and compare
        const sizeAInMB = getSizeInMB(a.size);
        const sizeBInMB = getSizeInMB(b.size);
        return sizeAInMB - sizeBInMB;
    }));
    break;

            case 'uploadAsc':
                setSearchedFiles([...searchedFiles].sort((a, b) => new Date(a.uploadDate) - new Date(b.uploadDate)));
                break;
            case 'uploadDesc':
                setSearchedFiles([...searchedFiles].sort((a, b) => new Date(b.uploadDate) - new Date(a.uploadDate)));
                break;
            // case 'Computer Science':
            //     setSearchedFiles(files.filter(file => file.department === 'Computer Science'));
            //     break;
            // case 'Mechanical':
            //     setSearchedFiles(files.filter(file => file.department === 'Mechanical'));
            //     break;
            // case 'Chemical':
            //     setSearchedFiles(files.filter(file => file.department === 'Chemical'));
            //     break;
            // case 'AI/ML':
            //     setSearchedFiles(files.filter(file => file.department === 'AI/ML'));
            //     break;
            default:
                break;
        }
    };



    return (    
        <>
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
    <section className='loading-area px-1 my-2'>
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





        <div className='rounded-xl border border-blue-300'>
            <div className='heading-area border-b border-blue-300 flex justify-start items-center px-5 py-6'>
                <div>
                    <p className='text-gray-600 text-2xl'>Uploaded files</p>
                    <p className='text-[#838AB8] text-sm my-1'>All the files that have been uploaded by you</p>
                </div>
            </div>
            <div className="flex justify-end my-4">
                <div>
                    <input
                        type="text"
                        placeholder="Search..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className={`px-3 py-1 border border-gray-400 rounded-lg mx-1 ${isFilterOpen ? 'w-96' : 'w-64'}`}
                    />
                    <FilterDropdown onChange={(option) => handleFilterChange(option)} />
                </div>
                <div>
                    {/* <button onClick={handleDeleteSelectedFiles} className={`px-3 py-1 bg-red-500 text-white rounded-lg mx-1 ${isFilterOpen ? 'ml-4' : ''}`}>Delete Selected</button> */}
                </div>
            </div>
            <div className="overflow-x-auto
            ">
                <table className="min-w-full bg-blue-100 rounded-lg border">
                    <thead>
                        <tr className="rounded-tl-lg rounded-tr-lg">
                            <th className="px-3 py-4 bg-blue-500 text-left text-xs leading-4 font-medium text-white uppercase tracking-wider" style={{ width: '5%' }}>
                                <input type="checkbox" onChange={(e) => {
                                    if (e.target.checked) {
                                        setSelectedFiles(searchedFiles.map(file => file._id));
                                    } else {
                                        setSelectedFiles([]);
                                    }
                                }} />
                            </th>
                            <th className="p-3 bg-blue-500 text-left text-xs leading-4 font-medium text-white uppercase tracking-wider" style={{ width: '25%' }}>
                                Name
                            </th>
                            <th className="p-3 bg-blue-500 text-left text-xs leading-4 font-medium text-white uppercase tracking-wider" style={{ width: '15%' }}>
                                Size
                            </th>
                            {/* <th className="p-3 bg-blue-500 text-left text-xs leading-4 font-medium text-white uppercase tracking-wider" style={{ width: '20%' }}>
                                Uploaded By
                            </th> */}
                            <th className="p-3 bg-blue-500 text-left text-xs leading-4 font-medium text-white uppercase tracking-wider" style={{ width: '15%' }}>
                                Date of Upload
                            </th>
                            <th className="p-3 bg-blue-500 text-left text-xs leading-4 font-medium text-white uppercase tracking-wider" style={{ width: '20%' }}>
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white rounded-bl-xl rounded-br-xl border-0">
                        {searchedFiles.length === 0 ? (
                            <tr>
                                <td colSpan="6" className="px-3 py-4">No file exists.</td>
                            </tr>
                        ) : (
                            searchedFiles.map(file => (
                                <tr key={file.id} className="hover:bg-gray-100 cursor-pointer border-b border-t">
                                    <td className="p-3 whitespace-no-wrap text-sm leading-5 text-gray-900">
                                        <input type="checkbox" onChange={() => toggleSelectFile(file.id)} checked={selectedFiles.includes(file.id)} />
                                    </td>
                                    <td className="p-3 whitespace-no-wrap text-sm leading-5 font-medium text-gray-900">
                                        {file.fileName}
                                    </td>
                                    <td className="p-3 whitespace-no-wrap text-sm leading-5 text-gray-500">
                                        {file.size}
                                    </td>
                                    {/* <td className="p-3 whitespace-no-wrap text-sm leading-5 flex">
                                        <div className="w-8 h-8 rounded-full bg-blue-300"></div>
                                        <div className="flex flex-col ml-2">
                                            <div>{file.uploadedBy}</div>
                                            <div className="text-xs text-gray-500">{file.email}</div>
                                        </div>
                                    </td> */}
                                    <td className="p-3 whitespace-no-wrap text-sm leading-5 text-gray-500">
                                        {file.uploadDate}
                                    </td>
                                    <td className="p-3 whitespace-no-wrap text-sm leading-5 text-gray-500">
                                        <button onClick={() => handleDownloadFile(file._id,file.fileURL,file.fileName)} className="text-blue-600 underline">Download</button>
                                        <button onClick={() => handleDeleteFile(file._id,file.fileURL)} className="ml-2 text-red-600 underline">Delete</button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
        </>

    );
};

export default UploadedFilesTeacher;



