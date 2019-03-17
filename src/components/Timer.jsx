import React from 'react';
import { Button, Icon, Popup } from 'semantic-ui-react';

class Timer extends React.Component{
    constructor(props){
        super(props);
        this.state= {
            timer: null,
            second: 0,
            minute: 0,
            hour: 0,
            start: false,
        }
    }

    startCounting = () => { 
        clearInterval(this.state.timer);
        this.setState ({timer:
            setInterval(() => {
                const { second, minute, hour } = this.state;
                this.setState({
                    second: second + 1,
                })
                if (second === 59) {
                    this.setState({ second: 0, minute: minute + 1 })
                }
                if (minute === 59) {
                    this.setState({ second: 0, minute: 0, hour: hour + 1 })
                }
            }, 1000)
        })    
    };

    onReset = () => {
        const second = 0, minute = 0, hour = 0;
        clearInterval(this.state.timer);
        this.setState({ timer: null, second, minute, hour, start: false });
        this.props.onTimerClick();
    }

    onStartandPause = () => {
        const trythis = this.state.start
        this.setState({ start: !trythis}, () => {
            if (!this.state.start) {
                clearInterval(this.state.timer)
            } else {
                this.startCounting()
            }
        })
    }
        
    render () {

        const { second, minute, hour, start } = this.state;
        const { startTimer, onTimerClick } = this.props;

        return (
        startTimer ? 
        <Button.Group floated='right'>
            <Popup
                trigger={
                    <Button onClick={this.onStartandPause}>
                        {hour} : <b>{minute}</b> : {second}
                    </Button>}
                content={start ? `click to pause` : 'click to start'}
            /> 

            <Popup
                trigger={
                    <Button icon onClick={this.onReset}>
                        <Icon name='redo' />
                    </Button>}
                content='reset'
            />   
        </Button.Group>
        
        :
        <Popup 
            trigger={
                <Button icon floated='right' onClick={() => {onTimerClick(); this.startCounting(); this.setState({start: true})}} >
                    <Icon className='icon' name='stopwatch' />
                </Button>} 
            content='start stopwatch' 
        />        
        )
    }
}

export default Timer;