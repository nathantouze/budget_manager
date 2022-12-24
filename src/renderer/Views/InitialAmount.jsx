import React, { useEffect, useState } from 'react';
import { createUseStyles } from 'react-jss';


const useStyles = createUseStyles({
    container: {
        color: 'black',
        fontFamily: 'Open Sans, sans-serif',
    },
    parameter: {
        display: 'block',
        marginBottom: '20px',
        height: '50px'
    },
    label: {
        display: 'inline-block',
        width: '400px',
        fontWeight: 'bold',
        fontSize: '1.2em',
        textAlign: 'left',
        verticalAlign: 'middle',
    },
    inputContainer: {
        display: 'inline-block',
        textAlign: 'right',
        width: 'calc(100% - 400px)'
    },
    input: {
        textAlign: 'right',
        width: '120px',
        fontSize: '1.2em',
    }
});

function InitialAmount(props) {

    const classes = useStyles();
    const [initialBalance, setInitialBalance] = useState(props.config.initialBalance ? props.config.initialBalance : 0);
    const [months, setMonths] = useState(props.config.months ? props.config.months : 1);

    const onChangeBalance = (e) => {

        let config = props.config;
        config.initialBalance = Number(e.target.value);
        props.onConfigChange(config);
        setInitialBalance(config.InitialBalance);
    }

    const onChangeMonths = (e) => {
        
        let config = props.config;
        config.months = Number(e.target.value);
        props.onConfigChange(config);
        setMonths(config.months);
    }


    useEffect(() => {
        setInitialBalance(props.config.initialBalance ? props.config.initialBalance : 0);
        setMonths(props.config.months ? props.config.months : 1);
    }, [props.config])

    return (
        <div className={classes.container}>
            <div className={classes.parameter}>
                <label htmlFor="initialAmount" className={classes.label}>SOLDE ACTUEL: </label>
                <div className={classes.inputContainer}>
                    <input value={initialBalance} className={classes.input} type="number" name="initialAmount" id="initialAmount" onChange={onChangeBalance} />
                    <span style={{fontSize: '1.2em'}}>€</span>
                </div>
            </div>
            <div className={classes.parameter}>
                <label htmlFor='months' className={classes.label}>NOMBRE DE MOIS À PRÉDIRE:</label>
                <div className={classes.inputContainer}>
                    <input value={months} className={classes.input} type="number" name="months" id="months" onChange={onChangeMonths} />
                    <span>   </span>
                </div>
            </div>
        </div>
    )

}

export default InitialAmount;