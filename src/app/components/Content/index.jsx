'use client'
import React, { useState } from 'react';
import styles from './index.module.scss'
import ImageForm from '../ImageForm';
import ImageList from '../ImageList';
import AlbumList from '../AlbumList';

const Content = () => {

    return (
        <div className={styles.red}>
            <ImageForm />
            {/* <ImageList /> */}
            <AlbumList />
        </div>
    )
}

export default Content;