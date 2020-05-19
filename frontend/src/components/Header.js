import React from 'react';
import { connect } from 'react-redux';
import * as mapDispatchToProps from 'actions';
import { makeStyles } from '@material-ui/core/styles';
import {
  IconButton,
  Tooltip,
  AppBar,
  Typography,
  Toolbar,
  Button,
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import LightIcon from '@material-ui/icons/Brightness7';
import DarkIcon from '@material-ui/icons/Brightness4';
import { isDarkSelector } from 'selectors/theme';
import { APP_TITLE } from 'config';
import NEAR from 'components/NEAR';

const useStyles = makeStyles(theme => ({
  account: {
    color: 'white',
    marginRight: 10,
  },
  balance: {
    color: 'white',
    marginRight: 10,
  },
}));

function Component({
  toggleTheme,
  isDark,
  isLoggedIn,
  activateWallet,
  deactivateWallet,
  accountId,
  balance,
}) {
  const classes = useStyles();

  return (
    <AppBar position="fixed" color="inherit">
      <Toolbar color="inherit">
        <IconButton edge="start" color="inherit" aria-label="menu">
          <MenuIcon />
        </IconButton>
        <Typography
          variant="h6"
          className={'flex flex--justify-center flex--grow'}
        >
          {APP_TITLE}
        </Typography>

        <Button
          onClick={isLoggedIn ? deactivateWallet : activateWallet}
          color="secondary"
        >
          {isLoggedIn ? (
            <>
              <div className={classes.account}>{accountId}</div>{' '}
              <div className={classes.balance}>
                (<NEAR amount={balance} /> N)
              </div>{' '}
              <div>Sign Out</div>{' '}
            </>
          ) : (
            <div>Connect Near Account</div>
          )}
        </Button>

        <Tooltip title="Toggle light/dark theme">
          <IconButton
            onClick={toggleTheme}
            color="inherit"
            aria-label="Toggle light/dark theme"
          >
            {isDark ? <LightIcon /> : <DarkIcon />}
          </IconButton>
        </Tooltip>
      </Toolbar>
    </AppBar>
  );
}

const mapStateToProps = state => {
  const {
    wallet: { isLoggedIn, accountId, balance },
  } = state;
  return {
    isDark: isDarkSelector(state),
    isLoggedIn,
    accountId,
    balance,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Component);
