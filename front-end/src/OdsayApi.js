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

export const MobilityApi = {
  getBusId: async (data) => { console.log(data)
    const response = await odsayApi.get(
      `/searchBusLane?lang=0&busNo=${data}&CID=4000&apiKey=${key}`,

    ).catch((error) => console.log(error));
     console.log(response.data.result.lane[0].busID);
    return response.data.result.lane[0].busID;
  },
  
  getBusLineDetail: async (busID) => { console.log(busID)
    const response = await odsayApi.get(
      `/busLaneDetail?lang=0&busID=${busID}&apiKey=${key}`
    ).catch((error) => console.log(error));
     console.log(response);
    return response.data;
  }
};

export const BusStayApi = {
  getBusStay: async (data) => {console.log(data)
    const response = await odsayApi.get(
      `/searchStation?lang=0&stationName=${data}&CID=4000&stationClass=1&apiKey=${key}`
    ).catch((error) => console.log(error));
    console.log(response);
  }
};

export const SubName = {
 getSubName: async (data) => {console.log(data)
  const response = await odsayApi.get(
    `/searchStation?lang=0&stationName=${data}&CID=4000&stationClass=2&apiKey=${key}`
  ).catch((error) => console.log(error));
 // console.log(response.data.result.station[0].stationID);
  return response.data.result.station[0];
}
};



export default odsayApi;
