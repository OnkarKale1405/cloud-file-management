import React from 'react';
import Uploadbox from '../../components/Uploadbox';
import UploadedFilesTeacher from '../../components/UploadedFiles.teacher';
import UploadedFilesStudent from '../../components/UploadFiles.student';

import { useSelector } from 'react-redux';
import { selectCurrentUser } from '../../redux/auth/authSlice';

const Files = () => {
    const user = useSelector(selectCurrentUser);

    return (
        <div className='px-2'>
            {
                user?.role === 2001 ?
                    (
                        <>
                            {/* <Uploadbox /> */}
                            <UploadedFilesTeacher />
                        </>
                    ) : (
                        <UploadedFilesStudent />
                    )
            }
        </div>
    );

    // return (
    //     <div className="px-2">
    //         <Uploadbox />
    //         {/* <UploadedFilesTeacher /> */}
    //         <UploadedFilesStudent />
    //     </div>
    // )
};

export default Files;
