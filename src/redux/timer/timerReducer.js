const timerReducerDefaultState = {
  second: 0,
  minute: 0,
  hour: 0,
  start: false,
}

const TextEditorReducerDefaultState = {
  content: ''
}

export const textEditorAction = (content='') => ({
  type: 'CONTENT_CHANGE',
  content
})


export const textEditor = (state= TextEditorReducerDefaultState, action) => {
  switch (action.type) {
    case 'CONTENT_CHANGE':

    return(
      { ...state, content: action.content }
    )
    case 'CLEAR_CONTENT':
    return(
      { ...state, content: ''}
    )
    default:
      return state;
  }
}

export const timer
 = (state = timerReducerDefaultState, action) => {
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
        ...timerReducerDefaultState
      }
    case 'PAUSE_RESUME':
      return {...state, start: !state.start}
    default:
      return state;
  }
}