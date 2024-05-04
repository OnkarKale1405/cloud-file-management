import React from 'react'
import Uploadbox from '../../components/Uploadbox'
import UploadedFilesTable from '../../components/UploadedFilesTable'

const Files = () => {
    return (
        <div>
            <Uploadbox />
            <UploadedFilesTable />
        </div>
    )
}

export default Files
