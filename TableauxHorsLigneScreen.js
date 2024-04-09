import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { Feather } from "@expo/vector-icons";

const TableauxHorsLigneScreen = () => {
  const [lists, setLists] = useState([]);
  const [liste, setListe] = useState("");

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
      .post("http://192.168.73.204:3000/api/liste", {
        nomListe: liste,
        idProjets: id,
      })
      .then((response) => {
        console.log(response);
        getAll();
      })
      .catch((err) => {
        console.error(err);
      });
      setListe('')
  };

  function handleDeleteProject(id){
    axios
    .delete(`http://192.168.73.204:3000/api/liste/${id}`)
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
            <Text style={styles.listTitle}>{list.nomProjets}</Text>
            <ScrollView>
              {list.Liste.map((card) => (
                <View key={card.idListe} style={styles.card}>
                  <Text>{card.nomListe}</Text>

                  <TouchableOpacity
                    onPress={() => handleDeleteProject(card.idListe)}
                  >
                    <Feather name="x" size={24} color="red" />
                  </TouchableOpacity>
                </View>
              ))}
            </ScrollView>
            <View>
              <TextInput
                style={styles.input}
                placeholder="New Liste"
                value={liste}
                onChangeText={(text) => setListe(text)}
              />
            </View>
            <TouchableOpacity
              style={styles.addButton}
              onPress={() => handleAddCard(list.idProjets)}
            >
              <Text style={styles.addButtonText}>Add Liste</Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
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

export default TableauxHorsLigneScreen;
