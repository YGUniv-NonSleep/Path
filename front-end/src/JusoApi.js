import axios from "axios";

const key = process.env.REACT_APP_JUSO_API;

const jusoSearch = axios.create({
  baseURL: `https://www.juso.go.kr/addrlink/addrLinkApi.do?confmKey=${key}&currentPage=1&countPerPage=50`
});

export const JusoApi = {
    getJuso: async (data) => {  // keyword = 주소 입력
        console.log(typeof data)
        const juso = await jusoSearch.get(`&resultType=json&keyword=${data}`).catch((error) => console.log(error));
        console.log(juso)
        console.log(juso.data)
        return null
    }
}