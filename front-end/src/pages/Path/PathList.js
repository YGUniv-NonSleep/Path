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
} from './styles/PathStyles';
import busIcon from '../../assets/images/bus(16x16).png';
import subwayIcon from '../../assets/images/train(16x16).png';
import bicycleIcon from '../../assets/images/bicycle(16x16).png';
import microScooterIcon from '../../assets/images/micro-scooter(16x16).png';
import ElectricScooterIcon from '@mui/icons-material/ElectricScooter';
import DirectionsWalkIcon from '@mui/icons-material/DirectionsWalk';
import circleIcon from '../../assets/images/radio-button.png';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
  SvgIcon,
} from '@mui/material';

function PathList({ list, click, handleMobilOpen, way }) {
  const transitSection = (item, idx) => {
    let transit = [];
    let section = item.routeSection.length;
    let stationNames = undefined;
    if (item.stationNames !== undefined) stationNames = item.stationNames;
    let count = 0; // 정류장, 지하철역 넣기 위한 count

    function isTrans(i) {
      let transitLabel = ''; // 버스, 지하철 번호 출력
      let station = ''; // 정류장, 지하철역 출력
      let icon = null; // 아이콘 출력
      let fontColor = '#484848';

      // 버스
      if (item.routeSection[i].busNo != undefined) {
        // 대체 버스 수가 2대 이상일 때
        if (item.routeSection[i].busNo.length >= 2) {
          for (var j = 0; j < item.routeSection[i].busNo.length; j++) {
            if (j == item.routeSection[i].busNo.length - 1)
              transitLabel += `${item.routeSection[i].busNo[j]}`;
            else transitLabel += `${item.routeSection[i].busNo[j]}, `;
          }
          icon = busIcon;
          fontColor = '#356de9';
          station = stationNames[count][0];

          return {
            transitLabel,
            station,
            icon,
            fontColor,
          };
        } else {
          transitLabel += item.routeSection[i].busNo;
          icon = busIcon;
          fontColor = '#356de9';
          station = stationNames[count][0];

          return {
            transitLabel,
            station,
            icon,
            fontColor,
          };
        }
      }

      // 지하철
      if (item.routeSection[i].subwayName != undefined) {
        // 대체 지하철 수가 2대 이상일 때
        if (item.routeSection[i].subwayName.length >= 2) {
          for (var j = 0; j < item.routeSection[i].subwayName.length; j++) {
            if (j == item.routeSection[i].subwayName.length - 1)
              transitLabel += `${item.routeSection[i].subwayName[j]}`;
            else transitLabel += `${item.routeSection[i].subwayName[j]}, `;
          }
          icon = subwayIcon;
          fontColor = '#f37229';
          station = stationNames[count][0];
          if (station.includes('역')) undefined;
          else station = `${station}역`;

          return {
            transitLabel,
            station,
            icon,
            fontColor,
          };
        } else {
          transitLabel += item.routeSection[i].subwayName;
          icon = subwayIcon;
          fontColor = '#f37229';
          station = stationNames[count][0];
          if (station.includes('역')) undefined;
          else station = `${station}역`;

          return {
            transitLabel,
            station,
            icon,
            fontColor,
          };
        }
      } else {
        transitLabel += '하차';
        icon = circleIcon;
        let k = stationNames[count].length;
        station = stationNames[count][k - 1];
        if (station.includes('역')) undefined;
        else station = `${station}역`;
        count++;

        return {
          transitLabel,
          station,
          icon,
          fontColor,
        };
      }
    }

    for (let i = 1; i < section; i++) {
      let isTransit = isTrans(i);

      transit.push(
        <StepInfoItem key={`${idx}step${i}`}>
          <IconWrap>
            <IconArea>
              <IconSpan img={isTransit.icon}>icon</IconSpan>
            </IconArea>
            <VehicleTypeArea>
              <VehicleTypeLabel fontColor={isTransit.fontColor}>
                {isTransit.transitLabel}
              </VehicleTypeLabel>
            </VehicleTypeArea>
          </IconWrap>
          <StepInfoArea>
            <StepTitleArea>
              <StepTitle>{isTransit.station}</StepTitle>
              <AppendixBtnArea>{/* 공간 채우기 */}</AppendixBtnArea>
            </StepTitleArea>
          </StepInfoArea>
        </StepInfoItem>
      );
    }
    return transit;
  };

  const MobilityInfo = () => {
    let placeName = new Array();
    if (way.length > 0) {
      for (let i = 0; i < way.length; i++) {
        placeName.push(way[i].place_name);
      }
    } else {
      placeName = [];
    }
    return (
      <>
        <StepInfoItem key="0">
          <IconWrap>
            <IconArea>
              <DirectionsWalkIcon color="action"></DirectionsWalkIcon>
            </IconArea>
            <VehicleTypeArea>
              <VehicleTypeLabel fontColor="#484848">도보</VehicleTypeLabel>
            </VehicleTypeArea>
          </IconWrap>
          <StepInfoArea>
            <StepTitleArea>
              <StepTitle>{placeName[0]}</StepTitle>
              <AppendixBtnArea>{/* 공간 채우기 */}</AppendixBtnArea>
            </StepTitleArea>
          </StepInfoArea>
        </StepInfoItem>
        {list[0].mobility !== undefined ? (
          <StepInfoItem key="1">
            <IconWrap>
              <IconArea>
                <ElectricScooterIcon color="primary"></ElectricScooterIcon>
              </IconArea>
              <VehicleTypeArea>
                <VehicleTypeLabel fontColor="#356de9">
                  {list[0].mobility.type === 'KICKBOARD' ? '킥보드' : '자전거'}
                </VehicleTypeLabel>
              </VehicleTypeArea>
            </IconWrap>
            <StepInfoArea>
              <StepTitleArea>
                <StepTitle>퍼스널 모빌리티 탑승</StepTitle>
                <AppendixBtnArea>{/* 공간 채우기 */}</AppendixBtnArea>
              </StepTitleArea>
            </StepInfoArea>
          </StepInfoItem>
        ) : (
          <></>
        )}
        <StepInfoItem key="2">
          <IconWrap>
            <IconArea>
              <IconSpan img={circleIcon}>icon</IconSpan>
            </IconArea>
            <VehicleTypeArea>
              <VehicleTypeLabel fontColor="#484848">도착</VehicleTypeLabel>
            </VehicleTypeArea>
          </IconWrap>
          <StepInfoArea>
            <StepTitleArea>
              <StepTitle>&nbsp;&nbsp;{placeName[1]}</StepTitle>
              <AppendixBtnArea>{/* 공간 채우기 */}</AppendixBtnArea>
            </StepTitleArea>
          </StepInfoArea>
        </StepInfoItem>
      </>
    );
  };

  return (
    <>
      {list.map((item, idx) => (
        <PathInserted key={`list${idx}`}>
          <DirectionSummaryItemTransit onClick={() => click(idx)}>
            <RouteSummaryBox>
              {idx === 0 ? (
                <RouteType>
                  {/* 최적, 최소 시간, 환승, 도보 표시 컴포넌트 */}
                  최적
                </RouteType>
              ) : null}
              <RouteSummaryInfoArea>
                <DurationTime>
                  <ReadableDuration>
                    <TimeValue>
                      {item.totalTime === undefined
                        ? parseInt(item.features[0].properties.totalTime / 60)
                        : item.totalTime}
                    </TimeValue>
                    <UnitValue>분</UnitValue>
                  </ReadableDuration>
                  <SummaryInfo>
                    {item.payment === undefined ? 0 : item.payment}원
                  </SummaryInfo>
                  {item.mobility === undefined &&
                  item.features === undefined ? (
                    <span style={{ marginLeft: '15px' }}>
                      <Button onClick={() => handleMobilOpen('first')}>
                        퍼스널 모빌리티 타기
                      </Button>
                    </span>
                  ) : (
                    <></>
                  )}
                </DurationTime>
              </RouteSummaryInfoArea>
            </RouteSummaryBox>
            <StepInfoWrap>
              <StepInfoList>
                {item.mobility === undefined && item.features === undefined ? (
                  <>{transitSection(item, idx)}</>
                ) : (
                  <MobilityInfo></MobilityInfo>
                )}
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
