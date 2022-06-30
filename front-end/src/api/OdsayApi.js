import axios from 'axios';

const odsayApi = axios.create({
  baseURL: `https://api.odsay.com/v1/api`,
});

const key = process.env.REACT_APP_ODSAY_API;

export const PathApi = {
  getTransPath: async (data) => {
    const response = await axios
      .get(
        process.env.REACT_APP_SPRING_API + "/odsay/paths",
        { params: data },
        { withCredentials: true }
      )
      .catch((err) => console.log(err));
      // (int) 1-지하철, 2-버스, 3-도보, 4 퍼스널 모빌리티(예정)
       console.log(response)
    return response.data;
  },
};

export const MobilityApi = {
  getBusId: async (data) => {
    // console.log(data)
    const response = await odsayApi
      .get(`/searchBusLane?lang=0&busNo=${data}&CID=4000&apiKey=${key}`)
      .catch((error) => console.log(error));
    console.log(response.data.result.lane[0].busID);
    return response.data.result.lane[0].busID;
  },
  getBusStay: async (data) => {
    // console.log(data)
    const response = await odsayApi
      .get(
        `/searchStation?lang=0&stationName=${data}&CID=4000&stationClass=1&apiKey=${key}`
      )
      .catch((error) => console.log(error));
    //console.log(response.data.result.station);
    return response.data.result.station;
  },
  getBusLineDetail: async (busID) => {
    // console.log(busID)
    const response = await odsayApi
      .get(`/busLaneDetail?lang=0&busID=${busID}&apiKey=${key}`)
      .catch((error) => console.log(error));
    return response.data;
  },

  getBusDetailLine : async(busID) => {
    const response = await odsayApi.get(`/busLaneDetail?lang=0&busID=${busID}&apiKey=${key}`)
    .catch((error)=>console.log(error));
    return response.data.result;
  },

  getBusStayDetail: async (busID) => {
    const response = await odsayApi
      .get(`/busLaneDetail?lang=0&busID=${busID}&apiKey=${key}`)
      .catch((error) => console.log(error));
    //console.log(response.data.result)
    return response.data.result;
  },

  getBusStationInfo: async (stopID) => {
    console.log(stopID)
    const response = await odsayApi.get(`/busStationInfo?lang=0&stationID=${stopID}&apiKey=${key}`)
    .catch((error) => console.log(error));
    //console.log(response.data.result)
    return response.data.result;
  },
};

export const SubwayApi = {
  getSubName: async (data) => {
    // console.log(data)
    const response = await odsayApi
      .get(
        `/searchStation?lang=0&stationName=${data}&CID=4000&stationClass=2&apiKey=${key}`
      )
      .catch((error) => console.log(error));
    //console.log(response.data.result.station[0].stationID);
    return response.data.result.station[0];
  },
  getSubTime: async (subTime) => {
    const response = await odsayApi
      .get(`/subwayTimeTable?lang=0&stationID=${subTime}&apiKey=${key}`)
      .catch((error) => console.log(error));
    //console.log(response.data.result);
    return response.data.result;
  },
  getSubInfo: async (subInfo) => {
    const response = await odsayApi
      .get(`/subwayStationInfo?lang=0&stationID=${subInfo}&apiKey=${key}`)
      .catch((error) => console.log(error));
    // console.log(response.data.result)
    return response.data.result;
  },
};

export default odsayApi;