import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { createUseStyles } from 'react-jss';
import { ToastContainer, toast } from 'react-toast';
import uuid from 'react-uuid';

import ArrayStruct from 'renderer/classes/ArrayStruct';
import Array from 'renderer/Components/Array';


const useStyles = createUseStyles({
    container: {
        color: 'black',
        fontFamily: 'Open Sans, sans-serif',
    },
    label: {
        display: 'inline-block',
        width: '200px',
        textAlign: 'left',
    },
    input: {
        display: 'inline-block',
        textAlign: 'right',
        width: 'calc(100% - 200px)'
    }
});

function Expenses(props) {

    const classes = useStyles();
    const location = useLocation();

    const [expenses, setExpenses] = useState(props.config.expenses ? props.config.expenses : []);

    let arrayStruct = new ArrayStruct();
    arrayStruct.addColumn('Titre', 'title', ArrayStruct.ColumnType.TEXT, true, 20);
    arrayStruct.addColumn('Montant (€)', 'amount', ArrayStruct.ColumnType.PRICE, true, 20);
    arrayStruct.addColumn('Description', 'description', ArrayStruct.ColumnType.TEXT, false, 20);
    arrayStruct.addColumn('Action', '', ArrayStruct.ColumnType.ACTION, true, 20, {
        actions: [
            {
                title: 'Supprimer',
                onClick: (data) => {
                    let expensesVal = expenses;
                    let config = props.config;
                    expensesVal = expensesVal.filter((item) => {
                        return item.id !== data.id;
                    });
                    config.expenses = expensesVal;
                    setExpenses(expensesVal);
                    props.onConfigChange(config);
                },
                condition: {
                    key: 'id',
                    operator: '!=',
                    value: null
                }
            },
            {
                title: 'Ajouter',
                onClick: (data) => {

                    const mandatories = [{
                        key: 'title',
                        label: 'Titre'
                    }, {
                        key: 'amount',
                        label: 'Montant'
                    }];
                    for (let i = 0; i < mandatories.length; i++) {
                        if (!data[mandatories[i].key]) {
                            toast.error('Le champ "' + mandatories[i].label + '" est obligatoire');
                            return;
                        }
                    }

                    let expensesVal = expenses;
                    let config = props.config;
                    expensesVal.push({
                        id: uuid(),
                        title: data.title,
                        amount: data.amount,
                        description: data.description
                    });
                    config.expenses = expensesVal;
                    setExpenses(expensesVal);
                    props.onConfigChange(config);
                    window.location.reload();
                },
                condition: {
                    key: 'id',
                    operator: '==',
                    value: null
                }
            }
        ]
    });

    return (
        <div className={classes.container}>
            <Array struct={arrayStruct} data={expenses} />
            <ToastContainer />
        </div>
    )

}

export default Expenses;