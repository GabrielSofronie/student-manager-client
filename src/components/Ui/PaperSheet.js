import React, { Component } from 'react';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/styles';

const useStyles = {
    root: {
      margin: '32px 0'
    },
};

class PaperSheet extends Component {
    render() {
        const { pane } = this.props;

        return (
          <Paper className={this.props.classes.root}>
            {pane}
          </Paper>
        );
    }
}

export default withStyles(useStyles)(PaperSheet);