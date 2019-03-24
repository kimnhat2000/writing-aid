
const formDefaultState = {
  answer: '',
  title: '',
  possibleMatch: '',
  content: '',
  submitCheck: false,
  newTopic: {},
  cancelSubmit: false,
  showPossibleMatchForm: false,
  showForm: false
}

export const formReducer = (state=formDefaultState, action) =>{
  const {title, possibleMatch, content} = action
  switch (action.type) {
    case 'SHOW_FORM':
      return(
        {...state, showForm: true}
      )

    case 'HIDE_FORM':
      return(
        {...state, hideForm: true}
      )

    case 'INPUT_CHANGE':
      return(
        { ...state, title, possibleMatch, content}
      )
    default:
      return state;
  }
}

