import "./index.scss";
import Dropdown from "../Dropdown";
import { useState } from 'react';

const Prompts = ({onSelect, selected, onStartDebate, isLoading}) => {
    const debateTopics = [
        { value: 'option1', label: `Is McLuhan's "the medium is the message" still relevant in an era of increased propaganda and misinformation?`},
        { value: 'option2', label: `In a postmodern context is Donna Haraway's cyborg manifesto relevant to AI's growing role in human society?`},
        { value: 'option3', label: `If AI conversation is optimized for information density or relevance, does nuance, mystery, and metaphor get lost in translation?`},
        { value: 'option4', label: `Have social media fitness influencers contributed to body dysmorphia among men or promoted healthier lifestyles?`}
      ];

    return (
        <div className="prompts-container">
            <h2>Select a Debate Topic</h2>
            <div className="dropdown-wrapper">
                <Dropdown 
                    options={debateTopics} 
                    onSelect={onSelect}
                    selected={selected}
                    placeholder="Choose a media theory topic to debate"
                />
            </div>
            
            {selected && (
                <div className="selected-prompt">
                    <button 
                        className="start-debate-btn"
                        onClick={onStartDebate}
                        disabled = {isLoading}
                    >
                       {isLoading ? 'Loading...' : 'Start Debate'}
                    </button>
                </div>
            )}
        </div>
    )
}


export default Prompts;