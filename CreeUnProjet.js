import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import axios from "axios";

import { createStackNavigator } from "@react-navigation/stack";

const Stack = createStackNavigator();

const CreeUnProjet = () => {
  const [projects, setProjects] = useState("");
  const [list, setList] = useState("");
  const [cart, setCart] = useState("");
  const [listNew, setListnew] = useState([]);
  const [cartnew, setCartnew] = useState([]);
  const navigation = useNavigation();

  function addListe() {
    let value = listNew;
    value.push({ nomListe: list });
    setListnew(value);
    setCartnew([]);
  }

  function addCarte() {
    let value = cartnew;
    value.push(cart);
    setCartnew(value);
    let valueList = listNew;
    let x = valueList.pop();
    x = { ...x, ...{ ListeCarte: cartnew } };
    valueList.push(x);
    setListnew(valueList);
    setCart("");
  }

  function addProjet() {
    let valueList = listNew;
    let formData = { ...{ Liste: valueList }, ...{ nomProjets: projects } };
    setListnew(formData);

    axios
      .post("http://192.168.73.204:3000/api/projet", formData)
      .then((response) => {
        console.log(response);
      })
      .catch((err) => {
        console.error(err);
      });
    setProjects("");
    setList("");
  }

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.projectsContainer}>
        <View style={styles.project}>
          <View style={styles.projectHeader}>
            <TextInput
              style={styles.projectTitleInput}
              placeholder="Projet"
              value={projects}
              onChangeText={(text) => setProjects(text)}
            />
            <TouchableOpacity>
              <Feather name="user-plus" size={24} color="green" />
            </TouchableOpacity>
          </View>
          <ScrollView
            horizontal={true}
            contentContainerStyle={styles.listsContainer}
          >
            <View style={styles.list}>
              <View style={styles.listHeader}>
                <TextInput
                  style={styles.listTitleInput}
                  placeholder="Liste"
                  value={list}
                  onChangeText={(text) => setList(text)}
                />
                <TouchableOpacity style={styles.addListButton}>
                  <Text style={styles.addListButtonText} onPress={addListe}>
                    Ajouter une liste
                  </Text>
                </TouchableOpacity>
              </View>
              <ScrollView contentContainerStyle={styles.cardsContainer}>
                <View style={styles.listHeader}>
                  <TextInput
                    style={styles.cardInput}
                    placeholder="Carte"
                    value={cart}
                    onChangeText={(text) => setCart(text)}
                  />
                  <TouchableOpacity>
                    <Feather
                      name="x"
                      size={24}
                      color="red"
                      onPress={() => setCart("")}
                    />
                  </TouchableOpacity>
                </View>
                <TouchableOpacity style={styles.addCardButton}>
                  <Text style={styles.addCardButtonText} onPress={addCarte}>
                    Ajouter une carte
                  </Text>
                </TouchableOpacity>
              </ScrollView>
            </View>
          </ScrollView>
        </View>
        <TouchableOpacity style={styles.addProjectButton}>
          <Text style={styles.addProjectButtonText} onPress={addProjet}>
            Ajouter un projet
          </Text>
        </TouchableOpacity>
      </ScrollView>
      <TouchableOpacity
        onPress={() => navigation.navigate("Parametres")}
        style={styles.backgroundOptionButton}
      >
        <Feather name="settings" size={24} color="black" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 20,
    backgroundColor: "#f0f0f0",
  },
  projectsContainer: {
    paddingBottom: 20,
  },
  project: {
    backgroundColor: "#fff",
    borderRadius: 5,
    marginBottom: 20,
  },
  projectHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  projectTitleInput: {
    flex: 1,
    fontSize: 18,
    fontWeight: "bold",
    marginRight: 10,
  },
  listsContainer: {
    flexDirection: "row",
  },
  list: {
    backgroundColor: "#f9f9f9",
    borderRadius: 5,
    marginRight: 20,
    width: 300,
  },
  listHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  listTitleInput: {
    flex: 1,
    fontSize: 16,
    fontWeight: "bold",
    marginRight: 10,
  },
  cardsContainer: {
    padding: 10,
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  cardInput: {
    flex: 1,
    fontSize: 14,
  },
  addCardButton: {
    backgroundColor: "#cfcfcf",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  addCardButtonText: {
    color: "#333",
    fontWeight: "bold",
  },
  addListButton: {
    backgroundColor: "#ddd",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    height: 40,
  },
  addListButtonText: {
    color: "#333",
    fontWeight: "bold",
  },
  addProjectButton: {
    backgroundColor: "#2196F3",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 20,
  },
  addProjectButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  backgroundOptionButton: {
    position: "absolute",
    bottom: 20,
    right: 20,
    backgroundColor: "#fff",
    borderRadius: 20,
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    elevation: 3,
  },
});

export default CreeUnProjet;
