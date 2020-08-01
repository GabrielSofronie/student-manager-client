import React, { Component } from 'react'
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import { TICKET_URL } from '../../config/api'
import { I18nTicket, I18nStudents } from '../../i18n/i18n'
import StudentLogout from './StudentLogout'
import Gdpr from '../Ui/Gdpr'

const TableHeader = () => {
  return (
    <TableHead>
      <TableRow>
        <TableCell>{I18nTicket.HeadCode}</TableCell>
        <TableCell>{I18nTicket.HeadDiscount}</TableCell>
        <TableCell>{I18nTicket.HeadCreated}</TableCell>
      </TableRow>
    </TableHead>
  )
}

class TicketDetails extends Component {
    constructor(props) {
      super(props);

      this.state = {
        data: [],
      };
      
    }

    componentDidMount() {

        const ticket = JSON.parse(localStorage.getItem('ticket'));
    
        fetch(`${TICKET_URL}/${ticket.id}/ticket`, {
          headers: {
            "authorization" : `Bearer ${ticket.token}`,
          }})
          .then(result => result.json())
          .then(result => {
            this.setState({
              data: result,
            })
        })
    }

    render() {
        const { data } = this.state
    
        return (
          <Box>
            <Box my={2}>
            <Typography
                variant="h4"
                component="h3">
                  {I18nStudents.PageTitle}
              </Typography>
            </Box>
            <Box>
              <Typography
                variant="h6"
                component="h5">
                  {data.studentName}
              </Typography>
            </Box>
          
            <Box mt={4} mb={2}>
              <StudentLogout code={data.code} />
            </Box>
            
            <Box mt={4}>
                <Paper>
                  <Table>
                    <TableHeader />
                    <TableBody>
                      <TableRow>
                        <TableCell>{data.code}</TableCell>
                        <TableCell>{data.discountType}</TableCell>
                        <TableCell>{data.createdAt}</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </Paper>
              </Box>

              <Gdpr />

          </Box>
        );
    }
}

export default TicketDetails