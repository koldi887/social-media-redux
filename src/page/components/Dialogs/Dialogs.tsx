import React, { useState } from 'react';
import classes from './Dialogs.module.css';
import { DialogsList } from './DialogsList';
import { DialogsChat } from './DialogsChat';

export const Dialogs = () => {
  const [selectedDialog, setSelectedDialog] = useState<number | null>(null);
  return (
    <div className={classes.dialogsContainer}>
      <DialogsList setSelectedDialog={setSelectedDialog} />
      <DialogsChat selectedDialog={selectedDialog} />
    </div>
  );
};
