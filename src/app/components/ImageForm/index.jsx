'use client'
import React, { useState } from 'react';
import styles from './index.module.scss'
import { UploadOutlined } from '@ant-design/icons';
import { Button, message, Modal, Upload } from 'antd';
import { ref, uploadBytes } from 'firebase/storage';
import { storage } from '../../../../fireStore';
import { getBase64 } from '../../../../helpers';

const ImageForm = () => {
    
    // const [file, setFile] = useState(null)
    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState('');
    const [previewTitle, setPreviewTitle] = useState('');
    
    const uploadImage = (options) => {
        const { onSuccess, onError, file, onProgress } = options;
        
        if(!file) return 
        
        const storageRef = ref(storage, `images/${file.name}`);

        // 'file' comes from the Blob or File API
        uploadBytes(storageRef, file).then((snapshot) => {
            console.log('Uploaded a blob or file!');
            file.status = 'done'
        })
    }

    const handlePreview = async (file) => {
        console.log('hex: ', file)
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }

        setPreviewImage(file.url || (file.preview));
        setPreviewOpen(true);
        setPreviewTitle(file.name || file.url.substring(file.url.lastIndexOf('/') + 1));
    }

    const props = {
        name: 'file',
        // action: 'https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188',
        action: 'http://localhost:8080/api/upload',
        // headers: {
        //     authorization: 'authorization-text',
        // },
        // customRequest: uploadImage,
        accept: 'image/jpg,image/png,image/jpeg',
        multiple: false,
        onChange(info) {

            if (info.file.status !== 'uploading') {
                // console.log(info.file, info.fileList);
                const storageRef = ref(storage, `images/${info.file.name}`);
        
                // 'file' comes from the Blob or File API
                uploadBytes(storageRef, info.file).then((snapshot) => {
                    info.file.status = 'done'
                })
            }
            if (info.file.status === 'done') {
                message.success(`${info.file.name} file uploaded successfully`);
            } else if (info.file.status === 'error') {
                message.error(`${info.file.name} file upload failed.`);
            }
        },
        onPreview: handlePreview
    };

    const handleCancel = () => setPreviewOpen(false);

    return (
        <div className={`container ${styles.temp}`}>
            <div className={styles.form}>
                <Upload {...props}>
                    <Button icon={<UploadOutlined />}>Click to Upload</Button>
                </Upload>
                <Modal open={previewOpen} title={previewTitle} footer={null} onCancel={handleCancel}>
                    <img alt="example" style={{ width: '100%' }} src={previewImage} />
                </Modal>
            </div>
        </div>
    )
}

export default ImageForm;