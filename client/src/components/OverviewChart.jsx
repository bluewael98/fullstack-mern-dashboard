import React, { useMemo } from 'react';
import { ResponsiveLine } from '@nivo/line';
import { useTheme } from '@mui/material';
import { useGetSalesQuery } from 'state/api';


const OverviewChart = ({ isDashboard = false, view}) => {
  const theme = useTheme();
  const { data, isLoading } = useGetSalesQuery();

  const [ totalSalesLine, totalUnitsLine ] = useMemo(() => { // use memo prevents re rendering of data uneless data changes
    if (!data) return [];

    const { monthlyData } = data; // destructure monthly data from the data in the useGetSalesQuery
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

    Object.values(monthlyData).reduce(                           // iterate over monthlyData by using an accumulator to sum the total sales and total units 
      (acc, { month, totalSales, totalUnits }) => {              // destructure totalSales & totalUnits from monthlyData
        const curSales= acc.sales + totalSales;                  // use the acc to sum the total sales from the value passed in second argument(sales: 0)
        const curUnits = acc.units + totalUnits;                 // ditto
 
        totalSalesLine.data = [
          ...totalSalesLine.data,                               // spread operator used to keep elements of original array, plus the new elements: x:/y: which will be used for line chart
          { x: month, y:curSales }
        ];
        totalUnitsLine.data = [
          ...totalUnitsLine.data,                              // spread operator used to keep elements of original array, plus the new elements: x:/y: which will be used for line chart
          { x: month, y:curUnits }
        ]

        return { sales: curSales, units: curUnits };
      },
      { sales: 0, units: 0 }
    );

    return [[totalSalesLine], [totalUnitsLine]]

  },  [data]);                                                  // eslint-disable-line react-hooks/exhaustive-deps

  if (!data || isLoading ) return "Loading...";
  return (
    <ResponsiveLine
    data={view === "sales" ? totalSalesLine : totalUnitsLine}
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
    margin={{ top: 20, right: 50, bottom: 50, left: 70 }}
    xScale={{ type: 'point' }}
    yScale={{
        type: 'linear',
        min: 'auto',
        max: 'auto',
        stacked: false, // set to false to prevent two different lines stacking
        reverse: false
    }}
    yFormat=" >-.2f"
    curve="catmullRom"
    enableArea={isDashboard}
    axisTop={null}
    axisRight={null}
    axisBottom={{
        format: (v) => {
          if(isDashboard) return v.slice(0,3); // if on dashboard page, its too long, so cut to 3 values 
          return v;
        },
        orient: 'bottom',
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: isDashboard ? "" : "Month", // if on dashboard we want no legend, otherwise we want the month
        legendOffset: 36,
        legendPosition: 'middle'
    }}
    axisLeft={{
        orient: 'left',
        tickValues: 5,
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: isDashboard ? "" : `Total ${view === "sales" ? "Revenue" : "Units"} for Year`,
        legendOffset: -60,
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
    legends={
      !isDashboard ? [
        {
            anchor: 'bottom-right',
            direction: 'column',
            justify: false,
            translateX: 30,
            translateY: -40,
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
                    }
                }
            ]
        }
    ] : undefined}
/>
  )
}

export default OverviewChart