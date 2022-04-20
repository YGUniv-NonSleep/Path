import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

function CarPoolMain() {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading((current) => !current);
  }, []);
  
  return (
    <div className="CarPool">
      {loading ? <p>카풀 화면 나왔다</p> : <h2>로드 중...</h2>}
    </div>
  );
}

CarPoolMain.propTypes = {
  // ex) prop: PropTypes.type.isRequired,
  loading: PropTypes.bool.isRequired,
};

export default CarPoolMain;
