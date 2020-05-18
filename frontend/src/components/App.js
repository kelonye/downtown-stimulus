import React from 'react';
import { connect } from 'react-redux';
import * as mapDispatchToProps from 'actions';
import { ThemeProvider, makeStyles } from '@material-ui/core/styles';
import { DANGER_COLOR } from 'config';
import Header from './Header';
import Home from './Home';
import Loader from './Loader';
import { Router } from 'react-router-dom';
import { history } from 'store';
import themeSelector, { isDarkSelector } from 'selectors/theme';
import { CssBaseline } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  error: { padding: 50, color: DANGER_COLOR },
}));

function Component({ error, isLoaded, theme, isDark }) {
  const classes = useStyles();

  React.useEffect(() => {
    const root = document.documentElement;
    if (root.classList.contains(isDark ? 'light' : 'dark')) {
      root.classList.remove(isDark ? 'light' : 'dark');
      root.classList.add(isDark ? 'dark' : 'light');
    }
  }, [isDark]);

  let pane;
  if (error) {
    pane = <div className={classes.error}>{error}</div>;
  } else if (isLoaded) {
    pane = (
      <div className="flex-grow">
        <Header />
        <Home />
      </div>
    );
  } else {
    pane = <Loader fullscreen />;
  }
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router {...{ history }}>
        <div>{pane}</div>
      </Router>
    </ThemeProvider>
  );
}

export default connect(state => {
  const { app, user } = state;
  const { isLoaded, error } = app;
  let err;
  if (error) {
    console.log(error);
    err = error.message || 'Error Loading Application!';
  }

  return {
    isLoaded,
    user,
    error: err,
    theme: themeSelector(state),
    isDark: isDarkSelector(state),
  };
}, mapDispatchToProps)(Component);
