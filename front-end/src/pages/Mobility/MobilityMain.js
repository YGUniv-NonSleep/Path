import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import MapApi from "../../api/MapApi";
import Icon from "./MIcon";
import Sidebar from "../../components/Sidebar";
import Map from "../../components/Map";


function MobilityMain() {
  const [map, settingMap] = useState(null);
  const [loading, setLoading] = useState(false);

  async function mapLoad() {
    try {
      let createMap = await MapApi().createMap();
      let setController = await MapApi().setController(createMap);
      settingMap(setController);
      setLoading(true);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    mapLoad();
  }, []);

  return (
    <div className="Mobility">
      <Icon />
      <Sidebar />
      <Map />
      {loading ? <p>이동수단 화면 나왔다</p> : <h2>로드 중...</h2>}
    </div>
  );
}

MobilityMain.propTypes = {
  // ex) prop: PropTypes.type.isRequired,
  loading: PropTypes.bool.isRequired,
};

export default MobilityMain;
