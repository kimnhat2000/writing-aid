const timerReducerDefautState = {
  second: 0,
  minute: 0,
  hour: 0,
  start: false
}

export const timerReducer
 = (state = timerReducerDefautState, action) => {
  switch (action.type) {
    case 'START_COUNTING':
      let {second, minute, hour} = state
      second++
      if(second===59){
        second=0; minute++
      } if(minute===59){
        second=0; minute=0; hour++
      }
      return (
        {
        ...state, second, minute, hour   
        }
      )
    case 'RESET':
      return {
        ...timerReducerDefautState
      }
    case 'PAUSE_RESUME':
      return {...state, start: !state.start}
    default:
      return state;
  }
}