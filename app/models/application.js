
const Utilisateur = sequelize.define('Utilisateur', { name: DataTypes.STRING });
const Job = sequelize.define('Job', { name: DataTypes.STRING });
const Application = sequelize.define('Application', {
  UserID: {
    type: DataTypes.INTEGER,
    references: {
      model: Utilisateur, // 'Movies' would also work
      key: 'id'
    }
  },
  JobID: {
    type: DataTypes.INTEGER,
    references: {
      model: Job, // 'Actors' would also work
      key: 'id'
    }
  }
});
Movie.belongsToMany(Actor, { through: ActorMovies });
Actor.belongsToMany(Movie, { through: ActorMovies });