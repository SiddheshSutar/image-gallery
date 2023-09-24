import { useRef, useState } from 'react'
import styles from './index.module.scss'
import { addDoc, collection } from 'firebase/firestore'
import { db } from '../../../../../../fireStore'
import { ALBUM_DB_NAME } from '../../../../../../constants'
import CustomSnackbar from '@/app/components/Snackbar'

const AlbumForm = () => {

    const [albumName, setAlbumName] = useState('')
    const [open, setopen] = useState(false)
    const inp = useRef(null)

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!albumName) {
            setopen(true)
            inp.current.focus()
            return
        }

        const albumRef = collection(db, ALBUM_DB_NAME);
        const docRef = await addDoc(albumRef, {
            name: albumName
        });

        inp.current.focus()
    }
    return (
        <div className={styles['container']}>
            <form onSubmit={handleSubmit}>
                <input ref={inp} type='text' name="albumname" value={albumName}
                    onChange={e => {
                        setAlbumName(e.target.value)
                    }}
                />
                <button type='clear'
                    onClick={e => {
                        setAlbumName('')
                        inp.current.focus()
                    }}
                >Clear</button>
                <button type='submit'>Create</button>
            </form>
            <CustomSnackbar
                open={open}
                onClose={() => setopen(false)}
                message="Please enter album name"
                severity={"error"}
            />
        </div>
    );
}

export default AlbumForm;