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
        searchTerm: "",
        response: null,
    };
    handleChange = (event) => {
        this.setState({
            searchTerm: event.target.value,
        });
    };
    getPlaceholder = (screenState) => {
        switch (screenState) {
            case 0: return "Tram ID";
            case 1: return "Stop Name";
            default: return "";
        }
    };
    sendRequest = () => {
        const searchTerm = this.state.searchTerm;
        if (searchTerm === "") return;

        // https://api.tfgm.com/odata/Metrolinks({Id})[?$select]

        // //   CORS error
        // const config = {
        //     headers: {
        //         "Ocp-Apim-Subscription-Key": _token,
        //         "Access-Control-Allow-Origin": "*",
        //         "Access-Control-Allow-Methods": "GET",
        //         "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept",
        //         // "Content-Type": "application/json",
        //     }
        //   };
        // axios.get("https://api.tfgm.com/odata/Metrolinks(" + escape(this.state.searchTerm) + ")", config)
        //         .then((resp) => {
        //             this.setState({
        //                 response: resp.json()
        //             }
        //         )})
        //         .catch((error) => {
        //             console.log(error);
        //             this.setState({
        //                 response: JSON.stringify(error)
        //             }
        //         )});

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
                        <p>{this.state.response}</p>
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