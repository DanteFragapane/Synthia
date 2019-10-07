import React from 'react'
import { Table } from 'reactstrap'
import './Table.css'
import { Button } from 'reactstrap'

export default class Example extends React.Component {
  render () {
    return (
      <div className='mesa'>
        <Table dark>
          <thead>
            <tr>
              <th>BUZZ</th>
              <th>BLAMO</th>
              <th>WHAMO</th>
              <th>ZAP</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope='row'>1</th>
              <td><Button color='primary'>WUUUUUB!</Button>{' '}</td>
              <td><Button color='secondary'>WUUUUUB!</Button>{' '}</td>
              <td><Button color='success'>WUUUUUB!</Button>{' '}</td>
            </tr>
            <tr>
              <th scope='row'>2</th>
              <td><Button color='primary'>WUUUUUB!</Button>{' '}</td>
              <td><Button color='warning'>WUUUUUB!</Button>{' '}</td>
              <td><Button color='danger'>WUUUUUB!</Button>{' '}</td>
            </tr>
            <tr>
              <th scope='row'>3</th>
              <td><Button color='warning'>WUUUUUB!</Button>{' '}</td>
              <td><Button color='secondary'>WUUUUUB!</Button>{' '}</td>
              <td><Button color='primary'>WUUUUUB!</Button>{' '}</td>
            </tr>
            <tr>
              <th scope='row'>2</th>
              <td><Button color='primary'>WUUUUUB!</Button>{' '}</td>
              <td><Button color='warning'>WUUUUUB!</Button>{' '}</td>
              <td><Button color='danger'>WUUUUUB!</Button>{' '}</td>
            </tr>
            <tr>
              <th scope='row'>2</th>
              <td><Button color='primary'>WUUUUUB!</Button>{' '}</td>
              <td><Button color='warning'>WUUUUUB!</Button>{' '}</td>
              <td><Button color='danger'>WUUUUUB!</Button>{' '}</td>
            </tr>
          </tbody>
        </Table>
      </div>
    )
  }
}
