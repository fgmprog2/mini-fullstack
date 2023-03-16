import { Sukses } from "../components/PopUp";

import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
const Register = () => {
    useEffect(() => { document.title = "Register Page | Aplikasi Fullstack" })

    const [pesanSukses, setPesanSukses] = useState("");
    const navigate = useNavigate();

    const [errorLainnya, setErrorLainnya] = useState("");

    const [username, setUsername] = useState("");
    const [errorUsername, setErrorUsername] = useState("");

    const [nama, setNama] = useState("");
    const [errorNama, setErrorNama] = useState("");

    const [password, setPassword] = useState("");
    const [errorPassword, setErrorPassword] = useState("");

    const [passwordKonfirmasi, setPasswordKonfirmasi] = useState("");
    const [errorPasswordKonfirmasi, setErrorPasswordKonfirmasi] = useState("");

    const [onProses, setOnProses] = useState(false);

    const daftar = async (event) => {
        event.preventDefault();
        setOnProses(true);
        try {
            await axios.post("http://localhost:5000/daftar", { username, nama, password, passwordKonfirmasi });
            setPesanSukses("Akun berhasil dibuat, silahkan login dengan akun kamu");
            setOnProses(false);
        } catch (error) {
            setOnProses(false);
            const data = error.response.data;
            setErrorLainnya(data.kesalahanLainnya ? data.kesalahanLainnya : "");
            setErrorUsername(data.kesalahanInput.username ? data.kesalahanInput.username : "")
            setErrorNama(data.kesalahanInput.nama ? data.kesalahanInput.nama : "")
            setErrorPassword(data.kesalahanInput.password ? data.kesalahanInput.password : "")
            setErrorPasswordKonfirmasi(data.kesalahanInput.passwordKonfirmasi ? data.kesalahanInput.passwordKonfirmasi : "")
        }
    }

    return (
        <>
            <Sukses pesan={pesanSukses} callBack={() => { setPesanSukses(""); navigate("/", { replace: false }) }} judul="berhasil" />

            {errorLainnya ? (<div className="w-11/12 sm:w-[450px] border border-red-900 text-red-900 bg-red-300 rounded-md m-auto mt-3 p-4">{errorLainnya}</div>) : null}
            <form onSubmit={daftar} className="bg-white p-5 sm:p-10 w-11/12 sm:w-[450px] block m-auto mt-3 rounded-md shadow-md">
                <h1 className="font-bold text-xl text-center">Register Page</h1>
                <label className="my-5 block">
                    <div>Username</div>
                    <input type="text" name="username" value={username} onInput={(event) => { setErrorUsername(""); setUsername(event.target.value); }} className="border h-10 pl-3 pr-3 w-full rounded-md" />
                    {errorUsername ? (<div className="text-red-700">{errorUsername}</div>) : null}
                </label>
                <label className="my-5 block">
                    <div>Nama</div>
                    <input type="text" name="nama" value={nama} onInput={(event) => { setErrorNama(""); setNama(event.target.value); }} className="border h-10 pl-3 pr-3 w-full rounded-md" />
                    {errorNama ? (<div className="text-red-700">{errorNama}</div>) : null}
                </label>
                <label className="my-5 block">
                    <div>Password</div>
                    <input type="password" name="password" value={password} onInput={(event) => { setErrorPassword(""); setPassword(event.target.value); }} className="border h-10 pl-3 pr-3 w-full rounded-md" />
                    {errorPassword ? (<div className="text-red-700">{errorPassword}</div>) : null}
                </label>
                <label className="my-5 block">
                    <div>Konfirmasi Password</div>
                    <input type="password" name="passwordKonfirmasi" value={passwordKonfirmasi} onInput={(event) => { setErrorPasswordKonfirmasi(""); setPasswordKonfirmasi(event.target.value); }} className="border h-10 pl-3 pr-3 w-full rounded-md" />
                    {errorPasswordKonfirmasi ? (<div className="text-red-700">{errorPasswordKonfirmasi}</div>) : null}
                </label>
                <div className="flex justify-between">
                    <div>
                        <a href="/" onClick={(event) => { event.preventDefault(); navigate("/", { replace: false }) }} className="text-blue-700 leading-10">Masuk</a>
                    </div>
                    <button type="submit" disabled={onProses} className="bg-blue-700 text-white h-10 pl-6 pr-6 rounded-md">{onProses ? (<><div className="inline-block w-5 h-5 animate-spin border-4 border-blue-500 border-r-white align-middle rounded-full"></div> <span className="inline-block ml-1 align-middle">Mendaftar</span></>) : "Daftar"}</button>
                </div>
            </form>
        </>
    )
}

export default Register;