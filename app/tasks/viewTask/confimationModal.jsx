import { Box, Button, Modal, Typography } from "@mui/material";
import { useDispatch } from "react-redux";
import { deleteTask } from "@/slices/tasksSlice";

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
};

interface ConfirmationModalProps {
  id: string; 
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
export default function ConfirmationModal({id,open,setOpen}:ConfirmationModalProps){
  const handleClose = () => setOpen(false);
  const dispatch=useDispatch()
return(
   <Modal
  open={open}
  onClose={handleClose}
  aria-labelledby="modal-modal-title"
  aria-describedby="modal-modal-description"
>
  <Box sx={style}>
    <Typography id="modal-modal-title" variant="h6" component="h2">
        Confirmation   
     </Typography>
    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
        Do you want to delete this record? 
   </Typography>
   <div className="flex justify-end mt-[20px]">
      <Button variant="outlined" className="!mr-[15px]" onClick={()=>{setOpen(false)}}>No</Button>
    <Button variant="contained" 
    onClick={()=>
    {
        dispatch(deleteTask(id))
        setOpen(false)}}>Yes</Button>
   </div>
  </Box>
</Modal>
)
}