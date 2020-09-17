import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles(theme => ({
  root: {
    '& > *': {
      minWidth: '0',
    },
  },
}));
export function ButtonRemove({ type, id, onClick }) {
  const classes = useStyles();
  return (
    <Button
      type={type}
      data-id={id}
      onClick={onClick}
      variant="contained"
      color="secondary"
      classes={classes}
    >
      <svg
        width="11"
        height="11"
        viewBox="0 0 11 11"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M11 1.10786L9.89214 0L5.5 4.39214L1.10786 0L0 1.10786L4.39214 5.5L0 9.89214L1.10786 11L5.5 6.60786L9.89214 11L11 9.89214L6.60786 5.5L11 1.10786Z"
          fill="white"
        />
      </svg>
    </Button>
  );
}
