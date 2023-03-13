import mysql2 from "mysql2";

const koneksi = mysql2.createConnection({
    host: "localhost",
    user: "root",
    database: "latihan_fullstack"
})

export default koneksi;