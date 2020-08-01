import React from 'react';
import ReactDOM from 'react-dom';
import { Route } from 'react-router'
import { BrowserRouter as Router, Switch } from 'react-router-dom'
import Container from '@material-ui/core/Container';

import FourOhFour from './components/FourOhFour'
import { PrivateRoute } from './components/PrivateRoute'
import Header from './components/Header'
import TicketDetails from './components/Students/TicketDetails';
import StudentAuth from './components/Students/StudentAuth';
import ProcessRecover from './components/Students/ProcessRecover';

// ========================================

const routing = (
  <Router>
    <Container>
      <Header />
      <Switch>
        <PrivateRoute exact path="/" component={TicketDetails} />
        <Route path="/login" component={StudentAuth} />
        <Route path="/recover" component={ProcessRecover} />
        <Route component={FourOhFour} />
      </Switch>
    </Container>
  </Router>
);


ReactDOM.render(
    routing,
    //<App />,
    document.getElementById('root')
  );