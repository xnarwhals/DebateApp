import Background from '../Background';
import DebateController from '../DebateController';
import { NavLink } from 'react-router-dom';
import botTwo from '../../assets/images/AIBotOne.png'
import botOne from '../../assets/images/AIBotTwo.png'


import './index.scss';

const Main = () => {

  return (
    <>
        <div className='header'>
            <h1>Media Theory AI Debate</h1>
        </div>
        <div className="container">
            <Background />
            <DebateController />
            <div className="archive-area">
                <NavLink
                    exact="true"
                    to="/archive">
                    <button className="archive-btn">Archive</button>
                </NavLink>
            </div>
            
            
            <div className="chat-ai-one">
              <img src={botOne} alt="AI Bot Two" />
            </div>
            <div className="chat-ai-two">
              <img src={botTwo} alt="AI Bot One" />
            </div>
            
        </div>
    </>
  )
}


export default Main;