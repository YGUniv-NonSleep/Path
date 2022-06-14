import axios from "axios";
import { useEffect, useState } from "react";
import MapApi from "../../../api/MapApi";
import { PathApi } from "../../../api/OdsayApi";
import { TmapApi } from "../../../api/TmapApi";

function useOderMain() {
  const [map, settingMap] = useState(null);

  async function mapLoad() {
    try {
      console.log("asasd");
      let createMap = await MapApi().createMap();
      let setController = await MapApi().setController(createMap);
      settingMap(setController);
      console.log("das");
    } catch (error) {
      console.log(error);
    }
  }

  // 처음 접속시 세팅 Effect Hook
  useEffect(() => {
    if (map == null) {
      mapLoad();
    }
  }, []);

  useEffect(() => {
    console.log("kldassadljk");
  }, []);

  return {
    map,
    mapLoad,
  };
}

export default useOderMain;
