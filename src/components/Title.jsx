import React from 'react'
import { Container, Popup, Icon, Divider, Button } from 'semantic-ui-react'

import Option from './Option'

const AvailableOptions = props => {
  const clickATitle = id => () => {
    props.onTitleClick(id)
  }

  const availableOptions = props.data.map((d, i) =>
    d.collapse ? (
      <Container fluid key={i}>
        <Option
          title={d.title}
          option={d.possibleAnswers}
          onOptionClick={props.onOptionClick}
          titleId={d.id}
          onTitleClick={props.onTitleClick}
          onDeleteClick={props.onDeleteOptionButtonClick}
          onEditOptionButtonClick={props.onEditOptionButtonClick}
          onConfirmShow={props.onConfirmShow}
          cancelButton={props.cancelButton}
          confirmButton={props.confirmButton}
          editOptionButtonStatus={props.editOptionButtonStatus}
          onDeleteTitleClick={props.onDeleteTitleClick}
          handleDeleteTitleConfirm={props.handleDeleteTitleConfirm}
          onDeleteTitleShow={props.onDeleteTitleShow}
        />
      </Container>
    ) : (
      <Container className='title' key={i}>
        <h4 className='title' onClick={clickATitle(d.id)}>
          {d.title}
          <Popup
            trigger={
              <Button size='mini' icon floated='right'>
                <Icon name='angle double down' />
              </Button>
            }
            content='open title'
          />
        </h4>

        <Divider horizontal>{i + 1 + '/' + props.data.length}</Divider>
      </Container>
    )
  )

  return (
    <div>
      <div>{availableOptions}</div>
    </div>
  )
}

export default AvailableOptions
