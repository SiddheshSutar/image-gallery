'use client'
import React, { useEffect, useState } from 'react';
import styles from './index.module.scss'
import { UploadOutlined } from '@ant-design/icons';
import { Button, message, Modal, Upload } from 'antd';
import { ref, uploadBytes, listAll, getDownloadURL } from 'firebase/storage';
import { storage } from '../../../../fireStore';
import { getBase64 } from '../../../../helpers';

const ImageForm = () => {

    // const [file, setFile] = useState(null)
    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState('');
    const [previewTitle, setPreviewTitle] = useState('');

    const listRef = ref(storage, 'images');
    
    const fetchImages = async () => {
        const resp = await listAll(listRef)
            // .then((res) => {
            //     res.prefixes.forEach((folderRef) => {
            //         // All the prefixes under listRef.
            //         // You may call listAll() recursively on them.
            //     });
            //     res.items.forEach((itemRef) => {
            //         // All the items under listRef.

            //     });
            //     return resp
            // }).catch((error) => {
            //     // Uh-oh, an error occurred!
            // });

            // return resp

        // let result = await storageRef.child('images').listAll();
        // let result = await ref(storage, 'images').listAll();
        // let urlPromises = result.items.map(imageRef => imageRef.getDownloadURL());

        // return Promise.all(urlPromises);

        const storageRef = ref(storage, 'images');
    const result = await listAll(storageRef);
  
    const urlPromises = result.items.map((imageRef) => getDownloadURL(imageRef));
  
    return Promise.all(urlPromises);

    }

    useEffect(() => {
        // const listRef = ref(storage, 'images');
        const imRef = ref(storage, 'images/polling_ER_1.5.2.PNG');

        // const loadImages = async () => {
        //     const urls = await fetchImages();
        //     console.log('hex: ', urls)
        //     const img = document.getElementById('preview-img');
        //     img.setAttribute('src', urls[0]);
        //     // setFiles(urls);


        // }
        // loadImages();
        

        getDownloadURL(ref(storage, 'images/polling_ER_1.5.2.PNG'))
            .then((url) => {

                // This can be downloaded directly:
                // const xhr = new XMLHttpRequest();
                // xhr.responseType = 'blob';
                // xhr.onload = (event) => {
                //     const blob = xhr.response;

                // };
                // xhr.open('GET', url);
                // xhr.send();

                // Or inserted into an <img> element
            console.log('hexD: ', url)

                const img = document.getElementById('preview-img');
                img.setAttribute('src', url);
            })
            .catch((error) => {
                // A full list of error codes is available at
                // https://firebase.google.com/docs/storage/web/handle-errors
                switch (error.code) {
                    case 'storage/object-not-found':
                        // File doesn't exist
                        break;
                    case 'storage/unauthorized':
                        // User doesn't have permission to access the object
                        break;
                    case 'storage/canceled':
                        // User canceled the upload
                        break;

                    // ...

                    case 'storage/unknown':
                        // Unknown error occurred, inspect the server response
                        break;
                }
            });

    }, [])

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
                    handlePreview(info.file)

                    // const listRef = ref(storage, 'images');

                    // listAll(listRef)

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
                {
                    // previewOpen && <img id="preview-img" alt="img" style={{ width: '100%' }} src={previewImage} />
                    true && <img id="preview-img" alt="img" width={100} height={100} src={previewImage} />
                }
            </div>
        </div>
    )
}

export default ImageForm;