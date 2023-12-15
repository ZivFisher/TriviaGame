import { IconButton } from '@mui/material';
import './UploadImage.scss'

interface UploadImageProps {
    imageSrc: string | undefined;
    questionId?: number;
    deleteImg: (questionId?: number) => void;
    className?: string;
}

export const UploadImage: React.FC<UploadImageProps> = ({ imageSrc, questionId, deleteImg, className }) => {

    return (
        <div className={`uploaded-image-div ${className || ''}`} >
            <img src={imageSrc} className='uploaded-image' />
            {questionId ?
                <IconButton
                    className='delete-image'
                    onClick={() => deleteImg(questionId)}
                >
                    <img src="/svg/trash.svg" className='delete-image-icon' />
                </IconButton>
                :
                <IconButton
                    className='delete-image'
                    onClick={() => deleteImg()}
                >
                    <img src="/svg/trash.svg" className='delete-image-icon' />
                </IconButton>}
        </div>
    )
}