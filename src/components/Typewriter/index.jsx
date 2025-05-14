import './index.scss';
import {useState, useEffect} from 'react';

const Typewriter = ({ text, speed = 30 }) => { 
    const [displayedText, setDisplayedText] = useState('');
    const [isDone, setIsDone] = useState(false);

    useEffect(() => {
        if (!text) {
            setDisplayedText('No text provided');
            setIsDone(false);
            return;
        };

        setDisplayedText(text[0] || '');
        setIsDone(false);

        const startDelay = setTimeout(() => {
            let currentIndex = 0;

            const intervalId = setInterval(() => {
                if (currentIndex < text.length - 1 ) {
                    setDisplayedText((prev => prev + text[currentIndex]));
                    currentIndex++;
                } else {
                    clearInterval(intervalId);
                    setIsDone(true);
                }
            }, speed);
            return () => clearInterval(intervalId);
        }, 50);

            return () => clearTimeout(startDelay);
        }, [ text, speed ]);


        return (
            <div className={`typewriter ${isDone ? 'done' : ''}`}>
                {displayedText}
                {!isDone && <span className="cursor">|</span>}
            </div>
        )
}

export default Typewriter;
