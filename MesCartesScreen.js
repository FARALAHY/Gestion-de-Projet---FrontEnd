import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  View,
  Text,
  Button,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { Feather } from "@expo/vector-icons";

const MesCartesScreen = () => {
  const [cards, setCards] = useState("");

  const [lists, setLists] = useState([]);

  useEffect(() => {
    getAll();
  }, []);

  function getAll() {
    axios
      .get("http://192.168.73.204:3000/api/projet")
      .then((response) => {
        setLists(response.data.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }

  const handleAddCard = (id) => {
    axios
      .post("http://192.168.73.204:3000/api/carte", {
        nomCarte: cards,
        idListe: id,
      })
      .then((response) => {
        console.log(response);
        getAll();
      })
      .catch((err) => {
        console.error(err);
      });
    setCards("");
  };

  function handleDeleteProject(id) {
    axios
      .delete(`http://192.168.73.204:3000/api/carte/${id}`)
      .then((response) => {
        console.log(response);
        getAll();
      })
      .catch((err) => {
        console.error(err);
      });
  }

  function deleteProjet(id){
    let index = lists.map((l)=>{
       return l.idProjets
    }).indexOf(id)
    let idListe = lists.map((val)=>{
      return val.Liste.map((l)=>{
        return l.idListe
      })
    })
    axios
    .post(`http://192.168.73.204:3000/api/projet/${id}`,{
      idListe : idListe[index]
    })
    .then((response) => {
      console.log(response);
      getAll();
    })
    .catch((err) => {
      console.error(err);
    });

  }

  return (
    <View style={styles.container}>
      <ScrollView horizontal={true}>
        {lists.map((list) => (
          <View key={list.idProjets} style={styles.list}>
              <View style={styles.titre}>
              <Text style={styles.listTitle}>{list.nomProjets} </Text>
              <TouchableOpacity
                onPress={() => deleteProjet(list.idProjets)}
              >
                <Feather name="x" size={24} color="red" />
              </TouchableOpacity>
              </View>
            <ScrollView>
              {list.Liste.map((card) => (
                <View key={card.idListe} style={styles.card}>
                  <View>
                    <Text style={styles.liste}>{card.nomListe}</Text>
                    {card.ListeCarte.map((val) => (
                      <View key={val.idCarte} style={styles.carde}>
                        <Text>{val.nomCarte}</Text>
                        <TouchableOpacity
                          onPress={() => handleDeleteProject(val.idCarte)}
                        >
                          <Feather name="x" size={24} color="red" />
                        </TouchableOpacity>
                      </View>
                    ))}
                  </View>
                  <View style={styles.addCarte}>
                    <TextInput
                      style={styles.input}
                      placeholder="New Card"
                      value={cards}
                      onChangeText={(text) => setCards(text)}
                    />
                    <TouchableOpacity
                      style={styles.addButton}
                      onPress={() => handleAddCard(card.idListe)}
                    >
                      <Text style={styles.addButtonText}>Add Card</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              ))}
            </ScrollView>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  titre : {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
    justifyContent: "space-between",
  },
  addCarte: {
    width: 125,
  },
  carde: {
    width: 120,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  liste: {
    fontWeight: "bold",
    marginBottom: 12,
    fontSize: 16,
  },
  input: {
    width: "100%",
    height: 40,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  container: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 20,
    backgroundColor: "#f0f0f0",
  },
  list: {
    width: 300,
    padding: 10,
    backgroundColor: "#f0f0f0",
    marginRight: 20,
    borderRadius: 5,
  },
  listTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  card: {
    padding: 10,
    backgroundColor: "#fff",
    marginBottom: 10,
    borderRadius: 5,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  addButton: {
    backgroundColor: "#2196F3",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 10,
  },
  addButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});

export default MesCartesScreen;
