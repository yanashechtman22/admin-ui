import * as React from 'react';
import AccordionSummary from "@mui/material/AccordionSummary";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Typography from "@mui/material/Typography";
import AccordionDetails from "@mui/material/AccordionDetails";
import JSONInput from "react-json-editor-ajrm";
import locale from "react-json-editor-ajrm/locale/en";
import {Button} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Accordion from "@mui/material/Accordion";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function SingleAccordion({ad, onAdDeleted, onAdUpated}) {
    const [error, setError] = React.useState(true)
    const [open, setOpen] = React.useState(false)
    const myRef = React.createRef();

    const handleChange = (e) => {
        setError(e.error ? true : false);
    }

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const onDelete = () => {
        setOpen(false);
        onAdDeleted(ad.messageName);
    }

    const onUpdate = () => {
        setOpen(false)
        let updatedAd = myRef.current.state.jsObject;
        onAdUpated(updatedAd);
    }

    return (
        <div>
            <Accordion>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon/>}
                    aria-controls="panel1a-content"
                    id={ad.title}
                >
                    <Typography>{ad.title}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <JSONInput
                        placeholder={ad}
                        height="200px"
                        locale={locale}
                        onChange={handleChange}
                        theme="light_mitsuketa_tribute"
                        ref = {myRef}

                    />
                    <div id="edit-buttons">
                        <Button variant="contained"
                                disabled={error}
                                startIcon={<EditIcon/>}
                                onClick={onUpdate}
                        >Confirm</Button>
                        <Button variant="contained"
                                startIcon={<DeleteIcon/>}
                                color="error"
                                onClick={handleClickOpen}
                        >Delete</Button>
                    </div>
                </AccordionDetails>
            </Accordion>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    Delete Ad
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Are you sure you want to delete this ad?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}
                    >Cancel</Button>
                    <Button onClick={onDelete}
                            autoFocus
                            color="error"
                    >
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>
        </div>

    );
}
