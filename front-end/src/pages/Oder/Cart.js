import Typography from "@mui/material/Typography";
import ButtonGroup from '@mui/material/ButtonGroup';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import RandomString from "../../utils/RandomString";

function Cart({ openChk, handleClose }) {
    return (
        <Dialog
          open={openChk}
          onClose={handleClose}
          aria-labelledby="scroll-dialog-title"
          aria-describedby="scroll-dialog-description"
          sx={{ height: '550px', margin: 'auto auto' }}
        >
          <DialogTitle id="scroll-dialog-title">장바구니</DialogTitle>
          <DialogContent dividers={true} sx={{ minWidth: '350px' }}>
            <DialogContentText
              id="scroll-dialog-description"
              tabIndex={-1}
            >
              {/* 상품 옵션 */}
              ㅇㅇㅇ

              <div style={{ display: 'flex', marginTop: '15px' }}>
                <Typography sx={{ display: 'inline-block', marginRight: "auto" }}>총 주문금액</Typography>
                <Typography sx={{ display: 'inline-flex', marginLeft: "auto" }}>가격</Typography>
              </div>

            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>뒤로가기</Button>
            <Button onClick={()=>console.log("ㅇㅇ")}>장바구니 추가</Button>
          </DialogActions>
        </Dialog>
    )
}

export default Cart