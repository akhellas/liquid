import React from 'react'
import classNames from 'classnames'
import { withStyles } from '@material-ui/core/styles'
import { lighten } from '@material-ui/core/styles/colorManipulator'
import MDToolbar from '@material-ui/core/Toolbar'
import MDTypography from '@material-ui/core/Typography'
import MDIconButton from '@material-ui/core/IconButton'
import MDTooltip from '@material-ui/core/Tooltip'
import MDInput from '@material-ui/core/Input'
import MDInputAdornment from '@material-ui/core/InputAdornment'

import MDSearchIcon from '@material-ui/icons/Search'
import MDClearIcon from '@material-ui/icons/Clear'

const styles = theme => ({
  root: {
    paddingLeft: theme.spacing.unit * 2,
    paddingRight: theme.spacing.unit
  },
  highlight:
    theme.palette.type === 'light'
      ? {
          color: theme.palette.secondary.main,
          backgroundColor: lighten(theme.palette.secondary.light, 0.85)
        }
      : {
          color: theme.palette.text.primary,
          backgroundColor: theme.palette.secondary.dark
        },
  spacer: {
    flex: '1 1 100%'
  },
  actions: {
    color: theme.palette.text.secondary,
    display: 'flex'
  },
  iconButton: {
    width: theme.spacing.unit * 4,
    height: theme.spacing.unit * 4
  },
  searchSpacer: {
    minWidth: theme.spacing.unit * 2
  },
  searchInput: {
    backgroundColor: theme.palette.grey[50]
  },
  clearFilter: {
    width: 'auto',
    height: 'auto'
  },
  title: {
    flex: '0 0 auto'
  }
})

const TableToolbar = props => {
  const { classes, selected, title, filter, onFilterChange, actions } = props
  const selectedCount = selected.length

  const actionGroups = {
    0: actions.filter(x => !x.selectedCount),
    1: actions.filter(x => x.selectedCount === 1),
    2: actions.filter(x => x.selectedCount > 1)
  }

  return (
    <MDToolbar
      className={classNames(classes.root, {
        [classes.highlight]: selectedCount > 0
      })}
      disableGutters>
      <div className={classes.title}>
        {selectedCount > 0 ? (
          <MDTypography color="inherit" variant="subheading">
            {selectedCount} επιλεγμένα
          </MDTypography>
        ) : (
          <MDTypography variant="title" id="tableTitle">
            {title}
          </MDTypography>
        )}
      </div>
      <div className={classes.spacer} />
      {selectedCount === 0 && (
        <MDInput
          id="input-search"
          className={classes.searchInput}
          startAdornment={
            <MDInputAdornment position="start">
              <MDSearchIcon />
            </MDInputAdornment>
          }
          endAdornment={
            filter.length > 0 && (
              <MDInputAdornment position="end">
                <MDIconButton
                  size="mini"
                  className={classes.clearFilter}
                  onClick={() => onFilterChange('')}>
                  <MDClearIcon />
                </MDIconButton>
              </MDInputAdornment>
            )
          }
          value={filter}
          onChange={event => onFilterChange(event.target.value)}
          //fullWidth
          disableUnderline
        />
      )}
      <div className={classes.searchSpacer} />
      <div className={classes.actions}>
        {actionGroups[selectedCount > 1 ? 2 : selectedCount].map(
          ({ caption, Icon, onClick }, index) => (
            <MDTooltip key={index} title={caption}>
              <MDIconButton
                className={classes.iconButton}
                aria-label={caption}
                onClick={event => onClick(event, selected)}>
                <Icon />
              </MDIconButton>
            </MDTooltip>
          )
        )}
      </div>
    </MDToolbar>
  )
}

export default withStyles(styles, { withTheme: true })(TableToolbar)
