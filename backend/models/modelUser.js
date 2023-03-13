import koneksi from "../configs/Database.js";

const modelUser = {
    get: async ({ kolom, syarat, jumlahTampil, halaman }) => {
        const sql = `SELECT ${kolom ? kolom : "*"} FROM t_user WHERE ${syarat ? syarat : "1"} LIMIT ${halaman ? (halaman - 1) : "0"}, ${jumlahTampil ? jumlahTampil : "20"}`;
        const [rows] = await koneksi.promise().query(sql);
        return rows;
    },

    add: async ({ username, nama, password }) => {
        try {
            await koneksi.promise().query(`INSERT INTO t_user (\`username\`, \`password\`, \`nama\`) VALUES ("${username}", "${password}", "${nama}")`);
            return true;
        } catch (error) {
            console.log(error);
            return false;
        }
    },

    update: async ({ update, syarat }) => {
        const sql = `UPDATE t_user SET ${update}${syarat ? " WHERE " + syarat : ""}`;
        try {
            await koneksi.promise().query(sql);
            return true
        } catch (error) {
            console.log(error);
            return false;
        }
    }
}

export default modelUser;