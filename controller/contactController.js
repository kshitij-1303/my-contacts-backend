const asyncHandler = require("express-async-handler");
const Contact = require("../models/contactModel");

//@desc get all contacts
//@route /api/contacts
//@acess public
const getContacts = asyncHandler(async (req, res) => {
  const contacts = await Contact.find();
  res.status(200).json(contacts);
})

//@desc create contacts
//@route /api/contacts
//@acess public
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
    phone
  })

  res.status(201).json(contact);
})

//@desc get particular contact
//@route /api/contacts:id
//@acess public
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
//@acess public
const updateContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  if (!contact) {
    res.status(404);
    throw new Error("Contact not found");
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
//@acess public
const deleteContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  if (!contact) {
    res.status(404);
    throw new Error("Contact not found");
  }
  await Contact.deleteOne();
  res.status(201).json(contact);
})




module.exports = { getContacts, createContact, getContact, updateContact, deleteContact };
