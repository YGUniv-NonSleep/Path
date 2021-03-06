import { Fragment } from "react";
import { Link, Outlet } from "react-router-dom";
import PropTypes from "prop-types";
import styled from "styled-components";
import useLoading from "../../../../hooks/useLoading";
import useCompOrder from "../hooks/useCompOrder";
import blankImage from "../../../../assets/images/gift.png";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import Collapse from "@mui/material/Collapse";
import ListSubheader from "@mui/material/ListSubheader";
import List from "@mui/material/List";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import * as React from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import Modal from "@mui/material/Modal";
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

const OrderCon = styled.div`
width:100%;
height:100%
`;

const OrderSubCon = styled.div`
width:100%;
margin-left: 130px;
`;

const OrderListCon = styled.div`
width:30%;
float: left;
`

const OrderDetailCon = styled.div`
width:30%;
float:left;
`


function OrderMain() {
    const { loading } = useLoading();
    const {
        orderList, clickedOrderHandle,changeState
        // openDetailForm

    } = useCompOrder();



    return (
        <OrderCon>
            <OrderSubCon>
                <OrderListCon>
                    {orderList == null ? (
                        console.log(orderList)
                    ) : orderList.length == 0 ? (

                        // console.log("????????? ???????????? ??????")
                        <div>????????? ????????? ???????????? ????????? ??????????????????</div>
                    ) : (
                        orderList.map((order, index) => {
                            // console.log(it);
                            return (
                                <Fragment key={index}>
                                    <br />

                                    <ListItemButton
                                        alignItems="flex-start"
                                        // onClick={() => openDetailForm(order.orderId)}
                                        sx={{ zIndex: "20" }}
                                    >
                                        <ListItemText
                                            primary={
                                                <>
                                                    <Typography sx={{ display: "inline-block" }}>
                                                        ????????????
                                                    </Typography>
                                                    <Typography
                                                        sx={{ display: "inline-flex", marginLeft: "12px" }}
                                                    >
                                                        {order.orderId}
                                                    </Typography>
                                                </>
                                            }
                                            sx={{
                                                display: "block",
                                                overflow: "hidden",
                                                textOverflow: "ellipsis",
                                                margin: "auto 0",
                                            }}
                                            secondary={
                                                <Fragment sx={{ marginLeft: "9px" }}>
                                                    <div>
                                                        <Typography
                                                            sx={{ display: "inline-block" }}
                                                            variant="body2"
                                                            color="text.primary"
                                                        >
                                                            ??????

                                                        </Typography>
                                                        <Typography
                                                            sx={{ display: "inline-flex", marginLeft: "9px" }}
                                                            variant="button"
                                                            component="span"
                                                        >
                                                            {order.price}???
                                                        </Typography>
                                                    </div>
                                                    <div>
                                                        <Typography
                                                            sx={{ display: "inline-block" }}
                                                            variant="body2"
                                                            color="text.primary"
                                                        >
                                                            ????????????
                                                        </Typography>
                                                        <Typography
                                                            sx={{ display: "inline-flex", marginLeft: "9px" }}
                                                            variant="button"
                                                            component="span"
                                                        >
                                                            {order.memberId}
                                                        </Typography>
                                                    </div>
                                                    <div>
                                                        <Typography
                                                            sx={{ display: "inline-block" }}
                                                            variant="body2"
                                                            color="text.primary"
                                                        >
                                                            ????????????
                                                        </Typography>
                                                        <Typography
                                                            sx={{ display: "inline-flex", marginLeft: "9px" }}
                                                            variant="button"
                                                            component="span"
                                                        >
                                                            {order.orderState}
                                                        </Typography>
                                                    </div>

                                                    {order.orderState == "CHECKING" ?

                                                        <><Button
                                                            onClick={() => {
                                                                changeState("ACCEPTED",order.orderId)
                                                            }}
                                                        >
                                                            ?????? ??????
                                                        </Button>
                                                            <Button
                                                                onClick={() => {
                                                                    changeState("CANCELLED",order.orderId)
                                                                }}
                                                            >
                                                                ?????? ??????
                                                            </Button></>
                                                        :
                                                        <><Button>
                                                        {order.orderState}
                                                    </Button></>
                                                    }





                                                </Fragment>
                                            }
                                        />
                                    </ListItemButton>
                                </Fragment>
                            );
                        })
                    )}



                </OrderListCon>
                <OrderDetailCon>

                    {/* {clickedOrderHandle == true ? <>


                        <Button
                            onClick={() => {
                                //   changeDetailForm("create");
                            }}
                        >
                            ?????? ??????
                        </Button>
                        <Button
                            onClick={() => {
                                //   changeDetailForm("create");
                            }}
                        >
                            ?????? ??????
                        </Button>


                    </> : <>ss2</>} */}

                </OrderDetailCon>


            </OrderSubCon>
        </OrderCon>

    );
}

OrderMain.PropTypes = {
    loading: PropTypes.bool.isRequired,
};
export default OrderMain;
