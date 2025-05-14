import "./index.scss";
import Typewriter from "../Typewriter";
import { useState, useEffect } from 'react';


const DebateConvo = ({topic, responses1, responses2, isLoading, onNewDebate, onContinueDebate, turn}) => {

    const curResOne = responses1.length > 0 ? responses1[responses1.length - 1] : "";
    const curResTwo = responses2.length > 0 ? responses2[responses2.length - 1] : "";

    const [loadingDots, setLoadingDots] = useState("");
    const [loadingMessage, setLoadingMessage] = useState("Thinking");

    const loadingMessages = [
        "Debating internally...",
        "Consulting media theory texts...",
        "Formulating arguments...",
        "Considering counterpoints...",
        "Searching for witty comebacks...",
        "Analyzing opponent's logic...",
        "Consulting McLuhan...",
        "Referencing media history...",
        "Building dialectical response..."
    ]

    useEffect(() => {
        if (!isLoading) return;

        const messageInterval = setInterval(() => {
            const randomIndex = Math.floor(Math.random() * loadingMessages.length);
            setLoadingMessage(loadingMessages[randomIndex]);
        }, 4000);

        const dotInterval = setInterval(() =>{
            setLoadingDots(prev => {
                if (prev.length >= 3) return '';
                return prev + ".";
            })
        }, 500)

        return () => {
            clearInterval(messageInterval);
            clearInterval(dotInterval);
        }
    }, [isLoading]);

    return (
        <div className='debate-container'>
            <h2 className='debate-topic'>{topic}</h2>
            <div className='debate-content'>

                <div className='ai-response-left'>
                    <div className='response-box'>
                        <h4>Turn {turn} </h4>
                        {isLoading ? (
                            <div className='loading'>
                                <div className='loading-message'>
                                    {loadingMessage}{loadingDots}
                                </div>
                                <div className="loading-progress" />
                            </div>
                        ) : (
                            <Typewriter text={curResOne} key={`response1-${turn}`} />
                        )}
                    </div>
                </div>

                <div className='ai-response-right'>
                    <div className='response-box'>
                        <h4>Turn {turn} </h4>
                        {isLoading ? (
                            <div className='loading'>
                                <div className='loading-message'>
                                    {loadingMessage}{loadingDots}
                                </div>
                                <div className="loading-progress" />
                            </div>
                        ) : (
                            <Typewriter text={curResTwo} key={`response2-${turn}`}/>
                        )}
                    </div>
                </div>

            </div>

            <div className='debate-controls'>
                {turn < 3 && (
                    <button className="continue-debate-btn"
                        onClick={onContinueDebate}
                        disabled={isLoading}
                    >
                        {isLoading ? 'Thinking Mode...' : 'Continue Debate'}
                    </button>
                )}

            <button className='new-debate-btn' onClick={onNewDebate}>New Topic</button>
            {isLoading && 
                <div className="loading-tip">
                    <p>Tip: Local AI models may take 30-60 seconds to generate responses</p>
                </div>
            }
        </div>
    </div>
    )
}


export default DebateConvo;