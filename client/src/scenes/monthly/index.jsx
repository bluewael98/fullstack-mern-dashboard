import React, { useMemo } from 'react';
import { Box, useTheme } from "@mui/material";
import Header from 'components/Header';
import { ResponsiveLine } from '@nivo/line';
import { useGetSalesQuery } from 'state/api';


const Monthly = () => {
  const { data } = useGetSalesQuery();
  const theme = useTheme();

  const [formattedData] = useMemo(() => {
    if (!data) return [];

    const { monthlyData } = data; // destructure daily data from the data in the useGetSalesQuery

    const totalSalesLine = { // object created for line chart data for nivo format
      id: "totalSales", 
      color: theme.palette.secondary.main,
      data: [],
    };

    const totalUnitsLine = { // object created for line chart data for nivo format
      id: "totalUnits",
      color: theme.palette.secondary[600],
      data: [],
    };

    Object.values(monthlyData).forEach(({ month, totalSales, totalUnits }) => {

      totalSalesLine.data = [
        ...totalSalesLine.data,                               // spread operator used to keep elements of original array, plus the new elements: x:/y: which will be used for line chart
        { x: month, y:totalSales }
      ];
      totalUnitsLine.data = [
        ...totalUnitsLine.data,                              // spread operator used to keep elements of original array, plus the new elements: x:/y: which will be used for line chart
        { x: month, y: totalUnits }
      ];
    } );

    const formattedData = [totalSalesLine, totalUnitsLine];
    return [formattedData]; // return formatted data for use in the chart

  }, [data]);     //eslint-disable-line react-hooks/exhaustive-deps        

    return (
    <Box m="1.5rem 2.5rem">
      <Header title="MONTHLY SALES" subtitle="Chart of monthly sales" />
      <Box height="75vh">
    
        {data ? (
          <ResponsiveLine
          data={formattedData}
          theme={{
            axis: {
              domain: {
                line: {
                  stroke: theme.palette.secondary[200]
                }
              },
              legend: {
                text: {
                  fill: theme.palette.secondary[200]
                }
              },
              ticks: {
                line:{
                  stroke: theme.palette.secondary[200],
                  strokeWidth: 1,
                },
                text: {
                  fill: theme.palette.secondary[200]
                }
              }
            },
            legends: {
              text: {
                fill: theme.palette.secondary[200]
              }
            },
            tooltip: {
              container: {
                color: theme.palette.primary.main,
              }
            }
          }}
          colors={{ datum: "color"}}
          margin={{ top: 50, right: 50, bottom: 70, left: 60 }}
          xScale={{ type: 'point' }}
          yScale={{
              type: 'linear',
              min: 'auto',
              max: 'auto',
              stacked: false, // set to false to prevent two different lines stacking
              reverse: false
          }}
          yFormat=" >-.2f"
          //curve="catmullRom"
          axisTop={null}
          axisRight={null}
          axisBottom={{
              orient: 'bottom',
              tickSize: 5,
              tickPadding: 5,
              tickRotation: 90,
              legend: "Month",
              legendOffset: 60,
              legendPosition: 'middle'
          }}
          axisLeft={{
              orient: 'left',
              tickSize: 5,
              tickPadding: 5,
              tickRotation: 0,
              legend: "Total",
              legendOffset: -50,
              legendPosition: 'middle'
          }}
          enableGridX={false}
          enableGridY={false}
          pointSize={10}
          pointColor={{ theme: 'background' }}
          pointBorderWidth={2}
          pointBorderColor={{ from: 'serieColor' }}
          pointLabelYOffset={-12}
          useMesh={true}
          legends={[
            {      
                  anchor: 'top-right',
                  direction: 'column',
                  justify: false,
                  translateX: 50,
                  translateY: 0,
                  itemsSpacing: 0,
                  itemDirection: 'left-to-right',
                  itemWidth: 80,
                  itemHeight: 20,
                  itemOpacity: 0.75,
                  symbolSize: 12,
                  symbolShape: 'circle',
                  symbolBorderColor: 'rgba(0, 0, 0, .5)',
                  effects: [
                      {
                          on: 'hover',
                          style: {
                              itemBackground: 'rgba(0, 0, 0, .03)',
                              itemOpacity: 1
                          },
                      },
                  ],
              },
            ]}
          />
          ) : (
         <>Loading...</> 
      )}
      </Box>
    </Box>
);
};

export default Monthly;