import { Fragment } from "react";
import {
    BubbleFilterItem,
    BubbleFilterBtn,
    AppendixFilterListImg
} from "./styles/oderStyle";

function CategoryList({clicked}) {
    // 대형마트, 편의점, 음식점, 카페, 병원, 약국 순서
    const imageLink = ['00099', '00065', '00032', '00012', '00057', '00087'];
    const text = ['대형마트', '편의점', '음식점', '카페', '병원', '약국'];

    function enumerate() {
        let list = []
        for(var i=0; i<imageLink.length; i++) {
            let source = `https://map.pstatic.net/res/category/image/00023-${imageLink[i]}.png`
            list.push(
                <BubbleFilterItem key={i} onClick={clicked}>
                    <BubbleFilterBtn name='category'>
                        <AppendixFilterListImg src={source} />
                        {text[i]}
                    </BubbleFilterBtn>
                </BubbleFilterItem>
            )
        }
        return list
    }

    return enumerate()
}

export default CategoryList