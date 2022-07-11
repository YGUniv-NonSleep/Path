import qs from "qs";

function locDtoConvertQs(d) {
    let loc = '';
    let category = '';

    d.locationList.map((item, idx)=>{
        if(idx == d.locationList.length - 1) {
            loc += `${qs.stringify(item)}`
        } else loc += `${qs.stringify(item)},`
    })
    // category += `category=${d.category}`
    category += `${d.category}`
    console.log(loc, category)
    return { loc, category }
}

export default locDtoConvertQs