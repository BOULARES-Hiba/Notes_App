import express from "express";
import { getData } from "../../controllers/admin/admin.js";

export const AdminRouter = express.Router();

AdminRouter.get("/stats",getData) 