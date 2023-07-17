const user = require("../Models/users");

// get user
exports.getUser = async () => {
  const users = await user.find({});
  return users;
};
exports.getUserByEmail = async (email) => {
  return await user.findOne({ email });
};
// get single user
exports.getSingleUser = async (id) => {
  const users = await user.findOne({ _id: id });
  return users;
};

// post user
exports.createUser = async (data) => {
  const User = await user.create(data);
  return User;
};

// Update a user by ID
exports.updateUserById = async (userId, userData) => {
  const result = await user.findByIdAndUpdate(userId, userData, {
    new: true,
  });
  return result;
};

exports.updateUser = async (userId, data) => {
  const users = await user.findById(userId);
  const result = await users.set(data).save();
  return result;
};
