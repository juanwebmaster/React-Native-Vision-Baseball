import React from 'react';
import { View, Text } from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import HomeScreen from '_scenes/home';
import StatusScreen from '_scenes/status';
import LeaderBoardScreen from '_scenes/leaderboard';
import ReferralSystemScreen from '_scenes/referralsystem';
import TutorialsScreen from '_scenes/tutorials';
import MyAccountScreen from '_scenes/myaccount';
import ModifyBillingScreen from '_scenes/modifybilling';
import LogOutScreen from '_scenes/logout';


const Drawer = createDrawerNavigator();
function MyDrawer() {
  return (
    <Drawer.Navigator initialRouteName="HomeScreen">
      <Drawer.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{drawerLabel: 'Home'}}
      />

      <Drawer.Screen
        name="YourStatus"
        component={StatusScreen}
        options={{drawerLabel: 'Your Status'}}
      />
      <Drawer.Screen
        name="LeaderBoard"
        component={LeaderBoardScreen}
        options={{drawerLabel: 'LeaderBoard'}}
      />
      <Drawer.Screen
        name="ReferralSystem"
        component={ReferralSystemScreen}
        options={{drawerLabel: 'Referral System'}}
      />
      <Drawer.Screen
        name="Tutorials"
        component={TutorialsScreen}
        options={{drawerLabel: 'Tutorials'}}
      />
      <Drawer.Screen
        name="MyAccount"
        component={MyAccountScreen}
        options={{drawerLabel: 'MyAccount'}}
      />
      <Drawer.Screen
        name="ModifyBilling"
        component={ModifyBillingScreen}
        options={{drawerLabel: 'ModifyBilling'}}
      />
      <Drawer.Screen
        name="LogOut"
        component={LogOutScreen}
        options={{drawerLabel: 'LogOut'}}
      />
    </Drawer.Navigator>
  );
}

export default AppNavigation = () => {
  return (
    <NavigationContainer>
      <MyDrawer />
    </NavigationContainer>
  );
};