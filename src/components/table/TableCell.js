import React from 'react'
import MDTableCell from '@material-ui/core/TableCell'
import { Checkbox } from '@material-ui/core'

const getValue = (type, value, options, valueFormatFn) => {
  if (valueFormatFn) {
    return valueFormatFn(value, type, options)
  }

  switch (type) {
    case 'text':
      return value

    case 'date':
      return new Date(value).toLocaleString('el-GR').split(',')[0]

    case 'datetime':
      return new Date(value).toLocaleString('el-GR')

    case 'select':
      const opt = options.find(x => x._id === value)
      return opt ? opt.name : ''

    default:
      return value
  }
}

const TableCell = props => {
  const { padding, type, value, options, valueFormatFn, onClick } = props
  const cpd = type === 'boolean' ? 'checkbox' : padding
  return (
    <MDTableCell
      padding={cpd || 'default'}
      numeric={type === 'number'}
      onClick={onClick}>
      {type === 'boolean' ? (
        <Checkbox checked={value} disabled={true} />
      ) : (
        getValue(type, value, options, valueFormatFn)
      )}
    </MDTableCell>
  )
}

export default TableCell
