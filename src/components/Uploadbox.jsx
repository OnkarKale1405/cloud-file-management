import { useRef, useState } from "react"

const Uploadbox = () => {
    const [files, setFiles] = useState([]);
    const [uploadedFile, setUploadedFile] = useState([]);
    const [showProgress, setShowProgress] = useState(false);
    const fileInputRef = useRef(null);

    const handleFileInputClick = (e) => {
        fileInputRef.current.click();
        setFiles(e.target.files);
    }

    return (
        <div className='upload-box w-full' style={{ overflowX: 'hidden' }}>
            <form>
                <div className='w-full h-[12rem] flex justify-center items-center my-4 bg-blue-100 rounded-xl
                    border-2 border-blue-400 relative'
                    onClick={handleFileInputClick}>
                    <input type="file" name="file" id="file" hidden ref={fileInputRef} />
                    <p className="text-xl text-[#323232]">Browse file to upload</p>
                </div>
            </form>
            {showProgress && (
                <section className='loading-area'>
                    {
                        files.map((file, index) => {
                            <div className='content w-full h-28 bg-blue-100 rounded-lg flex flex-col relative'
                                key={index}>
                                <div className='file-description w-full h-[60%] flex justify-start'>
                                    <div className='h-full w-20 flex justify-center items-center'>
                                        <div className='w-10 h-10 rounded-full bg-blue-300'></div>
                                    </div>
                                    <div className='file-name-size w-[60%] flex flex-col justify-center'>
                                        <p className='text-sm'>{`${file.name} - uploading`}</p>
                                        <p className='text-xs'>200kB</p>
                                    </div>
                                    <div className='w-4 h-4 rounded-full bg-blue-300 absolute top-3 right-3'></div>
                                </div>
                                <div className='upload-status w-full h-[40%] flex items-center ml-20'>
                                    <div className="w-[85%] h-4 bg-white rounded-full">
                                        <span className='bg-blue-400 rounded-full' style={{ width: '${file.loading}%' }}></span>
                                    </div>
                                    <span className='font-semibold text-sm ml-1'>{`${file.loading}%`}</span>
                                </div>
                            </div>
                        })
                    }
                </section>
            )}
        </div>
    )
}

export default Uploadbox
