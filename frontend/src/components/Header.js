import React from 'react';
import { connect } from 'react-redux';
import * as mapDispatchToProps from 'actions';
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

function Component({
  toggleTheme,
  isDark,
  isLoggedIn,
  activateWallet,
  deactivateWallet,
}) {
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
          {isLoggedIn ? 'Sign Out' : 'Connect'}
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
    wallet: { isLoggedIn },
  } = state;
  return {
    isDark: isDarkSelector(state),
    isLoggedIn,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Component);
