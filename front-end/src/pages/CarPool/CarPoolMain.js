import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import styled from "styled-components";

const CommuCon = styled.div`
  width: 390px;
  height: 100%;
`;

const CommuSubCon = styled.div`
  margin-left: 130px;
`;

function CarPoolMain() {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
  }, []);

  return (
    <div className="CarPool">
      <CommuCon>
        <CommuSubCon className="carPoolPresenter">
          {loading ? <h2>카풀 서비스</h2> : <h2>로드 중...</h2>}
          <button>서울</button>
          <button>서울</button>
          <button>서울</button>
          <button>서울</button>
          <button>서울</button>
          <button>서울</button>
          <button>서울</button>
          <button>서울</button>
          <button>서울</button>
          <button>
            <Link to={{ pathname: "/carpool/add" }}>등록하기</Link>
          </button>
        </CommuSubCon>
      </CommuCon>
    </div>
  );
}

CarPoolMain.propTypes = {
  // ex) prop: PropTypes.type.isRequired,
  loading: PropTypes.bool.isRequired,
};

export default CarPoolMain;
