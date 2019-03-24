import React from 'react'
import {Table, Container} from 'semantic-ui-react'

import { dummyStatisticData} from './tools'

const Statistic = () => {
  return(
    <Container className='container-overflow'>
      <Table celled selectable>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Date</Table.HeaderCell>
            <Table.HeaderCell># Answers</Table.HeaderCell>
            <Table.HeaderCell>Notes</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {dummyStatisticData.map((data, index) => (
            <Table.Row key={index}>
              <Table.Cell >{data.date}</Table.Cell>
              <Table.Cell >{data.answer}</Table.Cell>
              <Table.Cell >{data.note}</Table.Cell>
            </Table.Row>
          ))}

        </Table.Body>
      </Table>
    </Container>
    
  )
}

export default Statistic