import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, TextInput, SafeAreaView, Button } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import coca from './img/coca.png';
import mc from './img/mc.png';
import lanche1 from './img/lanche1.png';
import lanche2 from './img/lanche2.png';
import lanche3 from './img/lanche3.png';
import lanche4 from './img/lanche4.png';
import Login from './login';

import Cadastrar from './src/components/Cadastrar/cadastrar';
import Api from './src/Api/App';


const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  stilo: {
    backgroundColor: '#ffffff'
  },
  input: {
    justifyContent: 'top',
    alignItems: 'left',
    backgroundColor: '#ffffff',
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 10,
  },
  textInputStyle: {
    backgroundColor: '#F5F5F5',
    padding: 16,
  },
  tituloView: {
    justifyContent: 'top',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    paddingTop: 10
  },
  tituloText: {
    fontSize: 30,
    fontWeight: 'bold',
    backgroundColor: '#ffffff',
  },
  botao: {
    justifyContent: 'top',
    justifyContent: 'center',
    paddingTop: 10,
    backgroundColor: '#ffffff',
    paddingLeft: 20,
    paddingRight: 20
  },
  lanche: {
    justifyContent: 'top',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 10,
    key: 2
  }

});

const Drawer = createDrawerNavigator();

export default function Menu() {
  return (
    <NavigationContainer>
      <Drawer.Navigator
        initialRouteName="App"
        drawerStyle={{
          backgroundColor: "black",
          paddingVertical: 20
        }}
        drawerContentOptions={{
          activeBackgroundColor: "black",
          inactiveTintColor: "red"
        }}>

        <Drawer.Screen
          name="McBurguer Coca"
          component={App}
          options={
            {
              drawerLabel: (({ focused }) => <Text style={{ color: focused ? '#313131' : 'black' }}>Home</Text>),
              drawerIcon: (({ focused }) => <Icon color={focused ? '#313131' : 'black'} name="home" />)
            }
          }
        />
        <Drawer.Screen
          name="Produtos"
          component={AppTwo}
          options={
            {
              drawerLabel: (({ focused }) => <Text style={{ color: focused ? '#313131' : 'black' }}>Produtos</Text>),
              drawerIcon: (({ focused }) => <Icon color={focused ? '#313131' : 'black'} name="shopping-basket" />)
            }
          }

        />
        <Drawer.Screen
          name="Entrar"
          component={Appthree}
          options={
            {
              drawerLabel: (({ focused }) => <Text style={{ color: focused ? '#313131' : 'black' }}>Entrar</Text>),
              drawerIcon: (({ focused }) => <Icon color={focused ? '#313131' : 'black'} name="account-circle" />)
            }
          }
        />
      </Drawer.Navigator>
    </NavigationContainer>
  )
}

function App() {
  return (
    <View>
      <View>
        <Image source={mc} style={{ width: 412, height: 250 }} />
      </View>

      <View>
        <Image source={coca} style={{ width: 412, height: 145 }} />
      </View>
    </View>
  );
}

function AppTwo() {
  return (

    <SafeAreaView>
      <View style={styles.tituloView}>
        <Text style={styles.tituloText}>Produtos</Text>
      </View>
      <View style={styles.lanche}>
        <Image source={lanche1} style={{ width: 212, height: 150 }} />
      </View>
      <View style={styles.lanche}>
        <Image source={lanche2} style={{ width: 212, height: 150 }} />
      </View>
      <View style={styles.lanche}>
        <Image source={lanche3} style={{ width: 212, height: 150 }} />
      </View>
      <View style={styles.lanche}>
        <Image source={lanche4} style={{ width: 212, height: 150 }} />
      </View>
    </SafeAreaView>

  );
}

function Home() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>

    </View>

  );
}

function Produtos() {
  return <Cadastrar />
}

function Listar() {
  return <Api />
}

function Contato() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>

    </View>
  );
}

function Appthree() {
  const [user, setUser] = useState(null);
  const Tab = createBottomTabNavigator();
  if (!user) {
    return <Login changeStatus={(user) => setUser(user)} />
  }

  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        tabBarActiveTintColor: '#e91e63',
      }}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Listar"
        component={Listar}
        options={{
          tabBarLabel: 'Listar',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="clipboard-list-outline" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Produtos"
        component={Produtos}
        options={{
          tabBarLabel: 'Produtos',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="chess-bishop" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Contato"
        component={Contato}
        options={{
          tabBarLabel: 'Contato',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="contacts-outline" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}