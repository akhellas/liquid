import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import MDTable from '@material-ui/core/Table'
import MDTableBody from '@material-ui/core/TableBody'

import TableHead from './table/TableHead'
import TableToolbar from './table/TableToolbar'
import TableRow from './table/TableRow'

const styles = theme => ({
  root: {
    width: '100%'
  },
  table: {
    //maxWidth: '100%'
  },
  tableWrapper: {
    overflowX: 'auto'
  }
})

class Table extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      data: props.data,
      selected: [],
      filter: '',
      orderBy: '',
      order: 'asc',
      page: 1,
      pageSize: 10,
      projection: ''
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const { onQueryChange, onSelectionChange } = this.props
    const prevQuery = this.getStateAsQuery(prevState)
    const query = this.getStateAsQuery(this.state)

    if (onQueryChange && prevQuery.toString() !== query.toString()) {
      onQueryChange(query)
    }

    if (onSelectionChange && prevState.selected !== this.state.selected) {
      onSelectionChange(this.state.selected)
    }
  }

  getStateAsQuery(state) {
    const { filter, orderBy, order, page, pageSize, projection } = state
    const query = new URLSearchParams()

    if (page) {
      query.set('page', page)
      query.set('pageSize', pageSize || 10)
    }

    if (orderBy) {
      query.set('orderBy', `${order === 'desc' ? '-' : ''}${orderBy}`)
    }

    if (filter) {
      query.set('filter', filter)
    }

    if (projection) {
      query.set('projection', projection)
    }

    return query
  }

  isSelected = id => {
    return this.state.selected.indexOf(id) !== -1
  }

  handleSelect = (event, id) => {
    const { selected } = this.state
    const index = selected.indexOf(id)

    let newSelected = []

    if (index === -1) {
      newSelected = newSelected.concat(selected, id)
    } else if (index === 0) {
      newSelected = newSelected.concat(selected.slice(1))
    } else if (index === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1))
    } else if (index > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, index),
        selected.slice(index + 1)
      )
    }

    this.setState({ selected: newSelected })
  }

  handleSelectAll = (event, checked) => {
    this.setState(prevState => ({
      selected: checked ? prevState.data.map(x => x._id) : []
    }))
  }

  handleSortChange = (event, property) => {
    const orderBy = property
    let order = 'desc'

    if (this.state.orderBy === property && this.state.order === 'desc') {
      order = 'asc'
    }

    this.setState({ orderBy, order })
  }

  handleFilterChange = filter => {
    this.setState({ filter })
  }

  handleRowClick = (event, item) => {
    const { onRowClick } = this.props
    if (onRowClick) {
      onRowClick(item)
    }
  }

  render() {
    const { classes, title, fields, actions } = this.props
    const {
      data,
      selected,
      filter,
      orderBy,
      order
      // page,
      // pageSize,
    } = this.state
    return (
      <React.Fragment>
        <TableToolbar
          title={title}
          selected={selected}
          filter={filter}
          actions={actions || []}
          onFilterChange={this.handleFilterChange}
        />
        <div className={classes.tableWrapper}>
          <MDTable className={classes.table} aria-labelledby="tableTitle">
            <TableHead
              fields={fields}
              totalCount={data.length}
              selectedCount={selected.length}
              orderBy={orderBy}
              order={order}
              onSortChange={this.handleSortChange}
              onSelectAll={this.handleSelectAll}
            />
            <MDTableBody>
              {data.map((item, index) => (
                <TableRow
                  key={index}
                  fields={fields}
                  data={item}
                  selected={this.isSelected(item._id)}
                  onSelect={event => this.handleSelect(event, item._id)}
                  onClick={event => this.handleRowClick(event, item)}
                />
              ))}
            </MDTableBody>
          </MDTable>
        </div>
      </React.Fragment>
    )
  }
}

export default withStyles(styles, { withTheme: true })(Table)
