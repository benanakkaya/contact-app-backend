import User from "../models/User.js"
import Contact from "../models/Contact.js"


export const newContact = async (req, res) => {
    const { name, surname, email, phone, nickname, owner, image } = req.body;


    const user = await User.findById(owner);

    const newContact = await Contact.create({
        name,
        surname,
        email,
        phone,
        nickname,
        owner,
        image
    })

    const updatedUser = await User.findByIdAndUpdate(owner, { contacts: [...user.contacts, newContact._id] })

    return res.status(201).json({ message: "Successfully created!", newContact })
}

export const editContact = async (req, res) => {
    const { name, surname, email, phone, nickname, group, image, id } = req.body;

    const editedContact = await Contact.findByIdAndUpdate(id, { name, surname, email, phone, nickname, group, image });

    return res.status(201).json({ message: "Successfully edited!", contact: editedContact })


}

export const deleteContact = async (req, res) => {
    const { id } = req.body;

    const deletedContact = await Contact.findByIdAndRemove(id);

    return res.status(201).json({ message: "Successfully deleted!" })
}



export const getUserContacts = async (req, res) => {
    const { id } = req.body;
    const contactList = await Contact.find({ owner: id }).populate("group");

    return res.status(200).json(contactList)
}