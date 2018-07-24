import React from 'react'
import MDTableHead from '@material-ui/core/TableHead'
import MDTableRow from '@material-ui/core/TableRow'
import MDTableCell from '@material-ui/core/TableCell'
import MDCheckbox from '@material-ui/core/Checkbox'
import MDTableSortLabel from '@material-ui/core/TableSortLabel'

const TableHead = props => {
  const {
    fields,
    totalCount,
    selectedCount,
    orderBy,
    order,
    onSelectAll,
    onSortChange
  } = props
  return (
    <MDTableHead>
      <MDTableRow>
        <MDTableCell padding="none">
          <MDCheckbox
            indeterminate={selectedCount > 0 && selectedCount < totalCount}
            checked={selectedCount === totalCount}
            onChange={onSelectAll}
          />
        </MDTableCell>
        {fields.map((field, index) => (
          <MDTableCell
            key={index}
            padding={field.padding || 'default'}
            numeric={field.type === 'number'}
            sortDirection={orderBy === field.name ? order : false}>
            <MDTableSortLabel
              active={orderBy === field.name}
              direction={order}
              onClick={event => onSortChange(event, field.name)}>
              {field.caption}
            </MDTableSortLabel>
          </MDTableCell>
        ))}
      </MDTableRow>
    </MDTableHead>
  )
}

export default TableHead
