import axios from "axios";

const odsayApi = axios.create({
  baseURL: `https://api.odsay.com/v1/api`,
});

const key = process.env.REACT_APP_ODSAY_API;

export const PathApi = {

  getDirection: async (data) => { // console.log(data)
    // 검색한 모든 경로 정보 들고오는 친구
    const response = await odsayApi.get(
        `/searchPubTransPathT?lang=0&SX=${data.sx}&SY=${data.sy}&EX=${data.ex}&EY=${data.ey}&apiKey=${key}`
      ).catch((error) => console.log(error));
    // console.log(response.data.error.code) -> -98 (출, 도착지가 700m이내입니다.) 도보 api 활용
    // response.data.result.path.pathType	(int) 1-지하철, 2-버스, 3-버스+지하철
    
    return response.data.result;
  },

  getGraphicRoute: async (mapObj) => { // console.log(mapObj)
    // 찾은 경로 그림 그릴 준비하는 친구
    //let isAt = []; // at = @

    // @로 구분되는 mapObj @ 위치
    // let isAt = mapObj.map((item) => {
    //   let list = []
    //   let idx = item.indexOf('@')

    //   while(idx != -1) {
    //     list.push(idx)
    //     idx = item.indexOf('@', idx+'@'.length)
    //   }
    //   return list
    // })
    let resList = []
    // console.log(mapObj)
    for(var i=0; i<mapObj.length; i++){
      const response = await odsayApi.get(
        `/loadLane?lang=0&mapObject=0:0@${mapObj[i]}&apiKey=${key}`
      ).catch((error) => console.log(error));

      resList.push(response.data.result)
    }
     console.log(resList);
    return resList
  },
};

export const MobilityApi = {
  getBusId: async (data) => { // console.log(data)
    const response = await odsayApi.get(
      `/searchBusLane?lang=0&busNo=${data}&CID=4000&apiKey=${key}`,
    ).catch((error) => console.log(error));
     console.log(response.data.result.lane[0].busID);
    return response.data.result.lane[0].busID;
  },

  getBusStay: async(data) => { // console.log(data)
    const response = await odsayApi.get(
      `/searchStation?lang=0&stationName=${data}&CID=4000&stationClass=1&apiKey=${key}`
    ).catch((error)=>console.log(error));
    //console.log(response.data.result.station);
    return response.data.result.station;
  },
  
  getBusLineDetail: async (busID) => {// console.log(busID)
    const response = await odsayApi.get(
      `/busLaneDetail?lang=0&busID=${busID}&apiKey=${key}`
    ).catch((error) => console.log(error));
    return response.data;
  }
};

export const BusStayApi = {
  getBusStay: async (data) => { // console.log(data)
    const response = await odsayApi.get(
      `/searchStation?lang=0&stationName=${data}&CID=4000&stationClass=1&apiKey=${key}`
    ).catch((error) => console.log(error));
    console.log(response);
  }
};

export const SubName = {
 getSubName: async (data) => { // console.log(data)
  const response = await odsayApi.get(
    `/searchStation?lang=0&stationName=${data}&CID=4000&stationClass=2&apiKey=${key}`
  ).catch((error) => console.log(error));
 // console.log(response.data.result.station[0].stationID);
  return response.data.result.station[0];
}
};

export default odsayApi;
