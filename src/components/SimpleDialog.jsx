import * as React from 'react';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import JSONInput from 'react-json-editor-ajrm';
import locale    from 'react-json-editor-ajrm/locale/en';
import Button from "@mui/material/Button";
import err from "react-json-editor-ajrm/err";

const json_object = {
    name : "nadav",
    age: 18
}

export default function SimpleDialog({ onClose, selectedValue, open, onAdAdded }) {
    const [error, setError] = React.useState(false);
    const myRef = React.createRef();

    const handleChange = (e) => {
        setError(e.error ? true : false);
    }
    const handleClose = () => {
        onClose(selectedValue);
    };
    const handleSubmit = () =>{
        let newAd = myRef.current.state.jsObject;
        onAdAdded(newAd);
    }

    return (
        <div id="dialog">
            <Dialog onClose={handleClose} open={open}>
                <DialogTitle>Add New Ad</DialogTitle>
                <JSONInput
                    id          = 'a_unique_id'
                    placeholder = { json_object }
                    theme       = "light_mitsuketa_tribute"
                    locale      = { locale }
                    height      = '550px'
                    onChange    = {handleChange}
                    ref         = {myRef}
                />
                <Button variant="contained" onClick={handleSubmit} disabled={error}>Confirm</Button>
            </Dialog>

        </div>
    );
}