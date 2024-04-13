import { useContext, useState, useRef, useEffect } from "react";
import { BiMenu } from 'react-icons/bi'
import { authContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import useGetProfile from '../../hooks/useFetchData.jsx';
import { BASE_URL, token } from "../../config.js";
import HashLoader from "react-spinners/HashLoader";
import { toast } from "react-toastify";

const Tabs = ({ tab, setTab }) => {

    const { dispatch } = useContext(authContext);
    const [loading1, setLoading1] = useState(false);
    const navigate = useNavigate();
    const { data: userData, loading, error } = useGetProfile(`${BASE_URL}/doctors/profile/me`);
    const [showSideScreen, setShowSideScreen] = useState(false);
    const sideScreenRef = useRef(null);

    const handleLogout = () => {
        dispatch({
            type: "LOGOUT",
        })
        navigate('/');
    }

    const handleDelete = async () => {
        try {
            const res = await fetch(`${BASE_URL}/doctors/${userData._id}`, {
                method: 'delete',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            })
            const message = await res.json();
            if (!res.ok) {
                throw new Error(message);
            }
            setLoading1(false)
            toast.success(message);
            dispatch({
                type: "LOGOUT"
            })
            navigate('/login')
        } catch (err) {
            toast.error(err.message);
            setLoading1(false);
        }
    }

    const handleClickOutside = (event) => {
        if (sideScreenRef.current && !sideScreenRef.current.contains(event.target)) {
            setShowSideScreen(false);
        }
    };

    useEffect(() => {
        if (showSideScreen) {
            document.addEventListener("mousedown", handleClickOutside);
        } else {
            document.removeEventListener("mousedown", handleClickOutside);
        }
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [showSideScreen]);

    return (
        <div>
            <span className="lg:hidden" onClick={() => setShowSideScreen(!showSideScreen)}>
                <BiMenu className="w-6 h-6 cursor-pointer" />
            </span>

            {/* Side screen for small screens */}
            {showSideScreen && (
                <div className="fixed inset-0 z-10 bg-gray-800 bg-opacity-50 flex justify-end">
                    <div ref={sideScreenRef} className="bg-white w-64 h-full shadow-panelShadow flex flex-col justify-center items-center">
                        <button onClick={() => setTab('overview')} className={`${tab === 'overview' ? "bg-indigo-100 text-primaryColor" : "bg-transparent text-headingColor"} w-60 btn mt-0 rounded-md mb-4`}>OverView</button>
                        <button onClick={() => setTab('appointments')} className={`${tab === 'appointments' ? "bg-indigo-100 text-primaryColor" : "bg-transparent text-headingColor"} w-60 btn mt-0 rounded-md mb-4`}>Appointments</button>
                        <button onClick={() => setTab('settings')} className={`${tab === 'settings' ? "bg-indigo-100 text-primaryColor" : "bg-transparent text-headingColor"} w-60 btn mt-0 rounded-md mb-4`}>Profile</button>
                        <button className="w-60 bg-[#181A1E] p-3 text-[16px] leading-7 rounded-md text-white mb-2" onClick={handleLogout}>Logout</button>
                        <button className="w-60 bg-red-600 p-3 text-[16px] leading-7 rounded-md text-white" onClick={handleDelete}>{loading1 ? <HashLoader size={25} color='#ffffff' /> : 'Delete Account'}</button>
                    </div>
                </div>
            )}

            <div className="hidden lg:flex flex-col p-[30px] bg-white shadow-panelShadow items-center h-max rounded-md">
                <button onClick={() => setTab('overview')} className={`${tab === 'overview' ? "bg-indigo-100 text-primaryColor" : "bg-transparent text-headingColor"} w-full btn mt-0 rounded-md`}>OverView</button>
                <button onClick={() => setTab('appointments')} className={`${tab === 'appointments' ? "bg-indigo-100 text-primaryColor" : "bg-transparent text-headingColor"} w-full btn mt-0 rounded-md`}>Appointments</button>
                <button onClick={() => setTab('settings')} className={`${tab === 'settings' ? "bg-indigo-100 text-primaryColor" : "bg-transparent text-headingColor"} w-full btn mt-0 rounded-md`}>Profile</button>
                <div className="mt-[100px] w-full">
                    <button className="w-full bg-[#181A1E] p-3 text-[16px] leading-7 rounded-md text-white" onClick={handleLogout}>Logout</button>
                    <button className="w-full bg-red-600 mt-4 p-3 text-[16px] leading-7 rounded-md text-white" onClick={handleDelete}>{loading1 ? <HashLoader size={25} color='#ffffff' /> : 'Delete Account'}</button>
                </div>
            </div>
        </div>
    );
}

export default Tabs;
