import {
  registerUser,
  loginUser,
} from "./auth.service.js";

export const register = async (req, res, next) => {
  try {
    const data = await registerUser(req.body);

    res.status(201).json(data);
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    const data = await loginUser(req.body);

    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};