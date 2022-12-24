import React, { useState, useEffect } from 'react';
import { createUseStyles } from 'react-jss';

import ArrayStruct from 'renderer/classes/ArrayStruct';
import Button from 'renderer/Components/Button';

const useStyles = createUseStyles({
    table: {
        width: '100%',
        borderCollapse: 'collapse',
        '& th': {
            border: '1px solid black',
            padding: '5px',
        },
        '& td': {
            border: '1px solid black',
            padding: '5px',
        },
    },
});


function checkCondition(condition, value) {
    switch(condition.operator) {
        case '==':
            return value == condition.value;
        case '!=':
            return value != condition.value;
        case '>':
            return value > condition.value;
        case '<':
            return value < condition.value;
        case '>=':
            return value >= condition.value;
        case '<=':
            return value <= condition.value;
        default:
            return false;
    }
}


function drawActions(actions, data, mandatoryFields) {
    let result = [];


    actions.forEach((action, index) => {
        if (action.condition) {
            if (checkCondition(action.condition, data[action.condition.key])) {
                result.push(
                    <Button key={index} title={action.title} onClick={() => {
                        action.onClick(data);
                    }} />
                )
            }
        } else {
            result.push(
                <Button key={index} title={action.title} onClick={() => {
                    action.onClick(data);
                }} />
            )
        }
    });
    return result;
}

function Array(props) {


    const getType = (type) => {
        switch(type) {
            case ArrayStruct.ColumnType.TEXT:
                return 'text';
            case ArrayStruct.ColumnType.PRICE:
                return 'number';
            case ArrayStruct.ColumnType.NUMBER:
                return 'number';
            default:
                return 'text';
        }
    }

    const { struct, data } = props;
    const classes = useStyles();
    const [newLine, setNewLine] = useState({});


    let mandatoryFields = [];
    struct.getColumns().forEach((column) => {
        if (column.mandatory && column.type !== ArrayStruct.ColumnType.ACTION) {
            mandatoryFields.push(column.key);
        }
    });

    return (
        <div>
            <table className={classes.table}>
                <thead>
                    <tr>
                    {
                        struct.getColumns().map((item, index) => {
                            return (
                                <th key={index}>
                                    {item.title}
                                </th>
                            )
                        })
                    }
                    </tr>
                </thead>
                <tbody>
                    {
                        data.map((item, index) => {

                            return (
                                <tr key={index} >
                                    {
                                        struct.getColumns().map((column, index) => {
                                            return (
                                                <td key={index}>
                                                    {column.type === ArrayStruct.ColumnType.ACTION ? (
                                                        <div>
                                                            {
                                                                drawActions(column.options.actions, item)
                                                            }
                                                        </div>
                                                    ) :
                                                    item[column.key]
                                                    }
                                                </td>
                                            )
                                        })
                                    }
                                </tr>
                            )
                        })
                    }
                    <tr>
                        {
                            struct.getColumns().map((item, index) => {

                                return (
                                    <td key={index} >
                                        {
                                            item.type === ArrayStruct.ColumnType.ACTION ? (
                                                <div>
                                                {
                                                    drawActions(item.options.actions, newLine, mandatoryFields)
                                                }                                            
                                                </div>
                                            ) : <input type={getType(item.type)} onChange={(e) => {
                                                    e.preventDefault();
                                                    let newLineVal = newLine;
                                                    let value = e.target.value;
                                                    if (item.type === ArrayStruct.ColumnType.PRICE || item.type === ArrayStruct.ColumnType.NUMBER) {
                                                        value = parseFloat(value);
                                                    }
                                                    newLineVal[item.key] = value;
                                                    setNewLine(newLineVal);
                                            }}></input>
                                        }
                                    </td>
                                )
                            })
                        }
                    </tr>
                </tbody>
            </table>
        </div>
        
    )

}

export default Array;