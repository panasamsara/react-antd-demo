const mapReducer = (state = {vin: ''}, action) => {
  switch (action.type) {
    case 'VIN_CHANGE':
      return {
        vin: action.vin
      }
    default:
      return state
  }
}

export default mapReducer
