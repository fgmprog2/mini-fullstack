import modelUser from "../models/modelUser.js";
import jwt from "jsonwebtoken";

export const refreshToken = async (req, res) => {
    try {
        const refreshToken = req.cookies.refreshToken;
        if (!refreshToken) return res.sendStatus(401);
        const user = await modelUser.get({ kolom: "id, nama, username", syarat: `refresh_token = "${refreshToken}"` });
        if (!user[0]) return res.sendStatus(403);
        jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (error, decoded) => {
            if (error) return res.sendStatus(403);
            const id = user[0].id;
            const username = user[0].username;
            const nama = user[0].nama;

            const aksesToken = jwt.sign({ id, username, nama }, process.env.ACCESS_TOKEN_SECRET, {
                expiresIn: "15s"
            })

            res.json({ aksesToken });
        })
    } catch (error) {
        console.log(error);
    }
}