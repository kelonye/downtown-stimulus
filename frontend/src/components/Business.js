import React from 'react';
import { connect } from 'react-redux';
import * as mapDispatchToProps from 'actions';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import NEAR from 'components/NEAR';
import sl from 'utils/sl';

const useStyles = makeStyles({
  root: {
    '& .MuiCardContent-root': {
      padding: '16px 16px 0',
    },
  },
  media: {
    height: 100,
  },
});

function Component({ business, donate, accountId, activateWallet }) {
  const classes = useStyles();

  const onDonate = async() => {
    if (!accountId) {
      return sl(
        'info',
        'You will be redirected to connect with your near testnet wallet account...',
        'Please login',
        activateWallet
      );
    }
    let donation = prompt('Enter NEAR amount?');
    if (donation === null) {
      return;
    }
    donation = parseInt(donation);
    if (!donation) {
      return await onDonate();
    }
    try {
      await donate(business.id, donation);
      sl('success', 'Added!');
    } catch (e) {
      sl('error', e);
    }
  };

  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image={business.image}
          title={business.name}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {business.name}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            <NEAR amount={business.totalDonations} /> /{' '}
            <NEAR amount={business.totalMatchedDonations} /> N
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary" onClick={onDonate}>
          Donate
        </Button>
        {/*
        <Button size="small" color="primary">
          Learn More
        </Button>
        */}
      </CardActions>
    </Card>
  );
}

export default connect(({ wallet: { accountId } }) => {
  return { accountId };
}, mapDispatchToProps)(Component);
