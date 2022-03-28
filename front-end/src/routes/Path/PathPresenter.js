import { Link } from "react-router-dom";
import styled from "styled-components";
import PropTypes from "prop-types";
import Map from "../../components/Map";
import Sidebar from "../../components/Sidebar";

function PathPresenter(props) {
  
  return (
    <div className="Path">
      <Sidebar />
      {props.loading ? null : <h2>로드 중...</h2>}
      <Map />
    </div>
  );

}

PathPresenter.propTypes = {
  // ex) prop: PropTypes.type.isRequired,
  loading: PropTypes.bool.isRequired,
};

export default PathPresenter;
