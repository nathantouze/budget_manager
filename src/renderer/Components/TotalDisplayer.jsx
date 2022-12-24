import React from 'react';
import { createUseStyles } from 'react-jss';


const useStyles = createUseStyles({
    total: {
        fontSize: '2em',
        fontWeight: 'bold',
        textAlign: 'center',
    },
});


function TotalDisplayer(props) {

    const { initialAmount, gains, losses, months } = props;
    const classes = useStyles();

    const calculateTotal = () => {
        let total = initialAmount;

        let monthResult = 0
        gains.forEach((gain) => {
            monthResult += gain.amount;
        });
        losses.forEach((loss) => {
            monthResult -= loss.amount;
        });

        monthResult = monthResult * months;
        total += monthResult;
        return total;
    }

    return (
        <div className={classes.total}>
            <button style={{position: 'absolute', right: '100px', fontSize: '15px'}} onClick={(e) => {
                e.preventDefault();
                window.location.reload();
            }}>Rafaîchir</button>
            <span>Total: {calculateTotal()}€</span>
        </div>
    );
}

export default TotalDisplayer;