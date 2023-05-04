import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useState } from 'react';

const style = {
  position: 'absolute',
  top: '45%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 500,
  color: "#CECECE",
  bgcolor: "#0D0F13",
  border: "none",
  boxShadow: 240,
  p: 10,
  pt: 5,
  borderRadius: "22px"
};

export default function ModalPopup(props) {

  const [open, setOpen] = useState(true);

  const handleCloseIn = () => {
    setOpen(false);
    props.handleClose();
  }

  return (
    <div sx={{border: "none"}}>
      {open && 
          <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          open={open}
          onClose={handleCloseIn}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 50,
          }}
        >
          <Fade in={true}>
            <Box sx={style}>
              <Typography id="transition-modal-title" variant="h6" component="h2" sx={{fontWeight: "800", fontSize: "1.5em"}}>
                {props.title}
              </Typography>
              <hr/>
              <Typography id="transition-modal-description" sx={{ mt: 3, fontWeight: "700", fontSize: "1.2em" }}>
                {props.description}
              </Typography>
            </Box>
          </Fade>
        </Modal>
      
      }
    </div>
  );
}