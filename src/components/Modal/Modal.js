import Modal from '@mui/material/Modal';
import React from 'react';
import Box from '@mui/material/Box';
export default function ModalCustom({ children, profileModel,...restProps }) {
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 2,
        display: 'block',
       maxWidth:profileModel ?'60%':'100%',
        maxHeight: profileModel ?'60%':"100%",
        overflow: profileModel ?'scroll':'hidden',
      };
    


    return (
        <Modal {...restProps}>
            <Box sx={style} {...restProps}>
                {children}
            </Box>
        </Modal>
    )
}


