import * as React from 'react'
import 'react-native-gesture-handler'
import {NavigationContainer} from "@react-navigation/native";
import {createStackNavigator} from '@react-navigation/stack';


// Screens
import OnBoarding from "./src/screens/OnBoarding/OnBoarding";

const Stack = createStackNavigator();
const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="OnBoarding" component={OnBoarding} options={{headerShown: false}}
        />

      </Stack.Navigator>
    </NavigationContainer>
  )

}
export default ()=>{
  return(
   <App/>
  )
}

