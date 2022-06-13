import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Label,
  ResponsiveContainer,
  Tooltip,
  CartesianGrid,
} from 'recharts';
import Title from './Title';

// Generate Sales Data
function createData(time, 금액) {
  return { time, 금액 };
}

export default function Chart({ amountByDay }) {
  const theme = useTheme();
  let data = [];
  amountByDay.map((pay) => {
    data.push(createData(`${pay.payDate.slice(8, 10)}일`, pay.payPrice));
  });

  return (
    <React.Fragment>
      <Title>{new Date().getMonth() + 1}월 이용금액</Title>
      <ResponsiveContainer>
        <LineChart
          data={data}
          margin={{
            top: 16,
            right: 16,
            bottom: 0,
            left: 24,
          }}
        >
          <XAxis
            dataKey="time"
            stroke={theme.palette.text.secondary}
            style={theme.typography.body2}
          />
          <YAxis
            stroke={theme.palette.text.secondary}
            style={theme.typography.body2}
          >
            <Label
              angle={270}
              position="left"
              style={{
                textAnchor: 'middle',
                fill: theme.palette.text.primary,
                ...theme.typography.body1,
              }}
            >
              원 (₩)
            </Label>
          </YAxis>
          <Line
            isAnimationActive={true}
            type="monotone"
            dataKey="금액"
            stroke={theme.palette.primary.main}
            dot={true}
          />
          <Tooltip />
        </LineChart>
      </ResponsiveContainer>
    </React.Fragment>
  );
}
