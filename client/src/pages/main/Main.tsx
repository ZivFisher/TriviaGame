import React from 'react'
import { Outlet } from 'react-router-dom'
import { ComputerHeader } from '../../components/computer-header/ComputerHeader'
import './Main.scss'

export const Main: React.FC = () => {
    return (
        <div className='main'>
            <ComputerHeader />
            <img className='right-leaf' src='./svg/Group565.svg' alt='' />
            <img className='left-leaf' src='./svg/Group924.svg' alt='' />
            <div className="content">
                <Outlet />
            </div>
        </div>
    )
}
