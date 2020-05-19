import React from 'react';
import { connect } from 'react-redux';
import * as mapDispatchToProps from 'actions';
import { makeStyles } from '@material-ui/core/styles';
import { Paper, TextField, Button } from '@material-ui/core';
import clsx from 'clsx';
import sl from 'utils/sl';

const useStyles = makeStyles(theme => ({
  paper: {
    width: 960,
    margin: '100px auto 0',
    padding: 50,
  },
  row: {
    marginBottom: 20,
  },
  button: {
    width: 100,
  },
  addButton: {
    marginRight: 5,
  },
}));

const Component = ({ goHome, contract, registerBusiness }) => {
  const classes = useStyles();

  async function onFormSubmit(e) {
    e.preventDefault();
    const fields = {
      // name: 'Tastebuds',
      // image:
      //   'https://media-cdn.tripadvisor.com/media/photo-s/07/e3/f6/8d/chocolate-cafe.jpg',
      // description: 'Funding to be used to pay rent,...',
    };
    ['name', 'image', 'description'].forEach(
      field => (fields[field] = e.target[field].value)
    );
    try {
      await registerBusiness(fields);
      sl('success', 'Added!');
    } catch (e) {
      sl('error', e);
    }
  }

  return (
    <Paper className={classes.paper}>
      <form type="action" onSubmit={onFormSubmit}>
        <h4 className="drawer__title">Register business</h4>
        <br />
        <div className="drawer__content flex flex--column">
          <div className={classes.row}>
            <TextField
              id="name"
              label="Name"
              type="text"
              InputLabelProps={{
                shrink: true,
              }}
              fullWidth
              required
            />
          </div>
          <div className={classes.row}>
            <TextField
              id="image"
              label="Image"
              type="text"
              InputLabelProps={{
                shrink: true,
              }}
              fullWidth
              required
            />
          </div>
          <div className={classes.row}>
            <TextField
              id="description"
              label="Description"
              type="text"
              InputLabelProps={{
                shrink: true,
              }}
              multiline
              rows="4"
              fullWidth
              required
            />
          </div>
          <div className={classes.row}>
            <Button
              variant="contained"
              color="primary"
              type="submit"
              className={clsx(classes.button, classes.addButton)}
            >
              Register
            </Button>
            <Button
              variant="contained"
              className={classes.button}
              onClick={() => {
                goHome();
              }}
            >
              Cancel
            </Button>
          </div>
        </div>
      </form>
    </Paper>
  );
};

export default connect(() => {
  return {};
}, mapDispatchToProps)(Component);
