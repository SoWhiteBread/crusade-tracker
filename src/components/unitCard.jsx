import React, { useState } from 'react';
import { Form, Button, Grid, Segment, Popup, Message } from 'semantic-ui-react';
import { v4 as uuid } from 'uuid';
import { useDispatch, useSelector } from 'react-redux';
import ROLES from '../constants/roles';
import { saveUnit } from '../reducers/unitsSlice';
import { changePage } from '../reducers/pagesSlice';
import { selectUnitById } from '../reducers/unitsSlice';
import { saveRequisition } from '../reducers/requisitionsSlice'
import getRank from '../constants/ranks';

const UnitCard = ({ unitId }) => {
  const list = useSelector((state) => state.pages.currentListId)
  const newId = uuid()
  const unitToEdit = useSelector((state) => selectUnitById(state, unitId))
  const id = unitId ? unitToEdit.id : newId
  const [name, setName] = useState(unitId ? unitToEdit.name : '')
  const [role, setRole] = useState(unitId ? unitToEdit.role : '')
  const [type, setType] = useState(unitId ? unitToEdit.type : '')
  const [psyker, setPsyker] = useState(unitId ? unitToEdit.psyker : false)
  const [character, setCharacter] = useState(unitId ? unitToEdit.character : false)
  const [specialist, setSpecialist] = useState(unitId ? unitToEdit.specialist : false)
  const [equipment, setEquipment] = useState(unitId ? unitToEdit.equipment : '')
  const [keywords, setKeywords] = useState(unitId ? unitToEdit.keywords : '')
  const [psychic, setPsychic] = useState(unitId ? unitToEdit.psychic : '')
  const [trait, setTrait] = useState(unitId ? unitToEdit.trait : '')
  const [relic, setRelic] = useState(unitId ? unitToEdit.relic : '')
  const [others, setOthers] = useState(unitId ? unitToEdit.others : '')
  const [power, setPower] = useState(unitId ? unitToEdit.power : 0)
  const [models, setModels] = useState(unitId ? unitToEdit.models : 0)
  const [xp, setXp] = useState(unitId ? unitToEdit.xp : 0)
  const [cp, setCp] = useState(unitId ? unitToEdit.cp : 0)
  const [bh, setBh] = useState(unitId ? unitToEdit.bh : '')
  const [bs, setBs] = useState(unitId ? unitToEdit.bs : '')
  const [notes, setNotes] = useState(unitId ? unitToEdit.notes : '')
  const battlesFought = unitId ? unitToEdit.battlesFought : 0
  const battlesSurvived = unitId ? unitToEdit.battlesSurvived : 0
  const enemiesDestroyed = unitId ? unitToEdit.enemiesDestroyed : 0
  const [pop, setPop] = useState(false)
  const dispatch = useDispatch()

  const clearAll = () => {
    setName('')
    setRole('')
    setTrait('')
    setType('')
    setEquipment('')
    setKeywords('')
    setRelic('')
    setBh('')
    setBs('')
    setNotes('')
    setCp(0)
    setXp(0)
    setPower(0)
    setPsychic('')
    setOthers('')
    setPsyker(false)
    setCharacter(false)
    setModels(0)
  }


  const checkCompleted = () => {
    if (name === '' || role === '' || power === '' || power === 0 || power === '0') {
      setPop(true)
    } else if (unitId) {
      handleSubmit() 
    } else {
      reqCheck()
    }
  }


  const addReq = (reqName, value) => {
    const req = {
      id: uuid(),
      reqTyp: reqName,
      cost: value,
      unit: name,
      list: list
    }
    dispatch(saveRequisition(req))
  } 

  const reqCheck = () => {
      if (relic) {
      addReq('Relic', 1)
    } if (trait) {
      addReq('Warlord Trait', 1)
    } if (specialist) {
      addReq('Specialist Reinforcements', 1)
    }
    handleSubmit()
  }

  const returnToMain = () => {
    dispatch(changePage('MAIN'))
  }

  const handleSubmit = () => {
    const unit = {
      id,
      name,
      role,
      type,
      equipment,
      psychic,
      trait,
      relic,
      others,
      power,
      xp,
      cp: relic && trait ? parseInt(cp) + 2 : relic || trait ? parseInt(cp) + 1 : cp,
      bs,
      bh,
      notes,
      list,
      models,
      keywords,
      psyker,
      character,
      specialist,
      battlesFought,
      battlesSurvived,
      enemiesDestroyed,
    }
    dispatch(saveUnit(unit))
    returnToMain()
  }

  return (
    <Segment>
      <Form onSubmit={e => e.preventDefault()}>
        <Grid stackable padded>
          <Grid.Row columns={2}>
            <Grid.Column>
              <Form.Input
                fluid
                label='Unit Name'
                placeholder='Unit Name'
                name='name'
                value={name}
                onChange={e => setName(e.target.value)} />
              <Form.Input
                fluid
                label='Unit Type'
                placeholder='Unit Type'
                name='type'
                value={type}
                onChange={e => setType(e.target.value)} />
              <Form.Select
                fluid
                clearable
                name='role'
                label='Unit Role'
                options={ROLES}
                value={role}
                placeholder='Select unit role'
                onChange={(e, { value }) => setRole(value)} />
            </Grid.Column>
            <Grid.Column>
              <Form.Group widths='equal'>
                <Form.Input
                  fluid
                  label='Power Rating'
                  type='number'
                  min='0'
                  name='power'
                  value={power}
                  onChange={e => setPower(e.target.value)} />
                <Form.Input
                  fluid
                  label='Model Count'
                  type='number'
                  min='0'
                  name='models'
                  value={models}
                  onChange={e => setModels(e.target.value)} />
              </Form.Group>
              <Form.Group widths='equal'>
                <Form.Input
                  fluid
                  label='Crusade Points'
                  type='number'
                  name='cp'
                  value={cp}
                  onChange={e => setCp(e.target.value)} />
                <Form.Input
                  fluid
                  label='Experience Points'
                  type='number'
                  min='0'
                  name='xp'
                  value={xp}
                  onChange={e => setXp(e.target.value)} />
              </Form.Group>
              <Form.Input readOnly label='Rank' value={getRank(xp)}/>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row centered>
            <Form.Group widths='equal'>
              <Form.Checkbox checked={character} label='Character' onChange={(e, { checked }) => setCharacter(checked)} />
              <Form.Checkbox checked={psyker} label='Psyker' onChange={(e, { checked }) => setPsyker(checked)} />
              <Form.Checkbox checked={specialist} label='Specialist' onChange={(e, { checked }) => setSpecialist(checked)} />
            </Form.Group>
          </Grid.Row>
          {specialist && <Grid.Row centered>
            <Message color='orange' compact>Enter the Stratagem Cost in the Crusade Points field and the upgrades given in the Upgrades field. This will also cost 1 Requisition Point.</Message></Grid.Row>}
          {character && <Grid.Row centered>
            <Grid.Column textAlign='center'>
              <Message color='orange' compact>Adding a Relic or Warlord Trait will cost 1 Requisition Point and add one Crusade Point each</Message>
              <Form.Group widths='equal'>
                <Form.Input
                  fluid
                  label='Warlord Trait'
                  name='trait'
                  placeholder='Add Warlord Trait'
                  onChange={e => setTrait(e.target.value)}
                  value={trait} />
                <Form.Input
                  fluid
                  label='Relic'
                  name='relic'
                  placeholder='Add Relic'
                  onChange={e => setRelic(e.target.value)}
                  value={relic} />
              </Form.Group>
            </Grid.Column>
          </Grid.Row>}
          <Grid.Row>
            <Grid.Column>
              <Form.Group widths='equal'>
                {psyker && <Form.TextArea
                  fluid='true'
                  label='Psychic Powers'
                  name='psychic'
                  placeholder='Add Psychic Powers'
                  onChange={e => setPsychic(e.target.value)}
                  value={psychic} />}
                <Form.TextArea
                  fluid='true'
                  label='Equipment'
                  name='equipment'
                  placeholder='Add Equipment'
                  onChange={e => setEquipment(e.target.value)}
                  value={equipment} />
                <Form.TextArea
                  fluid='true'
                  label='Selectable Keywords'
                  name='keywords'
                  placeholder='Add Selectable Keywords'
                  onChange={e => setKeywords(e.target.value)}
                  value={keywords} />
                <Form.TextArea
                  fluid='true'
                  label='Other Upgrades and Abilities'
                  name='others'
                  placeholder='Add Others'
                  onChange={e => setOthers(e.target.value)}
                  value={others} />
              </Form.Group>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row columns='2' centered>
            <Form.Group widths='equal'>
              <Form.TextArea
                label='Battle Honours'
                name='bh'
                placeholder='Add Battle Honours'
                onChange={e => setBh(e.target.value)}
                value={bh} />
              <Form.TextArea
                label='Battle Scars'
                name='bs'
                placeholder='Add Battle Scars'
                onChange={e => setBs(e.target.value)}
                value={bs} />
            </Form.Group>
          </Grid.Row>
          <Grid.Row centered columns='1'>
            <Form.TextArea
              fluid='true'
              label='Notes and History'
              name='notes'
              placeholder='Add Notes, Achievements, History, and anything else you want to record here'
              onChange={e => setNotes(e.target.value)}
              value={notes} />
          </Grid.Row>
          <Grid.Row centered>
            <Button onClick={returnToMain}>Back</Button>
            <Button negative onClick={clearAll}>Clear All</Button>
            <Popup
              content='Please ensure that your unit has at least a name, role, and power rating.'
              open={pop}
              hideOnScroll
              trigger={<Button positive onClick={checkCompleted}>{unitId ? 'Save Unit' : 'Add Unit'}</Button>} />
          </Grid.Row>
        </Grid>
      </Form>
    </Segment>
  )
}

export default UnitCard;