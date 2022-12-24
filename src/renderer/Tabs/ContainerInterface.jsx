import React from 'react';
import { Tabs, styled } from '@mui/material';


const interfaceTabs = styled((props) => (
    <Tabs 
    {...props} 
    TabIndicatorProps={{ children: <span className="MuiTabs-indicatorSpan" /> }}
    />
))(({ theme }) => ({
    '&.Mui-indicatorSpan': {
        maxWidth: 40,
        width: '100%',
        backgroundColor: "inherit",
    },  
}));

export default interfaceTabs;