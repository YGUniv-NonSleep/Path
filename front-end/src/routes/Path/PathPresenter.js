import { useState } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import styled from "styled-components";
import Map from "../../components/Map";

function PathPresenter(props) {
  
  return (
    <div className="Path">
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
