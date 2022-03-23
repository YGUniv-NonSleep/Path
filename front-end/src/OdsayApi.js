import axios from "axios";

const odsayApi = axios.create({
    baseURL: `https://api.odsay.com/v1/api/searchPubTransPathT`,
    params: {
      apiKey: process.env.REACT_APP_ODSAY_API
    },
  });

  export const PathApi = {
       getDirection: (data) => { // console.log(data)
        odsayApi.get(`?lang=0&SX=${data.sx}&SY=${data.sy}&EX=${data.ex}&EY=${data.ey}`)
        .then((response) => console.log(response))
        .catch((error) => console.log(error))
       }
  };

 export default odsayApi;