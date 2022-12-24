import React from 'react';
import { Tab, styled } from '@mui/material';


const interfaceTab = styled((props) => (
    <Tab 
        {...props}
    />
))(({ theme }) => ({
    backgroundColor: 'black',
    color: 'white',
    '&.Mui-selected': {
        color: "white",
        backgroundColor: '#424447',
    },
    '&.Mui-focusVisible': {
        backgroundColor: '#424447',
    },
}));

export default interfaceTab;