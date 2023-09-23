'use client'
import React, { useState } from 'react';
import styles from './index.module.scss'
import ImageForm from '../ImageForm';
import ImageList from '../ImageList';

const Content = () => {

    return (
        <div className={styles.red}>
            <ImageForm />
            <ImageList />
        </div>
    )
}

export default Content;