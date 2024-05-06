import { createContext, useState, useEffect, useContext } from "react";

const FilesContext = createContext({});


export const FilesProvider = ({ children }) => {
    const [uploadedFiles, setUploadedFiles] = useState([]);
    
    return (
        <FilesContext.Provider value={{ uploadedFiles, setUploadedFiles }}>
            {children}
        </FilesContext.Provider>
    );
};

export const useFiles = () => useContext(FilesContext);
export default FilesContext;
