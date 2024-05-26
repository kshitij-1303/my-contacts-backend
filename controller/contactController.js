const asyncHandler = require("express-async-handler");
const Contact = require("../models/contactModel");

//@desc get all contacts
//@route /api/contacts
//@acess private
const getContacts = asyncHandler(async (req, res) => {
  const contacts = await Contact.find({ user_id: req.user.id });
  res.status(200).json(contacts);
})

//@desc create contacts
//@route /api/contacts
//@acess private
const createContact = asyncHandler(async (req, res) => {
  console.log("The request is", req.body);
  const { name, email, phone } = req.body;
  if (!name || !email || !phone) {
    res.status(400);
    throw new Error("All fields are mandatory");
  }
  const contact = await Contact.create({
    name,
    email,
    phone,
    user_id: req.user.id,
  })

  res.status(201).json(contact);
})

//@desc get particular contact
//@route /api/contacts:id
//@acess private
const getContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  if (!contact) {
    res.status(404);
    throw new Error("Contact not found");
  }
  res.status(201).json(contact);
})

//@desc update contacts
//@route /api/contacts:id
//@acess private
const updateContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  if (!contact) {
    res.status(404);
    throw new Error("Contact not found");
  }
  if (contact.user_id.toString() !== req.user.id) {
    res.status(403)
    throw new Error("User doesn't have permission to make changes")
  }

  const updateContact = await Contact.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  )

  res.status(201).json(updateContact);
})

//@desc delete contacts
//@route /api/contacts:id
//@acess private
const deleteContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  if (!contact) {
    res.status(404);
    throw new Error("Contact not found");
  }
  if (contact.user_id.toString() !== req.user.id) {
    res.status(403)
    throw new Error("User doesn't have permission to make changes")
  }
  await Contact.deleteOne({ _id: req.params.id });
  res.status(201).json(contact);
})




module.exports = { getContacts, createContact, getContact, updateContact, deleteContact };
