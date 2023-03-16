import modelUser from "../models/modelUser.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const getUser = async (req, res) => {
    try {
        const users = await modelUser.get({ kolom: "username, nama" });
        res.json(users);
    } catch (error) {
        console.log(error);
    }
}

export const tambahUser = async (req, res) => {
    const { username, nama, password, passwordKonfirmasi } = req.body;
    const kesalahanInput = {};
    if (!username) kesalahanInput.username = "Username belum diisi";
    else {
        const cekUsername = await modelUser.get({ syarat: `username = "${username}"` });
        if (cekUsername.length) kesalahanInput.username = "Username tidak tersedia";
    }
    if (!password) kesalahanInput.password = "Password belum diisi";
    if (!passwordKonfirmasi) kesalahanInput.passwordKonfirmasi = "Password konfirmasi belum diisi";
    else if (password !== passwordKonfirmasi) kesalahanInput.passwordKonfirmasi = "Password konfirmasi tidak sama";
    if (!nama) kesalahanInput.nama = "Nama belum diisi";

    if (Object.keys(kesalahanInput).length) res.status(400).json({ kesalahanInput });
    else {
        const hashedPassword = bcrypt.hashSync(password, 12);
        const tambahUser = await modelUser.add({ username, nama, password: hashedPassword });
        if (tambahUser) res.json({ pesan: "Berhasil menambah user baru" });
        else res.status(500).json({ kesalahanLainnya: "Kesalahan server" });
    }
}

export const masuk = async (req, res) => {
    const kesalahanInput = {};
    if (!req.body.password) kesalahanInput.password = "Password belum diisi";
    if (!req.body.username) kesalahanInput.username = "Username belum diisi";
    else if (req.body.password) {
        const user = await modelUser.get({ kolom: "id, nama, username, password", syarat: `username = "${req.body.username}"` });
        if (!user.length) kesalahanInput.username = "Username tidak ditemukan";
        else {
            const cekPassword = bcrypt.compareSync(req.body.password, user[0].password);
            if (!cekPassword) kesalahanInput.password = "Password salah";
            else {
                const id = user[0].id;
                const nama = user[0].nama;
                const username = user[0].username;
                const aksesToken = jwt.sign({ id, username, nama }, process.env.ACCESS_TOKEN_SECRET, {
                    expiresIn: "20s"
                })

                const refreshToken = jwt.sign({ id, username, nama }, process.env.REFRESH_TOKEN_SECRET, {
                    expiresIn: "1d"
                })

                await modelUser.update({ update: `refresh_token = "${refreshToken}"`, syarat: `username = "${username}"` });
                res.cookie("refreshToken", refreshToken, {
                    httpOnly: true,
                    maxAge: 24 * 60 * 60 * 1000
                })

                res.json({ aksesToken });
            }
        }
    }

    if (Object.keys(kesalahanInput).length) res.status(400).json({ kesalahanInput });
}

export const keluar = async (req, res) => {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) return res.sendStatus(204);
    const user = await modelUser.get({ kolom: "id, nama, username", syarat: `refresh_token = "${refreshToken}"` });
    if (!user[0]) return res.sendStatus(204);
    const id = user[0].id;
    await modelUser.update({ update: "refresh_token = null", syarat: `id = ${id}` });
    res.clearCookie("refreshToken");
    return res.sendStatus(200);
}