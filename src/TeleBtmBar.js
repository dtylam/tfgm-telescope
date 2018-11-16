import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import TramIcon from '@material-ui/icons/Tram';
import StopIcon from '@material-ui/icons/PinDrop';

const styles = {
    root: {
        width: "100vw",
        position: "fixed",
        bottom: 0,
        borderTop: "1px solid lightgrey"
    },
    // // doesnt work :(
    // bottomNavigationAction: {
    //     width: "50%",
    // }
};

class TeleBtmBar extends React.Component {
    state = {
        value: 0,
    };

    handleChange = (event, value) => {
        this.setState({ value });
        this.props.setScreen( value );
    };

    render() {
        const { classes } = this.props;
        const { value } = this.state;

        return (
            <BottomNavigation
                value={value}
                onChange={this.handleChange}
                showLabels
                className={classes.root}
            >
                <BottomNavigationAction label="Tram ID" icon={<TramIcon />} />
                <BottomNavigationAction label="Stop Name" icon={<StopIcon />} />
            </BottomNavigation>
        );
    }
}

TeleBtmBar.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(TeleBtmBar);