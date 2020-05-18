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

function Component({ business, totalMatchedDonations }) {
  const classes = useStyles();

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
            {business.totalDonations.toFixed(2)} /{' '}
            {business.totalMatchedDonations.toFixed(2)} N
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary">
          Donate
        </Button>
        <Button size="small" color="primary">
          Learn More
        </Button>
      </CardActions>
    </Card>
  );
}

export default connect((state, { index }) => {
  return {};
}, mapDispatchToProps)(Component);
