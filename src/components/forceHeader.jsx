import React, { useEffect, useState } from 'react';
import { Form, Segment, Grid, Message, Button, Statistic } from 'semantic-ui-react';
import FACTIONS from '../constants/factions';
import { useSelector, useDispatch } from 'react-redux';
import { selectUnitsByList } from '../reducers/unitsSlice';
import { saveList, selectListById } from '../reducers/listsSlice';
import { selectRequisitionsByList } from '../reducers/requisitionsSlice';
import { changePage } from '../reducers/pagesSlice';
import RequisitionLog from './requisitionLog';



const ForceHeader = ({ listId }) => {
  const dispatch = useDispatch();
  const listToEdit = useSelector((state) => selectListById(state, listId));
  const { id, supplyLimit, requisition, battlesFought, battlesWon } = listToEdit;
  const unitList = useSelector((state) => selectUnitsByList(state, listId));
  const requisitionLog = useSelector((state) => selectRequisitionsByList(state, listId));
  const requisitionSpent = requisitionLog.reduce((total, req) => total + parseInt(req.cost), 0);
  const requisitionRemaining = requisition - requisitionSpent;  
  const supplyTotal = unitList.reduce((total, unit) => total + parseInt(unit.power), 0);
  const crusadeTotal = unitList.reduce((total, unit) => total + parseInt(unit.cp), 0);
  const [forceName, setForceName] = useState(listToEdit.forceName);
  const [playerName, setPlayerName] = useState(listToEdit.playerName);
  const [faction, setFaction] = useState(listToEdit.faction);
  const [notes, setNotes] = useState(listToEdit.notes);
  const [reqExpanded, setReqExpanded] = useState(false)
  const colour = supplyTotal > supplyLimit ? 'red' : 'black';

  const returnToFront = () => {
    dispatch(changePage('FRONT'))
  };
  
  

  useEffect(() => {
    const savedList = {
      id,
      supplyLimit,
      requisition,
      battlesFought,
      battlesWon,
      forceName,
      playerName,
      faction,
      supplyTotal,
      crusadeTotal,
      notes,    
    };
    dispatch(saveList(savedList))
  }, [battlesFought, battlesWon, crusadeTotal, dispatch, faction, forceName, id, notes, playerName, requisition, supplyLimit, supplyTotal]);

  return (
    <>
    <Segment>
      <Grid stackable divided padded>
        <Grid.Row columns={2} stretched>
          <Grid.Column>
            <Form>
              <Form.Input
                name="playerName"
                label='Player Name'
                placeholder='Player Name'
                value={playerName}
                onChange={e => setPlayerName(e.target.value)} />
              <Form.Input
                name="forceName"
                label='Force Name'
                placeholder='Force Name'
                value={forceName}
                onChange={e => setForceName(e.target.value)} />
              <Form.Select
                clearable
                name='faction'
                label='Crusade Faction'
                options={FACTIONS}
                placeholder='Select Faction'
                value={faction}
                onChange={(e, { value }) => setFaction(value)} />
            </Form>
          </Grid.Column>
          <Grid.Column>
            <Statistic.Group size='tiny' widths='2'>
              <Statistic>
                <Statistic.Label>Battles Fought</Statistic.Label>
                <Statistic.Value>{battlesFought}</Statistic.Value>
              </Statistic>
              <Statistic>
                <Statistic.Label>Battles Won</Statistic.Label>
                <Statistic.Value>{battlesWon}</Statistic.Value>
              </Statistic>
              <Statistic>
                <Statistic.Label>Supply Limit</Statistic.Label>
                <Statistic.Value>{supplyLimit}</Statistic.Value>
              </Statistic>
              <Statistic>
                <Statistic.Label>Requisition Points</Statistic.Label>
                <Statistic.Value>{requisitionRemaining}</Statistic.Value>
              </Statistic>
              <Statistic color={colour}>
                <Statistic.Label>Supply Used</Statistic.Label>
                <Statistic.Value>{supplyTotal}</Statistic.Value>
              </Statistic>
              <Statistic>
                <Statistic.Label>Crusade Points</Statistic.Label>
                <Statistic.Value>{crusadeTotal}</Statistic.Value>
              </Statistic>
            </Statistic.Group>
            {supplyTotal > supplyLimit && <Message warning attached='bottom' content='You have exceeded your current supply limit' />}
            {requisitionRemaining < 0 && <Message warning attached='bottom' content='You have spent too many Requisition Points.' />}
          </Grid.Column>
        </Grid.Row>
        <Grid.Row centered columns='1'>
          <Form>
            <Form.TextArea
              label='Crusade Goals, Information, and Notable Victories'
              placeholder='Add narrative information, personal goals, notable battles, vendettas and grudges, or anything else here'
              value={notes}
              onChange={e => setNotes(e.target.value)} />
          </Form>
        </Grid.Row>
        <Grid.Row centered >
          <Button content='Return to Load List' onClick={returnToFront} />
          <Button content={reqExpanded ? 'Hide Requisition Log' : 'Show Requsition Log'} onClick={() => setReqExpanded(!reqExpanded)} />
        </Grid.Row>
      </Grid>
    </Segment>
    {reqExpanded && <RequisitionLog />}
    </>
  )
}

export default ForceHeader;