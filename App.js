/* eslint-disable import/named */
import 'react-native-gesture-handler';
import React, { useReducer, useMemo, useEffect } from 'react';
import { StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Icon } from 'react-native-elements';
import SearchScreen from './src/screens/SearchScreen';
import FavouritesScreen from './src/screens/FavouritesScreen';
import HomeStack from './src/stacks/HomeStack';
import { navigationRef } from './src/utility/RootNavigation';
import colors from './src/config/colors';
import AccountStack from './src/stacks/AccountStack';
import AuthStack from './src/stacks/AuthStack';
import {
  login,
  logout,
  getUserIdFromStorage,
  getUserInfo,
  getUserFromStore,
} from './src/utility/Authentication';
import { AuthContext } from './src/contexts/AuthContext';
import LoadingScreen from './src/screens/LoadingScreen';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const App = () => {
  const [state, dispatch] = useReducer(
    // eslint-disable-next-line consistent-return
    (prevState, action) => {
      // eslint-disable-next-line default-case
      switch (action.type) {
        case 'RESTORE_TOKEN':
          return {
            ...prevState,
            userToken: action.token,
            isLoading: false,
            user: action.user,
          };
        case 'SIGN_IN':
          return {
            ...prevState,
            isSignout: false,
            userToken: action.token,
            user: action.user,
          };
        case 'SIGN_OUT':
          return {
            ...prevState,
            isSignout: true,
            userToken: null,
            user: null,
          };
      }
    },
    {
      isLoading: true,
      isSignout: false,
      userToken: null,
      user: null,
    },
  );

  useEffect(() => {
    console.log(`APP: isLoading - ${state.isLoading}`);
    console.log(`APP: token - ${state.userToken}`);
    const bootstrapAsync = async () => {
      let userToken;
      let id;
      let currentUser;
      try {
        userToken = await AsyncStorage.getItem('@token');
        console.log(`APP: userToken - ${userToken}`);
        id = await getUserIdFromStorage();
        currentUser = await getUserInfo(id);
        console.log(
          `APP: currentUser - ${currentUser.email} - ${currentUser.user_id}`,
        );
      } catch (err) {
        console.log(`Error restoring token: ${err}`);
      }
      dispatch({
        type: 'RESTORE_TOKEN',
        token: userToken,
        user: currentUser,
      });
    };

    bootstrapAsync();
    console.log(`APP: isLoading - ${state.isLoading}`);
  }, []);

  const authContext = useMemo(
    () => ({
      signIn: async (email, password) => {
        let result = null;
        try {
          result = await login(email, password);
          const currentUser = await getUserInfo(result?.id);
          if (currentUser) {
            dispatch({
              type: 'SIGN_IN',
              token: result.token,
              user: currentUser,
            });
          }
        } catch (e) {
          console.log(`Sign in failed: ${e}`);
        }
        return result;
      },
      signOut: async () => {
        try {
          await logout();
        } catch (e) {
          console.log(`Sign out failed: ${e}`);
        }
        dispatch({ type: 'SIGN_OUT' });
      },
      getUser: async () => {
        let user = null;
        try {
          user = await getUserFromStore();
        } catch (e) {
          console.log(`getUser failed: ${e}`);
        }
        return user;
      },
    }),
    [],
  );

  if (state.isLoading) {
    return <LoadingScreen />;
  }

  return (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer style={styles.body} ref={navigationRef}>
        {state.userToken === null ? (
          <Stack.Navigator>
            <Stack.Screen
              name="Auth"
              component={AuthStack}
              options={{ headerShown: false }}
            />
          </Stack.Navigator>
        ) : (
          <Tab.Navigator
            screenOptions={({ route }) => ({
              // eslint-disable-next-line react/prop-types
              tabBarIcon: ({ color }) => {
                let iconName;

                if (route.name === 'Home') {
                  iconName = 'mug-hot';
                } else if (route.name === 'Search') {
                  iconName = 'search';
                } else if (route.name === 'Favourites') {
                  iconName = 'heart';
                } else if (route.name === 'Account') {
                  iconName = 'user';
                }

                return (
                  <Icon
                    name={iconName}
                    type="font-awesome-5"
                    color={color}
                    size={20}
                    solid
                  />
                );
              },
            })}
            tabBarOptions={{
              activeTintColor: colors.activeTab,
              inactiveTintColor: colors.inactiveTab,
              activeBackgroundColor: colors.primary,
              inactiveBackgroundColor: colors.primary,
              showLabel: false,
              labelStyle: { fontSize: 11 },
            }}
          >
            <Tab.Screen name="Home" component={HomeStack} />
            <Tab.Screen name="Search" component={SearchScreen} />
            <Tab.Screen name="Favourites" component={FavouritesScreen} />
            <Tab.Screen name="Account" component={AccountStack} />
          </Tab.Navigator>
        )}
      </NavigationContainer>
    </AuthContext.Provider>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: 'white',
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: 'white',
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: 'black',
  },
  footer: {
    color: 'grey',
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
});

export default App;
