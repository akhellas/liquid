import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import TableRow from '../TableRow'

// const { fields, data, hover, selected, onSelect, onClick } = props

const props1 = {
  fields: [
    { name: 'lastName', type: 'text' },
    { name: 'firstName', type: 'text' },
    { name: 'dateOfBirth', type: 'date' }
  ],
  data: {
    lastName: 'Katarachias',
    firstName: 'Antonis',
    dateOfBirth: new Date(1981, 6, 15)
  },
  selected: false
}
storiesOf('TableRow', module).add('text', () => (
  <TableRow
    {...props1}
    onSelect={action('selected')}
    onClick={action('clicked')}
  />
))
