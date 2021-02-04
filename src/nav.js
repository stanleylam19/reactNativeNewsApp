import React, { Component } from 'react';
import { Image } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Home from './pages/home';
import Find from './pages/find';
import Message from './pages/message';
import Mine from './pages/mine';
import NewsDetail from './pages/newsDetail';

function BottomTab() {
    const Tab = createBottomTabNavigator();
    
    return (
        <Tab.Navigator
          initialRouteName="Home"
          tabBarOptions = {{
                activeTintColor: "#23b8ff",
                inactiveTintColor: "#999999",
          }}
        >
          <Tab.Screen 
              name="Home" 
              component={Home} 
              options={{
                  tabBarLabel: 'News',
                  tabBarIcon: ({ color, size }) => (
                    <Image
                        source={require("./icons/home.png")}
                        style={{width: size, height: size, tintColor: color}}
                      />
                  ),
                }}
              />
          <Tab.Screen 
              name="Find" 
              component={Find}
              options={{
                  tabBarLabel: 'Find',
                  tabBarIcon: ({ color, size }) => (
                    <Image
                        source={require("./icons/find.png")}
                        style={{width: size, height: size, tintColor: color}}
                      />
                  ),
                }}
          />
          <Tab.Screen 
              name="Message" 
              component={Message}
              options={{
                  tabBarLabel: 'Message',
                  tabBarIcon: ({ color, size }) => (
                    <Image
                        source={require("./icons/message.png")}
                        style={{width: size, height: size, tintColor: color}}
                      />
                  ),
                }}
          />
          <Tab.Screen 
              name="Mine" 
              component={Mine}
              options={{
                  tabBarLabel: 'Mine',
                  tabBarIcon: ({ color, size }) => (
                    <Image
                        source={require("./icons/mine.png")}
                        style={{width: size, height: size, tintColor: color}}
                      />
                  ),
                }}
          />
        </Tab.Navigator>
    );
}

function Nav() {
    const Stack = createStackNavigator();
    
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen
                    name="Tab"
                    component={ BottomTab }
                    options={{
                        headerTitle: "News"
                    }}
                />
                <Stack.Screen
                    name="NewsDetail"
                    component={ NewsDetail }
                    options={{
                        headerBackTitle: "back"
                    }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default Nav;
