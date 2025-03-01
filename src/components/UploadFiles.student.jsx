import React, { useState, useEffect } from 'react';
import useAuth from '../hooks/useAuth';
import FileSaver from 'file-saver';

const FilterDropdown = ({ onChange }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [isDepartmentOpen, setIsDepartmentOpen] = useState(false);

    const handleFilterChange = (option) => {
        onChange(option);
        setIsOpen(false);
    };

    return (
        <div className="relative inline-block text-left">
            <div>
                <button
                    type="button"
                    onClick={() => setIsOpen(!isOpen)}
                    className={`inline-flex justify-center w-full px-4 py-2 text-sm font-medium leading-5 text-white transition duration-150 ease-in-out bg-blue-500 border border-transparent rounded-md shadow-sm hover:bg-blue-600 focus:outline-none focus:border-blue-700 focus:shadow-outline-blue active:bg-blue-700 ${isOpen ? 'rounded-t-md' : ''}`}
                    id="options-menu"
                    aria-haspopup="true"
                    aria-expanded="true"
                >
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
                            {/* Nested dropdown for departments */}
                            <div
                                onMouseEnter={() => setIsDepartmentOpen(true)}
                                className="relative"
                            >
                                <button
                                    onClick={() => { }} // handle department dropdown
                                    className="block w-full px-4 py-2 text-sm leading-5 text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                                    role="menuitem"
                                >
                                    Departments
                                    <svg className="ml-2 h-5 w-5 inline-block" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M6.293 7.293a1 1 0 0 1 1.414 0L10 9.586l2.293-2.293a1 1 0 1 1 1.414 1.414l-3 3a1 1 0 0 1-1.414 0l-3-3a1 1 0 0 1 0-1.414z" />
                                    </svg>
                                </button>
                                {/* Nested dropdown content */}
                                {isDepartmentOpen && (
                                    <div
                                        onMouseEnter={() => setIsDepartmentOpen(true)}
                                        onMouseLeave={() => setIsDepartmentOpen(false)}
                                        className="origin-top-left absolute left-0 mt-2 w-56 rounded-md shadow-lg"
                                    >
                                        <div className="bg-white rounded-md shadow-xs">
                                            <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                                                <button onClick={() => handleFilterChange('Computer Science')} className="block w-full px-4 py-2 text-sm leading-5 text-gray-700 hover:bg-gray-100 hover:text-gray-900" role="menuitem">Computer Science</button>
                                                <button onClick={() => handleFilterChange('Mechanical')} className="block w-full px-4 py-2 text-sm leading-5 text-gray-700 hover:bg-gray-100 hover:text-gray-900" role="menuitem">Mechanical</button>
                                                <button onClick={() => handleFilterChange('Chemical')} className="block w-full px-4 py-2 text-sm leading-5 text-gray-700 hover:bg-gray-100 hover:text-gray-900" role="menuitem">Chemical</button>
                                                <button onClick={() => handleFilterChange('AI/ML')} className="block w-full px-4 py-2 text-sm leading-5 text-gray-700 hover:bg-gray-100 hover:text-gray-900" role="menuitem">AI/ML</button>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

const UploadedFilesStudent = ({email}) => {
    const {auth}=useAuth();
    console.log(email);
    const [files, setFiles] = useState([]);
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [searchedFiles, setSearchedFiles] = useState([]);
    const [filterOption, setFilterOption] = useState('');
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    // const email=auth.email;
    console.log(email);
    const [user,setUser]=useState("");

    const fetchFiles = async () => {
        console.log("hello1")
        // console.log("current file is "+currentFile)
        try {
            const response = await fetch('https://cloud-file-management.onrender.com/api/users/getFile', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({email})
            });
            const result = await response.json();
            console.log(result)
            setFiles(result.files);
            setUser(result.user);  // Assuming the API returns an array of files
        } catch (error) {
            console.error('Failed to fetch files:', error);
        }

    };

    useEffect(() => {

        fetchFiles();

    }, []);


    useEffect(() => {
        setSearchedFiles(files.filter(file =>
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
    
    

    const handleDeleteFile = (fileId) => {
        setFiles(prevFiles => prevFiles.filter(file => file.id !== fileId));
        setSelectedFiles(prevSelectedFiles => prevSelectedFiles.filter(id => id !== fileId));
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
                    const getSizeValue = (size) => {
                        const [value, unit] = size.split(' ');
                        return unit === 'MB' ? parseFloat(value) * 1024 : parseFloat(value);
                    };
                    return getSizeValue(a.size) - getSizeValue(b.size);
                }));
                break;
            case 'uploadAsc':
                setSearchedFiles([...searchedFiles].sort((a, b) => new Date(a.uploadDate) - new Date(b.uploadDate)));
                break;
            case 'uploadDesc':
                setSearchedFiles([...searchedFiles].sort((a, b) => new Date(b.uploadDate) - new Date(a.uploadDate)));
                break;
            default:
                break;
        }
    };


    return (
        <div className='rounded-xl border border-blue-300 my-4'>
            <div className="flex justify-end px-3 py-4">
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
                    <button onClick={handleDeleteSelectedFiles} className={`px-3 py-1 bg-red-500 text-white rounded-lg mx-1 ${isFilterOpen ? 'ml-4' : ''}`}>Delete Selected</button>
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
                                        setSelectedFiles(searchedFiles.map(file => file.id));
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
                                            <div>{user.firstName}</div>
                                            <div className="text-xs text-gray-500">{auth.email}</div>
                                        </div>
                                    </td> */}
                                    <td className="p-3 whitespace-no-wrap text-sm leading-5 text-gray-500">
                                        {file.uploadDate}
                                    </td>
                                    <td className="p-3 whitespace-no-wrap text-sm leading-5 text-gray-500">
                                        <button onClick={() => handleDownloadFile(file.id,file.fileURL,file.fileName)} className="text-blue-600 underline">Download</button>
                                        {/* <button onClick={() => handleDeleteFile(file.id)} className="ml-2 text-red-600 underline">Delete</button> */}
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default UploadedFilesStudent;
