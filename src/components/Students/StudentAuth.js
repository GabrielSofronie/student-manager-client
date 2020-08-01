import React, { Component } from 'react'
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';

import { I18n, I18nStudents } from '../../i18n/i18n'
import StudentLogin from './StudentLogin'
import RecoverPassword from './RecoverPassword'

import PaperSheet from '../Ui/PaperSheet'

class StudentAuth extends Component {
    constructor(props) {
        super(props);

        this.state = {
            authAction : I18n.PasswordRecovery,
            authScreen : null,
            screenId : 1
        };
    }

    componentWillMount() {
        var authScreen = <StudentLogin parentContext={this} appContext={this.props.parentContext} />;
        this.setState({
            authScreen : authScreen
        });
    }

    switchScreen() {
        if (this.state.screenId === 1) {
            this.setState({
                authAction : I18nStudents.TitleLogin,
                authScreen : <RecoverPassword parentContext={this} />,
                screenId : 3
             });
            return;
        }
        this.setState({
            authAction : I18n.PasswordRecovery,
            authScreen : <StudentLogin parentContext={this} />,
            screenId : 1
        });
    }

    render() {        
        return(
            <Box>
                <PaperSheet pane={this.state.authScreen} />

                <Button
                    variant="outlined"
                    onClick={() => this.switchScreen()}>
                        {this.state.authAction}
                </Button>
            </Box>
        );
    }
}

export default StudentAuth