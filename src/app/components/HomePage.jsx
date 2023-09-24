'use client'
import React, { useState } from 'react';
import '../assets/scss/home.scss'
import Navbar from './Navbar';
import Content from './Content';
import ImageForm from './ImageForm';
import AlbumList from './Content/AlbumList';

const HomePage = () => {

    return (
        <div className='body-wrapper'>
            <ImageForm />
            <AlbumList />
        </div>
    )
}

export default HomePage;