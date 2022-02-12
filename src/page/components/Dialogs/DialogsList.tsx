import { useGetDialogsQuery } from '../../../api/dialogs-api';
import classes from './DialogsList.module.css';
import { PreLoader } from "../common/Preloader/Preloader";
import React from 'react';
import { Badge } from '@material-ui/core';
import { capitalize } from '../../../utils/capitalize';
import { IDialog } from '../../../types/IDialogs';

interface IDialogsListProps {
  setSelectedDialog: (value: IDialog) => void;
  selectedDialog: IDialog | null;
}

export const DialogsList: React.FC<IDialogsListProps> = ({ setSelectedDialog, selectedDialog }) => {
  const { data, isLoading } = useGetDialogsQuery();

  const onDialogClick = (dialog: IDialog) => {
    setSelectedDialog(dialog);
  };

  return (
    <div className={classes.dialogsListContainer}>
      <h2 className={classes.dialogsListHeader}>Dialogs</h2>
      <ul className={classes.dialogsList}>
        {isLoading ? (
          <PreLoader />
        ) : (
          data?.map((dialog) => (
            <li
              key={dialog.id}
              className={`${classes.dialogsListItems} ${
                dialog.id === selectedDialog?.id ? classes.active : ''
              }`}
              onClick={() => onDialogClick(dialog)}
            >
              <p> {capitalize(dialog.userName)}</p>
              <Badge color="secondary" variant={dialog.hasNewMessages ? 'dot' : 'standard'}>
                <i className="fas fa-comments fa-lg" />
              </Badge>
            </li>
          ))
        )}
      </ul>
    </div>
  );
};
