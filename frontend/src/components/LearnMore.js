import React from 'react';
import { connect } from 'react-redux';
import * as mapDispatchToProps from 'actions';
import { makeStyles } from '@material-ui/core/styles';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from '@material-ui/core';
import { getRegistryContract } from 'utils/wallet';
import Promise from 'bluebird';
import sl from 'utils/sl';

const useStyles = makeStyles(theme => ({
  button: {
    width: 130,
    margin: '0 5px;',
  },
}));

function Component({
  navigate,
  match: {
    params: { listingHash },
  },
}) {
  const classes = useStyles();
  const [reason, setReason] = React.useState('');
  const [amount, setAmount] = React.useState(50);

  const handleClose = () => {
    navigate('/');
  };

  const handleSubmit = async() => {

  };

  return (
    <Dialog
      open={true}
      onClose={handleClose}
      aria-labelledby="dialog-title"
      aria-describedby="dialog-description"
      className={classes.root}
      fullWidth
    >
      <DialogTitle id="dialog-title">
        Challenge POI (work in progress)
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="dialog-description">
          Describe the issues with this Point of Interest
        </DialogContentText>
        <div className="flex flex--justify-center" style={{ marginBottom: 20 }}>
          <TextField
            id="amount"
            label="FOAM"
            type="number"
            InputLabelProps={{
              shrink: true,
            }}
            placeholder={'1 minimum...'}
            value={amount}
            onChange={e => setAmount(e.target.value)}
            fullWidth
          />
        </div>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="default">
          Cancel
        </Button>
        <Button onClick={handleSubmit} color="primary">
          Challenge
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default connect(state => {
  return {};
}, mapDispatchToProps)(Component);
