import './App.css';
import React from 'react';
import { Header, Container, Accordion, Icon } from 'semantic-ui-react';
import ForceHeader from './components/forceHeader';
import UnitCard from './components/unitCard';
import OrderOfBattle from './components/orderOfBattle';
import FrontPage from './components/frontPage';
import BattleSetup from './components/battleSetup';
import BattleResolution from './components/battleResolution';
import BattleHistory from './components/battleHistory';
import { useSelector, useDispatch } from 'react-redux';
import { toggleHelp } from './reducers/pagesSlice';
import HELP from './constants/help';

const App = () => {
  const dispatch = useDispatch()
  const navTo = useSelector((state) => state.pages)
  return (
    <div className="App">
      <div className="App-header">
        <Header inverted as='h1'>Crusade Tracker</Header>
      </div>
      <Container>
        <Accordion styled fluid>
          <Accordion.Title
          active={navTo.help}
          onClick={() => dispatch(toggleHelp())}>
            <Icon name='dropdown' />
            {HELP[navTo.page].title}
          </Accordion.Title>
          <Accordion.Content 
          active={navTo.help}
          className='lineBreak messageText'>
            {HELP[navTo.page].content}
          </Accordion.Content>
        </Accordion>
        {(() => {
          switch (navTo.page) {
            case 'FRONT':
              return <FrontPage />
            case 'MAIN':
              return <><ForceHeader listId={navTo.currentListId} /><OrderOfBattle /></>;
            case 'ADD':
              return <UnitCard />;
            case 'BATTLESETUP':
              return <BattleSetup />;
            case 'BATTLERES':
              return <BattleResolution battleId={navTo.battle}/>;
            case 'BATTLEHISTORY':
              return <BattleHistory />;
            case 'EDIT':
              return <UnitCard unitId={navTo.editId} />; 
            default:
              return null;
          }
        })()}
      </Container>
    </div>
  )
}


export default App;
