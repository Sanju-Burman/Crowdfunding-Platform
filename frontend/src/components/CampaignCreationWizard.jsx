import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import '../styles/upload.css'
const MediaUpload = () => {
    const [mediaFiles, setMediaFiles] = useState([]);

    const onDrop = (Files) => {
        const newFiles = Files.map((file) => ({ file, progress: 0 }));
        const updatedFiles = [...mediaFiles, ...newFiles];

        setMediaFiles(updatedFiles)

        newFiles.forEach((fileProgress) => {
            const totalIndex = updatedFiles.findIndex(f => f.file === fileProgress.file);
            const interval = setInterval(() => {
                setMediaFiles((prevFiles) => {
                    const updatedFiles = [...prevFiles];
                    const progressValue = updatedFiles[totalIndex].progress + 10;
                    updatedFiles[totalIndex].progress = progressValue >= 100 ? 100 : progressValue;
                    if (progressValue >= 100) {
                        clearInterval(interval);
                        
                    }
                    return updatedFiles;
                });
            }, 500);
        });
    };
    const { getRootProps, getInputProps } = useDropzone({
        accept: { 'image/*': [], 'video/*': [] },
        onDrop
    });
    const removeFile = (index) => {
        setMediaFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
    };
    return (
        <div className="media-upload-container">
            <h2>Media Upload</h2>
            <div {...getRootProps({ className: 'dropzone' })}>
                <input {...getInputProps()} />
                <p>Drag & drop images or videos here, or click to select files</p>
            </div>
            <div id="media-preview">
                {mediaFiles.map((fileProgress, index) => (
                    <div key={index} className="media-item">
                        {fileProgress.file.type.startsWith("image/") && (
                            <img src={URL.createObjectURL(fileProgress.file)} alt="Uploaded Media" width="100" />
                        )}
                        {fileProgress.file.type.startsWith("video/") && (
                            <video src={URL.createObjectURL(fileProgress.file)} width="100" controls />
                        )}
                        <div className="progress-indicator">
                            {fileProgress.progress}% uploaded
                        </div>
                        <button className="cancel-button" onClick={() => removeFile(index)}>Cancel</button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MediaUpload;

