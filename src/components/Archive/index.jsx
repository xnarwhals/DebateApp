import './index.scss';
import {useState} from 'react'; 
import ExpandCard from '../ExpandCard';
import archiveData from './ArchiveData';
import { NavLink } from 'react-router-dom';

const Archive = () => {
    const [expandedCardId, setExpandedCardId] = useState(null);

    const handleCardToggle = (cardId) => {
        if (expandedCardId === cardId) {
            setExpandedCardId(null);
        } else {
            setExpandedCardId(cardId);
        }
    }

    return (
        <>
            <div className='header'>
                <h1>Archive</h1>
            </div>
            <div className='container archive-page'>
                <div className="debate-card-holder">
                    {archiveData.map((debate) => (
                        <ExpandCard
                            key={debate.id}
                            id={debate.id}
                            topic={debate.topic}
                            image={debate.image}
                            responses={debate.responses}
                            expanded={expandedCardId === debate.id}
                            onToggle={handleCardToggle}
                        />
                    ))}
                </div>
                <div className="back-to-main">
                    <NavLink
                        exact="true"
                        to="/">
                        <button className="archive-btn">Back to Debate</button>
                    </NavLink>
                </div>
            </div>
        </>
    )
}

export default Archive;