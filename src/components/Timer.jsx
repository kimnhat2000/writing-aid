import React from 'react'
import { Button } from 'semantic-ui-react'
import { connect } from 'react-redux'

let timer = null;

const Timer = ({count, reset, states, pauseResume}) => {
  const {start, second, minute, hour} = states
  if(!start){
    clearInterval(timer)
  }
  const onStartandPause=()=>{
    pauseResume();
    if (!start) {
      clearInterval(timer)
      timer = setInterval(() => {
        count()
      }, 1000)
    } else {
      clearInterval(timer)
    };
  }

  return (
    <Button.Group floated='right'>
      {(start || second !== 0 || minute !== 0 || hour !== 0) && <Button icon='redo' onClick={()=>{clearInterval(timer); reset()}} />}
      <Button disabled>
        {hour} : <b>{minute}</b> : {second}
      </Button>
      <Button
        icon={start ? 'pause' : 'play'}
        onClick={()=>onStartandPause()}
      />
    </Button.Group>
  )
}

const mapDispatchToProps = dispatch =>
  ({
    count: () => dispatch({ type: 'START_COUNTING' }),
    reset: () => dispatch({ type: 'RESET' }),
    pauseResume: () => dispatch({ type: 'PAUSE_RESUME' })
  })


const mapStateToProps = ({timer}) => ({
  states: timer
})

export default connect(mapStateToProps, mapDispatchToProps)(Timer)
