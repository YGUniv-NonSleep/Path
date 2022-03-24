import axios from "axios";

const odsayApi = axios.create({
    baseURL: `https://api.odsay.com/v1/api/searchPubTransPathT`,
  });

const key = process.env.REACT_APP_ODSAY_API;

 export const PathApi = {
       getDirection: async (data) => {  // console.log(data)
         const response = await odsayApi.get(`?lang=0&SX=${data.startPoint.la}&SY=${data.startPoint.ma}&EX=${data.arrivalPoint.la}&EY=${data.arrivalPoint.ma}&apiKey=${key}`)
         //console.log(response)
         return response.data.result
       }
 };
 
 export default odsayApi;