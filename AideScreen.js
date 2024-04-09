import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';

const AideScreen = () => {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Bienvenue dans l'aide de Tangary</Text>
        <Text style={styles.sectionContent}>
          Nous sommes là pour vous aider à tirer le meilleur parti de votre expérience avec Tangary.
          Suivez les instructions ci-dessous pour en savoir plus sur les fonctionnalités de l'application.
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Introduction à Tangary</Text>
        <Text style={styles.sectionContent}>
          Tangary est un outil de gestion de projet puissant qui vous permet d'organiser et de collaborer
          sur des projets de toutes tailles. Avec Tangary, vous pouvez créer des tableaux, des listes et des
          cartes pour organiser vos tâches et suivre leur progression.
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Premiers pas avec Tangary</Text>
        <Text style={styles.sectionContent}>
          Pour commencer avec Tangary, suivez ces étapes simples :
          {"\n"}1. Créez un compte Tangaryo ou connectez-vous.
          {"\n"}2. Créez votre premier tableau en appuyant sur le bouton "+".
          {"\n"}3. Ajoutez des listes à votre tableau pour organiser vos tâches.
          {"\n"}4. Créez des cartes pour chaque tâche à accomplir.
          {"\n"}5. Utilisez des étiquettes, des dates d'échéance et des commentaires pour enrichir vos cartes.
          {"\n"}6. Invitez des membres à collaborer sur vos tableaux.
          {"\n"}7. Commencez à travailler efficacement !
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>FAQ</Text>
        <Text style={styles.sectionContent}>
          Q : Comment puis-je déplacer une carte d'une liste à une autre ?
          {"\n"}R : Appuyez longuement sur une carte, puis faites-la glisser vers la liste de votre choix.
          {"\n"}
          {"\n"}Q : Comment puis-je ajouter des membres à un tableau ?
          {"\n"}R : Ouvrez le menu du tableau, appuyez sur "Membres", puis sur "Ajouter des membres".
          {"\n"}
          {"\n"}Q : Comment puis-je changer le fond d'un tableau ?
          {"\n"}R : Ouvrez le menu du tableau, appuyez sur "Modifier le fond", puis sélectionnez un fond parmi les options disponibles.
        </Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333333',
  },
  sectionContent: {
    fontSize: 16,
    color: '#555555',
  },
});

export default AideScreen;
