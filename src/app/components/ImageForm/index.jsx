'use client'
import React, { useState } from 'react';
import styles from './index.module.scss'
import { UploadOutlined } from '@ant-design/icons';
import { Button, message, Upload } from 'antd';
import { ref, uploadBytes } from 'firebase/storage';
import { storage } from '../../../../fireStore';

const ImageForm = () => {
    
    // const [file, setFile] = useState(null)
    
    const uploadImage = (options) => {
    const { onSuccess, onError, file, onProgress } = options;
        
        console.log('hex file: ', file)
        
        if(!file) return 
        // if(file) return 
        
        const storageRef = ref(storage, `images/${file.name}`);
        // const storageRef = ref(storage);

        // 'file' comes from the Blob or File API
        uploadBytes(storageRef, file).then((snapshot) => {
            console.log('hex sn: ', snapshot)
            console.log('Uploaded a blob or file!');
        })
        // .catch(err => {
        //     console.log('hex sn err: ', err)
        // });
    }

    const props = {
        name: 'file',
        // action: 'https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188',
        action: 'http://localhost:8080/api/upload',
        // headers: {
        //     authorization: 'authorization-text',
        // },
        customRequest: uploadImage,
        accept: 'image/jpg,image/png,image/jpeg',
        onChange(info) {
            if (info.file.status !== 'uploading') {
                console.log(info.file, info.fileList);
            }
            if (info.file.status === 'done') {
                message.success(`${info.file.name} file uploaded successfully`);
            } else if (info.file.status === 'error') {
                message.error(`${info.file.name} file upload failed.`);
            }
        },
    };

    return (
        <div className={`container ${styles.temp}`}>
            <div className={styles.form}>
                <Upload {...props}>
                    <Button icon={<UploadOutlined />}>Click to Upload</Button>
                </Upload>
            </div>
        </div>
    )
}

export default ImageForm;