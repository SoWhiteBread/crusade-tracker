import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Segment, Header, Button, Card } from 'semantic-ui-react';
import { selectBattleById } from '../reducers/battlesSlice';
import { changePage } from '../reducers/pagesSlice';
import UnitBattleListing from './battleUnitListing';
const style = {
  paddingBottom: 10
}


const BattleResolution = ({ battleId }) => {
  const dispatch = useDispatch();
  const currentBattle = useSelector((state) => selectBattleById(state, battleId))

  const returnToFront = () => {
    dispatch(changePage('FRONT'))
  }
  

  return (
    <>
      <Segment textAlign='left'>
        {currentBattle.playerTwoTracked && <Header content='Player One Units' />}
        <Card.Group stackable style={style} itemsPerRow='4'>
          {currentBattle.playerOneSelectedUnits.map((unit) => <UnitBattleListing unit={unit} key={unit.id} />)}
        </Card.Group>
      </Segment>
      {currentBattle.playerTwoTracked &&
        <Segment textAlign='left'>
          <Header content='Player Two Units'/>
          <Card.Group stackable style={style} itemsPerRow='4'>
            {currentBattle.playerTwoSelectedUnits.map((unit) => <UnitBattleListing unit={unit} key={unit.id} />)}
          </Card.Group>
        </Segment>}
        <Button content='Finalise Battle' onClick={returnToFront}/>        
    </>
  )
}

export default BattleResolution