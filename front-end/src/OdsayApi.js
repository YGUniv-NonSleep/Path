import axios from "axios";

const odsayApi = axios.create({
  baseURL: `https://api.odsay.com/v1/api`,
});

const key = process.env.REACT_APP_ODSAY_API;

export const PathApi = {
  getDirection: async (data) => {
    // 검색한 모든 경로 정보 들고오는 친구
    const response = await odsayApi.get(
        `/searchPubTransPathT?lang=0&SX=${data.startPoint.la}&SY=${data.startPoint.ma}&EX=${data.arrivalPoint.la}&EY=${data.arrivalPoint.ma}&apiKey=${key}`
      ).catch((error) => console.log(error));
    //console.log(response)
    return response.data.result;
  },
  getGraphicRoute: async (mapObj) => {
    // 찾은 경로 그림 그릴 준비하는 친구
    const response = await odsayApi.get(
        `/loadLane?lang=0&mapObject=0:0@${mapObj}&apiKey=${key}`
      ).catch((error) => console.log(error));
    //console.log(response);
    return response.data;
  },
};

export default odsayApi;
