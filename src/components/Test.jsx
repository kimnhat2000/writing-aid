import React from 'react'
import { connect } from 'react-redux'

import { Button } from 'semantic-ui-react'

let timer = null

const Test = ({ count, reset, start, pauseResume }) => {

  const onStart = () => {
    clearInterval(timer)
    timer = setInterval(() => {
      count()
    }, 1000)
  }

  const onReset = () => {
    clearInterval(timer)
    reset()
  }

  const resumePause = () => {
    pauseResume()
    if(start){
      clearInterval(timer)
      timer = setInterval(() => {
        count()
      }, 1000)
    }else{
      clearInterval(timer)
    }
  }

  return (
    <div>
      <Button content='start' onClick={() => onStart()} />
      <Button content='reset' onClick={() => onReset()} />
      <Button content={start ? 'resume' : 'pause'} onClick={() => resumePause()} />
    </div>
  )
}

const mapDispatchToProps = dispatch => 
   ({ 
    count: () => dispatch({ type: 'START_COUNTING'}),
    reset: () => dispatch({ type: 'RESET' }),
    pauseResume: () => dispatch({type: 'PAUSE_RESUME'})
  })


const mapStateToProps = state => ({
  state: state
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Test)
