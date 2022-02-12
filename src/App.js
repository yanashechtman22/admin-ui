import * as React from 'react';
import AccordionContainer from "./components/AccordionContainter";
import AdAdder from "./components/AdAdder";
import RefreshIcon from "@mui/icons-material/Refresh";
import IconButton from '@mui/material/IconButton';
import './components/App.css'
import {Divider, Typography, Snackbar} from "@mui/material";

const adsMock = [
    {
        title: "ad 1",
        name: "linoy",
        age: 18
    },
    {
        title: "ad 2",
        name: "yana",
        age: 18
    }
]

const action = (
    <IconButton
        size="small"
        aria-label="close"
        color="inherit"
    >
        <RefreshIcon fontSize="small"/>
    </IconButton>
)

export default function App() {
    const [clientsConnected,setClientsConnected] = React.useState(0);
    const [ads, setAds] = React.useState(adsMock);

    React.useEffect(()=>{
        fetch('http://localhost:3000')
    },[])
    const onAdAdded = (newAd) => {
        ads.push(newAd);
        setAds([...ads]);
    }

    const onAdDeleted = (adTitle) => {
        const removedArr = [...ads].filter((ad) => ad.title !== adTitle);
        setAds(removedArr);

    }
    const onRefreshClick = () => {
        setClientsConnected(clientsConnected + 1)
    }
    const message = "clients. connected: " + clientsConnected + "\ndisconnected: " + clientsConnected;

    return (
        <div>
            <Typography id="title">Welcome to the admins control center!</Typography>
            <Divider/>
            <AccordionContainer ads={ads}
                                onAdDeleted={onAdDeleted}
            />
            <AdAdder onAdAdded={onAdAdded}
            />
            <Snackbar id="clients-snackbar"
                      onClick={onRefreshClick}
                      open={true}
                      message={message}
                      action={action}
                      anchorOrigin={{vertical:'bottom',horizontal:'right'}}
            />


        </div>
    );
}
