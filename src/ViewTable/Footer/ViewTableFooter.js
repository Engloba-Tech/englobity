import { Tooltip } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import PropTypes from 'prop-types';
import React from 'react';

const useStyles1 = makeStyles(theme => ({
  root: {
    flexShrink: 0,
    marginLeft: theme.spacing(2.5)
  }
}));

export function ViewTableFooter(props) {
  const classes = useStyles1();
  const theme = useTheme();
  const { count, page, rowsPerPage, onPageChange, backIconButtonProps, nextIconButtonProps } = props;

  const handleBackButtonClick = event => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = event => {
    onPageChange(event, page + 1);
  };

  return (
    <div className={classes.root}>
      <Tooltip title={backIconButtonProps.title} placement="top">
        <span>
          <IconButton
            onClick={handleBackButtonClick}
            disabled={page === 0}
            aria-label={backIconButtonProps.title}
          >
            {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
          </IconButton>
        </span>
      </Tooltip>

      <Tooltip title={nextIconButtonProps.title} placement="top">
        <span>
          <IconButton
            onClick={handleNextButtonClick}
            disabled={page >= Math.ceil(count / rowsPerPage) - 1}
            aria-label={nextIconButtonProps.title}
          >
            {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
          </IconButton>
        </span>
      </Tooltip>
    </div>
  );
}

ViewTableFooter.propTypes = {
  count: PropTypes.number.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  backIconButtonProps: PropTypes.object,
  nextIconButtonProps: PropTypes.object
};
