//NOTA Questo tipo di logout e creato in base al JWT conservato nell'header e quindi alla creazione di una blacklist (nello schema di mongoose) dove andranno tutti i token.

// import Blacklist from "../schema/BlackList.js";

// const logoutHeaderUser = async (req, res) => {
//   const accessToken = req.headers.authorization?.trim();
//   if (!accessToken || !accessToken.startsWith("Bearer ")) {
//     return res.status(400).json({ message: "No active session" });
//   }

//   try {
//     const accessToken = authHeader.split(" ")[1]?.trim();
//     const token = await Blacklist.findOne({ accessToken });
//     if (!token) return res.status(409).send("Already Logged Out");

//     const decoded = jwt.verify(accessToken, process.env.JWT_SECRET);
//     const exspiresAt = new Date(decoded.exp * 1000);

//     const addBlacklist = new Blacklist({ token: accessToken, exspiresAt });
//     await addBlacklist.save();

//     res.status(200).json({ message: "Successfully logged out" });
//   } catch (error) {
//     res.status(500).json({
//       status: "error",
//       message: "Internal Server Error:" + error,
//     });
//   }
// };
