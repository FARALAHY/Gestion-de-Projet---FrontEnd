// ModifierLeProfilScreen.js

import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';


const ModifierLeProfilScreen = () => {
  const navigation = useNavigation();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSaveChanges = () => {
    // Ici, vous pouvez implémenter la logique pour enregistrer les modifications du profil

    let formData = {
      nom : name,
      email : email,
      motdepasse : password
    }

    axios.put('http://192.168.73.204:3000/api/profil/1', formData)
    .then((response)=>{
      console.log(response);
    })
    .catch((err)=>{
      console.error(err);
    })

    // Une fois les modifications enregistrées, retournez à l'écran précédent
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Modifier le profil</Text>
      <TextInput
        style={styles.input}
        placeholder="Nom"
        value={name}
        onChangeText={text => setName(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={text => setEmail(text)}
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder="Mot de passe"
        value={password}
        onChangeText={text => setPassword(text)}
        secureTextEntry
      />
      <Button title="Enregistrer les modifications" onPress={handleSaveChanges} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
});

export default ModifierLeProfilScreen;
