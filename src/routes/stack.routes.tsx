import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from '../screens/Home';
import CarDetails from '../screens/CarDetails';
import Scheduling from '../screens/Scheduling';
import SchedulingComplete from '../screens/SchedulingComplete';
import SchedulingDetails from '../screens/SchedulingDetails';

interface Props {}

const { Navigator, Screen } = createNativeStackNavigator();

const StackRoutes = (props: Props) => {
  return (
    <Navigator screenOptions={{ headerShown: false }}>
      <Screen name="Home" component={Home} />
      <Screen name="CarDetails" component={CarDetails} />
      <Screen name="Scheduling" component={Scheduling} />
      <Screen name="SchedulingComplete" component={SchedulingComplete} />
      <Screen name="SchedulingDetails" component={SchedulingDetails} />
    </Navigator>
  );
};

export default StackRoutes;
