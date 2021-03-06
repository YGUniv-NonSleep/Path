import axios from 'axios';

export const TmapApi = {
  getPedestrianPath: async (startX, startY, endX, endY) => {
    try {
      const result = await axios.post(
        'https://apis.openapi.sk.com/tmap/routes/pedestrian?version=1&appKey=' +
          process.env.REACT_APP_TMAP_API,
        {
          startX: startX,
          startY: startY,
          endX: endX,
          endY: endY,
          reqCoordType: 'WGS84GEO', // 기본값 좌표계 유형
          resCoordType: 'WGS84GEO', // 받고자 하는 응답 좌표계 유형, EPSG3857, WGS84GEO, KATECH
          startName: '출발지', // 출발지 명칭
          endName: '도착지', // 목적지 명칭
        }
      );
      return result.data;
    } catch (err) {
      const error = err.response.data.error;
      console.log(
        'code : ' +
          error.code +
          '\n' +
          'id : ' +
          error.id +
          '\n' +
          'message : ' +
          error.message
      );
      return error;
    }
  },

  getMobilityPath: async (sx, sy, ex, ey, mobilId) => {
    const data = { sx: sx, sy: sy, ex: ex, ey: ey, mobilityId: mobilId };

    const result = await axios.get(
      process.env.REACT_APP_SPRING_API + '/tmap/path/mobility',
      {
        params: data,
        withCredencials: true,
      }
    );
    return result.data;
  },

  getWalkPath: async (sx, sy, ex, ey, speed) => {
    const data = { sx: sx, sy: sy, ex: ex, ey: ey, speed: speed };
    const result = await axios.get(
      process.env.REACT_APP_SPRING_API + '/tmap/path',
      { params: data, withCredencials: true }
    );
    return result.data;
  },
};
