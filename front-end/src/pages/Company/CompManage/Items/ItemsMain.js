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
  width: 25%;
  overflow: auto;
  float: left;
`;

const Input = styled("input")({
  display: "none",
});

const DetailCon = styled.div`
  scrollbar-width: none;
  scrollbar-height: none;
  width: 25%;
  float: left;
`;

const ThirdCon = styled.div`
  scrollbar-width: none;
  scrollbar-height: none;
  width: 25%;
  float: left;  
`;

function ItemsMain() {
  const { loading } = useLoading();
  const {
    myItems,
    detailForm,
    productDetail,
    detailOptionVisible,
    thirdForm,
    optionList,
    optionModalOpen,
    detailOptionModalOpen,
    productBasic, clickedProductBasic,
    editFormModal,
    editFormClicked,clickedChange,

    openDetailForm,
    changeDetailForm,
    changeDetailOptionVisible,
    addOption,
    addDetailOption,
    optionModalHandle,
    changeOption,
    detailOptionModalHandle,
    changeDetailOption,
    deleteProduct,
    deleteOption,
    deleteDetailOption,
    changeThirdForm,
    findProductBasic,
    clickProductBasic,
    registProduct,
    addOptionEditForm,
    editFormModalHandle,
    changeProductValue,
    patchProduct
  } = useCompItems();

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
                              {product.stock}
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
                      <IconButton
                        aria-label="delete"
                        onClick={() => {
                          deleteProduct(productDetail.id);
                        }}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </ListSubheader>
                  }
                >
                  <ListItemButton>
                    <ListItemText primary={productDetail.prodBasic.name} />
                    
                  </ListItemButton>
                  <ListItemButton>
                  <ListItemText primary={"가격"} />
                    <ListItemText primary={productDetail.price} />
                    <IconButton
                                aria-label="edit"
                                onClick={() => {
                                  editFormClicked("price");
                                }}
                              >
                                <EditIcon />
                              </IconButton>
                  </ListItemButton>
                  <ListItemButton>
                  <ListItemText primary={"재고"} />
                    <ListItemText primary={productDetail.stock} />
                    <IconButton
                                aria-label="edit"
                                onClick={() => {
                                  editFormClicked("stock");
                                }}
                              >
                                <EditIcon />
                              </IconButton>
                    
                  </ListItemButton>

                  <ListItemButton onClick={handleClick}>
                    <ListItemText primary="옵션" />

                    {open ? <ExpandLess /> : <ExpandMore />}
                  </ListItemButton>
                  {open ? (
                    <ListItemButton
                      onClick={() => {
                        addOption();
                      }}
                      variant="contained"
                    >
                      옵션 추가
                    </ListItemButton>
                  ) : (
                    ""
                  )}

                  {optionList.map((option, index) => {
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

                            >
                              <ListItemText onClick={() => {
                                changeDetailOptionVisible(index);
                              }} primary={option.name} ></ListItemText>

                              <IconButton
                                aria-label="edit"
                                onClick={() => {
                                  optionModalHandle(index);
                                }}
                              >
                                <EditIcon />
                              </IconButton>

                              <IconButton
                                aria-label="delete"
                                onClick={() => {
                                  deleteOption(index);
                                }}
                              >
                                <DeleteIcon />
                              </IconButton>

                              {detailOptionVisible[index] ? (
                                <ExpandLess />
                              ) : (
                                <ExpandMore />
                              )}
                            </ListItemButton>
                            {detailOptionVisible[index] ? (
                              <ListItemButton
                                variant="contained"
                                onClick={() => {
                                  addDetailOption(index);
                                }}
                              >
                                세부옵션 추가
                              </ListItemButton>
                            ) : (
                              <></>
                            )}


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

                                      <IconButton
                                        aria-label="edit"
                                        onClick={() => {
                                          detailOptionModalHandle(
                                            index,
                                            i
                                          );
                                        }}
                                      >
                                        <EditIcon />
                                      </IconButton>
                                      <IconButton
                                        aria-label="delete"
                                        onClick={() => {
                                          deleteDetailOption(index, i);
                                        }}
                                      >
                                        <DeleteIcon />
                                      </IconButton>

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

                  <Button
                    variant="contained"
                    onClick={() => {
                      patchProduct()
                    }}
                  >
                    적용
                  </Button>

                  <Button
                    variant="contained"
                    onClick={() => {
                      // registProduct()
                    }}
                  >
                    취소
                  </Button>


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
                  "& > :not(style)": { m: 1, width: "100%" ,marginLeft:0 , marginRight:0},
                }}
                noValidate
                autoComplete="off"
              >
                <Button
                  variant="contained"
                  onClick={() => {
                    findProductBasic()
                  }}
                >
                  기본상품 찾기
                </Button>


                <TextField
                  disabled
                  id="product-name"
                  label="상품번호"
                  value={clickedProductBasic.id}
                  variant="outlined"
                />

                <TextField
                  disabled
                  id="product-name"
                  label="상품명"
                  value={clickedProductBasic.name}
                  variant="outlined"
                />

                <TextField
                  disabled
                  id="product-name"
                  label="카테고리"
                  value={clickedProductBasic.category}
                  variant="outlined"
                />

                <TextField
                  disabled
                  id="product-detail"
                  label="설명"
                  value={clickedProductBasic.detail}
                  variant="outlined"
                />
                <TextField
                  disabled
                  id="product-image"
                  label="이미지명"
                  value={clickedProductBasic.image}
                  variant="outlined"
                />

                <TextField
                  disabled
                  id="product-brand"
                  label="브랜드"
                  value={clickedProductBasic.brand}
                  variant="outlined"
                />

                <TextField id="product-price" name="product-price" label="가격" variant="outlined" />

                <TextField id="product-stock" name="product-stock" label="재고" variant="outlined" />

                <FormControl>
                  <FormLabel id="product-visible-radio">상품 노출 여부</FormLabel>
                  <RadioGroup
                    row
                    aria-labelledby="demo-row-radio-buttons-group-label"
                    name="product-visible-radio-group"
                  >
                    <FormControlLabel value="true" control={<Radio />} label="노출" />
                    <FormControlLabel value="false" control={<Radio />} label="노출하지 않음" />
                  </RadioGroup>
                </FormControl>

                <List
                  sx={{ width: "100%" }}
                  component="nav"
                  aria-labelledby="nested-list-subheader"
                >
                  <ListItemButton>
                    <>
                      <ListItemText onClick={handleClick} primary="옵션" />
                    </>
                    {open ? <ExpandLess> </ExpandLess> : <ExpandMore />}
                  </ListItemButton>
                  {open ? (
                    <ListItemButton
                      onClick={() => {
                        addOption();
                      }}
                      variant="contained"
                    >
                      옵션 추가
                    </ListItemButton>
                  ) : (
                    ""
                  )}


                  {optionList.map((option, index) => {
                    return (
                      <div>
                        <Collapse
                          //  id={"option" + index}
                          key={index}
                          in={open}
                          timeout="auto"
                          unmountOnExit
                        >
                          <List component="div" disablePadding>
                            <ListItemButton sx={{ pl: 4 }}>
                              <>
                                <ListItemText
                                  primary={option.name}
                                  onClick={() => {
                                    changeDetailOptionVisible(index);
                                  }}
                                />
                              </>

                              <IconButton
                                aria-label="edit"
                                onClick={() => {
                                  optionModalHandle(index);
                                }}
                              >
                                <EditIcon />
                              </IconButton>
                              <IconButton
                                aria-label="delete"
                                onClick={() => {
                                  deleteOption(index);
                                }}
                              >
                                <DeleteIcon />
                              </IconButton>
                              {detailOptionVisible[index] ? (
                                <ExpandLess />
                              ) : (
                                <ExpandMore />
                              )}
                            </ListItemButton>
                            {detailOptionVisible[index] ? (
                              <ListItemButton
                                variant="contained"
                                onClick={() => {
                                  addDetailOption(index);
                                }}
                              >
                                세부옵션 추가
                              </ListItemButton>
                            ) : (
                              <></>
                            )}

                            {option.detailOptionList != null ? (
                              <>
                                {option.detailOptionList.map(
                                  (detailOption, i) => {
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
                                              primary={
                                                detailOption.price + "(원)"
                                              }
                                            />
                                            <IconButton
                                              aria-label="edit"
                                              onClick={() => {
                                                detailOptionModalHandle(
                                                  index,
                                                  i
                                                );
                                              }}
                                            >
                                              <EditIcon />
                                            </IconButton>
                                            <IconButton
                                              aria-label="delete"
                                              onClick={() => {
                                                deleteDetailOption(index, i);
                                              }}
                                            >
                                              <DeleteIcon />
                                            </IconButton>
                                          </ListItemButton>
                                        </List>
                                      </Collapse>
                                    );
                                  }
                                )}
                              </>
                            ) : (
                              <></>
                            )}
                          </List>
                        </Collapse>
                      </div>
                    );
                  })}
                </List>
                <Button
                  variant="contained"
                  onClick={() => {
                    registProduct()
                  }}
                >
                  등록
                </Button>
              </Box>
            </div>
          ) : (
            <></>
          )}
        </DetailCon>

        <ThirdCon>
          {thirdForm == "basic" ? (


            productBasic.map((basic, index) => {

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
                    onClick={() => clickProductBasic(basic.id)}
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
                          basic.image != "blankImage"
                            ? `${process.env.REACT_APP_SPRING_API}/api/image/${basic.image}`
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
                            {basic.name}
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
                              설명
                            </Typography>
                            <Typography
                              sx={{ display: "inline-flex", marginLeft: "9px" }}
                              variant="button"
                              component="span"
                            >
                              {basic.detail}
                            </Typography>
                          </div>
                          <div>
                            <Typography
                              sx={{ display: "inline-block" }}
                              variant="body2"
                              color="text.primary"
                            >
                              브랜드
                            </Typography>
                            <Typography
                              sx={{ display: "inline-flex", marginLeft: "9px" }}
                              variant="button"
                              component="span"
                            >
                              {basic.brand}
                            </Typography>
                          </div>
                        </Fragment>
                      }
                    />
                  </ListItemButton>
                </Fragment>
              );
            })

          ) : (
            <></>
          )}
        </ThirdCon>
      </ItemSubCon>

      <div>
        <Modal
          open={optionModalOpen}
          onClose={optionModalHandle}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              <TextField
                id="product-visible"
                name="optionInput"
                label="옵션명"
                variant="outlined"
              // value={optionName}
              />
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              <Button variant="contained" onClick={changeOption}>
                확인
              </Button>
              <Button variant="contained" onClick={optionModalHandle}>
                취소
              </Button>
            </Typography>
          </Box>
        </Modal>

        <Modal
          open={detailOptionModalOpen}
          onClose={detailOptionModalHandle}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              <TextField
                id="product-visible"
                name="detailOptionName"
                label="세부옵션명"
                variant="outlined"
              // value={optionName}
              />
              <TextField
                id="product-visible"
                name="detailOptionPrice"
                label="가격"
                variant="outlined"
              // value={optionName}
              />
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              <Button variant="contained" onClick={changeDetailOption}>
                확인
              </Button>
              <Button variant="contained" onClick={detailOptionModalHandle}>
                취소
              </Button>
            </Typography>
          </Box>
        </Modal>
      
        <Modal
          open={editFormModal}
          onClose={editFormModalHandle}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              <TextField
                id="change-product"
                name="change-product"
                label={clickedChange}
                variant="outlined"

              />
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              <Button variant="contained" onClick={changeProductValue}>
                확인
              </Button>
              <Button variant="contained" onClick={editFormModalHandle}>
                취소
              </Button>
            </Typography>
          </Box>
        </Modal>


      </div>
    </ItemCon>
  );
}

ItemsMain.propTypes = {
  // ex) prop: PropTypes.type.isRequired,
  loading: PropTypes.bool.isRequired,
};

export default ItemsMain;
