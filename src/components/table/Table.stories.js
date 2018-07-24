import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import Table from '../Table'

const props1 = {
  title: 'Simple Table',
  fields: [
    { name: 'lastName', type: 'text', caption: 'Last Name' },
    { name: 'firstName', type: 'text', caption: 'First Name' },
    { name: 'dateOfBirth', type: 'date', caption: 'Date' }
  ],
  data: [
    {
      _id: '1',
      lastName: 'Katarachias',
      firstName: 'Antonis',
      dateOfBirth: new Date(1981, 6, 15)
    },
    {
      _id: '2',
      lastName: 'Katarachias',
      firstName: 'Antonis',
      dateOfBirth: new Date(1981, 6, 15)
    }
  ]
}

storiesOf('Table', module).add('simple', () => <Table {...props1} />)
