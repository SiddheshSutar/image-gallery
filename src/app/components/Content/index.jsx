'use client'
import React, { useState } from 'react';
import styles from './index.module.scss'
import ImageForm from '../ImageForm';

const Content = () => {

    return (
        <div className={styles.red}>
            <ImageForm />
        </div>
    )
}

export default Content;