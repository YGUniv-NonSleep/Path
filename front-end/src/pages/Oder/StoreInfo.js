import { Fragment } from "react";
import { Button } from "@mui/material";
import {
  EmphasizeRedText,
  EntryPlaceBridge,
  PlaceDataImageArea,
  ImageArea,
  PlaceDataArea,
  PlaceData,
  PlaceDataTitle,
  PlaceDataTitleName,
  PlaceDataTitleCate,
  PlaceDataPlus,
  PlaceDataPlusSection,
  PlusSectionUl,
  PlusSectionLi,
  PlusSection,
  PlusSectionContent,
} from "./styles/oderStyle";
import PhoneIcon from "@mui/icons-material/Phone";
import MyLocationIcon from "@mui/icons-material/MyLocation";
import LocationOnIcon from "@mui/icons-material/LocationOn";

function StoreInfo({ place, showStore }) {
  return (
    <EntryPlaceBridge>
      {/* 이미지 받을 공간 */}
      <PlaceDataImageArea>
        <ImageArea>
          <img src={process.env.PUBLIC_URL + "/noImage.png"} />
        </ImageArea>
      </PlaceDataImageArea>
      {/* 상세 내용 추가 */}
      <PlaceDataArea>
        <PlaceData>
          <PlaceDataTitle>
            <PlaceDataTitleName>{place.place_name}</PlaceDataTitleName>
            <PlaceDataTitleCate>{place.category_group_name}</PlaceDataTitleCate>
          </PlaceDataTitle>
          {/* 여러가지 추가적인 상세 정보들 */}
          <PlaceDataPlus>
            <PlaceDataPlusSection>
              <PlusSectionUl>
                {/* 반복 */}
                <PlusSectionLi>
                  <PlusSection>
                    <PlusSectionContent>
                      <PhoneIcon
                        sx={{ float: "left", margin: "6px 10px 0 0" }}
                      />
                      {place.phone != "" ? place.phone : "전화번호 정보 없음"}
                    </PlusSectionContent>
                  </PlusSection>
                </PlusSectionLi>
                <PlusSectionLi>
                  <PlusSection>
                    <PlusSectionContent>
                      <MyLocationIcon
                        sx={{ float: "left", margin: "6px 10px 0 0" }}
                      />
                      {place.distance != "" ? (
                        <Fragment>
                          현재 위치로부터
                          <EmphasizeRedText>{place.distance}m</EmphasizeRedText>
                        </Fragment>
                      ) : (
                        "현재 위치로 부터의 거리 정보 없음"
                      )}
                    </PlusSectionContent>
                  </PlusSection>
                </PlusSectionLi>
                <PlusSectionLi>
                  <PlusSection>
                    <PlusSectionContent>
                      <LocationOnIcon
                        sx={{ float: "left", margin: "6px 10px 0 0" }}
                      />
                      {place.address_name}
                    </PlusSectionContent>
                  </PlusSection>
                </PlusSectionLi>
                {/* 제휴 업체만 버튼 보이기 */}
                <PlusSectionLi>
                  <PlusSection>
                    <PlusSectionContent onClick={showStore}>
                      <Button variant="contained" component="span" color="info">
                        주문 하기
                      </Button>
                    </PlusSectionContent>
                  </PlusSection>
                </PlusSectionLi>
              </PlusSectionUl>
            </PlaceDataPlusSection>
          </PlaceDataPlus>
        </PlaceData>
      </PlaceDataArea>
    </EntryPlaceBridge>
  );
}

export default StoreInfo;
