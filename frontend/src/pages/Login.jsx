import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
    useEffect(() => { document.title = "Login Page | Aplikasi Fullstack" })

    const navigate = useNavigate();

    const [errorLainnya, setErrorLainnya] = useState("");

    const [username, setUsername] = useState("");
    const [errorUsername, setErrorUsername] = useState("");

    const [password, setPassword] = useState("");
    const [errorPassword, setErrorPassword] = useState("");

    const [onProses, setOnProses] = useState(false);

    const masuk = async (event) => {
        event.preventDefault();
        setOnProses(true);
        try {
            await axios.post("http://localhost:5000/masuk", { username, password });
            setOnProses(false);
            navigate("/dashboard", { replace: false });
        } catch (error) {
            setOnProses(false);
            const data = error.response.data;
            console.log(data);
            setErrorLainnya(data.kesalahanLainnya ? data.kesalahanLainnya : "");
            setErrorUsername(data.kesalahanInput.username ? data.kesalahanInput.username : "")
            setErrorPassword(data.kesalahanInput.password ? data.kesalahanInput.password : "")
        }
    }

    return (
        <>
            {errorLainnya ? (<div className="w-11/12 sm:w-[450px] border border-red-900 text-red-900 bg-red-300 rounded-md m-auto mt-3 p-4">{errorLainnya}</div>) : null}
            <form onSubmit={masuk} className="bg-white p-5 sm:p-10 w-11/12 sm:w-[450px] block m-auto mt-3 rounded-md shadow-md">
                <h1 className="font-bold text-xl text-center">Login Page</h1>
                <label className="my-5 block">
                    <div>Username</div>
                    <input type="text" name="username" value={username} onInput={(event) => { setErrorUsername(""); setUsername(event.target.value); }} className="border h-10 pl-3 pr-3 w-full rounded-md" />
                    {errorUsername ? (<div className="text-red-700">{errorUsername}</div>) : null}
                </label>
                <label className="my-5 block">
                    <div>Password</div>
                    <input type="password" name="password" value={password} onInput={(event) => { setErrorPassword(""); setPassword(event.target.value); }} className="border h-10 pl-3 pr-3 w-full rounded-md" />
                    {errorPassword ? (<div className="text-red-700">{errorPassword}</div>) : null}
                </label>
                <div className="flex justify-between">
                    <div>
                        <a href="/register" onClick={(event) => { event.preventDefault(); navigate("/register", { replace: false }) }} className="text-blue-700 leading-10">Daftar</a>
                    </div>
                    <button type="submit" disabled={onProses} className="bg-blue-700 text-white h-10 pl-6 pr-6 rounded-md">{onProses ? (<><div className="inline-block w-5 h-5 animate-spin border-4 border-blue-500 border-r-white align-middle rounded-full"></div> <span className="inline-block ml-1 align-middle">Proses</span></>) : "Masuk"}</button>
                </div>
            </form>
        </>
    )
}

export default Login;