import { ReactComponent as Centang } from "../icons/centang.svg";
import { ReactComponent as Tanya } from "../icons/tanya.svg";
import { ReactComponent as Seru } from "../icons/seru.svg";
import { useState } from "react"

export const Sukses = ({ judul, pesan, callBack } = {}) => {
    const [iconShow, setIconShow] = useState(true);
    const [popUpShow, setPopUpShow] = useState(true);

    const popUpHide = () => {
        setIconShow(false);
        setTimeout(() => {
            setPopUpShow(false);
            setTimeout(() => {
                if (callBack) callBack();
                setPopUpShow(true);
                setIconShow(true);
            }, 200);
        }, 200);
    }

    return !pesan ? null : (
        <div className="fixed top-0 right-0 bottom-0 left-0 bg-gray-700/75">
            <div className={`bg-white w-10/12 p-6 sm:w-96 sm:p-8 rounded-md absolute right-1/2 translate-x-1/2 -translate-y-1/2 ${popUpShow ? "animate-pop-up-show" : "animate-pop-up-hide"}`}>
                <div className={`grid place-items-center h-28 w-28 border-4 border-green-600 rounded-full p-5 m-auto mb-8 opacity-0 ${iconShow ? "animate-icon-show" : "animate-icon-hide"}`}>
                    <Centang className={`w-9/12 fill-green-600`} />
                </div>
                {judul ? (<h1 className="text-2xl text-center mb-8 font-semibold">{judul.toUpperCase()}</h1>) : ""}
                <p className="mb-8">{pesan}</p>
                <button className="bg-green-600 text-white h-10 w-full m-auto rounded-md block" onClick={popUpHide}>OK</button>
            </div>
        </div>
    )
}

export const Konfirmasi = ({ judul, pesan, callBackYa, callBackTidak } = {}) => {
    const [iconShow, setIconShow] = useState(true);
    const [popUpShow, setPopUpShow] = useState(true);

    const [respon, setRespon] = useState(false);

    const popUpHide = () => {
        setIconShow(false);
        setTimeout(() => {
            setPopUpShow(false);
            setTimeout(() => {
                if (respon && callBackYa) callBackYa();
                else if (!respon && callBackTidak) callBackTidak();
                setPopUpShow(true);
                setIconShow(true);
            }, 200);
        }, 200);
    }

    return !pesan ? null : (
        <div className="fixed top-0 right-0 bottom-0 left-0 bg-gray-700/75">
            <div className={`bg-white w-10/12 p-6 sm:w-96 sm:p-8 rounded-md absolute right-1/2 translate-x-1/2 -translate-y-1/2 ${popUpShow ? "animate-pop-up-show" : "animate-pop-up-hide"}`}>
                <div className={`grid place-items-center h-28 w-28 border-4 border-yellow-500 rounded-full p-5 m-auto mb-8 opacity-0 ${iconShow ? "animate-icon-show" : "animate-icon-hide"}`}>
                    <Tanya className={`w-5/12 fill-yellow-500`} />
                </div>
                {judul ? (<h1 className="text-2xl text-center mb-8 font-semibold">{judul.toUpperCase()}</h1>) : ""}
                <p className="mb-8">{pesan}</p>
                <div className="flex gap-4">
                    <button className="bg-green-600 text-white h-10 w-1/2 m-auto rounded-md block" onClick={() => { setRespon(true); popUpHide(); }}>YA</button>
                    <button className="bg-red-700 text-white h-10 w-1/2 m-auto rounded-md block" onClick={() => { setRespon(false); popUpHide(); }}>TIDAK</button>
                </div>
            </div>
        </div>
    )
}

export const Gagal = ({ judul, pesan, callBack } = {}) => {
    const [iconShow, setIconShow] = useState(true);
    const [popUpShow, setPopUpShow] = useState(true);

    const popUpHide = () => {
        setIconShow(false);
        setTimeout(() => {
            setPopUpShow(false);
            setTimeout(() => {
                if (callBack) callBack();
                setPopUpShow(true);
                setIconShow(true);
            }, 200);
        }, 200);
    }

    return !pesan ? null : (
        <div className="fixed top-0 right-0 bottom-0 left-0 bg-gray-700/75">
            <div className={`bg-white w-10/12 p-6 sm:w-96 sm:p-8 rounded-md absolute right-1/2 translate-x-1/2 -translate-y-1/2 ${popUpShow ? "animate-pop-up-show" : "animate-pop-up-hide"}`}>
                <div className={`grid place-items-center h-28 w-28 border-4 border-red-700 rounded-full p-5 m-auto mb-8 opacity-0 ${iconShow ? "animate-icon-show" : "animate-icon-hide"}`}>
                    <Seru className={`w-3 fill-red-700`} />
                </div>
                {judul ? (<h1 className="text-2xl text-center mb-8 font-semibold">{judul.toUpperCase()}</h1>) : ""}
                <p className="mb-8">{pesan}</p>
                <button className="bg-red-700 text-white h-10 w-full m-auto rounded-md block" onClick={popUpHide}>OK</button>
            </div>
        </div>
    )
}