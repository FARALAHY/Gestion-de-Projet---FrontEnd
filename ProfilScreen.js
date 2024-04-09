import  React, {useEffect, useState} from 'react';
import { View, Text, StyleSheet, Image, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';


export default function ProfilScreen(){
  const [nom, setNom] = useState('')
  const [email, setEmail] = useState('')



  useEffect(()=>{
    axios.get('http://192.168.73.204:3000/api/profil')
    .then((response)=>{
      console.log(response.data);
      setNom(response.data.data.nom)
      setEmail(response.data.data.email)
    })
    .catch((err)=>{
      console.error(err);
    })
  
  },[])
  
    const navigation = useNavigation();
  
    const userData = {
      name: 'John Doe',
      email: 'johndoe@example.com',
      profilePicture: 'https://placeimg.com/150/150/people', 
    };

    
  return (
    <View style={styles.container}>
      {userData.profilePicture && (
        <Image source={{ uri: userData.profilePicture }} style={styles.profilePicture} />
      )}
      <Text style={styles.nameText}>{nom}</Text>
      <Text style={styles.emailText}>{email}</Text>

      <Button title="Modifier le profil" onPress={() => navigation.navigate('ModifierLeProfilScreen')}/>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  profilePicture: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 20,
  },
  nameText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  emailText: {
    fontSize: 16,
    marginBottom: 20,
  },
});



