import React from 'react';
import Uploadbox from '../../components/Uploadbox';
import UploadedFilesTeacher from '../../components/UploadedFiles.teacher';
import UploadedFilesStudent from '../../components/UploadFiles.student';

import useAuth from '../../hooks/useAuth';

const Files = () => {
    const { auth } = useAuth();
    console.log(auth);

    return (
        <div className='px-2'>
            {
                auth?.role === 2001 ?
                (
                    <>
                        <Uploadbox />
                        <UploadedFilesTeacher email={auth.email}/>
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
