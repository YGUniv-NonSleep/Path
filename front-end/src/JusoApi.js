import axios from "axios";

const key = process.env.REACT_APP_JUSO_API;

const jusoSearch = axios.create({
  baseURL: `https://www.juso.go.kr/addrlink/addrLinkApi.do?confmKey=${key}&currentPage=1&countPerPage=50&resultType=json&keyword=`
});

export const JusoApi = {
    getJuso: async (data) => {  // keyword = 주소 입력
        const juso = await jusoSearch.get(`${data}`).catch((error) => console.log(error));
        // console.log(juso)
        console.log(juso.data.results.juso)
        return juso.data.results.juso
    }
}

// import { JusoApi } from "../../JusoApi";

// const a = JusoApi.getJuso('원서')
// console.log(a)