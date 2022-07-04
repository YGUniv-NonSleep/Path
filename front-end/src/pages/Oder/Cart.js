import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import Typography from "@mui/material/Typography";
import Button from '@mui/material/Button';
import IconButton from "@mui/material/IconButton";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Divider from '@mui/material/Divider';
import ListItemText from "@mui/material/ListItemText";
import ListItem from "@mui/material/ListItem";
import ClearIcon from '@mui/icons-material/Clear';
import { Fragment } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { updateCart, clearCart } from '../../store/cart';
import useOderMain from "./hooks/useOderMain";

function Cart({ openChk, handleClose }) {
  const cart = useSelector((state) => state.cart); // 맴버의 아이디 0 아닌지 체크
  const dispatch = useDispatch();
  const { openTossWindow } = useOderMain();

  return (
      <Dialog
        open={openChk}
        onClose={handleClose}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
        sx={{ height: '550px', margin: 'auto auto' }}
      >
        <div style={{ display: "flex" }}>
          <IconButton aria-label="back" size="small" onClick={handleClose} sx={{ marginLeft: "5px" }} >
            <KeyboardArrowLeftIcon fontSize="medium">
              <span>돌아가기</span>
            </KeyboardArrowLeftIcon>
          </IconButton>  
          <DialogTitle id="scroll-dialog-title" sx={{ marginLeft: '100px' }}>장바구니</DialogTitle>
        </div>

        <DialogContent dividers={true} sx={{ minWidth: '350px' }}>
          <DialogContentText
            id="scroll-dialog-description"
            tabIndex={-1}
          >
            {cart.orderCompositionList.length != 0 
              ? (
                <div style={{ display: "flex" }}>
                  <Typography variant="h6" sx={{ marginLeft: '18px' }}>{cart.comName}</Typography>
                  <Button onClick={()=>dispatch(clearCart())} sx={{ marginLeft: "auto" }}>전체 삭제</Button>
                </div>
              )
              : null }

            {/* 상품 */}
            { cart.orderCompositionList.length != 0 
              ? cart.orderCompositionList.map((item)=>{
                  return (
                    <>
                      <ListItem alignItems="flex-start">
                        <ListItemText
                          primary={<Typography>{item.name}</Typography>}
                          sx={{
                            display: "block",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            margin: "auto 0",
                          }}
                          secondary={
                            <Fragment>
                              <Typography
                                sx={{ display: "inline" }}
                                component="span"
                                variant="body2"
                                color="text.primary"
                              >
                                {`${item.OptName}`}
                              </Typography>
                              <Typography
                                sx={{ display: "block" }}
                                component="span"
                                variant="button"
                              >
                                {`수량 ${item.quantity}개 ${item.price}원`}
                              </Typography>
                            </Fragment>
                          }
                        />

                        <IconButton aria-label="delete-prod" onClick={()=>dispatch(updateCart(item))} size="small">
                          <ClearIcon fontSize="small">
                            빼기
                          </ClearIcon>
                        </IconButton>
                      </ListItem>
                      <Divider />
                    </>
                  )
                })
              : "장바구니에 상품이 없습니다." }

          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ display: 'flex', flexDirection: 'column;' }}>
          <Button onClick={openTossWindow} disabled={cart.orderCompositionList.length != 0 ? false : true}>
            {` 총 ${cart.orderCompositionList.length}개 `} 
            <Divider orientation="vertical" variant="5px" flexItem={false} sx={{ margin: "0 3px" }} />
            {` ${cart.totalAmount}원 결제하기 `} 
          </Button>
        </DialogActions>
      </Dialog>
  )
}

export default Cart