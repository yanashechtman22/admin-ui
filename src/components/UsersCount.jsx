import {Snackbar} from "@mui/material";
import * as React from "react";
import * as Service from "../services/AdsService";
import IconButton from "@mui/material/IconButton";
import RefreshIcon from "@mui/icons-material/Refresh";

const action = (
    <IconButton
        size="small"
        aria-label="close"
        color="inherit"
    >
        <RefreshIcon fontSize="small"/>
    </IconButton>
);

export default function UsersCount(){
    const [clientsConnected, setClientsConnected] = React.useState(0);

    React.useEffect(() => {
        Service.getActiveUsersCount((results) => {
            setClientsConnected(results)
        });
    }, []);

    const onRefreshClick = () => {
        Service.getActiveUsersCount((results) => {
            setClientsConnected(results)
        });
    }
    const message = "clients. connected: " + clientsConnected;

    return (
        <Snackbar id="clients-snackbar"
                  onClick={onRefreshClick}
                  open={true}
                  message={message}
                  action={action}
                  anchorOrigin={{vertical: 'bottom', horizontal: 'right'}}
        />
    )
}
