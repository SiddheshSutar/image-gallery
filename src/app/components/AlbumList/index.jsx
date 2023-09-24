import { useEffect, useState } from 'react';
import styles from './index.module.scss'
import { useRouter } from 'next/navigation'
import { albumsStatic } from '../../../../helpers';
import AlbumForm from '../AlbumForm';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../../../fireStore';
import { ALBUM_DB_NAME } from '../../../../constants';
import { CircularProgress } from '@mui/material';

const AlbumList = ({
    list = albumsStatic
}) => {
    const router = useRouter()

    const [loading, setLoading] = useState(false)
    const [albums, setAlbums] = useState([])

    const handleAlbumClick = (e, albumObj) => {
        albumObj.name && router.push(`album/${albumObj.name}`)
    }

    useEffect(() => {
        (async () => {
            setLoading(true)
            const snapshot = await getDocs(collection(db, ALBUM_DB_NAME));
            const albums = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data()
            }));
            setLoading(false)
            setAlbums(albums)
        })()
    }, [])

    return (
        <div className={styles['album-container']}>
            <AlbumForm />
            {
                loading ?
                    <CircularProgress color="secondary" /> :
                    !albums || albums.length === 0 ?
                        <h1>No albums found</h1> :
                        <div className={styles['album-list-container']}>
                            {

                                albums.map((albumObj, index) => {
                                    return <div key={index} className={styles['album-card']}
                                        onClick={e => handleAlbumClick(e, albumObj)}
                                    >
                                        <div className={styles['name']}>
                                            {albumObj.name}
                                        </div>
                                    </div>
                                })
                            }
                        </div>
            }

        </div>
    );
}

export default AlbumList;