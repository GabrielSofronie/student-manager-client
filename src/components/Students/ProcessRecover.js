import React, { Component } from 'react'
import { Redirect } from 'react-router-dom';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import LinearProgress from '@material-ui/core/LinearProgress';

import { STUDENTS_URL } from '../../config/api'
import { I18n, I18nHttp } from '../../i18n/i18n'
import { authService } from '../../services/AuthService'

import SnackbarNotification from '../Ui/SnackbarNotification'

class ProcessRecover extends Component {
    constructor(props) {
        super(props);

        this.state = {
            success : false,
            snackbar : {
                open : false,
                variant : "success",
                message : I18nHttp.Status2xx
            }
        };
    }

    componentWillMount() {
        var query = new URLSearchParams(window.location.search);
        if (!query.has("code")) {
            // Invalid URL - generate an error message and exit
            this.setState({
                snackbar : {
                    open : true,
                    variant : "error",
                    message : I18nHttp.Status5xx
                }
            });
            return;
        }

        authService.recover(STUDENTS_URL, {
            code: query.get("code")
        })
        .then(() => {
            this.setState({ success : true });
        })
        .catch(() => {
            this.setState({
                success : false,
                snackbar : {
                    open : true,
                    variant : "error",
                    message : I18nHttp.Status5xx
                }
            });
        });
    }

    handleCloseSnackbar = (_event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
  
        // Reset Snackbar
        this.setState({
            snackbar : {
                open : false,
                variant : this.state.snackbar.variant,
                message : this.state.snackbar.message,
            }
        });
      }

    render() {

        if (this.state.success === true) {
            return <Redirect to='/' />
        }

        const { snackbar } = this.state;

        return (
            <Box my={4}>
                <Paper>
                    <Box mb={2} px={2} py={1} bgcolor="grey.100">
                        <Typography
                            variant="h5"
                            component="h3">
                            {I18n.Processing}
                        </Typography>
                    </Box>
                    <Box px={2} py={4}>
                        <LinearProgress />
                    </Box>
                </Paper>

                <SnackbarNotification
                    snackbar={snackbar}
                    close={this.handleCloseSnackbar}
                    />
            </Box>
        );
    }
}

export default ProcessRecover