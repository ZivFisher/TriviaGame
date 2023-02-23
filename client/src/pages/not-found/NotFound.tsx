import './NotFound.scss';

export const NotFoundContent: React.FC = () => {
    return (
        <div>
            <div className='not-found-div'>
                <p className='number-par'>4</p>
                <img src="/svg/404monkey.svg" alt="monkey" className='think-monkey'/>
                <p className='number-par'>4</p>
            </div>
            <p className='text-par'>עמוד זה אינו קיים</p>
        </div>
    );
}