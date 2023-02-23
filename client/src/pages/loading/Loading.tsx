import './Loading.scss';
import { LinearIndeterminate } from './progress-bar/ProgressBar';

export const Loading: React.FC = () => {
    return (
        <div className="loading-div">
            <img src="/svg/surfingMonkey.svg" alt="surfing monkey" className='surfing-monkey' />
            <div className='progress-bar-div'>
                <LinearIndeterminate />
            </div>
        </div>
    );
}