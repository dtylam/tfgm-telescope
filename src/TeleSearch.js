import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import { Button, Grid, TextField, Card, CardContent, Typography, CircularProgress } from '@material-ui/core';
import _token from './secret.js';

// const axios = require('axios');
//  API does not allow CORS, have to use proxy
const _proxy = "https://cors-anywhere.herokuapp.com/";
const _api = "https://api.tfgm.com/odata/";

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
        loading: false,
        // cards: [],
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
        this.setState({
            loading: true,
        })
        // https://api.tfgm.com/odata/Metrolinks({Id})[?$select]

        // const config = {
        //     headers: {
        //         "Ocp-Apim-Subscription-Key": _token,
        //         "Origin": _proxy
        //     }
        // };
        // axios.get(_proxy + _api + "Metrolinks(" + escape(this.state.searchTerm) + ")", config)
        //     .then(response => response.json())
        //     .then(json => {
        //         this.setState({
        //             response: JSON.stringify(json)
        //         });
        //     })
        //     .catch((error) => {
        //         console.log(error);
        //         this.setState({
        //             response: JSON.stringify(error)
        //         })
        //     })
        //}

        fetch(_proxy + _api + "Metrolinks(" + escape(this.state.searchTerm) + ")", {
            method: "get",
            headers: new Headers({
                "Ocp-Apim-Subscription-Key": _token,
                "Origin": _proxy,
            })
        }).then(response => response.json())
            .then(json => {
                this.setState({
                    response: json,
                    loading: false
                })
                console.log(JSON.stringify(json));
            }
            ).catch(error => {
                console.log(error)
            });
    }

    render() {
        const { classes } = this.props;
        const { searchTerm, response, loading } = this.state;
        return (
            <div className={classes.root} >
                <Grid container>
                    <Grid item xs={8}>
                        <TextField
                            id="search-term"
                            label={this.getPlaceholder(this.props.screenState)}
                            className={classes.textField}
                            value={searchTerm}
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
                        {loading ? <CircularProgress className={classes.progress} />
                            : <div></div>
                        }
                        {response != null ?
                            <Card className={classes.card}>
                                <CardContent>
                                    <Typography className={classes.title} color="textSecondary" gutterBottom>
                                        {response.Line} Line, Tram no. {response.Id} ({response.Carriages0}) 
                                    </Typography>
                                    <Typography variant="h5" component="h2" align="left">
                                        {response.StationLocation} Station, {response.Direction}
                                    </Typography>
                                    <Typography component="p">
                                        <span style={{float: "left"}}>To {response.Dest0}</span>
                                        <span style={{float: "right"}}>{response.Wait0} min</span>
                                    </Typography>
                                    <br />
                                </CardContent>
                            </Card>
                            : <div></div>}
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