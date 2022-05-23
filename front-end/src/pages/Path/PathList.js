import React from "react";
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

function PathList({ list }) {
  const transitCount = (item, idx) => {
    let temp = [];
    let count = item.busTransitCount + item.subwayTransitCount;
    // item.startStation, item.endStation
    console.log(item.startStation)
    console.log(item.routeSection)
    for (let i = 0; i <= count; i++) {
      temp.push(
        <StepInfoItem key={`${idx}step${i}`}>
          <IconWrap>
            <IconArea>
              <IconSpan>icon</IconSpan>
            </IconArea>
            <VehicleTypeArea>
              <VehicleTypeLabel>번호들</VehicleTypeLabel>
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
    return temp;
  };

  return (
    <>
      {list.map((item, idx) => (
        <PathInserted key={`list${idx}`}>
          <DirectionSummaryItemTransit>
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
