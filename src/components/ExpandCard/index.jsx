import { useState } from 'react';
import './index.scss';

const ExpandCard = ({id, topic, image, responses, expanded, onToggle}) => {
    // const [expanded, setExpanded] = useState(false);
    const [currentChunk, setCurrentChunk] = useState(0);

    const agentOneLines = responses.agentOne.text.split(':');
    const agentTwoLines = responses.agentTwo.text.split(':');

    const allResponses = [];
    for (let i = 0; i < 3; i++) {
        allResponses.push(agentOneLines[i]);
        allResponses.push(agentTwoLines[i]);
    }

    const currentResponse = allResponses[currentChunk];

    const getSpeaker = (index) => {
        return index % 2 === 0 ? "Agent One" : "Agent Two";
    }

    const goToPrevResponse = () => {
        setCurrentChunk(prev => (prev > 0 ? prev - 1: 0));
    }

    const goToNextResponse = () => {
        setCurrentChunk(prev => (prev < 5 ? prev + 1 : prev));
    }

    if (!expanded && currentChunk !== 0) {
        setCurrentChunk(0);
    }

    return (
        <div className={`expand-card ${expanded ? 'expanded' : 'compact'}`}>
            {!expanded ? (
                <div className="card-preview" onClick={() => onToggle(id)}>
                    <img src={image} alt={topic} />
                </div>
            ) : (
                <div className="card-expanded">
                    <h3>{topic}</h3>
                    <div className="response-text">
                        <h4>{getSpeaker(currentChunk)}</h4>
                        <div className="turn-index">Turn {Math.floor(currentChunk/2) + 1} of 3</div>
                            <div className="response-side">
                                <p>{currentResponse}</p>
                            </div>
                    </div>
                    <div className="buttons">
                        <button onClick={goToPrevResponse} disabled={currentChunk == 0}>Prev</button>
                        <button onClick={() => onToggle(id)}>Close</button>
                        <button onClick={goToNextResponse} disabled={currentChunk == 5}>Next</button>
                    </div>
                    
                </div>
            )}
        </div>
    )
}

export default ExpandCard;