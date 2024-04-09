import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button, Alert } from 'react-native';

export default function App() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // Envoyer les données de login au serveur
    fetch('http://192.168.73.204/phpmyadmin/tbl_structure.php?db=projet&table=utilisateurs', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    })
    .then(response => {
      if (response.ok) {
        // Redirection ou autre traitement en cas de succès
        Alert.alert('Login successful!');
      } else {
        // Affichage d'un message d'erreur en cas d'échec
        Alert.alert('Login failed!', 'Invalid username or password.');
      }
    })
    .catch(error => console.error('Error:', error));
  };

  const handleRegister = () => {
    // Envoyer les données d'inscription au serveur
    fetch('http://192.168.73.204/phpmyadmin/tbl_structure.php?db=projet&table=utilisateurs', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    })
    .then(response => {
      if (response.ok) {
        // Affichage d'un message de succès en cas de succès
        Alert.alert('Registration successful!');
      } else {
        // Affichage d'un message d'erreur en cas d'échec
        Alert.alert('Registration failed!', 'Username may already be taken.');
      }
    })
    .catch(error => console.error('Error:', error));
  };

  return (
    <View style={styles.container}>
      <Text>Login</Text>
      <TextInput
        style={styles.input}
        placeholder="Username"
        onChangeText={text => setUsername(text)}
        value={username}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry={true}
        onChangeText={text => setPassword(text)}
        value={password}
      />
      <Button title="Login" onPress={handleLogin} />
      <Text style={styles.or}>or</Text>
      <Button title="Register" onPress={handleRegister} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    width: '80%',
    marginBottom: 10,
    padding: 10,
  },
  or: {
    marginVertical: 10,
  },
});
