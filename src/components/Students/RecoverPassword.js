import React, { Component } from 'react'
import { Redirect } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import { STUDENTS_URL } from '../../config/api'
import { I18n, I18nHttp } from '../../i18n/i18n'
import { authService } from '../../services/AuthService'

import SnackbarNotification from '../Ui/SnackbarNotification'

class RecoverPassword extends Component {
    constructor(props) {
        super(props);

        this.initialState = {
            email : "",
            authenticated : false,
            snackbar : {
                open : false,
                variant : "success",
                message : I18nHttp.Status2xx
            }
        };

        this.state = this.initialState;

        this.handleSubmit = this.handleSubmit.bind(this);
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

    handleChange = event => {
        const { name, value } = event.target
      
        this.setState({
          [name]: value,
        })
    }

    handleSubmit(event) {
        event.preventDefault();

        authService.emailRecover(STUDENTS_URL, {
          email: this.state.email
        })
        .then(() => {
        })
        .catch(() => {
          this.setState({
            snackbar : {
                open : true,
                variant : "error",
                message : `${I18nHttp.Status4xx}... ${I18n.AuthFails}`
            }
          });
        });
    }

    render() {

        if (this.state.authenticated === true) {
          return <Redirect to='/' />
        }

        const { snackbar } = this.state;
      
        return (
          <Box>
            <Box mb={2} px={2} py={1} bgcolor="grey.100">
              <Typography
                variant="h5"
                component="h3">
                  {I18n.PasswordRecovery}
              </Typography>
            </Box>
            <form>
              <Box mx={2} my={2}>
                <TextField
                  id="filled-email-input"
                  required
                  label={I18n.FieldEmail}
                  type="email"
                  name="email"
                  autoComplete="email"
                  margin="dense"
                  variant="outlined"
                  fullWidth
                  onChange={this.handleChange}
                  value={this.state.email}
                />
              </Box>
                
              <Box mx={2} pb={4}>
                <Button
                  variant="contained"
                  color="primary"
                  type="submit"
                  onClick={this.handleSubmit}>
                    {I18n.SendInstructions}
                </Button>
              </Box>
            </form>

            <SnackbarNotification
              snackbar={snackbar}
              close={this.handleCloseSnackbar}
              />

          </Box>
        );
    }
}

export default RecoverPassword