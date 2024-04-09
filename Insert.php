<?php

// Connexion à la base de données MySQL
$servername = "localhost";
$username = "root";
$password = "";
$database = "projet";

$conn = new mysqli($servername, $username, $password, $database);

// Vérifier la connexion
if ($conn->connect_error) {
  die("La connexion a échoué: " . $conn->connect_error);
}

// Vérifier la méthode de requête
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
  // Récupérer les données envoyées depuis l'application React Native
  $data = json_decode(file_get_contents("php://input"), true);

  // Extraire les données à insérer
  $nom = $data['nom'];
  $email = $data['email'];
  $mot_de_passe = $data['mot_de_passe'];

  // Préparer et exécuter la requête d'insertion
  $sql = "INSERT INTO Utilisateurs (nom, email, mot_de_passe) VALUES (?, ?, ?)";
  $stmt = $conn->prepare($sql);
  $stmt->bind_param("sss", $nom, $email, $mot_de_passe);

  if ($stmt->execute()) {
    echo "Nouvel utilisateur inséré avec succès.";
  } else {
    echo "Erreur lors de l'insertion de l'utilisateur: " . $conn->error;
  }

  // Fermer la connexion à la base de données
  $stmt->close();
  $conn->close();
} else {
  echo "Méthode non autorisée.";
}
?>
