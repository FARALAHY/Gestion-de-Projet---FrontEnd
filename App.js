import * as React from 'react';
import { Button, View, TouchableOpacity, StyleSheet } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { MaterialCommunityIcons, MaterialIcons, Feather } from '@expo/vector-icons';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createStackNavigator } from "@react-navigation/stack";
import { SafeAreaProvider } from 'react-native-safe-area-context';

// Importer le composant depuis le fichier .js
import ParametreScreen from './ParametreScreen';
import ProfilScreen from './ProfilScreen';
import CreeUnProjet from './CreeUnProjet';
import MembresScreen from './MembresScreen';
import MesCartesScreen from './MesCartesScreen';
import ModifierLeProfilScreen from './ModifierLeProfilScreen';
import AideScreen from './AideScreen';
import TableauxHorsLigneScreen from './TableauxHorsLigneScreen';

const Stack = createStackNavigator();
function AccueilScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.navigate('Cree un Projet')}>
        <Feather name="plus-circle" size={40} color="black" />
      </TouchableOpacity>
    </View>
  );
}

const Drawer = createDrawerNavigator();

function StackCreeUnProjet() {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="CreeUnProjet" component={CreeUnProjet} />
      <Stack.Screen name="Membres" component={MembresScreen} />
    </Stack.Navigator>
  );
}
function StackProfil() {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Profil" component={ProfilScreen} />
      <Stack.Screen name="ModifierLeProfilScreen" component={ModifierLeProfilScreen} />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <SafeAreaProvider>
    <NavigationContainer>
      
      <Drawer.Navigator initialRouteName="Accueil">
        <Drawer.Screen name="Accueil" component={AccueilScreen} options={{ drawerIcon: ({ focused, color, size }) => <MaterialCommunityIcons name={focused ? 'home' : 'home-outline'} size={size} color={color} /> }} />
        <Drawer.Screen name="Profil" component={StackProfil} options={{ drawerIcon: ({ focused, color, size }) => <MaterialCommunityIcons name={focused ? 'account-circle' : 'account-circle-outline'} size={size} color={color} /> }} />
        <Drawer.Screen name="Mes Cartes" component={MesCartesScreen} options={{ drawerIcon: ({ focused, color, size }) => <MaterialCommunityIcons name={focused ? 'cards' : 'cards-outline'} size={size} color={color} /> }} />
        <Drawer.Screen name="Tableaux hors ligne" component={TableauxHorsLigneScreen} options={{ drawerIcon: ({ focused, color, size }) => <MaterialCommunityIcons name={focused ? 'cloud-check' : 'cloud-check-outline'} size={size} color={color} /> }} />
        <Drawer.Screen name="Parametres" component={ParametreScreen} options={{ drawerIcon: ({ focused, color, size }) => <MaterialIcons name={'settings'} size={size} color={color} /> }} />
        <Drawer.Screen name="Cree un Projet" component={StackCreeUnProjet} options={{ drawerIcon: ({ focused, color, size }) => <MaterialIcons name={ 'create'} size={size} color={color} /> }} />
        <Drawer.Screen name="Aide" component={AideScreen} options={{ drawerIcon: ({ focused, color, size }) => <MaterialCommunityIcons name={focused ? 'help-circle' : 'help-circle-outline'} size={size} color={color} /> }} />
      </Drawer.Navigator>

    </NavigationContainer>
    </SafeAreaProvider>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 800,
    paddingHorizontal: 20,
    paddingLeft:420,
    backgroundColor: "#f0f0f0",
  },
},
)
