import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Divider from "@mui/material/Divider";
import ArrowRightAltSharpIcon from '@mui/icons-material/ArrowRightAltSharp';
import Typography from "@mui/material/Typography";
import {
  EmphasizeRedText,
  SearchItem,
  SearchItemSub,
  SearchItemInfo,
  SearchItemTitle,
  ItemBlueText,
  ItemCategoryText,
} from "./styles/oderStyle";
import { Fragment } from 'react';

function PlaceList({item, target, clicked}) {
  // 로딩 중 제휴업체 이름 보이는거 수정하기
  return (
    <SearchItem
      onClick={() => {
        clicked();
        target();
      }}
      key={item.id}
    >
      <SearchItemInfo>
        {/* 타이틀 */}
        { item.prodBasic != undefined ? (
          <>
            <ListItemButton alignItems="flex-start">
              <ListItemAvatar sx={{ margin: "auto 0" }}>
                <Avatar
                  alt="item"
                  variant="rounded"
                  sx={{ height: "74px", width: "74px", marginRight: "10px" }}
                  src={ 
                    item.prodBasic.image != "blankImage" && item.prodBasic.image != undefined 
                    ? `${process.env.REACT_APP_SPRING_API}/api/image/${item.prodBasic.image}`
                    : `${process.env.PUBLIC_URL}/noImage.png`
                  }
                />
              </ListItemAvatar>
              <ListItemText
                primary={<Typography variant="h6" sx={{ fontWeight: 600 }}>{item.prodBasic.name}</Typography>}
                sx={{
                  display: "block",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  margin: "auto 0",
                }}
                secondary={
                  <Fragment>
                    <Typography
                      sx={{ display: "inline", fontWeight: 500 }}
                      component="span"
                      variant="body2"
                      color="text.primary"
                    >
                      {` ${item.prodBasic.detail} `}
                    </Typography>
                    <Typography
                      sx={{ display: "block" }}
                      component="span"
                      variant="button"
                    >
                      <div style={{ display: "flex", justifyContent: "left", marginTop: "5px" }}>
                        <Typography sx={{ fontWeight: 300 }}>{`${item.price}원`}</Typography>
                        <ArrowRightAltSharpIcon />
                        <Typography sx={{ fontWeight: 600 }}>{`${parseInt(item.price - (item.price * item.discount/100))}원`}</Typography>
                      </div>
                    </Typography>
                  </Fragment>
                }
              />
            </ListItemButton>
          </>
        ) : (
          <>
            <SearchItemTitle>
              <ItemBlueText>
                { item.place_name != undefined 
                  ? item.place_name : item.name }
              </ItemBlueText>
              <ItemCategoryText>
                { item.category_group_name != undefined 
                ? item.category_group_name : item.category }
              </ItemCategoryText>
            </SearchItemTitle>
            {/* 서브타이틀 */}
            <SearchItemSub>
              { item.address_name != undefined 
                ? item.address_name : item.addr }
            </SearchItemSub>
            {item.distance != "" && item.distance != undefined ? (
              <SearchItemSub>
                현재 위치로부터
                <EmphasizeRedText>{item.distance}m</EmphasizeRedText>
              </SearchItemSub>
            ) : (
              <SearchItemSub>위치 정보가 있어야 표시됩니다.</SearchItemSub>
            )}
          </>
        )}
      </SearchItemInfo>
    </SearchItem>
  );
}

export default PlaceList;
