import React from 'react';
import { connect } from 'react-redux';
import {Link} from 'react-router-dom';
import * as mapDispatchToProps from 'actions';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import { businessesSelector } from 'selectors/data';
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
}) {
  const classes = useStyles();

  return (
    <div className={clsx('flex flex--justify-center', classes.container)}>
      <div className={clsx('flex', 'flex--column', classes.bodyContainer)}>
        <h1 className="flex flex--grow flex--justify-center">
          Round #1 Funding Pledge: $100,000
        </h1>
        <br />
  <p>Help save these small businesses by donating below. We use quadratic funding to match the final allocations so every small contribution goes a long way towards saving these small businesses. {/*Click <Link to='/learn-more' style={{color: '#fc0'}}>here</Link> to learn more about quadratic funding.*/}</p>
        <br />
        <div className={clsx('flex', classes.sectionsContainer)}>
          <div>
            <div className={clsx(classes.businesses)}>
              {businesses.map(b => (
                <Business key={b.id} business={b} />
              ))}
            </div>
          </div>
          <div>
            <Donations businesses={businesses} />
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

export default connect(state => {
  const {
    wallet: { isLoggedIn },
  } = state;
  return {
    isLoggedIn,
    businesses: businessesSelector(state),
  };
}, mapDispatchToProps)(Component);
