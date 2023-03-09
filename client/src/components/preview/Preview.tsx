import { usePlayQuiz } from '../../contexts/PlayQuizContext'
import './Preview.scss'

export const Preview: React.FC = () => {
    const { backToEdit } = usePlayQuiz();
    return (
        <div className='preview-div'>
            <p className='preview-par'>תצוגה מקדימה</p>
            <button className='preview-btn' onClick={backToEdit}>חזרה לעריכה</button>
        </div>
    )
}