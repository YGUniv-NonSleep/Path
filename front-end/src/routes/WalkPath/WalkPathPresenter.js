import { useEffect } from 'react';

function WalkPathPresenter(props) {
  return (
    <div>
      asdfasfasfaasdfasfasfaasdfasfasfaasdfasfasfaasdfasfasfa
      <button onClick={() => props.findPath()}>d</button>
      <div id="map_wrap" className="map_wrap3">
        <div id="map_div"></div>
      </div>
      <div className="map_act_btn_wrap clear_box"></div>
      <p id="result"></p>
    </div>
  );
}

export default WalkPathPresenter;
