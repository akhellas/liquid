import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import TableCell from '../TableCell'

storiesOf('TableCell', module)
  .add('text', () => (
    <TableCell type="text" value="simple text" onClick={action('clicked')} />
  ))
  .add('date', () => (
    <TableCell type="date" value={new Date()} onClick={action('clicked')} />
  ))
  .add('text date', () => (
    <TableCell
      type="date"
      value={new Date().toString()}
      onClick={action('clicked')}
    />
  ))
  .add('epoch date', () => (
    <TableCell
      type="date"
      value={new Date().valueOf()}
      onClick={action('clicked')}
    />
  ))
