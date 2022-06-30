import { Fragment } from "react";
import { Link, Outlet } from "react-router-dom";
import PropTypes from "prop-types";
import styled from "styled-components";
import useLoading from '../../../../hooks/useLoading';
import useCompItems from "../hooks/useCompItems";
import blankImage from "../../../../assets/images/gift.png";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';

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
float:left;
`;

const DetailCon = styled.div`
scrollbar-width: none;
scrollbar-height: none;
width: 30%;
float:left;
`;

function ItemsMain() {
  const { loading } = useLoading();
  const { 
    myItems, detailForm,
    productForm
  } = useCompItems()

  return (
    <ItemCon>
      <ItemSubCon>
        <ItemListCon>
        
        <Outlet context={23}></Outlet>
        {loading ? <p></p> : <h2>로드 중...</h2>}
        {/* 상품 아이디에 맞게 띄우도록.. 도메인에는 안보이게 onClick 함수로 등록 */}
        <Button onClick={productForm}>
          가게 상품 등록
        </Button>
        <Link to={"/company/basic"}>
          <Button>
            기본 상품 등록
          </Button>
        </Link>
        {myItems == null ? (
          console.log("데이터 잘못넘어옴")
        ) : (
          myItems.length == 0 ? (
            // console.log("조회된 데이터가 없음")
            <div>조회된 상품이 없습니다 상품을 추가해주세요</div>
          ) : (

            myItems.map((product, index) => {
              // console.log(it);
              return (
                <Fragment key={index}>
                  {/* <div>상품이름: {product.prodBasic.name}</div>                
                  <div>상품가격: {product.price}</div>
                  <div>상품재고: {product.stock}</div>
                  <Link to="itemEdit"><button>상품 상세 정보</button></Link> */}
                  <br/>

                  <ListItemButton
                  alignItems="flex-start"
                  onClick={()=>handleOpen(idx)}
                  sx={{zIndex: '20', }}
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
                        <Typography sx={{display: 'inline-block'}}>
                          상품명
                        </Typography>
                        <Typography sx={{display: 'inline-flex', marginLeft: '12px'}}>
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
                      <Fragment sx={{marginLeft: '9px'}}>
                        <div>
                          <Typography sx={{display: 'inline-block'}} variant="body2" color="text.primary">
                            가격
                          </Typography>
                          <Typography sx={{display: 'inline-flex', marginLeft: '9px'}} variant="button" component="span">
                            {product.price}원
                          </Typography>
                        </div>
                        <div>
                          <Typography sx={{display: 'inline-block'}} variant="body2" color="text.primary">
                            재고
                          </Typography>
                          <Typography sx={{display: 'inline-flex', marginLeft: '9px'}} variant="button" component="span">
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
          )
        )}
        </ItemListCon>

        <DetailCon>
          {detailForm == null ? <p>fdfd</p> : <h2>로드 중...</h2>}
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
