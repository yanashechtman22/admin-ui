import * as React from 'react';
import AccordionContainer from "./components/AccordionContainter";
import AdAdder from "./components/AdAdder";
import RefreshIcon from "@mui/icons-material/Refresh";
import IconButton from '@mui/material/IconButton';
import './components/App.css'
import {Divider, Snackbar, Typography} from "@mui/material";
import * as Service from './services/AdsService';
import LoginScreen from "./components/LoginScreen";
import io from 'socket.io-client';

const socket = io.connect('http://localhost:3000');
const action = (
    <IconButton
        size="small"
        aria-label="close"
        color="inherit"
    >
        <RefreshIcon fontSize="small"/>
    </IconButton>
);

export default function App() {
    const [count, setUserCount] = React.useState(0);
    const [clientsConnected, setClientsConnected] = React.useState(0);
    const [ads, setAds] = React.useState([]);
    const [errorMessage, setErrorMessage] = React.useState("");
    const [requireLogin, setRequireLogin] = React.useState(false)

    React.useEffect(() => {
        Service.getMessagesFromServer((results) => {
            if (results.redirected) {
                setRequireLogin(true);
            } else {
                setAds(results);
            }
        });
        socket.on('message', function (data) {
            console.log(data.count);
            setUserCount(data.count);
        });
    }, [requireLogin, count]);

    const onAdAdded = (newAd) => {
        ads.push(newAd);
        Service.adNewAd(newAd, (result) => {
            if (result) {
                setAds([...ads]);
            }
        });
    }

    const onAdUpdated = (updatedAd) => {
        const updatedArr = ads.map(ad => ad.messageName === updatedAd.messageName ? updatedAd : ad);
        Service.updateAd(updatedAd, (result) => {
            if (result) {
                setAds(updatedArr);
            }
        });
    }

    const onAdDeleted = (adMessageName) => {
        const removedArr = [...ads].filter((ad) => ad.messageName !== adMessageName);
        Service.removeAd(adMessageName, (result) => {
            if (result) {
                setAds(removedArr);
            }
        });
    }

    const handleLogin = (username, password) => {
        Service.auth(username, password, (result) => {
            if (result) {
                setRequireLogin(false);
            } else {
                setErrorMessage("Incorrect username or password");
            }
        });
    }

    const onRefreshClick = () => {
        setClientsConnected(clientsConnected + 1)
    }
    const message = "clients. connected: " + clientsConnected + "\ndisconnected: " + clientsConnected;

    return (
        requireLogin ?
            <LoginScreen handleLogin={handleLogin} errorMessage={errorMessage}/>
            :
            <div>
                <div>{count}</div>
                <Typography id="title">Welcome to the admins control center!</Typography>
                <Divider/>
                <AccordionContainer ads={ads}
                                    onAdDeleted={onAdDeleted}
                                    onAdUpdated={onAdUpdated}
                />
                <AdAdder onAdAdded={onAdAdded}
                />
                <Snackbar id="clients-snackbar"
                          onClick={onRefreshClick}
                          open={true}
                          message={message}
                          action={action}
                          anchorOrigin={{vertical: 'bottom', horizontal: 'right'}}
                />


            </div>
    );
}
