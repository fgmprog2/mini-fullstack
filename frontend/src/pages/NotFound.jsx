import { useNavigate } from "react-router-dom";

const NotFound = () => {
    const navigate = useNavigate();
    return (
        <div className="bg-white mt-5 w-11/12 m-auto p-5 rounded-md sm:w-96">
            <h1 className="font-bold text-3xl text-center">Oops!</h1>
            <p className="mt-5 mb-5">Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus ea tenetur iste nihil sed quos magnam. Dignissimos ea ab tempore veniam. Pariatur quidem quisquam aliquid recusandae harum illum inventore numquam!</p>
            <a className="bg-blue-700 rounded-md h-10 w-full block text-white text-center leading-10" href="/" onClick={(event) => { event.stopPropagation(); navigate("/", { replace: false }) }}>Kembali Ke Beranda</a>
        </div>
    )
}

export default NotFound;