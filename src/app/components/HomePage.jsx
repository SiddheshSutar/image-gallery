'use client'
import React, { useState } from 'react';
import '../assets/scss/home.scss'
import Navbar from './Navbar';
import Content from './Content';

const HomePage = () => {

    return (
        <div className='body-wrapper'>
            <Navbar />
            <Content />
        </div>
    )
}

export default HomePage;