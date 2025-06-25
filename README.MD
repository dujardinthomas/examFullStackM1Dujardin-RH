# EXAM FULL STACK M1 Thomas DUJARDIN - API Gestion RH Employées et Candidats + Front REACT

- CRUD Employée
- CRUD Candidats (applicant)

## Démarrer le projet

```bash
docker-compose up -d
```

```bash
mvn spring-boot:run
```

```bash
cd frontend
npm install
npm start
```

## Commentaires dans la phase de développement
- si un objet est non trouvé, une exception est levé et est intercepté par la classe `GlobalExceptionHandler` retournant au client le code erreur approprié
- Création d'un CrudService permettant la définition automatiques des méthodes CRUD dans toutes les classes implémantant cette interface prenant en paramètre l'entité et le type de clé primaire (Long, id, String)
- Schéma organisationnel du cycle des données de l'API : `Controller > Service > DAO > Repository < DAO < Service < Controller`

- Pour les absences, j'ai laissé spring géré la table (car il n'y a qu'un champ : date)
- Pour les congés, j'ai crée une table et l'ai relié à l'entité candidat