// Importing modules using ESM syntax
import asyncHandler from "express-async-handler";
import Contact from "../models/contactModels.js";

// @description Get all contacts
// @route GET /api/contacts
// @access private
const getContacts = asyncHandler(async (req, res) => {
  if (!req.user) {
    return res.status(401).json({ message: 'Unauthorized - User not found' });
  }
  const contacts = await Contact.find({user_id: req.user.id } );
  res.status(200).json(contacts);
});


// @description Find one contact by ID
// @route GET /api/contacts
// @access private
const getContactById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const contact = await Contact.findById(id);

  if (!contact) {
    res.status(404).json({ message: 'Contact not found' });
  } else {
    res.json(contact);
  }
});

// @description create new contacts
// @route POST /api/contacts
// @access private
const createContact = asyncHandler(async (req, res) => {
  console.log("the request body is :", req.body);
  const { name, email, phone } = req.body;
  if (!name || !email || !phone) {
    res.status(400);
    throw new Error(" All fields are required in the request!");
  }
  const newContact = await Contact.create({
    name,
    email,
    phone,
    user_id: req.user.id
  });
  res.status(201).json(newContact);
});

/*// @description Get by id contacts
// @route GET /api/contacts/:id
// @access public
const getContact = asyncHandler(async (req, res) => {
  res.status(200).json({ message: `Get contact for ${req.params.id}` });
});*/

// @description update contacts by id
// @route PUT /api/contacts/:id
// @access private
// Update contact by ID
const updateContact = asyncHandler(async (req, res) => {
  const { id } = req.params;

  // Check if the contact with the given ID exists
  const existingContact = await Contact.findById(id);

  if (!existingContact) {
    return res.status(404).json({ message: 'Contact not found' });
  }

  // Update the contact with the data from the request body
  existingContact.name = req.body.name || existingContact.name;
  existingContact.email = req.body.email || existingContact.email;
  existingContact.phone = req.body.phone || existingContact.phone;

  if(existingContact.user_id.toString() !== req.user.id){
    res.status(403);
    throw new Error("user dont have permission to update other contacts");
  }

  // Save the updated contact
  const updatedContact = await existingContact.save();

  res.json(updatedContact);
});

/*const updateContact = asyncHandler(async (req, res) => {
  res.status(200).json({ message: `Update contact for ${req.params.id}` });
});*/

// @description delete contacts by id
// @route DELETE /api/contacts/:id
// @access private
const deleteContact = asyncHandler(async (req, res) => {
  const { id } = req.params;

  // Check if the contact with the given ID exists
  const existingContact = await Contact.findById(id);

  if (!existingContact) {
    return res.status(404).json({ message: 'Contact not found' });
  }

  if(existingContact.user_id.toString() !== req.user.id){
    res.status(403);
    throw new Error("user dont have permission to delete other contacts");
  }

  // Delete the contact
  await existingContact.deleteOne();

  res.json({ message: `Contact with ID ${id} deleted successfully` });
});
/*
const deleteContact = asyncHandler(async (req, res) => {
  res.status(200).json({ message: `Delete contact for ${req.params.id}` });
});*/

// Exporting modules using ESM syntax
export { getContacts, getContactById, createContact, updateContact, deleteContact };
