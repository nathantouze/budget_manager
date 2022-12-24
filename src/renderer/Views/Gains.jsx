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

function Gains(props) {

    const classes = useStyles();
    const location = useLocation();

    const [gains, setGains] = useState(props.config.gains ? props.config.gains : []);

    let arrayStruct = new ArrayStruct();
    arrayStruct.addColumn('Titre', 'title', ArrayStruct.ColumnType.TEXT, true, 20);
    arrayStruct.addColumn('Montant (€)', 'amount', ArrayStruct.ColumnType.PRICE, true, 20);
    arrayStruct.addColumn('Description', 'description', ArrayStruct.ColumnType.TEXT, false, 20);
    arrayStruct.addColumn('Action', '', ArrayStruct.ColumnType.ACTION, true, 20, {
        actions: [
            {
                title: 'Supprimer',
                onClick: (data) => {
                    let gainsVal = gains;
                    let config = props.config;
                    gainsVal = gainsVal.filter((item) => {
                        return item.id !== data.id;
                    });
                    config.gains = gainsVal;
                    setGains(gainsVal);
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

                    let gainsVal = gains;
                    let config = props.config;
                    gainsVal.push({
                        id: uuid(),
                        title: data.title,
                        amount: data.amount,
                        description: data.description
                    });
                    config.gains = gainsVal;
                    setGains(gainsVal);
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
            <Array struct={arrayStruct} data={gains} />
            <ToastContainer />
        </div>
    )

}

export default Gains;