module.exports = (db) => {
  const Users = db.model(
    "user",
    db.Schema(
      {
        name: { first: String, last: String },
        username: String,
        password: String,
        role: {
          type: String,
          enum: ["student", "teacher", "admin"],
          default: "student",
        },
      },
      {
        timestamps: true,
      }
    )
  );

  return Users;
};
