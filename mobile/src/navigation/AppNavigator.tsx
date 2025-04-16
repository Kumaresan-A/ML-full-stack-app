import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';

import HomeScreen from '../screens/HomeScreen';
import MovieDetailScreen from '../screens/MovieDetailScreen';
import CategoryMoviesScreen from '../screens/CategoryMoviesScreen';
import RecommendationsScreen from '../screens/RecommendationsScreen';
import ProfileScreen from '../screens/ProfileScreen';

import { RootStackParamList } from '../types';

const Stack = createStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator();

const HomeStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen 
        name="Home" 
        component={HomeScreen} 
        options={{ title: 'Movies' }}
      />
      <Stack.Screen 
        name="MovieDetail" 
        component={MovieDetailScreen} 
        options={{ title: 'Movie Details' }}
      />
      <Stack.Screen 
        name="CategoryMovies" 
        component={CategoryMoviesScreen} 
        options={({ route }) => ({ title: route.params.categoryName })}
      />
    </Stack.Navigator>
  );
};

const RecommendationsStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen 
        name="Recommendations" 
        component={RecommendationsScreen} 
        options={{ title: 'For You' }}
      />
    </Stack.Navigator>
  );
};

const ProfileStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen 
        name="Profile" 
        component={ProfileScreen} 
        options={{ title: 'My Profile' }}
      />
    </Stack.Navigator>
  );
};

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'HomeTab') {
              iconName = focused ? 'home' : 'home-outline';
            } else if (route.name === 'RecommendationsTab') {
              iconName = focused ? 'star' : 'star-outline';
            } else if (route.name === 'ProfileTab') {
              iconName = focused ? 'person' : 'person-outline';
            }

            return <Ionicons name={iconName as any} size={size} color={color} />;
          },
          tabBarActiveTintColor: '#3b82f6',
          tabBarInactiveTintColor: 'gray',
        })}
      >
        <Tab.Screen 
          name="HomeTab" 
          component={HomeStack} 
          options={{ headerShown: false, title: 'Home' }}
        />
        <Tab.Screen 
          name="RecommendationsTab" 
          component={RecommendationsStack} 
          options={{ headerShown: false, title: 'For You' }}
        />
        <Tab.Screen 
          name="ProfileTab" 
          component={ProfileStack} 
          options={{ headerShown: false, title: 'Profile' }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator; 