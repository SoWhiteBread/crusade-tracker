import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Form, Segment, Grid, List, Button, Header, Container, Checkbox, Message } from 'semantic-ui-react';
import { selectLists, updateList } from '../reducers/listsSlice';
import { selectUnits } from '../reducers/unitsSlice';
import { saveBattle } from '../reducers/battlesSlice';
import { resolveBattle, changePage } from '../reducers/pagesSlice';
import { v4 as uuid } from 'uuid';
import MISSIONS from '../constants/missions';

const style = {
  paddingBottom: 10,
  paddingTop: 10
}


const BATTLESIZE = [
  { text: 'Combat Patrol', value: 'combatPatrol', size: 25 },
  { text: 'Incursion', value: 'incursion', size: 50 },
  { text: 'Strike Force', value: 'strikeForce', size: 100 },
  { text: 'Onslaught', value: 'onslaught', size: 150 }
]
const DEFENDER = [
  { text: 'Player One', value: 'playerOne' },
  { text: 'Player Two', value: 'playerTwo' }
]

const BattleSetup = () => {
  const dispatch = useDispatch();
  const allLists = useSelector(selectLists)
  const allUnits = useSelector(selectUnits)
  const [playerOneListName, setPlayerOneListName] = useState('')
  const [playerOneListId, setPlayerOneListId] = useState('')
  const [playerOneSelectedUnits, setPlayerOneSelectedUnits] = useState([])
  const [playerOneVP, setPlayerOneVP] = useState('')
  const [playerOneBattles, setPlayerOneBattles] = useState('')
  const [playerOneWins, setPlayerOneWins] = useState('')
  const [playerOneReq, setPlayerOneReq] = useState('')
  const [playerTwoListId, setPlayerTwoListId] = useState('')
  const [playerTwoListName, setPlayerTwoListName] = useState('')
  const [playerTwoSelectedUnits, setPlayerTwoSelectedUnits] = useState([])
  const [playerTwoVP, setPlayerTwoVP] = useState('')
  const [playerTwoBattles, setPlayerTwoBattles] = useState('')
  const [playerTwoWins, setPlayerTwoWins] = useState('')
  const [playerTwoReq, setPlayerTwoReq] = useState('')
  const [playerTwoTracked, setPlayerTwoTracked] = useState(false)
  const [defender, setDefender] = useState('')
  const [gameNotes, setGameNotes] = useState('')
  const [mission, setMission] = useState('')
  const [battleSize, setBattleSize] = useState('')
  const [battleDate, setBattleDate] = useState('')
  const [battleName, setBattleName] = useState('')
  const [noUnits, setNoUnits] = useState(false)
  const { size } = battleSize ? BATTLESIZE.find((battle) => battle.value === battleSize) : '0'
  const { reward } = mission && battleSize ? MISSIONS[battleSize].find(({ value }) => value === mission) : ''
  const playerOnePowerTotal = playerOneSelectedUnits.reduce((total, unit) => total + parseInt(unit.power), 0);
  const playerTwoPowerTotal = playerTwoSelectedUnits.reduce((total, unit) => total + parseInt(unit.power), 0);
  const winner = playerOneVP === playerTwoVP ? 'draw' : playerOneVP > playerTwoVP ? 'playerOne' : 'playerTwo'

  const playerOneOptions = allLists.reduce(function (options, list) {
    if (list.forceName !== playerTwoListName) {
      options.push({ text: list.forceName, value: { forceName: list.forceName, id: list.id, battlesFought: list.battlesFought, wins: list.battlesWon, req: list.requisition }, key: list.id, content: (<Header content={list.forceName} subheader={list.playerName} />) });
    } return options
  }, [])
  const playerTwoOptions = allLists.reduce(function (options, list) {
    if (list.forceName !== playerOneListName) {
      options.push({ text: list.forceName, value: { forceName: list.forceName, id: list.id, battlesFought: list.battlesFought, wins: list.battlesWon, req: list.requisition }, key: list.id, content: (<Header content={list.forceName} subheader={list.playerName} />) });
    } return options
  }, [])

  const playerOneUnits = playerOneListId ? allUnits.filter((unit) => unit.list === playerOneListId) : []
  const playerTwoUnits = playerTwoListId ? allUnits.filter((unit) => unit.list === playerTwoListId) : []


  const setPlayer = (value) => {
    setPlayerOneListName(value.forceName)
    setPlayerOneListId(value.id)
    setPlayerOneBattles(value.battlesFought)
    setPlayerOneWins(value.wins)
    setPlayerOneReq(value.req)
  }
  const setOpponent = (value) => {
    setPlayerTwoListName(value.forceName)
    setPlayerTwoListId(value.id)
    setPlayerTwoBattles(value.battlesFought)
    setPlayerTwoWins(value.wins)
    setPlayerTwoReq(value.req)
  }

  const changeBattleSize = (value) => {
    setMission('')
    setBattleSize(value)
  }

  const playerTwoToggle = (checked) => {
    if (checked) {
      setPlayerTwoTracked(checked)
    } else {
      setPlayerTwoTracked(checked)
      setPlayerTwoListId('')
      setPlayerTwoListName('')
      setPlayerTwoSelectedUnits([])
    }
  }

  const reqRewardCheck = () => {
    let reqReward
    if (mission === 'Supply Drop' || mission === 'Supply Cache' || mission === 'Supplies from Above' || mission === 'Firestorm') {
      reqReward = 2
    } else {
      reqReward = 1
    } 
    return reqReward
  }

  const supplyRewardCheckOneTrack = () => {
    if (mission === 'Raze and Ruin' && winner === 'playerOne') {
      dispatch(updateList({id : playerOneListId, changes: { supplyRewards: 2 }}))
    } else if (mission === 'Sabotage' && winner === 'playerOne' && winner === defender) {
      dispatch(updateList({id : playerOneListId, changes: { supplyRewards: 1 }}))
    }   
  }
  const supplyRewardCheckTwoTrack = () => {
    if (mission === 'Raze and Ruin' && winner === 'playerOne') {
      dispatch(updateList({id : playerOneListId, changes: { supplyRewards: 2 }}))
    } else if (mission === 'Raze and Ruin' && winner === 'playerTwo') {
      dispatch(updateList({id : playerTwoListId, changes: { supplyRewards: 2 }}))
    } else if (mission === 'Sabotage' && winner === 'playerOne' && winner === defender) {
      dispatch(updateList({id : playerOneListId, changes: { supplyRewards: 1 }}))
    } else if (mission === 'Sabotage' && winner === 'playerTwo' && winner === defender) {
      dispatch(updateList({id : playerTwoListId, changes: { supplyRewards: 1 }}))
    }
  }


  const winnerUpdateOneTrack = () => {
    if (winner === 'playerOne') {
      dispatch(updateList({id : playerOneListId, changes: { battlesWon: playerOneWins + 1, battlesFought: playerOneBattles + 1, requisition: parseInt(playerOneReq) + reqRewardCheck()}}))
     } else {
      dispatch(updateList({id : playerOneListId, changes: { battlesFought: playerOneBattles + 1, requisition: parseInt(playerOneReq) + 1}}))
    }
  }
  const winnerUpdateTwoTrack = () => {
    if (winner === 'playerOne') {
      dispatch(updateList({id : playerOneListId, changes: { battlesWon: playerOneWins + 1, battlesFought: playerOneBattles + 1, requisition: parseInt(playerOneReq) + reqRewardCheck()}}))
      dispatch(updateList({id : playerTwoListId, changes: { battlesFought: playerTwoBattles + 1, requisition: parseInt(playerTwoReq) + 1}}))
    } else if (winner === 'playerTwo') {
      dispatch(updateList({id : playerTwoListId, changes: { battlesWon: playerTwoWins + 1, battlesFought: playerTwoBattles + 1, requisition: parseInt(playerTwoReq) + reqRewardCheck()}}))
      dispatch(updateList({id : playerOneListId, changes: { battlesFought: playerOneBattles + 1, requisition: parseInt(playerOneReq) + 1}}))
    } else if (winner === 'draw') {
    dispatch(updateList({id : playerOneListId, changes: { battlesFought: playerOneBattles + 1, requisition: parseInt(playerOneReq) + 1}}))
    dispatch(updateList({id : playerTwoListId, changes: { battlesFought: playerTwoBattles + 1, requisition: parseInt(playerTwoReq) + 1}}))
    }
  }

  const requirementCheck = () => {
    if (playerTwoTracked && (playerOneSelectedUnits.length === 0  || playerTwoSelectedUnits.length === 0)) {
      setNoUnits(true)
    } else if (playerOneSelectedUnits.length === 0) {
      setNoUnits(true)
    } else {
      recordBattle()
    }
  }

  const recordBattle = () => {
    if (playerTwoTracked) {
      const battle = {
        id: uuid(),
        playerTwoTracked,
        mission,
        battleSize,
        playerOneListName,
        playerOneListId,
        playerOneSelectedUnits,
        playerOneVP,
        playerTwoListName,
        playerTwoListId,
        playerTwoSelectedUnits,
        playerTwoVP,
        battleDate,
        winner,
        defender,
        battleName,
        gameNotes,
      };
      winnerUpdateTwoTrack()
      supplyRewardCheckTwoTrack()
      dispatch(saveBattle(battle))
      dispatch(resolveBattle({ page: 'BATTLERES', battle: battle.id}))
    } else {
      const battle = {
        id: uuid(),
        playerTwoTracked,
        mission,
        battleSize,
        playerOneListName,
        playerOneListId,
        playerOneSelectedUnits,
        playerOneVP,
        playerTwoVP,
        battleDate,
        winner,
        defender,
        battleName,
        gameNotes,
      };
      winnerUpdateOneTrack()
      supplyRewardCheckOneTrack()
      dispatch(saveBattle(battle))
      dispatch(resolveBattle({ page: 'BATTLERES', battle: battle.id}))
    }
  }

  const checkPlayerOneUnits = (checked, unit) => {
    if (checked) {
      setPlayerOneSelectedUnits([...playerOneSelectedUnits, unit])
    } else {
      setPlayerOneSelectedUnits(playerOneSelectedUnits.filter((toKeep) => toKeep !== unit))
    }
  }
  const checkPlayerTwoUnits = (checked, unit) => {
    if (checked) {
      setPlayerTwoSelectedUnits([...playerTwoSelectedUnits, unit])
    } else {
      setPlayerTwoSelectedUnits(playerTwoSelectedUnits.filter((toKeep) => toKeep !== unit))
    }
  }

  return (
    <>
    {noUnits && <Message warning onDismiss={() => setNoUnits(false)} content='Please ensure you have selected units'/>}
      <Segment>
        <Form onSubmit={e => e.preventDefault()}>
         <Form.Input required fluid label='Battle Name' onChange={e => setBattleName(e.target.value)} placeholder='e.g., "The Battle for Holy Terra"'/>
          <Form.Radio toggle label='Track Both Forces' value={playerTwoTracked} onChange={(e, { checked }) => playerTwoToggle(checked)} />
          <Form.Group widths='equal'>
            <Form.Select required clearable options={playerOneOptions} label="Player One Force" fluid onChange={(e, { value }) => setPlayer(value)} />
            {playerTwoTracked && <Form.Select clearable options={playerTwoOptions} label="Player Two Force" fluid onChange={(e, { value }) => setOpponent(value)} />}
          </Form.Group>
          <Form.Group widths='equal'>
            <Form.Select required fluid label='Battle Size' clearable options={BATTLESIZE} onChange={(e, { value }) => changeBattleSize(value)} />
            <Form.Select required fluid label='Mission' clearable options={MISSIONS[battleSize]} onChange={(e, { value }) => setMission(value)} />
          </Form.Group>
          <Form.Group widths='equal'>
          <Form.Select required fluid label='Defender' clearable options={DEFENDER} onChange={(e, { value }) => setDefender(value)} />
          <Form.Input required fluid type='date' label='Battle Date' onChange={e => setBattleDate(e.target.value)}/>
          </Form.Group>
        </Form>
        <Container text style={style}>
          <Header content='Mission Rewards'/>
          <p className='messageText lineBreak'>{reward}</p>
        </Container>        
      </Segment>
      <Segment>
        <Header>{playerTwoTracked ? 'Army Rosters' : 'Army Roster'}</Header>
        <Grid stackable>
          <Grid.Row centered columns='equal'>
            <Grid.Column>
              <Segment>
                {playerOneListName && <Header textAlign='center' color={playerOnePowerTotal > size ? 'red' : 'black'}>{playerOneListName}
                  <Header.Subheader color={playerOnePowerTotal > size ? 'red' : 'black'} textAlign='center' as='h4'>Power Total: {playerOnePowerTotal} \ {size ? size : 0}</Header.Subheader>
                </Header>}
                <List divided>
                  {playerOneUnits.map((unit) =>
                    <List.Item id={unit.id} key={unit.id}>
                      <List.Content floated='right'>
                        <Checkbox onClick={(e, { checked }) => checkPlayerOneUnits(checked, unit)} toggle/>
                      </List.Content>
                      <List.Content>
                        <List.Header>{unit.name}</List.Header>
                        <List.Description>Type: {unit.type} - Role: {unit.role} - Power Rating: {unit.power}</List.Description>
                      </List.Content>
                    </List.Item>)}
                </List>
              </Segment>
            </Grid.Column>
            {playerTwoTracked && <Grid.Column>
              <Segment>
                {playerTwoListName && <Header textAlign='center' color={playerTwoPowerTotal > size ? 'red' : 'black'}>{playerTwoListName}
                  <Header.Subheader color={playerTwoPowerTotal > size ? 'red' : 'black'} textAlign='center' as='h4'>Power Total: {playerTwoPowerTotal} \ {size ? size : 0}</Header.Subheader>
                </Header>}
                <List divided>
                  {playerTwoUnits.map((unit) =>
                    <List.Item id={unit.id}>
                      <List.Content floated='right'>
                        <Checkbox onClick={(e, { checked }) => checkPlayerTwoUnits(checked, unit)} toggle/>
                      </List.Content>
                      <List.Content>
                        <List.Header>{unit.name}</List.Header>
                        <List.Description>Type: {unit.type} - Role: {unit.role} - Power Rating: {unit.power}</List.Description>
                      </List.Content>
                    </List.Item>)}
                </List>
              </Segment>
            </Grid.Column>}
          </Grid.Row>
        </Grid>
      </Segment>
      <Segment>
        <Form onSubmit={e => e.preventDefault()}>
          <Form.Group widths='equal'>
            <Form.Input required label='Player One Victory Points' min='0' max='100' type='number' value={playerOneVP} onChange={e => setPlayerOneVP(e.target.value)} />
            <Form.Input required label='Player Two Victory Points' min='0' max='100' type='number' value={playerTwoVP} onChange={e => setPlayerTwoVP(e.target.value)}/>
          </Form.Group>
          <Form.TextArea label='Game Notes' placeholder='Add any extra notes about the game here' value={gameNotes} onChange={e => setGameNotes(e.target.value)} />
        </Form>
      </Segment>
      <Button content='Back' onClick={() => dispatch(changePage('FRONT'))} />
      <Button positive content='Record Battle' onClick={requirementCheck} />     
    </>
  )
}

export default BattleSetup