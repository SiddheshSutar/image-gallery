import React from 'react'
import styles from './index.module.scss'

const Navbar = () => {
    return ( 
        <div className={styles['main-nav']}>
            Nav
            <p className={styles['blue']}>
                BLUE
            </p>
        </div>
    );
}
 
export default Navbar;