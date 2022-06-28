import {
    EmphasizeRedText,
    SearchItem,
    SearchItemSub,
    SearchItemInfo,
    SearchItemTitle,
    ItemBlueText,
    ItemCategoryText,
} from "./styles/oderStyle";

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
      </SearchItemInfo>
    </SearchItem>
  );
}

export default PlaceList;
