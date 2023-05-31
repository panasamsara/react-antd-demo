const mapReducer = (state = {choseVin: ''}, action) => {
  switch (action.type) {
    case 'VIN_CHANGE':
      return {
        choseVin: action.vin
      }
    default:
      return state
  }
}

export default mapReducer
