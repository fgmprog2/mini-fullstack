import axios from "axios";
import { useEffect, useState } from "react";
import jwtDecode from "jwt-decode";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
    const [nama, setNama] = useState("");
    const [token, setToken] = useState("");
    const [kadaluwarsa, setKadaluwarsa] = useState("");
    const navigate = useNavigate();
    const [dataUser, setDataUser] = useState([]);

    useEffect(() => {
        refreshToken();
    }, [])

    const refreshToken = async () => {
        try {
            const response = await axios.get("http://localhost:5000/token");
            setToken(response.data.aksesToken);
            const decoded = jwtDecode(response.data.aksesToken);
            setNama(decoded.nama);
            setKadaluwarsa(decoded.exp);
        } catch (error) {
            if (error.response) {
                navigate("/", { replace: false })
            }
        }
    }

    const axiosJWT = axios.create();

    axiosJWT.interceptors.request.use(async (config) => {
        const sekarang = new Date();
        if (kadaluwarsa * 1000 < sekarang) {
            const response = await axios.get("http://localhost:5000/token");
            config.headers.Authorization = `Bearer ${response.data.aksesToken}`;
            setToken(response.data.aksesToken);
            const decoded = jwtDecode(response.data.aksesToken);
            setNama(decoded.nama);
            setKadaluwarsa(decoded.exp);
        }
        return config;
    }, (error) => {
        return Promise.reject(error);
    })

    const getAllUsers = async () => {
        const response = await axiosJWT.get("http://localhost:5000/daftar-user", {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })

        setDataUser(response.data);
    }
    return (
        <>
            <header className="bg-white p-5 flex justify-between shadow-sm">
                <h1 className="font-semibold">Aplikasi Fullstack</h1>
                <button onClick={async () => { await axios.delete("http://localhost:5000/keluar"); navigate("/", { replace: false }); }}>Logout</button>
            </header>
            <main className="container m-auto mt-3">
                <h2>Selamat datang kembali : {nama}</h2>
                <button className="text-white bg-blue-700 rounded-md h-10 pl-6 pr-6 mt-3" onClick={getAllUsers}>Get All User</button>
                <table className="mt-3">
                    <thead>
                        <tr>
                            <th className="border h-10 pl-6 pr-6 border-gray-400 text-white bg-slate-500" >#</th>
                            <th className="border h-10 pl-6 pr-6 border-gray-400 text-white bg-slate-500" >Username</th>
                            <th className="border h-10 pl-6 pr-6 border-gray-400 text-white bg-slate-500" >Nama</th>
                        </tr>
                    </thead>
                    <tbody>
                        {dataUser.length ?
                            dataUser.map((item, index) => (
                                <tr key={index}>
                                    <td className="border border-gray-400 bg-white pl-6 pr-6">{index + 1}</td>
                                    <td className="border border-gray-400 bg-white pl-6 pr-6">{item.username}</td>
                                    <td className="border border-gray-400 bg-white pl-6 pr-6">{item.nama}</td>
                                </tr>
                            )
                            ) : null}
                    </tbody>
                </table>
            </main>
        </>
    )
}

export default Dashboard;