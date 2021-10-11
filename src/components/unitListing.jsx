import React, { useState } from 'react';
import { Button, Popup, Card, Label, Image, List, Modal, Grid } from 'semantic-ui-react';
import { useDispatch, useSelector } from 'react-redux';
import { saveUnit, deleteUnit, selectUnitById } from '../reducers/unitsSlice';
import { editUnit } from '../reducers/pagesSlice';
import { v4 as uuid } from 'uuid';
import getRank from '../constants/ranks';

const UnitListing = ({ id }) => {
  const unit = useSelector((state) => selectUnitById(state, id))
  const { name, power, cp, type, role, character, psyker } = unit
  const rank = getRank(unit.xp)
  const [expanded, setExpanded] = useState(false)
  const [warning, setWarning] = useState(false)
  const image = require(`../svgs/${role}.svg`).default
  const dispatch = useDispatch();
  const handleDelete = () => {
    dispatch(deleteUnit(unit.id))
  }
  const editPage = () => {
    dispatch(editUnit({ page: 'EDIT', editId: unit.id }))
  }

  const duplicateUnit = () => {
    const copiedUnit = { ...unit, id: uuid() }
    if (unit.relic || unit.trait || unit.specialist) {
      setWarning(true)
    } else {
      dispatch(saveUnit(copiedUnit))
    }
  }

  return (
    <Card raised>
      <Card.Content>
        <Image size='mini' floated='right' src={image} alt='Unit Role Image' title={role} />
        <Card.Header textAlign='left'>{name}</Card.Header>
        <Card.Meta textAlign='left'>{type}</Card.Meta>
      </Card.Content>
      <Card.Content>
        <Card.Description textAlign='left'>
          <List>
            {character && <List.Item><Label>Character</Label></List.Item>}
            {psyker && <List.Item><Label>Psyker</Label></List.Item>}
            {unit.specialist && <List.Item><Label>Specialist Reinforcements</Label></List.Item>}
            <List.Item>
              <Label>Power Rating:
                <Label.Detail>{power}</Label.Detail>
              </Label>
            </List.Item>
            <List.Item>
              <Label>Crusade Points:
                <Label.Detail>{cp}</Label.Detail>
              </Label>
            </List.Item>
            <List.Item>
              <Label>Rank:
                <Label.Detail>{rank}</Label.Detail>
              </Label>
            </List.Item>
          </List>
        </Card.Description>
      </Card.Content>
      <Card.Content extra>
        <Card.Description>
          <Button.Group>
            <Button icon='expand' onClick={() => setExpanded(true)} />
            <Button icon='edit' onClick={editPage} />
            <Button icon='clone' onClick={duplicateUnit} />
            <Popup
              size='tiny'
              position='top center'
              on='click'
              content={<Button size='small' compact negative onClick={handleDelete}>Confirm Delete</Button>}
              trigger={<Button negative icon='delete' />} />
          </Button.Group>
        </Card.Description>
      </Card.Content>
      <Modal size='tiny' open={warning} content='You cannot duplicate a unit with a Relic, Warlord Trait, or Specialist Reinforcements' actions={['OK']} onActionClick={() => setWarning(false)} onOpen={() => setWarning(true)} onClose={() => setWarning(false)} closeOnDocumentClick={true} />
      <Modal open={expanded} closeIcon onActionClick={() => setExpanded(false)} onOpen={() => setExpanded(true)} onClose={() => setExpanded(false)} closeOnDocumentClick={true}>
        <Modal.Header>{name}</Modal.Header>
        <Modal.Content image scrolling>
          <Image src={image} size='small' wrapped />
          <Modal.Description>
            <Grid stackable>
              <Grid.Row columns={2} divided>
                <Grid.Column>
              <List divided size='large'>
                <List.Item>
                  <List.Header>Unit Type</List.Header>
                  <List.Description>{type}</List.Description>
                </List.Item>
                <List.Item>
                  <List.Header>Unit Role</List.Header>
                  <List.Description>{role}</List.Description>
                </List.Item>
                {character && <List.Item>
                  <List.Header>Character</List.Header>
                  <List.Description>This unit is a Character</List.Description>
                </List.Item>}
                {unit.trait && <List.Item>
                  <List.Header>Warlord Trait</List.Header>
                  <List.Description>{unit.trait}</List.Description>
                </List.Item>}
                {unit.relic && <List.Item>
                  <List.Header>Relics</List.Header>
                  <List.Description>{unit.relic}</List.Description>
                </List.Item>}
                {psyker && <List.Item>
                  <List.Header>Psyker</List.Header>
                  <List.Description>This unit is a Psyker</List.Description>
                </List.Item>}
                <List.Item>
                  <List.Header>Power Rating</List.Header>
                  <List.Description>{power}</List.Description>
                </List.Item>
                <List.Item>
                  <List.Header>Model Count</List.Header>
                  <List.Description>{unit.models}</List.Description>
                </List.Item>
                <List.Item>
                  <List.Header>Crusade Points</List.Header>
                  <List.Description>{cp}</List.Description>
                </List.Item>
                <List.Item>
                  <List.Header>Experience Points</List.Header>
                  <List.Description>{unit.xp}</List.Description>
                </List.Item>
                <List.Item>
                  <List.Header>Unit Rank</List.Header>
                  <List.Description>{rank}</List.Description>
                </List.Item>
              </List>
              </Grid.Column>
              <Grid.Column>
              <List divided size='large'>
                <List.Item>
                  <List.Header>Keywords</List.Header>
                  <List.Description>{unit.keywords}</List.Description>
                </List.Item>
                <List.Item>
                  <List.Header>Equipment</List.Header>
                  <List.Description>{unit.equipment}</List.Description>
                </List.Item>
                {psyker && <List.Item>
                  <List.Header>Psychic Powers</List.Header>
                  <List.Description>{unit.psychic}</List.Description>
                </List.Item>}
                <List.Item>
                  <List.Header>Upgrades and Abilities</List.Header>
                  <List.Description>{unit.others}</List.Description>
                </List.Item>
                <List.Item>
                  <List.Header>Battles Fought</List.Header>
                  <List.Description>{unit.battlesFought}</List.Description>
                </List.Item>
                <List.Item>
                  <List.Header>Battles Survived</List.Header>
                  <List.Description>{unit.battlesSurvived}</List.Description>
                </List.Item>
                <List.Item>
                  <List.Header>Enemies Destroyed</List.Header>
                  <List.Description>{unit.enemiesDestroyed}</List.Description>
                </List.Item>
                <List.Item>
                  <List.Header>Battle Honours</List.Header>
                  <List.Description>{unit.bh ? unit.bh : 'None'}</List.Description>
                </List.Item>
                <List.Item>
                  <List.Header>Battle Scars</List.Header>
                  <List.Description>{unit.bs ? unit.bs : 'None'}</List.Description>
                </List.Item>
                {unit.specialist && <List.Item>
                  <List.Header>Specialist Reinforcements</List.Header>
                  <List.Description>This unit has been given Specialist Reinforcements</List.Description>
                </List.Item>}
                {unit.notes && <List.Item>
                  <List.Header>Notes</List.Header>
                  <List.Description>{unit.notes}</List.Description>
                </List.Item>}
              </List>
              </Grid.Column>
              </Grid.Row>
            </Grid>
          </Modal.Description>
        </Modal.Content>
        <Modal.Actions><Button content='Close' onClick={() => setExpanded(false)} /></Modal.Actions>
      </Modal>
    </Card>
  )
}




export default UnitListing;