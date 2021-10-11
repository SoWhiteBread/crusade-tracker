import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Form, Card, Button, List } from 'semantic-ui-react';
import { updateUnit } from '../reducers/unitsSlice';

const UnitBattleListing = ({ unit }) => {
  const dispatch = useDispatch();

  const { name, type, xp, battlesFought, battlesSurvived, enemiesDestroyed, id } = unit
  const [xpGain, setXPGain] = useState(0)
  const [newEnemies, setNewEnemies] = useState(0)
  const [destroyed, setDestroyed] = useState(false);
  const [marked, setMarked] = useState(false);
  const [visible, setVisible] = useState(true)
  const enemyXP = Math.floor((parseInt(newEnemies) + parseInt(enemiesDestroyed)) / 3) - Math.floor(parseInt(enemiesDestroyed) / 3)

  const calculateXPGain = () => {
    let totalXPGain = 1
    if (destroyed) {
      totalXPGain = 0 + parseInt(xpGain);
    } else if (marked) {
      totalXPGain += 3 + parseInt(xpGain) + enemyXP;
    } else {
      totalXPGain += parseInt(xpGain) + enemyXP;
    } return totalXPGain;
  };

  const saveUnit = () => {
    dispatch(updateUnit({
      id: id, 
      changes: 
        { xp: parseInt(xp) + calculateXPGain(),
          battlesFought: parseInt(battlesFought) + 1,
          battlesSurvived: destroyed ? battlesSurvived : parseInt(battlesSurvived) + 1,
          enemiesDestroyed: parseInt(enemiesDestroyed) + parseInt(newEnemies)}
        }))
     setVisible(!visible)   
  }

  return (
    <>
    {visible ? <Card raised>
      <Card.Content>
        <Card.Header content={name} />
        <Card.Description>{type}</Card.Description>
      </Card.Content>
      <Card.Content>
        <Form>
          <Form.Group>
            <Form.Input label='Enemies Destroyed' value={newEnemies} type='number' min='0' max='100' onChange={e => setNewEnemies(e.target.value)} />
            <Form.Input label={destroyed ? 'XP Lost from Devastating Blow' : 'XP Earned in Battle'} value={xpGain} type='number' min={!destroyed ? '0' : '-6'} max={destroyed ? '0' : '100'} onChange={e => setXPGain(e.target.value)} />
          </Form.Group>
          <Form.Group>
            <Form.Checkbox label='Unit Destroyed?' onChange={(e, { checked }) => setDestroyed(checked)} />
            <Form.Checkbox label='Marked for Greatness' onChange={(e, { checked }) => setMarked(checked)} />
          </Form.Group>
        </Form>
      </Card.Content>
      <Card.Content>
        <List>
          <List.Item>
            <strong>Current XP</strong>: {xp}
          </List.Item>
          <List.Item>
            <strong>XP Gain</strong>: {calculateXPGain()}
          </List.Item>
          <List.Item>
            <strong>Existing Kill Count</strong>: {enemiesDestroyed}
          </List.Item>
        </List>
      </Card.Content>
      <Card.Content><Button fluid content='Save Unit' onClick={() => saveUnit()} /></Card.Content>
    </Card> : <Card><Card.Content><Card.Header>Unit Saved</Card.Header></Card.Content></Card>}
    </>
  )
}

export default UnitBattleListing;