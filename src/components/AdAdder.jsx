import * as React from 'react';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import SimpleDialog from "./SimpleDialog";

export default function AdAdder({onAdAdded, onAdDeleted}) {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const onAdAddedClicked = (ad) => {
        setOpen(false);
        onAdAdded(ad);
    }

    const handleClose = (value) => {
        setOpen(false);
    };

    return (
        <div id="ad-adder">
            <Fab color="primary" aria-label="add">
                <AddIcon onClick={handleClickOpen}/>
            </Fab>
            <SimpleDialog open={open}
                          onClose={handleClose}
                          onAdAdded={onAdAddedClicked}
            />
        </div>
    );
}
