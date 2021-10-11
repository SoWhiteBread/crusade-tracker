const getRank = (xp) => {
  let rank
  switch (true) {
    case (xp < 6):
      rank = "Battle-Ready"
      break;
    case (xp < 16):
      rank = "Bloodied"
      break;
    case (xp < 31):
      rank = "Battle-Hardened"
      break;
    case (xp < 51):
      rank = "Heroic"
      break;
    case (xp >= 51):
      rank = "Legendary"
      break;
    default:
      rank = null
      break;
  } return rank
}


export default getRank