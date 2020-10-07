import React from 'react';
import {View, Dimensions} from 'react-native';
import {Text, Chip} from 'react-native-paper';

// Import chart
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart,
} from 'react-native-chart-kit';

// Dimension windows
const screenWidth = Dimensions.get('window').width;

// Chart config
const chartConfig = {
  backgroundGradientFrom: '#1E2923',
  backgroundGradientFromOpacity: 0,
  backgroundGradientTo: '#08130D',
  backgroundGradientToOpacity: 0.5,
  color: (opacity = 1) => `rgba(179, 136, 255, ${opacity})`,
  strokeWidth: 2, // optional, default 3
  barPercentage: 0.5,
  useShadowColorFromDataset: false, // optional
};

const CustomChip = (props) => {
  return (
    <Chip
      icon={props.icon}
      mode="contained"
      style={{borderRadius: 40, alignSelf: 'flex-start', marginRight: 8}}
      {...props}>
      {props.label}
    </Chip>
  );
};

const DataAnalysis = () => {
  const data = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June'],
    datasets: [
      {
        data: [20, 45, 28, 80, 99, 43],
        strokeWidth: 2, // optional
      },
    ],
  };
  return (
    <LineChart
      data={data}
      width={screenWidth-60}
      height={220}
      chartConfig={chartConfig}
    />
  );
};

export default function AnalysisScreen() {
  return (
    <View style={{paddingHorizontal: 30, paddingTop: 30}}>
      <Text style={{fontSize: 23}}>Analysis</Text>
      <View
        style={{
          paddingVertical: 15,
          flexDirection: 'row',
        }}>
        <CustomChip icon="database" label={`rn-wicket`} />
        <CustomChip icon="view-list" label="door/data" />
      </View>
      <View style={{paddingVertical: 20}}>
        <DataAnalysis />
      </View>
    </View>
  );
}
