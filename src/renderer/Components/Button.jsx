import React from 'react';
import { createUseStyles } from 'react-jss';


const useStyles = createUseStyles({
    button: {
        backgroundColor: 'black',
        color: 'white',
        padding: '10px',
        cursor: 'pointer',
        textAlign: 'center',
        '&:hover': {
            backgroundColor: '#424447',
        },
    },
});


function Button(props) {

    const classes = useStyles();

    const onClick = (e) => {
        e.preventDefault();
        props.onClick();
    }

    return (
        <div className={classes.button} onClick={onClick}>
            {props.title}
        </div>
    )
}

export default Button;