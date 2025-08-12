import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import React from 'react';
import CreateNewShorten from './CreateNewShorten';

const ShortenPopUp = ({ open, setOpen /*, refetch */ }) => {
  const handleClose = () => setOpen(false);

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <div className="flex justify-center items-center h-full w-full">
        {/* It's fine if refetch is undefined for now */}
        <CreateNewShorten setOpen={setOpen} /* refetch={refetch} */ />
        {/* If you want the placeholder instead, comment out CreateNewShorten above and uncomment below */}
        {/*
        <Box className="bg-white p-6 rounded-md shadow-lg">
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Create Short URL (coming soon)
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Wire up CreateNewShorten and refetch later.
          </Typography>
        </Box>
        */}
      </div>
    </Modal>
  );
};

export default ShortenPopUp;
