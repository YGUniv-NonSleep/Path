import { Fragment } from "react";
import { Outlet, Link } from "react-router-dom";
import PropTypes from "prop-types";
import styled from "styled-components";
import useLoading from "../../../hooks/useLoading";
import useCompStore from "../hooks/useCompStore";
import blankImage from "../../../assets/images/gift.png";
import Modal from "../../../components/Modal";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";

const CompStoreCon = styled.div`
  margin: 0 350px;
  padding: 15px 0 0;
`;

function CompStoreMain() {
  const { loading } = useLoading();
  const { 
    myStore, storeDetail, open, handleOpen, handleClose 
  } = useCompStore();

  return (
    <CompStoreCon>
      { loading ? 
        <Typography variant='h3' sx={{
          display: 'absolute;', 
          justifyContent: 'center;', 
          fontWeight: 500, 
          margin: '0 auto',

        }}>마이 업체 화면</Typography> 
        : <Typography>로드 중...</Typography> }
      {myStore != null || myStore != undefined ? (
        myStore.map((item, idx) => {
          if (item.length == 0) {
            return <Typography>업체를 생성해 보세요!</Typography>;
          } else {
            return (
              <Fragment key={item.id}>
                {open ? (
                  <Modal
                    className={"comp-store-modal"}
                    visible={open}
                    closable={true}
                    maskClosable={true}
                    onClose={handleClose}
                  >
                    {storeDetail != undefined &&
                    storeDetail.member != null ? (
                      <>
                        <div>{`대표자명: ${storeDetail.member.name}`}</div>
                        <div>{`상호명: ${storeDetail.name} ${storeDetail.category}`}</div>
                        <div>{`영업시간: 예정`}</div>
                        <div>{`전화번호: ${item.phone}`}</div>
                        <div>{`사업자주소: 예정`}</div>
                        <Link to={`/company/manage/${storeDetail.id}`}>
                          <button>상품 관리로 이동</button>
                        </Link>
                        {/* <Link to={`/company/oder/${storeDetail.id}`}><button>주문 관리로 이동</button></Link> */}
                      </>
                    ) : (
                      <h2>업체 상세 정보를 불러오는데 실패하였습니다..</h2>
                    )}
                  </Modal>
                ) : null}

                <ListItemButton
                  alignItems="flex-start"
                  onClick={()=>handleOpen(idx)}
                  sx={{zIndex: '20'}}
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
                        item.thumbnail != "blankImage"
                          ? `${process.env.REACT_APP_SPRING_API}/api/image/${item.thumbnail}`
                          : blankImage
                      }
                    />
                  </ListItemAvatar>
                  <ListItemText
                    primary={
                      <>
                        <Typography sx={{display: 'inline-block'}}>
                          상호명
                        </Typography>
                        <Typography sx={{display: 'inline-flex', marginLeft: '12px'}}>
                          {item.name} {item.category}
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
                            전화번호
                          </Typography>
                          <Typography sx={{display: 'inline-flex', marginLeft: '9px'}} variant="button" component="span">
                            {item.phone}
                          </Typography>
                        </div>
                        <div>
                          <Typography sx={{display: 'inline-block'}} variant="body2" color="text.primary">
                            사업자주소
                          </Typography>
                          <Typography sx={{display: 'inline-flex', marginLeft: '9px'}} variant="button" component="span">
                            {"예정"}
                          </Typography>
                        </div>
                      </Fragment>
                    }
                  />
                </ListItemButton>
                <Divider variant="fullWidth" />
              </Fragment>
            );
          }
        })
      ) : (
        <h2>업체 정보를 불러오는데 실패하였습니다..</h2>
      )}
      <br />
      <Link to="/company/create">
        <button>업체 생성하기</button>
      </Link>
      <Outlet></Outlet>
    </CompStoreCon>
  );
}

CompStoreMain.propTypes = {
  // ex) prop: PropTypes.type.isRequired,
  loading: PropTypes.bool.isRequired,
};

export default CompStoreMain;
