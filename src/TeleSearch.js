import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import { Button, Grid, TextField } from '@material-ui/core';

const styles = {
    root: {
        padding: 16,
    },
    textField: {
        width: "100%",
        float: "left",
    },
    button: {
        margin: 24,
        height: "50%",
        float: "right",
    }
};

class TeleSearch extends React.Component {
    state = {
        searchTerm: null,
    }
    render() {
        const { classes } = this.props;
        return (
            <div className={classes.root}>
                <Grid container>
                    <Grid item xs={8}>
                        <TextField
                            id="search-term"
                            label="Tram ID"
                            className={classes.textField}
                            value={this.state.searchTerm}
                            // onChange={this.handleChange('name')}
                            margin="normal"
                        />
                    </Grid>
                    <Grid item xs={4}>
                        <Button variant="contained" color="secondary" className={classes.button}>
                            Find
                        </Button>
                    </Grid>
                    <Grid item xs={12}>
                        <p>Note: Under Construction!</p>
                    </Grid>
                </Grid>



            </div>
        );
    }

}

TeleSearch.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(TeleSearch);