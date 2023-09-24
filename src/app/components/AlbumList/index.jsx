import styles from './index.module.scss'

const albums = [
    {
        name: 'Alb1'
    },
    {
        name: 'alb2'
    },
    {
        name: 'alb3'
    },
    {
        name: 'alb4'
    },
    {
        name: 'alb5'
    },
    {
        name: 'alb6'
    },
    {
        name: 'alb7'
    },
]

const AlbumList = ({
    list = albums
}) => {
    return (
        <div className={styles['album-container']}>
            {
                list.map(albumObj => {
                    return <div className={styles['album-card']}>
                        <div className={styles['name']}>
                            {albumObj.name}
                        </div>
                    </div>
                })
            }
        </div>
    );
}

export default AlbumList;