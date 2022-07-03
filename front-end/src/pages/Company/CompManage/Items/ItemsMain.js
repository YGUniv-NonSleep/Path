import { Fragment } from "react";
import { Link, Outlet } from "react-router-dom";
import PropTypes from "prop-types";
import styled from "styled-components";
import useLoading from "../../../../hooks/useLoading";
import useCompItems from "../hooks/useCompItems";
import blankImage from "../../../../assets/images/gift.png";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import Collapse from "@mui/material/Collapse";
import ListSubheader from "@mui/material/ListSubheader";
import List from "@mui/material/List";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import * as React from "react";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

const ItemCon = styled.div`
  width: 100%;
  height: 100%;
`;

const ItemSubCon = styled.div`
  margin-left: 130px;
  width: 100%;
`;

const ItemListCon = styled.div`
  scrollbar-width: none;
  scrollbar-height: none;
  width: 30%;
  overflow: auto;
  float: left;
`;

const Input = styled("input")({
  display: "none",
});

const DetailCon = styled.div`
  scrollbar-width: none;
  scrollbar-height: none;
  width: 30%;
  float: left;
`;

function ItemsMain() {
  const { loading } = useLoading();
  const {
    myItems,
    detailForm,
    productDetail,
    detailOptionVisible, optionList,
    productForm,
    openDetailForm,
    changeDetailForm,
    changeDetailOptionVisible,
    addOption, addDetailOption
  } = useCompItems();

  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <ItemCon>
      <ItemSubCon>
        <ItemListCon>
          {/* <Outlet context={1}></Outlet> */}
          {loading ? <p></p> : <h2>로드 중...</h2>}
          {/* 상품 아이디에 맞게 띄우도록.. 도메인에는 안보이게 onClick 함수로 등록 */}
          <Button
            onClick={() => {
              changeDetailForm("create");
            }}
          >
            상품 추가
          </Button>
          <Link to={"/company/basic"}>
            <Button>기본 상품 등록</Button>
          </Link>
          {myItems == null ? (
            console.log("데이터 잘못넘어옴")
          ) : myItems.length == 0 ? (
            // console.log("조회된 데이터가 없음")
            <div>조회된 상품이 없습니다 상품을 추가해주세요</div>
          ) : (
            myItems.map((product, index) => {
              // console.log(it);
              return (
                <Fragment key={index}>
                  {/* <div>상품이름: {product.prodBasic.name}</div>                
                  <div>상품가격: {product.price}</div>
                  <div>상품재고: {product.stock}</div> */}
                  {/* <Link to="itemEdit"><button>상품 상세 정보</button></Link> */}
                  <br />

                  <ListItemButton
                    alignItems="flex-start"
                    onClick={() => openDetailForm(product.id)}
                    sx={{ zIndex: "20" }}
                  >
                    <ListItemAvatar sx={{ margin: "auto 0" }}>
                      <Avatar
                        alt="item"
                        variant="rounded"
                        sx={{
                          height: "74px",
                          width: "74px",
                          marginRight: "10px",
                        }}
                        src={
                          product.prodBasic.image != "blankImage"
                            ? `${process.env.REACT_APP_SPRING_API}/api/image/${product.prodBasic.image}`
                            : blankImage
                        }
                      />
                    </ListItemAvatar>
                    <ListItemText
                      primary={
                        <>
                          <Typography sx={{ display: "inline-block" }}>
                            상품명
                          </Typography>
                          <Typography
                            sx={{ display: "inline-flex", marginLeft: "12px" }}
                          >
                            {product.prodBasic.name}
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
                              가격
                            </Typography>
                            <Typography
                              sx={{ display: "inline-flex", marginLeft: "9px" }}
                              variant="button"
                              component="span"
                            >
                              {product.price}원
                            </Typography>
                          </div>
                          <div>
                            <Typography
                              sx={{ display: "inline-block" }}
                              variant="body2"
                              color="text.primary"
                            >
                              재고
                            </Typography>
                            <Typography
                              sx={{ display: "inline-flex", marginLeft: "9px" }}
                              variant="button"
                              component="span"
                            >
                              {product.discount}
                            </Typography>
                          </div>
                        </Fragment>
                      }
                    />
                  </ListItemButton>
                </Fragment>
              );
            })
          )}
        </ItemListCon>

        <DetailCon>
          {detailForm == "detail" ? (
            <div>
              {productDetail != null ? (
                <List
                  sx={{ width: "100%" }}
                  component="nav"
                  aria-labelledby="nested-list-subheader"
                  subheader={
                    <ListSubheader component="div" id="nested-list-subheader">
                      {productDetail.id}
                    </ListSubheader>
                  }
                >
                  <ListItemButton>
                    <ListItemText primary={productDetail.prodBasic.name} />
                  </ListItemButton>
                  <ListItemButton>
                    <ListItemText primary={productDetail.price} />
                  </ListItemButton>

                  <ListItemButton onClick={handleClick}>
                    <ListItemText primary="옵션" />

                    {open ? <ExpandLess /> : <ExpandMore />}
                  </ListItemButton>

                  {productDetail.optionList.map((option, index) => {
                    return (
                      <div>
                        <Collapse
                          id={"option" + option.id}
                          in={open}
                          timeout="auto"
                          unmountOnExit
                        >
                          <List component="div" disablePadding>
                            <ListItemButton
                              sx={{ pl: 4 }}
                              onClick={() => {
                                changeDetailOptionVisible(index);
                              }}
                            >
                              <ListItemText primary={option.name} />
                              {detailOptionVisible[index] ? <ExpandLess /> : <ExpandMore />}
                            </ListItemButton>

                            {option.detailOptionList.map((detailOption, i) => {
                              // console.log(detailOptionVisible[index])
                              return (
                                <Collapse
                                  in={detailOptionVisible[index]}
                                  timeout="auto"
                                  unmountOnExit
                                >
                                  <List component="div" disablePadding>
                                    <ListItemButton sx={{ pl: 8 }}>
                                      <ListItemText
                                        primary={detailOption.name}
                                      />
                                      <ListItemText
                                        primary={detailOption.price + "원"}
                                      />
                                    </ListItemButton>
                                  </List>
                                </Collapse>
                              );
                            })}
                          </List>
                        </Collapse>
                      </div>
                    );
                  })}
                </List>
              ) : (
                <>dsad</>
              )}
            </div>
          ) : detailForm == "create" ? (
            <div>
              <Box
                component="form"
                sx={{
                  "& > :not(style)": { m: 1, width: "100%" },
                }}
                noValidate
                autoComplete="off"
              >
                <TextField
                  id="product-name"
                  label="상품명"
                  variant="outlined"
                />
                <TextField id="product-price" label="가격" variant="outlined" />
                <TextField
                  id="product-visible"
                  label="노출여부"
                  variant="outlined"
                />
                <TextField id="product-stock" label="재고" variant="outlined" />

                {/* <Stack direction="row" alignItems="center" spacing={2}>
                  <label htmlFor="contained-button-file">
                    <TextField
                      disabled
                      id="product-picture"
                      label="상품사진"
                      defaultValue="파일 없음"                      
                    />
                    <Input
                      accept="image/*"
                      id="contained-button-file"
                      multiple
                      type="file"
                    />
                    <Button name="input-button" variant="contained" component="span">
                      업로드
                    </Button>
                  </label>
                </Stack> */}


                {/* <input type="file" name="image"/> */}
                <TextField
                  disabled
                  id="product-picture"
                  label="상품사진"
                  defaultValue="파일 없음">
                </TextField>
                <Button variant="contained">기본상품 찾기</Button>

                <input type="file"></input>


                <List
                  sx={{ width: "100%" }}
                  component="nav"
                  aria-labelledby="nested-list-subheader"
                >

                  <ListItemButton>
                    <><ListItemText onClick={handleClick} primary="옵션" /></>
                    {open ? <ExpandLess> </ExpandLess> : <ExpandMore />}
                  </ListItemButton>
                  {open ? <Button onClick={() => { addOption() }} variant="contained">옵션 추가</Button> : ""}



                  {optionList.map((option, index) => {
                    return (
                      <div>
                        <Collapse
                          // id={"option" + option.id}
                          in={open}
                          timeout="auto"
                          unmountOnExit
                        >
                          <List component="div" disablePadding>
                            <ListItemButton
                              sx={{ pl: 4 }}

                            >
                              <><ListItemText primary={option.name}
                                onClick={() => {
                                  changeDetailOptionVisible(index);
                                }} /></>

                              <IconButton aria-label="edit">
                                <EditIcon />
                              </IconButton>
                              <IconButton aria-label="delete">
                                <DeleteIcon />
                              </IconButton>
                              {detailOptionVisible[index] ? <ExpandLess /> : <ExpandMore />}
                            </ListItemButton>
                            {detailOptionVisible[index] ? <Button variant="contained" onClick={() => { addDetailOption(index) }}>세부옵션 추가</Button> : <></>}


                            {option.detailOptionList != null ? <>


                              {option.detailOptionList.map((detailOption, i) => {
                                // console.log(detailOptionVisible[index])
                                return (
                                  <Collapse
                                    in={detailOptionVisible[index]}
                                    timeout="auto"
                                    unmountOnExit
                                  >
                                    <List component="div" disablePadding>
                                      <ListItemButton sx={{ pl: 8 }}>
                                        <ListItemText
                                          primary={detailOption.name}
                                        />
                                        <ListItemText
                                          primary={detailOption.price + "(원)"}
                                        />
                                        <IconButton aria-label="edit">
                                          <EditIcon />
                                        </IconButton>
                                        <IconButton aria-label="delete">
                                          <DeleteIcon />
                                        </IconButton>

                                      </ListItemButton>

                                    </List>
                                  </Collapse>
                                );
                              })}



                            </> : <></>}


                          </List>
                        </Collapse>
                      </div>
                    );
                  })}
                </List>


              </Box>

            </div>
          ) : (
            <></>
          )}
        </DetailCon>
      </ItemSubCon>
    </ItemCon>
  );
}

ItemsMain.propTypes = {
  // ex) prop: PropTypes.type.isRequired,
  loading: PropTypes.bool.isRequired,
};

export default ItemsMain;
