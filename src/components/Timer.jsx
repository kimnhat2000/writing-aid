import React from 'react'
import { Button } from 'semantic-ui-react'

const defaultState = {
  timer: null,
  second: 0,
  minute: 0,
  hour: 0,
  start: false
}

class Timer extends React.Component {
  constructor (props) {
    super(props)
    this.state = { 
      ...defaultState
    }
  }

  componentDidUpdate (prevProps, prevState) {
    if(prevProps.record !== this.props.record){
      const { second, minute, hour } = this.state
      if(this.props.record){
        clearInterval(this.state.timer)
        this.props.recordTime(`${hour}:${minute}:${second}`);
        this.setState({ ...defaultState })
      }
    }}
  startCounting = () => {
    clearInterval(this.state.timer)
    this.setState({
      timer: setInterval(() => {
        const { second, minute, hour } = this.state
        this.setState({
          second: second + 1
        })
        if (second === 59) {
          this.setState({ second: 0, minute: minute + 1 })
        }
        if (minute === 59) {
          this.setState({ second: 0, minute: 0, hour: hour + 1 })
        }
      }, 1000)
    })
  }

  onReset = () => {
    clearInterval(this.state.timer)
    this.setState({ ...defaultState })
  }

  onStartandPause = () => {
    const { start } = this.state
    const test = !start
    this.setState({ start: test }, ()=>{
      if (!test) {
        clearInterval(this.state.timer)
      } else {
        this.startCounting()
      }
    })
  }

  render () {
    const { second, minute, hour, start } = this.state

    return (
      <Button.Group floated='right'>
        {(start || second !== 0 || minute !== 0 || hour !== 0) && <Button icon='redo' onClick={this.onReset} />}
        <Button disabled>
          {hour} : <b>{minute}</b> : {second}
        </Button>
        <Button
          icon={start ? 'pause' : 'play'}
          onClick={this.onStartandPause}
        />
      </Button.Group>
    )
  }
}

export default Timer
