import React from 'react';
import { Container, Header, Grid, Icon, Segment } from 'semantic-ui-react';
import copy from 'copy-to-clipboard';

import { dummyData, mainDropdownMenu } from './tools';
import AvailableOptions from './Title';
import TextEditor from './TextEditor';
import AppForm from './Form';
import FunctionMenu from './FunctionMenu';
import QuestionRender from './Question';

import Test from './Test';


class WritingAidMain extends React.Component {
    constructor (props) {
        super (props);
        this.state = {
            data: dummyData,
            onConfirmShow: false,
            onDeleteTitleShow: false,
            onConfirm: false,
            onFormOpen: true,
            activeComponent: 'responses',
            mainMenuItem: mainDropdownMenu,
            questionExpansion: false,
            timerClick: false,
        }
    }

    onTitleClick = (id) => {
        const data = this.state.data.map(item => item.id === id ? {...item, collapse: !item.collapse} : item)
        this.setState({ data })
    }

    handleDeleteTitleConfirm = (titleId) => {
        const data = this.state.data.filter(item => item.id !== titleId);
        this.setState({ data })
    }

    onOptionClick = (d, i) => {
        const data = this.state.data.map(item => item.id === i ? 
            {...item, possibleAnswers: item.possibleAnswers.map(i => i.id === d.id ? 
                {...i, selected: !i.selected} : {...i, selected: false})} : 
                {...item, possibleAnswers: item.possibleAnswers.map(unit=>({...unit, selected: false}))})
        copy(d.option)
        this.setState({data})
    }

    onEditOptionButtonClick = (option, titleId) => {
        const { data } = this.state
        const newData = data.map(item => item.id === titleId ? 
            {...item, possibleAnswers: item.possibleAnswers.map(unit => unit.id === option ? 
                { ...unit} : unit)} : item)
        this.setState({ data: newData, onFormOpen: !this.state.onFormOpen }, () => {console.log('edited option: ', data[0].possibleAnswers)})
    }

    handleConfirm = (option, titleId) => {
        const data = this.state.data.map(item => item.id === titleId ? { ...item, possibleAnswers: item.possibleAnswers.filter(i => i.id !== option)} : item)
        this.setState({ data, onConfirmShow: false })
    }
    
    render () {
        const { data, onConfirmShow, onDeleteTitleShow, onFormOpen, activeComponent, mainMenuItem, timerClick, questionExpansion } = this.state;
        return (

            <Container>
                <Header as='h2' dividing>
                    <Icon name='write' />
                    <Header.Content>CS: GO</Header.Content>
                </Header>
                <Grid columns='equal'>
                    <Grid.Column>
                        <Segment>
                            <FunctionMenu
                                activeComponent={(name)=>this.setState({ activeComponent: name })}
                                menuItems={mainMenuItem}
                                shownComponentName={this.state.activeComponent}
                            />

                            {activeComponent === mainMenuItem[0] &&
                            <Test/>
                            }

                            <AvailableOptions
                                data={data}
                                onOptionClick={this.onOptionClick}
                                onTitleClick={this.onTitleClick}
                                onDeleteTitleClick={() => this.setState({ onDeleteTitleShow: true })}
                                onEditOptionButtonClick={this.onEditOptionButtonClick}
                                editButtonStatus={onFormOpen}
                                onDeleteOptionButtonClick={() => this.setState({ onConfirmShow: true })}
                                onConfirmShow={onConfirmShow}
                                cancelButton={() => this.setState({ onConfirmShow: false, onDeleteTitleShow: false })}
                                confirmButton={this.handleConfirm}
                                onDeleteTitleShow={onDeleteTitleShow}
                                handleDeleteTitleConfirm={this.handleDeleteTitleConfirm}
                            />

                            

                        </Segment>
                        <QuestionRender 
                            questionExpansionClick={()=>this.setState({ questionExpansion: !questionExpansion })}
                            questionExpansion={questionExpansion}
                        />
                    </Grid.Column>
                    <Grid.Column width={10}>
                        {onFormOpen ? 
                            <AppForm
                                onFormOpen={() => this.setState({ onFormOpen: false })} 
                            /> : 
                            <TextEditor 
                                onTimerClick={()=>this.setState({timerClick: !timerClick})}
                                startTimer={timerClick}
                            />}
                    </Grid.Column>
                </Grid>

            </Container>
        )
    }
}

export default WritingAidMain;

