"use client";
import styles from './index.module.scss'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import ImageForm from '../ImageForm';
import { imagesStatic } from '../../../../helpers';
import { useEffect, useState } from 'react';
import { collection, deleteDoc, doc, getDocs } from 'firebase/firestore';
import { IMAGE_DB_NAME } from '../../../../constants';
import { db } from '../../../../fireStore';
import { CircularProgress } from '@mui/material';

const ImageList = ({
    list = imagesStatic,
    album
}) => {
    const [loading, setLoading] = useState(false)
    const [images, setImages] = useState([])
    const [editObj, setEditObj] = useState(null)
    const [isCrudSuccess, setIsCrudSuccess] = useState(false)
    const [deleteSuccess, setDeleteSuccess] = useState(false)

    const fetchImages = async () => {
        setLoading(true)
        const snapshot = await getDocs(collection(db, IMAGE_DB_NAME));
        const images = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data()
        }));
        setLoading(false)
        setImages(images)
    }

    useEffect(() => {
        fetchImages()
    }, [])

    useEffect(() => {
        if (isCrudSuccess) {
            fetchImages()
            setIsCrudSuccess(false)
        }
    }, [isCrudSuccess])

    const handleEdit = (e, obj) => {
        setEditObj(obj)
    }

    const handleDelete = async (id) => {
        const res = await deleteDoc(doc(db, IMAGE_DB_NAME, id))
        setDeleteSuccess(true)
    }

    return (
        <div className={styles['img-container']}>
            <ImageForm album={album}
                editObj={editObj} setEditObj={setEditObj}
                setIsCrudSuccess={setIsCrudSuccess}
                deleteSuccess={deleteSuccess}
                setDeleteSuccess={setDeleteSuccess}
            />
            {
                loading ?
                    <CircularProgress color="secondary" /> :
                    !images || images.length === 0 ?
                        <h1>No images found</h1> :
                        <div className={styles['img-list-container']}>
                            {
                                images
                                    .map(item => ({ ...item, url: item.url ?? item.name }))
                                    .map((imageObj, index) => {

                                        return <div key={index} className={styles['img-card']}>
                                            <img className={styles['img']} src={imageObj.url}
                                                alt={imageObj.url?.substring(0, 10)}
                                            />
                                            <div className={styles['icons']}>
                                                <ModeEditIcon className={styles['icon']} color="primary" fontSize='large'
                                                    onClick={e => handleEdit(e, imageObj)}
                                                />
                                                <DeleteForeverIcon className={styles['icon']} color="error" fontSize='large'
                                                    onClick={e => handleDelete(imageObj.id)}
                                                />
                                            </div>
                                        </div>
                                    })
                            }
                        </div>
            }
        </div>
    );
}

export default ImageList;