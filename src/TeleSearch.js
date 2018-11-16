import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import { Button, Grid, TextField } from '@material-ui/core';
import _token from './secret.js';

const axios = require('axios');

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
    };
    handleChange = (event) => {
        this.setState({
            searchTerm: event.target.value,
        });
    };
    getPlaceholder = (screenState) => {
        switch(screenState){
            case 0: return "Tram ID"; 
            case 1: return "Stop Name"; 
            default: return "";
        }
    };
    sendRequest = () => {
        let searchTerm = this.state.searchTerm;
        if (searchTerm === null || searchTerm === "") return;
        // https://api.tfgm.com/odata/Metrolinks({Id})[?$select]
        console.log(_token);
        axios({
            method: "get",
            url: "https://api.tfgm.com/odata/Metrolinks({Id})?" + this.state.searchTerm,
            headers: {"Ocp-Apim-Subscription-Key": _token}
        });
    }
    render() {
        const { classes } = this.props;
        return (
            <div className={classes.root}>
                <Grid container>
                    <Grid item xs={8}>
                        <TextField
                            id="search-term"
                            label={this.getPlaceholder(this.props.screenState)}
                            className={classes.textField}
                            value={this.state.searchTerm}
                            onChange={this.handleChange}
                            margin="normal"
                        />
                    </Grid>
                    <Grid item xs={4}>
                        <Button 
                            variant="contained" 
                            color="secondary" 
                            className={classes.button}
                            onClick={this.sendRequest}
                        >
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