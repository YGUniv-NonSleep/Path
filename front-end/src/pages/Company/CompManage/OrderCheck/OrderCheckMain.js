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


function OrderMain(){
    const {loading} = useLoading();
    const{
        
    } = useCompOrder();

    return(
        <OrderCon>
            <OrderSubCon>
                <>ds</>


            </OrderSubCon>
        </OrderCon>
        
    );
}

OrderMain.PropTypes={
    loading:PropTypes.bool.isRequired,
};
export default OrderMain;
