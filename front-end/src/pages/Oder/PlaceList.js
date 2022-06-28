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
          <ItemBlueText>{item.place_name}</ItemBlueText>
          <ItemCategoryText>{item.category_group_name}</ItemCategoryText>
        </SearchItemTitle>
        {/* 서브타이틀 */}
        <SearchItemSub>{item.address_name}</SearchItemSub>
        {item.distance != "" ? (
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
