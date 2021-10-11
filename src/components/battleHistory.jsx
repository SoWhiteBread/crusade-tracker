import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Card, Button, Segment } from 'semantic-ui-react';
import { selectBattles } from '../reducers/battlesSlice';
import { changePage } from '../reducers/pagesSlice';
import BattleHistoryListing from './battleHistoryListing';

const style = {
  paddingBottom: 10
}


const BattleHistory = () => {
  const dispatch = useDispatch()
  const battles = useSelector(selectBattles)

  return (
    <Segment>
      <Card.Group stackable itemsPerRow={2} style={style}>
        {battles.map(battle => <BattleHistoryListing key={battle.id} battle={battle}/>)}
      </Card.Group>
      <Button content='Back' onClick={() => dispatch(changePage('FRONT'))}/>
    </Segment>
  )
}

export default BattleHistory
