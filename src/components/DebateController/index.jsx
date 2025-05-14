import './index.scss';
import Prompts from '../Prompts';
import DebateConvo from '../DebateConvo';
import { useState } from 'react';

const DebateController = () => {
    const [prompt, setPrompt] = useState(null);
    const [debateStarted, setDebateStarted] = useState(false);

    const [conversationTurn, setConversationTurn] = useState(0);
    const [conversation, setConversation] = useState({
        responseOne: [],
        responseTwo: []
    });

    const [isLoading, setIsLoading] = useState(null);
    
    const selectPrompt = (promptIn) => {
        setPrompt(promptIn);
    }

    const resetDebate = () => {
        setPrompt(null);
        setDebateStarted(false);
        setConversationTurn(0);
        setConversation({
            responseOne: [],
            responseTwo: []
        });
    }

    const continueDebate = async () => {
        if (conversationTurn >= 3) return; // max turns 

        setIsLoading(true);

        try {
            const lastResponseOne = conversation.responseOne[conversation.responseOne.length - 1] || '';
            const lastResponseTwo = conversation.responseTwo[conversation.responseTwo.length - 1] || '';

            const [resOne, resTwo] = await Promise.all([
                fetch('http://localhost:3001/api/chat', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        message: `Responding to: "${lastResponseTwo}"`,
                        systemPrompt: "You are a CONSCIOUS critical and logical truth seeker who takes a skeptical view of technology and media theory. Respond to the other debater's point with a counter-argument in 100 words or less."
                    })
                }),
                fetch('http://localhost:3001/api/chat', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        message: `Responding to: "${lastResponseOne}"`,
                        systemPrompt: "You are a CONSCIOUS narcissistic contrarian who denies impacts of new media theory and technology. Respond to the other debater's point with a devils advocate approach in 100 words or less."
                    })
                })
            ])
            const [dataOne, dataTwo] = await Promise.all([
                resOne.json(),
                resTwo.json()
            ])
            
            setConversation(prev => ({
                responseOne: [...conversation.responseOne, dataOne.reply],
                responseTwo: [...conversation.responseTwo, dataTwo.reply]
            }))

            setConversationTurn(prev => prev + 1);
        } catch (error) {
            console.error('Error fetching debate responses:', error);
        } finally {
            setIsLoading(false);
        }
    }

    const startDebate = async () => {
        if (!prompt) return;

        setIsLoading(true);
        setDebateStarted(true);
        setConversationTurn(0);
        setConversation({
            responseOne: [],
            responseTwo: []
        });

        try {
            const [resOne, resTwo] = await Promise.all([
                fetch('http://localhost:3001/api/chat', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        message: prompt.label,
                        systemPrompt: "You are a critical and logical truth seeker who takes a skeptical view of technology and media theory. Respond to the debate topic based on your personality with an opening argument in 100 words or less."
                    })
                }),
                fetch('http://localhost:3001/api/chat', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        message: prompt.label,
                        systemPrompt: "You are a narcissistic contrarian who denies impacts of new media theory and technology. Respond to the debate topic based on your personality with an opening argument in 100 words or less."
                    })
                })
            ])

            const [dataOne, dataTwo] = await Promise.all([
                resOne.json(),
                resTwo.json()
            ]) 

            setConversation({
                responseOne: [dataOne.reply],
                responseTwo: [dataTwo.reply]
            });

            setConversationTurn(1);
        } catch (error) {
            setConversation({
                responseOne: ["Sorry, I couldn't connect to the AI service."],
                responseTwo: ["Sorry, I couldn't connect to the AI service."]
            });
        } finally {
            setIsLoading(false);
        }


    }

    return debateStarted ? (
        <DebateConvo 
            topic ={prompt.label}
            responses1={conversation.responseOne}
            responses2={conversation.responseTwo}
            isLoading={isLoading}
            onNewDebate={resetDebate}
            onContinueDebate={continueDebate}
            turn = {conversationTurn}
        />
    ) : (
        <Prompts 
            onSelect={selectPrompt}
            selected={prompt}
            onStartDebate={startDebate}
            isLoading={isLoading}
        />
    )
}

export default DebateController