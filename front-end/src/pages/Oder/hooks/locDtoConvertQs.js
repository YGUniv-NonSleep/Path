import qs from "qs";

function locDtoConvertQs(d) {
    let lng = [];
    let lat = [];
    let category = '';

    // d.locationList.map((item, idx)=>{
    //     if(idx == d.locationList.length - 1) {
    //         loc += `${qs.stringify(item)}`
    //     } else loc += `${qs.stringify(item)},`
    // })
    // lat : 36(y), lng : 126(x)
    console.log(d)
    for (var i=0; i<d.x.length; i++) {
        lng.push(d.x[i])
    }
    for (var i=0; i<d.y.length; i++) {
        lat.push(d.y[i])
    }

    category += `${d.category}`
    console.log(lng, lat, category)
    let x = lng;
    let y = lat;
    return { x, y, category }
}

export default locDtoConvertQs