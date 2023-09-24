import styles from './index.module.scss'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import ModeEditIcon from '@mui/icons-material/ModeEdit';

const images = [
    {
        name: 'temp1',
        url: 'https://images.pexels.com/photos/276267/pexels-photo-276267.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    },
    {
        name: 'temp2',
        url: 'https://images.pexels.com/photos/11229780/pexels-photo-11229780.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    },
    {
        name: 'temp3',
        url: 'https://images.pexels.com/photos/10545418/pexels-photo-10545418.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    },
    {
        name: 'temp4',
        url: 'https://images.pexels.com/photos/12681211/pexels-photo-12681211.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load'
    },
]

const ImageList = ({
    list = images
}) => {
    return (
        <div className={styles['img-container']}>
            {
                list.map(imageObj => {

                    return <div className={styles['img-card']}>
                        <img className={styles['img']} src={imageObj.url} alt={imageObj.name} />
                        <div className={styles['icons']}>
                            <DeleteForeverIcon className={styles['icon']} color="error" fontSize='large' />
                            <ModeEditIcon className={styles['icon']} color="primary" fontSize='large' />
                        </div>
                    </div>
                })
            }
        </div>
    );
}

export default ImageList;