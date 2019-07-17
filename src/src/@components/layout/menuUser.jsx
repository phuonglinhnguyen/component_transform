import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const styles = {
    media: {
        height: 140,
    },
};

function MenuUser(props) {
    const { classes, onLogout, user = {} } = props;
    return (
        <div style={{ width: 300 }}>
            <CardContent>
                <Typography gutterBottom variant="headline" component="h2">
                    {user.username}
                </Typography>
                <Typography component="p">
                   
                </Typography>
            </CardContent>
            <CardActions>
                <Button size="small" color="primary" onClick={e => { e.preventDefault(); onLogout() }}>
                    LOGOUT
                </Button>
            </CardActions>
        </div>
    );
}

MenuUser.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(MenuUser);