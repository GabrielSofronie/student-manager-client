import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';

const useStyles = makeStyles(theme => ({
  root: {
    color: 'black',
    backgroundColor: '#ddd'
  },
}));

export default function Gdpr() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);

  function handleClose(reason) {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  }

  return (
    <div>
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        open={open}
        autoHideDuration={8000}
        onClose={handleClose}
        ContentProps={{
          'aria-describedby': 'message-id',
        }}
        >
        <SnackbarContent
            className={classes.root}
            message={<span id="message-id">NOTIFICARE PRIVIND</span>}
            action={[
                <Button color="primary" size="small" href="http://sctpiasi.ro/uploads/editor-files/Publice/Notificare_prelucrare_date.pdf" target="_blank">
                    prelucrarea datelor personale
                </Button>,
            ]}
        />
      </Snackbar>
    </div>
  );
}
