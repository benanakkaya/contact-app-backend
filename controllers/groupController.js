import Group from "../models/Group.js";
import User from "../models/User.js";
import Contact from "../models/Contact.js";



export const createGroup = async (req, res) => {

    const { title, owner, members } = req.body;

    const checkGroup = await Group.findOne({ title, owner });

    const user = await User.findById(owner);

    if (checkGroup) {
        return res.status(500).json({ message: "Such a group has already been created before." });
    }

    const createdGroup = await Group.create({
        title,
        owner,
        members
    })

    const updatedUser = await User.findByIdAndUpdate(owner, { groups: [...user.groups, createdGroup._id] });
    const updatedContact = await Contact.findByIdAndUpdate()

    return res.status(201).json({ message: "Group was created successfully!", group: createdGroup })

}

export const editGroup = async (req, res) => {
    const { title, members, owner, id } = req.body;

    const checkGroup = await Group.findOne({ title, owner });

    if (checkGroup) {
        if (checkGroup.title !== title) {
            return res.status(500).json({ message: "Such a group has already been created before." });
        }
    }

    const editedGroup = await Group.findByIdAndUpdate(id, { title, members });


    return res.status(201).json({ message: "The group was successfully edited." })

}

export const deleteGroup = async (req,res) => {
    const {id} = req.body;

    await Group.findByIdAndDelete(id);

    return res.status(201).json({message:"The group was successfully deleted."})

}