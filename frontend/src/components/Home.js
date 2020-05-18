import React from 'react';
import { connect } from 'react-redux';
import * as mapDispatchToProps from 'actions';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import { Button } from '@material-ui/core';
import Loader from './Loader';
import Business from './Business';
import Donations from './Donations';

const useStyles = makeStyles(theme => ({
  container: {
    position: 'relative',
  },
  paper: { marginTop: 50, padding: 50 },
  paperInactive: {
    opacity: 0.5,
    pointerEvents: 'none',
  },
  bodyContainer: {
    marginTop: 100,
    width: 960,
    margin: '0 auto',
  },
  sectionsContainer: {
    '& > div': { width: '50%', padding: 10 },
  },
  loader: {
    position: 'absolute',
    top: '50%',
  },
  businesses: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gridRowGap: '5px',
    gridColumnGap: '5px',
  },
}));

function Component({
  isWorking,
  wallet,
  activateWallet,
  isLoggedIn,
  businesses,
  donations,
}) {
  const classes = useStyles();

  return (
    <div className={clsx('flex flex--justify-center', classes.container)}>
      <div className={clsx('flex', 'flex--column', classes.bodyContainer)}>
        <h1 className="flex flex--grow flex--justify-center">
          Round #5 Funding Pledge: $100,000
        </h1>
        <br />
        <div className={clsx('flex', classes.sectionsContainer)}>
          <div>
            <div className={clsx(classes.businesses)}>
              {businesses.map((b, i) => (
                <Business key={b.id} business={b} donation={donations[i]} />
              ))}
            </div>
          </div>
          <div>
            <Donations />
          </div>
        </div>
      </div>

      {!isWorking ? null : (
        <div className={classes.loader}>
          <Loader />
        </div>
      )}
    </div>
  );
}

export default connect(
  ({ data: { businesses, donations }, wallet: { isLoggedIn } }) => ({
    isLoggedIn,
    businesses,
    donations,
  }),
  mapDispatchToProps
)(Component);
