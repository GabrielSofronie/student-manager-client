import React, { Component } from 'react'
import { Redirect } from 'react-router-dom';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';

import { authService } from '../../services/AuthService'
import { I18n, I18nTicket, I18n24Pay } from '../../i18n/i18n'

class StudentLogout extends Component {
    constructor(props) {
        super(props);

        this.initialState = {
            authenticated : true,
            btnLogout : I18n.Logout
        };

        this.state = this.initialState;

        this.handleLogout= this.handleLogout.bind(this);
    }

    // componentDidMount() {
    //     if(window.location.href.indexOf(I18n24Pay.App) !== -1) {
    //         this.setState({
    //             btnLogout : I18nTicket.ReadCode
    //         });
    //     }
    // }

    componentDidUpdate(prevProps) {
        if (this.props.code !== prevProps.code) {
            if(window.location.href.indexOf(I18n24Pay.App) !== -1) {
                document.title = I18nTicket.PageTitle + this.props.code;
            }
        }
    }

    handleLogout(event) {
        event.preventDefault();

        authService.logout();
        this.setState({authenticated : false});
    }

    render() {
        if (!this.state.authenticated) {
            return <Redirect to='/login' />
        }

        const { btnLogout } = this.state;

        return(
            <Box>
                <Button
                    variant="contained"
                    color="secondary"
                    onClick={this.handleLogout}>
                        {btnLogout}
                </Button>
            </Box>
        );
    }
}


export default StudentLogout