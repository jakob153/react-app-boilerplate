import React, { FC, useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Tab as TabComponent,
  Tabs,
  makeStyles,
  Theme,
} from '@material-ui/core';
import { Close } from '@material-ui/icons';

import LogIn from './LogIn';
import SignUp from './SignUp';

const useStyles = makeStyles((theme: Theme) => ({
  closeButton: {
    position: 'absolute',
    top: '1px',
    right: '1px',
  },
}));

enum Tab {
  LogIn,
  SignUp,
}

interface Props {
  open: boolean;
  handleClose: () => void;
  selectedTab: number;
}

const AuthModal: FC<Props> = ({ open, handleClose, selectedTab }) => {
  const [tab, setTab] = useState(selectedTab);
  const classes = useStyles();

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="xs" fullWidth>
      <DialogTitle>
        <Tabs value={tab} onChange={(event, newValue) => setTab(newValue)}>
          <TabComponent label="Log In" />
          <TabComponent label="Sign Up" />
        </Tabs>
      </DialogTitle>
      <DialogContent>
        {tab === Tab.LogIn && <LogIn handleClose={handleClose} />}
        {tab === Tab.SignUp && <SignUp />}
      </DialogContent>
      <IconButton className={classes.closeButton} onClick={handleClose}>
        <Close />
      </IconButton>
    </Dialog>
  );
};

export default AuthModal;
