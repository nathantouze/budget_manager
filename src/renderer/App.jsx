import React, { useEffect, useState } from 'react';
import { Tabs, Tab, Box, styled } from '@mui/material';
import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import { createUseStyles } from 'react-jss';

import CustomTab from './Tabs/Interface';
import CustomTabs from './Tabs/ContainerInterface';
import './App.css';

import InitialAmount from './Views/InitialAmount';
import Gains from './Views/Gains';
import Expenses from './Views/Expenses';

import TotalDisplayer from './Components/TotalDisplayer';

const TabPanel = (props) => {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    {children}
                </Box>
            )}
        </div>
    );
}

const Main = () => {

    const classes = createUseStyles({
        footer: {
            position: 'fixed',
            bottom: 0,
            width: '100%',
            textAlign: 'center',
            padding: '10px',
            backgroundColor: 'black',
            color: 'white',
        },
    })();


    const [config, setConfig] = useState({});
    const [tab, setTab] = useState(window.localStorage.getItem("tab") ? Number(window.localStorage.getItem("tab")) : 0);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        if (loading) {
            window.electron.ipcRenderer.getConfig().then((config) => {
                setConfig(config);
                setTab(window.localStorage.getItem("tab") ? Number(window.localStorage.getItem("tab")) : 0);
                setLoading(false);
            });
        }
    }, [loading]);

    const changeTab = (e, val) => {
        setTab(val);
        window.localStorage.setItem("tab", Number(val));
    }


    const onConfigChange = (newConfig) => {
        setConfig(newConfig);
        window.electron.ipcRenderer.saveConfig(newConfig);
    }

    return (
        <div>
        {
            loading == true ? <div>Chargement...</div> : 
            <div>
                <CustomTabs value={tab} onChange={changeTab} variant="fullWidth" indicatorColor="white" textColor="secondary">
                    <CustomTab label="Paramètres" />
                    <CustomTab label="Gains" />
                    <CustomTab label="Dépenses" />
                </CustomTabs>
                <div style={{marginBottom: '100px'}}>
                    <TabPanel value={tab} index={0}>
                        <InitialAmount config={config} onConfigChange={onConfigChange} />
                    </TabPanel>
                    <TabPanel value={tab} index={1}>
                        <Gains config={config} onConfigChange={onConfigChange} />
                    </TabPanel>
                    <TabPanel value={tab} index={2}>
                        <Expenses config={config} onConfigChange={onConfigChange} />
                    </TabPanel>
                </div>
                <footer className={classes.footer}>
                    <TotalDisplayer 
                        initialAmount={config.initialBalance} 
                        gains={config.gains} 
                        losses={config.expenses} 
                        months={config.months}
                    />
                </footer>
            </div>
        }
        </div>
    );
};

export default function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Main />} />
            </Routes>
        </Router>
    );
}
