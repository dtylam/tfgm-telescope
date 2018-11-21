import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Card, CardContent } from '@material-ui/core';

const styles = {

}

const Cards = (props) => {
    let cards = [];
    for (let i = 0; i < props.array.length; i++) {
        cards.push(<i key={"star_" + i} class="far fa-star"></i>);
    }
    return (
        <div>
            {cards}
        </div>
    );
}

export default withStyles(styles)(Cards);