import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateList, selectListById } from '../reducers/listsSlice';
import { saveRequisition, deleteRequisition, selectRequisitionsByList } from '../reducers/requisitionsSlice';
import { List, Form, Segment, Header, Container, Icon, Button } from 'semantic-ui-react';
import { v4 as uuid } from 'uuid'
const style = {
  paddingBottom: 10,
  paddingTop: 10
}

const RequisitionLog = () => {
  const currentList = useSelector((state) => state.pages.currentListId)
  const { supplyLimit } = useSelector((state) => selectListById(state, currentList))
  const reqList = useSelector((state) => selectRequisitionsByList(state, currentList))
  const [other, setOther] = useState(false)
  const [reqName, setReqName] = useState('')
  const [unitName, setUnitName] = useState('')
  const [cost, setCost] = useState(0)


  const dispatch = useDispatch()
  
  const increaseSupply = () => {
    const req = {
      id: uuid(),
      reqName: 'Increased Supply',
      unitName: 'Crusade Force',
      cost: 1,
      list: currentList,
    }
    dispatch(updateList({ id: currentList, changes: { supplyLimit: supplyLimit + 5 } }))
    dispatch(saveRequisition(req))
  }
  const increaseSupplyFree = () => {
    const req = {
      id: uuid(),
      reqName: 'Increased Supply (Free)',
      unitName: 'Crusade Force',
      cost: 0,
      list: currentList,
    }
    dispatch(updateList({ id: currentList, changes: { supplyLimit: supplyLimit + 5, rewards: parseInt(currentList.rewards) - 1 } }))
    dispatch(saveRequisition(req))
  }

  const deleteReq = (req) => {
    if (req.reqName === 'Increased Supply' || req.reqName === 'Increased Supply (Free)') {
      dispatch(updateList({ id: currentList, changes: { supplyLimit: supplyLimit - 5 } }))
    } dispatch(deleteRequisition(req.id))
  }

  const addReq = () => {
    const req = {
      id: uuid(),
      reqName,
      unitName: unitName ? unitName : 'None',
      cost,
      list: currentList,
    }
    dispatch(saveRequisition(req));
    setOther(false);
  }

  return (
    <Segment>
      <Header>Requisition History</Header>
      <Container text textAlign='left'>
        <List divided style={style}>
          {reqList.map((req) =>
            <List.Item key={req.id} id={req.id}>
              <List.Content floated='right'>
                <Icon size='large' name='cancel' link onClick={() => deleteReq(req)} />
              </List.Content>
              <List.Content>
                <List.Header>{req.reqName} for {req.unitName}</List.Header>
                <List.Description>Cost: {req.cost} RP</List.Description>
              </List.Content>
            </List.Item>)}
        </List>
      </Container>
        {currentList.rewards > 0 ? <Button content='Claim Supply Reward' onClick={increaseSupplyFree} /> : <Button content='Increase Supply Limit' onClick={increaseSupply} />}
        <Button content='Add Other Requisition' onClick={() => setOther(!other)} />
      {other && <Form size='small' onSubmit={e => e.preventDefault()}>
        <Form.Group style={style} inline>
          <Form.Input width={6} label='Add New Requisition' placeholder='Requisition Name' onChange={e => setReqName(e.target.value)} />
          <Form.Input width={6} label='Unit Name' placeholder='if required' onChange={e => setUnitName(e.target.value)} />
          <Form.Input width={2} label='Cost' onChange={e => setCost(e.target.value)} type='number' />
          <Form.Button onClick={addReq}>Add</Form.Button>
        </Form.Group>
      </Form>}
    </Segment>
  )
}

export default RequisitionLog;