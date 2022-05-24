import {
  PathInserted,
  DirectionSummaryItemTransit,
  RouteSummaryBox,
  RouteType,
  RouteSummaryInfoArea,
  DurationTime,
  ReadableDuration,
  TimeValue,
  UnitValue,
  SummaryInfo,
  StepInfoWrap,
  StepInfoList,
  StepInfoItem,
  IconWrap,
  IconArea,
  IconSpan,
  VehicleTypeArea,
  VehicleTypeLabel,
  StepInfoArea,
  StepTitleArea,
  StepTitle,
  AppendixBtnArea,
} from "./styles/PathStyles";
import busIcon from "../../assets/images/bus(16x16).png";
import subwayIcon from "../../assets/images/train(16x16).png";
import bicycleIcon from "../../assets/images/bicycle(16x16).png";
import microScooterIcon from "../../assets/images/micro-scooter(16x16).png";
import circleIcon from "../../assets/images/radio-button.png";

function PathList({ list, click }) {

  const transitCount = (item, idx) => {
    let transit = [];
    let count = item.routeSection.length;
    // console.log(item)
    
    function isTrans(i){
      let temp = "";
      let temp2 = "";
      let icon = null;
      
      if(item.routeSection[i].busNo != undefined){
        if(item.routeSection[i].busNo.length >= 2){
          for(var j=0; j<item.routeSection[i].busNo.length; j++){
            if(j==item.routeSection[i].busNo.length-1) temp += `${item.routeSection[i].busNo[j]}`
            else temp += `${item.routeSection[i].busNo[j]}, `
          }
          icon = busIcon
          return {
            temp, icon
          }

        } else {
          temp += item.routeSection[i].busNo
          icon = busIcon
          return {
            temp, icon
          }
        }
      }
      if(item.routeSection[i].subwayName != undefined){
        if(item.routeSection[i].subwayName.length >= 2){
          for(var j=0; j<item.routeSection[i].subwayName.length; j++){
            if(j==item.routeSection[i].subwayName.length-1) temp += `${item.routeSection[i].subwayName[j]}`
            else temp += `${item.routeSection[i].subwayName[j]}, `
          }
          icon = subwayIcon
          return {
            temp, icon
          }

        } else {
          temp += item.routeSection[i].subwayName
          icon = subwayIcon
          return {
            temp, icon
          }
        }
      }
      else {
        temp += "하차"
        icon = circleIcon
        return {
          temp, icon
        }
      }
    }
    
    for (let i = 1; i < count; i++) {
      transit.push(
        <StepInfoItem key={`${idx}step${i}`}>
          <IconWrap>
            <IconArea>
              <IconSpan img={isTrans(i).icon}>icon</IconSpan>
            </IconArea>
            <VehicleTypeArea>
              <VehicleTypeLabel>
                {isTrans(i).temp}
              </VehicleTypeLabel>
            </VehicleTypeArea>
          </IconWrap>
          <StepInfoArea>
            <StepTitleArea>
              <StepTitle>asd</StepTitle>
              <AppendixBtnArea>{/* 공간 채우기 */}</AppendixBtnArea>
            </StepTitleArea>
          </StepInfoArea>
        </StepInfoItem>
      );
    }
    return transit;
  };

  return (
    <>
      {list.map((item, idx) => (
        <PathInserted key={`list${idx}`}>
          <DirectionSummaryItemTransit onClick={()=>click(idx)}>
            <RouteSummaryBox>
              {idx == 0 ? (
                <RouteType>
                  {/* 최적, 최소 시간, 환승, 도보 표시 컴포넌트 */}
                  최적
                </RouteType>
              ) : null}
              <RouteSummaryInfoArea>
                <DurationTime>
                  <ReadableDuration>
                    <TimeValue>{item.totalTime}</TimeValue>
                    <UnitValue>분</UnitValue>
                  </ReadableDuration>
                  <SummaryInfo>{item.payment}원</SummaryInfo>
                </DurationTime>
              </RouteSummaryInfoArea>
            </RouteSummaryBox>
            <StepInfoWrap>
              <StepInfoList>
                {/* 리스트 */}
                {transitCount(item, idx)}
              </StepInfoList>
            </StepInfoWrap>

            {/* <button onClick={() => pathDrawing(1)}>0</button>  */}
          </DirectionSummaryItemTransit>
        </PathInserted>
      ))}
    </>
  );
}

export default PathList;
