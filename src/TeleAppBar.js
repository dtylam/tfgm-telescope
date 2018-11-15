import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import FavoriteIcon from '@material-ui/icons/Favorite';
import RefreshIcon from '@material-ui/icons/Refresh';


const styles = {
    root: {
        flexGrow: 1,
    },
    grow: {
        flexGrow: 1,
    },
    menuButton: {
        marginLeft: -12,
        marginRight: 20,
    },
};

function TeleAppBar(props) {
    const { classes } = props;
    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                    <img className={classes.menuButton} src={require('./favicon.png')} style={{ height: "2em" }} />
                    <Typography variant="h6" color="inherit" className={classes.grow}>
                        TfGM Telescope
                    </Typography>
                    <IconButton className={classes.Button} color="inherit" aria-label="Love">
                        <FavoriteIcon />
                    </IconButton>|
                    <IconButton className={classes.Button} color="inherit" aria-label="Refresh">
                        <RefreshIcon />
                    </IconButton>
                </Toolbar>
            </AppBar>
        </div>
    );
}

TeleAppBar.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(TeleAppBar);