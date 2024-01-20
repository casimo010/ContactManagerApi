import express from "express";
import { Router } from 'express';
import {
  getContacts,
  getContactById,
  createContact,
  updateContact,
  deleteContact
} from "../Controllers/contactControllers.js";
import { validateToken } from "../middleware/validateTokenHandler.js";

const router = Router();
// All routes are working

router.use(validateToken);

router.route("/").get(getContacts);

router.route("/").post(createContact);

router.route("/:id").get(getContactById);

router.route("/:id").put(updateContact);

router.route("/:id").delete(deleteContact);

export { router } ;
