import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import useLoading from '../../hooks/useLoading';
import useOderMain from './hooks/useOderMain';

const OderCon = styled.div`
    width: 390px;
    height: 100%;
`;

const OderSubCon = styled.div`
    margin-left: 130px;
`;

function OderMain() {
    const { loading } = useLoading()

    return (
        <div className="Oder">
            <OderCon>
                <OderSubCon>
                { loading ? <p>오더 화면 나왔다</p> : <h2>로드 중...</h2> }
                </OderSubCon>
            </OderCon>            
        </div>
    )
}

OderMain.propTypes = {
    // ex) prop: PropTypes.type.isRequired,
    loading: PropTypes.bool.isRequired,
};
export default OderMain;
