import {Avatar, makeStyles, Theme} from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) => {
    return ({
        comments: {
            padding: '15px',
            border: '2px solid lightgreen',
            marginBottom: '30px',
            '&:last-child': {
                marginBottom: '0',
            }
        },
    });
});

const DialogMessages = (props: any) => {
    const classes = useStyles();
    return<div className={classes.comments}>
        <Avatar style={props.color}>{props.tag}</Avatar>
        <span>{props.text}</span>
    </div>


}

export default DialogMessages