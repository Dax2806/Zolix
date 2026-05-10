import express from "express";
import authMiddleware from "../../common/middlewares/auth.middleware.js";
import authorize from "../../common/middlewares/authorize.middleware.js";
import tenantMiddleware from "../../common/middlewares/tenant.middleware.js";
import planLimit from "../../common/middlewares/planLimit.middleware.js";
import validate from "../../common/middlewares/validate.middleware.js";
import {
  createUser,
  deleteUser,
  getUsers,
  getUsers,
  updateUser,
  getInvite,
  acceptInvite,
} from "./user.controller.js";
import {
  createUserSchema,
  updateUserSchema,
} from "./user.validation.js";

const router = express.Router();

router.get("/invite/:token", getInvite);
router.post("/invite/:token", acceptInvite);

router.use(authMiddleware);
router.use(tenantMiddleware);
router.use(authorize("owner", "admin"));

router.get("/", getUsers);

router.post(
  "/",
  planLimit("users"),
  validate(createUserSchema),
  createUser
);

router.patch(
  "/:id",
  validate(updateUserSchema),
  updateUser
);

router.delete("/:id", deleteUser);

export default router;
