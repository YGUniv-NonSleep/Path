function StoreMenu({place}) {
    console.log(place)
    // 카테고리랑 메뉴들 https://mui.com/material-ui/react-accordion/
    return (
        "뒤로가기/가게이름/검색",
        "카테고리들",
        // 여기까지 고정위치
        "가게이름",
        "평균대기시간",
        "가게 위치 ~m",
        "결제방법",
        // 가게 정보
        "아코디언으로 카테고리별로 상품 보여주기",
        "메뉴의 사진은 연출된 사진으로. 실제와 다를 수 있습니다."
    )
}

export default StoreMenu