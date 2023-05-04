import * as React from "react";
import {Modal, Box } from "@mui/material";

const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
};

const styleImg = {
    width: "100%",
    height: "40rem",
};

export default function profileMore({ data }) {
    const { name,image,description} = data;
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <div>
            <button title="Ver perfil" className="btn-info" onClick={handleOpen}></button>
            <Modal open={open} onClose={handleClose}>
                <Box sx={style}>
                    <img style={styleImg} src={image}/>
                    <Box className='profile' sx={{ color: "black" }}>
                        {name}
                    </Box>
                    <Box sx={{ color: "black" }}>
                        {description}
                    </Box>
                </Box>
            </Modal>
        </div>
    );
}