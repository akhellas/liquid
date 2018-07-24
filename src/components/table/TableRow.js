import React from 'react'
import MDTableRow from '@material-ui/core/TableRow'
import MDTableCell from '@material-ui/core/TableCell'
import MDCheckbox from '@material-ui/core/Checkbox'

import TableCell from './TableCell'

const TableRow = props => {
  const { fields, data, hover, selected, onSelect, onClick } = props
  return (
    <MDTableRow hover={hover || true} selected={selected}>
      <MDTableCell padding="none">
        <MDCheckbox checked={selected} onChange={onSelect} />
      </MDTableCell>
      {fields.map(field => (
        <TableCell
          key={field.name}
          padding={field.padding}
          type={field.type}
          value={data[field.name]}
          options={field.options}
          valueFormatFn={field.valueFormatFn}
          onClick={onClick}
        />
      ))}
    </MDTableRow>
  )
}

export default TableRow
