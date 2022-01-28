import React, { useState } from 'react';
import classes from './Dialogs.module.css';
import { DialogsList } from './DialogsList';
import { DialogsChat } from './DialogsChat';
import { IDialog } from '../../../types/IDialogs';

export const Dialogs = () => {
  const [selectedDialog, setSelectedDialog] = useState<IDialog | null>(null);
  return (
    <div className={classes.dialogsContainer}>
      <DialogsList setSelectedDialog={setSelectedDialog} selectedDialog={selectedDialog} />
      {selectedDialog && <DialogsChat selectedDialog={selectedDialog} />}
    </div>
  );
};
