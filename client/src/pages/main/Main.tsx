import { Button } from '@mui/material'
import React from 'react'
import { Outlet } from 'react-router-dom'
import { AlertDialog } from '../../components/alert-dialog/AlertDialog'
import { ComputerHeader } from '../../components/computer-header/ComputerHeader'
import './Main.scss'

export const Main: React.FC = () => {

    const handleConfirm = () => {
        console.log('click')
    }

    return (
        <div className='main'>
            <ComputerHeader />
            <img className='right-leaf' src='./svg/Group565.svg' alt='' />
            <img className='left-leaf' src='./svg/Group924.svg' alt='' />
            <div className="content">
                <Outlet />
                <AlertDialog
                    question='הקישור הועתק'
                    description='מצויין! עכשיו אתה יכול לשתף את החידון שלך עם חברים'
                    onConfirm={handleConfirm}
                    showCancelButton={true}
                    triggerButton={(onClick) =>
                        <Button
                            variant="outlined"
                            onClick={onClick}>Click me
                        </Button>}
                />
            </div>
        </div>
    )
}
