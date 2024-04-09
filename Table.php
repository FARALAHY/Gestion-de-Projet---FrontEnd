CREATE TABLE Utilisateurs (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nom VARCHAR(100),
    email VARCHAR(100) UNIQUE,
    mot_de_passe VARCHAR(100),
    date_inscription DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE Projets (
    id INT PRIMARY KEY AUTO_INCREMENT,
    titre VARCHAR(255),
    description TEXT,
    createur_id INT,
    date_creation DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (createur_id) REFERENCES Utilisateurs(id)
);

CREATE TABLE Listes (
    id INT PRIMARY KEY AUTO_INCREMENT,
    titre VARCHAR(255),
    projet_id INT,
    FOREIGN KEY (projet_id) REFERENCES Projets(id)
);

CREATE TABLE Cartes (
    id INT PRIMARY KEY AUTO_INCREMENT,
    titre VARCHAR(255),
    description TEXT,
    liste_id INT,
    FOREIGN KEY (liste_id) REFERENCES Listes(id)
);

CREATE TABLE Membres (
    id INT PRIMARY KEY AUTO_INCREMENT,
    utilisateur_id INT,
    projet_id INT,
    role VARCHAR(50),
    FOREIGN KEY (utilisateur_id) REFERENCES Utilisateurs(id),
    FOREIGN KEY (projet_id) REFERENCES Projets(id)
);
