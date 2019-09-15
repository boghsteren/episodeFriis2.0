export const ribbonColor = udbyder => {
  switch (udbyder) {
    case 'Netflix':
      return 'red'
    case 'HBO Nordic':
      return 'black'
    case 'Viaplay':
      return 'green'
    case 'DR.DK':
      return 'grey'
    default:
      return 'grey'
  }
}
