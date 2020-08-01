import React, { Component } from 'react'
import { Redirect } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';

import { STUDENTS_URL, INSTITUTIONS_URL } from '../../config/api'
import { I18n, I18nStudents } from '../../i18n/i18n'
import { authService } from '../../services/AuthService'
import { studentService } from '../../services/StudentService'

import SnackbarNotification from '../Ui/SnackbarNotification'

class StudentLogin extends Component {
    constructor(props) {
        super(props);

        this.initialState = {
            institution: "",
            registrationNumber: "",
            email: "",
            password: "",
            directory: [],
            snackbar: {
                open: false,
                variant: "success",
                message: "Succes"
            }
        };

        this.state = this.initialState;

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentWillMount() {
        studentService.getInstitutions(INSTITUTIONS_URL)
            .then(response => response.json())
            .then(response => {
                if (response.hasOwnProperty('institutions') && Array.isArray(response.institutions))
                    this.setState({ directory: response.institutions });
            });

        this.setAuth();
    }

    handleCloseSnackbar = (_event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        // Reset Snackbar
        this.setState({
            snackbar: {
                open: false,
                variant: this.state.snackbar.variant,
                message: this.state.snackbar.message,
            }
        });
    }

    setAuth() {
        const ticket = JSON.parse(localStorage.getItem('ticket'));
        if (ticket && ticket.hasOwnProperty('id'))
            this.setState({ authenticated: true });
        else {
            const { directory } = this.state;
            this.setState(this.initialState);
            this.setState({ directory });
        }
    }

    handleChange = event => {
        const { name, value } = event.target

        this.setState({
            [name]: value,
        })
    }

    handleSubmit(event) {
        event.preventDefault();

        authService.login(`${STUDENTS_URL}`, {
            email: this.state.email,
            password: this.state.password,
            registrationNumber: `${this.state.institution}_${this.state.registrationNumber}`
        })
            .then(() => {
                this.setAuth();
            })
            .catch(() => {
                this.setState({
                    snackbar: {
                        open: true,
                        variant: "error",
                        message: I18n.AuthFails
                    }
                });
            });

        //this.setState(this.initialState);
    }

    render() {
        const { institution, directory, snackbar } = this.state;

        if (this.state.authenticated === true) {
            return <Redirect to='/' />
        }

        return (
            <Box mt={4}>
                <Paper>
                    <Box px={2} py={1} bgcolor="grey.100">
                        <Typography
                            variant="h5"
                            component="h3">
                            {I18nStudents.TitleLogin}
                        </Typography>
                    </Box>
                    <form>
                        <Box mx={2} my={2}>
                            <FormControl fullWidth variant="outlined" required>
                                <InputLabel htmlFor="institution">{I18nStudents.FieldInstitution}</InputLabel>
                                <Select
                                    value={institution}
                                    displayEmpty
                                    onChange={this.handleChange}
                                    input={<Input name="institution" id="institution" />}>
                                    {directory
                                        .sort(function (a, b,) {
                                            return b.code.localeCompare(a.code);
                                        })
                                        .map((row, index) => {
                                            return (
                                                <MenuItem key={index} value={row.code}>{row.name}</MenuItem>
                                            )
                                        })}

                                </Select>
                            </FormControl>
                        </Box>
                        <Box mx={2} my={2}>
                            <TextField
                                id="filled-registrationNumber-input"
                                required
                                label={I18nStudents.FieldRegistrationNo}
                                type="text"
                                name="registrationNumber"
                                autoComplete="registrationNumber"
                                margin="dense"
                                variant="outlined"
                                fullWidth
                                onChange={this.handleChange}
                                value={this.state.registrationNumber}
                            />
                        </Box>
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

                        <Box mx={2} my={2}>
                            <TextField
                                id="filled-password-input"
                                required
                                label={I18n.FieldPass}
                                type="password"
                                name="password"
                                autoComplete="current-password"
                                margin="dense"
                                variant="outlined"
                                fullWidth
                                onChange={this.handleChange}
                                value={this.state.password}
                            />
                        </Box>

                        <Box mx={2} pb={4}>
                            <Button
                                variant="contained"
                                color="primary"
                                type="submit"
                                onClick={this.handleSubmit}>
                                {I18n.FieldLogin}
                            </Button>
                        </Box>
                    </form>
                </Paper>

                <SnackbarNotification
                    snackbar={snackbar}
                    close={this.handleCloseSnackbar}
                />

            </Box>
        )
    }
}

export default StudentLogin