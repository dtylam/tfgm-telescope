import React from 'react';
import Select from 'react-select';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import { Button, Grid, TextField, Card, CardContent, Typography, CircularProgress, Snackbar, IconButton } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';

const _api = "http://localhost:7071/api/";
const _getLines = "GetLines";

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
    },
    select: {
        margin: 24,
    }
};

class TeleSearch extends React.Component {
    state = {
        response: null,
        resultsLoading: false,
        linesLoading: true,
        stopsLoading: false,
        error: "",
        lineOptions: [],
        stopOptions: [],
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
    getLines = () => {
        fetch(_api + _getLines, {
            method: "get",
            headers: new Headers({
            })
        }).then(response => 
            response.json().then(data => {
                this.setState({
                    linesLoading: false,
                    lineOptions: data.map((i) => { return { value: i, label: i } })
                })
            })
        );
    }
    sendRequest = () => {
        const searchTerm = this.state.searchTerm;
        if (searchTerm === "") return;
        this.setState({
            loading: true,
        })
        // https://api.tfgm.com/odata/Metrolinks({Id})[?$select]
        fetch(_api + "Metrolinks(" + escape(this.state.searchTerm) + ")", {
            method: "get",
            headers: new Headers({
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
        const { response, resultsLoading, linesLoading, stopsLoading, error, lineOptions, stopOptions } = this.state;
        return (
            <div className={classes.root} >
                <Grid container>
                    <Grid item xs={5}>
                        <Select
                            className={classes.select}
                            isLoading={linesLoading}
                            isClearable={true}
                            isSearchable={true}
                            name="Line"
                            placeholder="Select Line"
                            options={lineOptions}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <Select
                            className={classes.select}
                            isDisabled={true}
                            isLoading={stopsLoading}
                            isClearable={true}
                            isSearchable={true}
                            name="Stop"
                            placeholder="Select Stop"
                            options={stopOptions}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        {resultsLoading ? <CircularProgress className={classes.progress} />
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
    componentDidMount() {
        this.getLines();
    }
}

TeleSearch.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(TeleSearch);