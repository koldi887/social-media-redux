import React, { useState } from "react";
import classes from "./dialogs.module.css";
import { Button, Grid } from "@material-ui/core";
import DialogMessages from "./DialogsItem/dialogMessage";
import DialogUsers from "./DialogsItem/dialogUsers";
import {
  addDialogMessage,
  dialogsSelector,
  IDialogsPageState,
} from "../../../../redux/dialogpage-reducer";
import { useAppDispatch, useAppSelector } from "../../../../hooks/redux";

const Dialogs = () => {
  const dispatch = useAppDispatch();
  const [message, setNewMessage] = useState("");
  const { dialogsData, dialogsMessages } =
    useAppSelector<IDialogsPageState>(dialogsSelector);

  const addMessage = () => {
    dispatch(addDialogMessage(message));
    setNewMessage("");
  };

  return (
    <Grid container className={classes.dialogsPageContainer}>
      <Grid item xs={12} sm={12} md={4} className={classes.usersBlock}>
        {dialogsData.map((d) => (
          <DialogUsers
            key={d.id}
            name={d.name}
            id={d.id}
            tag={d.tag}
            color={d.color}
          />
        ))}
      </Grid>
      <Grid className={classes.messagesBlock}>
        {dialogsMessages.map((text, index) => (
          <DialogMessages
            key={index}
            tag={text.tag}
            color={text.color}
            text={text.text}
          />
        ))}
        <Grid>
          <textarea
            className={classes.messagesTextArea}
            onChange={(event) => setNewMessage(event.target.value)}
            value={message}
          />
          <Button
            onClick={addMessage}
            variant="contained"
            size="medium"
            color="primary"
            className={classes.sendMessageBtn}
          >
            Saada
          </Button>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Dialogs;
