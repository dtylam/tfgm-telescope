import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import { Button, Grid, TextField, Card, CardContent, Typography, CircularProgress, Snackbar, IconButton } from '@material-ui/core';
import _token from './secret.js';
import CloseIcon from '@material-ui/icons/Close';

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
        error: "",
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
        fetch(_proxy + _api + "Metrolinks(" + escape(this.state.searchTerm) + ")", {
            method: "get",
            headers: new Headers({
                "Ocp-Apim-Subscription-Key": _token,
                "Origin": _proxy,
            })
        }).then(response => {
            // console.log(response.status);
            if (response.status !== 200) {
                this.setState({
                    loading: false,
                    error: response.status + " " + response.statusText,
                })
            }
            else {
                this.setState({
                    response: response.json(),
                    loading: false,
                    error: "",
                })
                // console.log(json);
            }
        }).catch(error => {
            this.setState({
                searchTerm: null,
                loading: false,
                error: error.message,
            })
            console.log(error)
        });
    }
    snackbarClose = () => {
        this.setState({ error: "", });
    };
    render() {
        const { classes } = this.props;
        const { searchTerm, response, loading, error } = this.state;
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
                        <Snackbar
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'center',
                            }}
                            open={error !== ""}
                            autoHideDuration={2000}
                            onClose={this.snackbarClose}
                            ContentProps={{
                                'aria-describedby': 'message-id',
                            }}
                            message={<span id="message-id">{error}</span>}
                            action={[
                                <IconButton
                                    key="close"
                                    aria-label="Close"
                                    color="inherit"
                                    className={classes.close}
                                    onClick={this.snackbarClose}
                                >
                                    <CloseIcon />
                                </IconButton>,
                            ]}
                        />
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
                                        <span style={{ float: "left" }}>To {response.Dest0}</span>
                                        <span style={{ float: "right" }}>{response.Wait0} min</span>
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