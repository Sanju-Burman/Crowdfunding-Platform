import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import axios from 'axios';
import '../styles/upload.css'
const MediaUpload = ({ data, updateData, nextStep, prevStep }) => {
    const [mediaFiles, setMediaFiles] = useState(data.media||[]);
    const uploadedMedias = () => {
        let medias = [];

        mediaFiles.forEach(async (fileProgress) => {
            const dataForm = new FormData();
            dataForm.append("file", fileProgress.file);
            dataForm.append("upload_preset", "CrowdfundingDB");
            let folder = fileProgress.file.type.startsWith("image") ? "image" : "vedios";
            dataForm.append('folder', folder);
    
            try {
                const res = await axios.post(
                    `https://api.cloudinary.com/v1_1/diyl4omcs/${folder}/upload`,
                    dataForm,
                    {
                        onUploadProgress: (ProgressEvent) => {
                                const percent = Math.round((ProgressEvent.loaded / ProgressEvent.total) * 100);
                                setMediaFiles((prevFiles) => {
                                    const updatedFiles = [...prevFiles];
                                    const totalIndex = updatedFiles.findIndex(f => f.file === fileProgress.file);
                                    updatedFiles[totalIndex].progress = percent;
                                    return updatedFiles;
                                });
                        }
                    }
                );
                medias.push({url:res.data.url, type:folder});
                console.log("Uploaded Successfully:", medias)
            } catch (e) {
                console.error("Uploading error :",e)
            }
    
        });
        return medias;
    }
    const onDrop = (Files) => {
        const newFiles = Files.map((file) => ({ file, progress: 0 }));

        setMediaFiles((prev) => [...prev, ...newFiles])
    };
    const { getRootProps, getInputProps } = useDropzone({
        accept: { 'image/*': [], 'video/*': [] },
        onDrop
    });
    const removeFile = (index) => {
        setMediaFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
    };
    const handleNext = async () => {
        const uploadedFiles = await uploadedMedias();
        console.log(uploadedFiles);
        updateData({ media: uploadedFiles });
        nextStep();
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
            <button className='prev-button' onClick={prevStep} >prev</button>
            <button className='next-button' onClick={handleNext} >Next</button>
        </div>
    );
};

export default MediaUpload;

