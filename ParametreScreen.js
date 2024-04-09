import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Image, Switch, TouchableOpacity, ScrollView, useColorScheme } from 'react-native';
import { Picker } from '@react-native-picker/picker'; 
import { useNavigation } from '@react-navigation/native';

const ParametreScreen = () => {
  const navigation = useNavigation();
  const colorScheme = useColorScheme();

  const userData = {
    name: 'John Doe',
    email: 'johndoe@example.com',
    profilePicture: 'https://placeimg.com/150/150/people',
  };

  const [accountSettings, setAccountSettings] = useState({
    language: 'Français',
    notifications: true,
  });

  const [cardSettings, setCardSettings] = useState({
    defaultCardSize: 'Normal',
    showDescriptions: true,
    collaboration: 'Tous',
  });

  const [notificationSettings, setNotificationSettings] = useState({
    channels: ['Email'],
    newCards: true,
    listChanges: true,
  });

  const handleSaveAccountSettings = () => {
    console.log('Paramètres du compte enregistrés');
  };

  const handleSaveCardSettings = () => {
    console.log('Paramètres des cartes enregistrés');
  };

  const handleSaveNotificationSettings = () => {
    console.log('Paramètres de notification enregistrés');
  };

  return (
    <ScrollView style={[styles.container, { backgroundColor: colorScheme === 'dark' ? '#000' : '#f0f0f0' }]}>
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colorScheme === 'dark' ? '#fff' : '#333333' }]}>Paramètres du compte</Text>
        <View style={styles.row}>
          <Text style={[styles.label, { color: colorScheme === 'dark' ? '#fff' : '#333333' }]}>Nom</Text>
          <TextInput style={[styles.input, { color: colorScheme === 'dark' ? '#fff' : '#333333' }]} value={userData.name} onChangeText={(text) => {}} />
        </View>
        <View style={styles.row}>
          <Text style={[styles.label, { color: colorScheme === 'dark' ? '#fff' : '#333333' }]}>Email</Text>
          <TextInput style={[styles.input, { color: colorScheme === 'dark' ? '#fff' : '#333333' }]} value={userData.email} onChangeText={(text) => {}} />
        </View>
        <TouchableOpacity onPress={() => {}}>
          <Image source={{ uri: userData.profilePicture }} style={styles.profilePicture} />
        </TouchableOpacity>
        <View style={styles.row}>
          <Text style={[styles.label, { color: colorScheme === 'dark' ? '#fff' : '#333333' }]}>Notifications</Text>
          <Switch
            value={accountSettings.notifications}
            onValueChange={(value) => setAccountSettings({ ...accountSettings, notifications: value })}
            style={styles.switch}
          />
        </View>
      </View>

      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colorScheme === 'dark' ? '#fff' : '#333333' }]}>Paramètres des cartes</Text>
        <View style={styles.row}>
          <Text style={[styles.label, { color: colorScheme === 'dark' ? '#fff' : '#333333' }]}>Taille par défaut des cartes</Text>
          <Picker
            selectedValue={cardSettings.defaultCardSize}
            style={[styles.picker, { color: colorScheme === 'dark' ? '#fff' : '#333333' }]}
            onValueChange={(value) => setCardSettings({ ...cardSettings, defaultCardSize: value })}
          >
            <Picker.Item label="Petit" value="Petit" />
            <Picker.Item label="Normal" value="Normal" />
            <Picker.Item label="Grand" value="Grand" />
          </Picker>
        </View>
        <View style={styles.row}>
          <Text style={[styles.label, { color: colorScheme === 'dark' ? '#fff' : '#333333' }]}>Afficher les descriptions</Text>
          <Switch
            value={cardSettings.showDescriptions}
            onValueChange={(value) => setCardSettings({ ...cardSettings, showDescriptions: value })}
            style={styles.switch}
          />
        </View>
        <View style={styles.row}>
          <Text style={[styles.label, { color: colorScheme === 'dark' ? '#fff' : '#333333' }]}>Options de collaboration</Text>
          <Picker
            selectedValue={cardSettings.collaboration}
            style={[styles.picker, { color: colorScheme === 'dark' ? '#fff' : '#333333' }]}
            onValueChange={(value) => setCardSettings({ ...cardSettings, collaboration: value })}
          >
            <Picker.Item label="Tous" value="Tous" />
            <Picker.Item label="Membres du tableau uniquement" value="MembresDuTableau" />
          </Picker>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colorScheme === 'dark' ? '#fff' : '#333333' }]}>Paramètres des notifications</Text>
        {notificationSettings.channels.map((channel) => (
          <View key={channel} style={styles.row}>
            <Text style={[styles.label, { color: colorScheme === 'dark' ? '#fff' : '#333333' }]}>{channel}</Text>
            <Switch 
              value={notificationSettings.channels.includes(channel)}
              onValueChange={() => {
                const newChannels = notificationSettings.channels.includes(channel)
                  ? notificationSettings.channels.filter((c) => c !== channel)
                  : [...notificationSettings.channels, channel];
                setNotificationSettings({ ...notificationSettings, channels: newChannels });
              }}
            />
          </View>
        ))}
        <View style={styles.row}>
          <Text style={[styles.label, { color: colorScheme === 'dark' ? '#fff' : '#333333' }]}>Nouvelles cartes</Text>
          <Switch
            value={notificationSettings.newCards}
            onValueChange={(value) => setNotificationSettings({ ...notificationSettings, newCards: value })}
            style={styles.switch}
          />
        </View>
        <View style={styles.row}>
          <Text style={[styles.label, { color: colorScheme === 'dark' ? '#fff' : '#333333' }]}>Changements de liste</Text>
          <Switch
            value={notificationSettings.listChanges}
            onValueChange={(value) => setNotificationSettings({ ...notificationSettings, listChanges: value })}
            style={styles.switch}
          />
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  section: {
    marginBottom: 20,
    padding: 20,
    borderRadius: 10,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 12,
  },
  profilePicture: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  switch: {
    transform: [{ scaleX: 1.2 }, { scaleY: 1.2 }],
  },
  label: {
    fontSize: 16,
  },
  picker: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
});

export default ParametreScreen;
