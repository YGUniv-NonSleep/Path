import axios from "axios";

const odsayApi = axios.create({
  baseURL: `https://api.odsay.com/v1/api`,
});

const key = process.env.REACT_APP_ODSAY_API;

export const PathApi = {
  getTransPath: async (data) => {
    const response = await axios
      .get(
        process.env.REACT_APP_SPRING_API + '/odsay/path',
        { params: data },
        { withCredentials: true }
      )
      .catch((err) => console.log(err));
    // console.log(response)
    return response.data;
  },
};

export const MobilityApi = {
  getBusId: async (data) => { // console.log(data)
    const response = await odsayApi.get(
      `/searchBusLane?lang=0&busNo=${data}&CID=4000&apiKey=${key}`,
    ).catch((error) => console.log(error));
    // console.log(response.data.result.lane[0].busID);
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


export const SubwayApi = {
  getSubName: async (data) => { // console.log(data)
    const response = await odsayApi.get(
      `/searchStation?lang=0&stationName=${data}&CID=4000&stationClass=2&apiKey=${key}`
    ).catch((error) => console.log(error));
    //console.log(response.data.result.station[0].stationID);
    return response.data.result.station[0];
  },
};

export const SubwayTime = {
  getSubTime: async(subTime) => {
    const response = await odsayApi.get(
      `/subwayTimeTable?lang=0&stationID=${subTime}&apiKey=${key}`
    ).catch((error) => console.log(error));
    // console.log(response.data.result);
    return response.data.result;
  },
}

export default odsayApi;