import { Router } from "express";
import {getUserById, getUsers } from "../controller/user";

const router = Router();
router.get("/", getUsers);
router.get("/:id", getUserById);
// router.get("/", createUser);
// router.get("/", updateUser);
// router.get("/", deleteUser);
export default router;
