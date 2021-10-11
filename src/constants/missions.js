const MISSIONS = 
  {
    combatPatrol: [
      { text: 'Sweep and Clear', value: 'Sweep and Clear', reward: `The Victor can select 2 units from their army to be Marked for Greatness after the battle instead of the normal 1` },
      { text: 'Supply Drop', value: 'Supply Drop', reward: `The Victor gains 2 Requisition Points after this battle instead of 1` },
      { text: 'Assassinate', value: 'Assassinate', reward: `The Victor selects 1 unit to get a bonus Battle Trait of their choice (following all rules for Battle Honours)` }
    ],
    incursion: [
      { text: 'Supply Cache', value: 'Supply Cache', reward: `The Victor gains 2 Requisition Points after this battle instead of 1` },
      { text: 'The Relic', value: 'The Relic', reward: `The Victor selects 1 Character to get a bonus Crusade Relic of their choice (following all rules for Battle Honours)` },
      { text: 'Sabotage', value: 'Sabotage', reward: `As Defender: Gain 1 free use of Increase Supply Limit and 1 free use of Rearm and Resupply requisitions. \n As Attacker: The Victor selects 1 (non-character, non-vehicle, non-monster) unit to get a bonus Battle Trait of their choice (following all rules for Battle Honours) ` },
      { text: 'Recon Patrol', value: 'Recon Patrol', reward: `The Victor can select 2 units from their army to be Marked for Greatness after the battle instead of the normal 1` },
      { text: 'The Ritual', value: 'The Ritual', reward: `As Defender: Their Warlord gains 1 Battle Trait of their choice (or, if the Warlord is a Psyker, 1 Psychic Fortitude), following all normal rules for Battle Honours. \n As Attacker: Select 1 unit to get a bonus Battle Trait of their choice (following all rules for Battle Honours)` },
      { text: 'Behind Enemy Lines', value: 'Behind Enemy Lines', reward: `The Victor selects 1 unit that has exfiltrated from the battlefield to get 1 Battle Trait of their choice (following all rules for Battle Honours)` },
    ],
    strikeForce: [
      { text: 'Supplies from Above', value: 'Supplies from Above', reward: `The Victor gains 2 Requisition Points after this battle instead of 1` },
      { text: 'Narrow the Search', value: 'Narrow the Search', reward: `The Victor selects 1 unit to get a bonus Weapon Enhancement of their choice (following all rules for Battle Honours)` },
      { text: 'Cut Off the Head', value: 'Cut Off the Head', reward: `The Victor selects 1 Character unit from their army to get a bonus Warlord Trait (following all rules for Battle Honours)` },
      { text: 'Retrieval', value: 'Retrieval', reward: `As Defender: Add 1 new Character to their Order of Battle with a free Warlord Trait, Relic, or Specialist Reinforcement (Provided they have sufficient Supply and following all rules for Battle Honours). \n As Attacker: Select 1 Character to get a bonus Crusade Relic of their choice (following all rules for Battle Honours)` },
      { text: 'Raze and Ruin', value: 'Raze and Ruin', reward: `The Victor gains 2 free uses of Increase Supply Limit` },
      { text: 'Ambush', value: 'Ambush', reward: `The Victor selects 1 unit to get a bonus Battle Trait of their choice (following all rules for Battle Honours)` }
    ],
    onslaught: [
      { text: 'Firestorm', value: 'Firestorm', reward: `The Victor gains 2 Requisition Points after this battle instead of 1` },
      { text: 'Grand Assault', value: 'Grand Assault', reward: `The Victor selects 1 unit to get a bonus Battle Trait of their choice (following all rules for Battle Honours)` },
      { text: 'Field of Glory', value: 'Field of Glory', reward: `The Victor's Warlord gains 1 free Battle Honour of their choice (following all rules for Battle Honours)` }
    ]
  }

export default MISSIONS