import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Header, Segment, Button, Card } from 'semantic-ui-react';
import { selectLists, saveList } from '../reducers/listsSlice';
import { editList, changePage } from '../reducers/pagesSlice';
import { v4 as uuid } from 'uuid'
import CrusadeListDetails from './crusadeListDetails';

const FrontPage = () => {
  const dispatch = useDispatch()
  const forcesList = useSelector(selectLists)
  const id = uuid()

  const newList = () => {
    const newList = {
      id,
      supplyLimit: 50,
      requisition: 5,
      battlesFought: 0,
      battlesWon: 0,
      forceName: '',
      playerName: '',
      faction: '',
      notes: '',
    }
    dispatch(saveList(newList))
    dispatch(editList({ page: 'MAIN', currentListId: id }))
  }
  
  return (
    <>
      <Segment>
        <Header>Crusade Forces</Header>
      </Segment>
      {forcesList.length >= 1 && <Segment>
        <Card.Group stackable itemsPerRow='4'>
          {forcesList.map((list) => <CrusadeListDetails key={list.id} listId={list.id} />)}
        </Card.Group>
        </Segment>
      }
      <Button content='Add New Force' onClick={newList} />
      <Button content='Battle Setup' onClick={() => dispatch(changePage('BATTLESETUP'))} />
      <Button content='Battle History' onClick={() => dispatch(changePage('BATTLEHISTORY'))} />
    </>
  )
}

export default FrontPage

