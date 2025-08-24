import { Note } from "../../models/notes.js";
import { User } from "../../models/user.js";

export const getData = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalNotes = await Note.countDocuments();

    const avgNotesPerUser =
      totalUsers > 0 ? (totalNotes / totalUsers).toFixed(2) : 0;

    const usersWithNotes = await User.aggregate([
      {
        $lookup: {
          from: "notes",
          localField: "_id",
          foreignField: "user",
          as: "notes",
        },
      },
      {
        $project: {
          _id: 1,
          username: 1,
          email: 1,
          noteCount: { $size: "$notes" },
        },
      },
      {
        $sort: { noteCount: -1 },
      },
    ]);

    res.json({
      totalUsers,
      totalNotes,
      avgNotesPerUser,
      users: usersWithNotes,
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch dashboard stats" });
  }
};
