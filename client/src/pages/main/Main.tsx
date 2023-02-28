import { useMediaQuery } from '@mui/material'
import React from 'react'
import { Outlet } from 'react-router-dom'
import { Header } from '../../components/header/Header'
import './Main.scss'

export const Main: React.FC = () => {
    const isSmallScreen: boolean = useMediaQuery('(max-width: 600px)');

    return (
        <div className='main-area'>
            {isSmallScreen ? <>
                <div className="main-content">
                    <Outlet />
                </div>
            </> : <>
                <Header />
                <img className='right-leaf' src='./svg/Group565.svg' alt='' />
                <img className='left-leaf' src='./svg/Group924.svg' alt='' />
                <div className="main-content">
                    <Outlet />
                </div>
            </>}
        </div>
    )
}