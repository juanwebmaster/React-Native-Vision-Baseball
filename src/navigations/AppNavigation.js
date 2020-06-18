import React from 'react';
import {View, Text, Icon} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {createStackNavigator} from '@react-navigation/stack';
import HomeScreen from '_scenes/home';
import StatusScreen from '_scenes/status';
import LeaderBoardScreen from '_scenes/leaderboard';
import ReferralSystemScreen from '_scenes/referralsystem';
import TutorialsScreen from '_scenes/tutorials';
import MyAccountScreen from '_scenes/myaccount';
import ModifyBillingScreen from '_scenes/modifybilling';
import LogOutScreen from '_scenes/logout';
import SelectLevel from '_scenes/selectlevel/SelectLevel';
import QuizScreen from '_scenes/quiz/QuizScreen';
const Stack = createStackNavigator();
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
      <Stack.Navigator>
        <Stack.Screen name="Member Area" component={MyDrawer} />
        <Stack.Screen name="SelectLevel" component={SelectLevel} />
        <Stack.Screen
          name="QuizScreen"
          component={QuizScreen}
          
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
