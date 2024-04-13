import {Link} from "react-router-dom";
import { BASE_URL } from "../config.js";
import { useEffect } from "react";
const CheckoutSuccess = ()=>{

    useEffect(() => {
        // Fetch data from the backend when the component mounts
        const fetchData = async () => {
            try {
                const response = await fetch(`${BASE_URL}/checkout-success/:id`);
                if (!response.ok) {
                    throw new Error('Failed to fetch data');
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData(); // Call the fetchData function
    }, []);

    return(
        <div className="bg-gray-100 h-screen">
            <div className="bg-white p-6 md:mx-auto">
            <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="100" className="text-green-600 w-16 h-16 mx-auto my-6" height="100" viewBox="0 0 512 512">
                <path fill="#32BEA6" d="M504.1,256C504.1,119,393,7.9,256,7.9C119,7.9,7.9,119,7.9,256C7.9,393,119,504.1,256,504.1C393,504.1,504.1,393,504.1,256z"></path><path fill="#FFF" d="M392.6,172.9c-5.8-15.1-17.7-12.7-30.6-10.1c-7.7,1.6-42,11.6-96.1,68.8c-22.5,23.7-37.3,42.6-47.1,57c-6-7.3-12.8-15.2-20-22.3C176.7,244.2,152,229,151,228.4c-10.3-6.3-23.8-3.1-30.2,7.3c-6.3,10.3-3.1,23.8,7.2,30.2c0.2,0.1,21.4,13.2,39.6,31.5c18.6,18.6,35.5,43.8,35.7,44.1c4.1,6.2,11,9.8,18.3,9.8c1.2,0,2.5-0.1,3.8-0.3c8.6-1.5,15.4-7.9,17.5-16.3c0.1-0.2,8.8-24.3,54.7-72.7c37-39.1,61.7-51.5,70.3-54.9c0.1,0,0.1,0,0.3,0c0,0,0.3-0.1,0.8-0.4c1.5-0.6,2.3-0.8,2.3-0.8c-0.4,0.1-0.6,0.1-0.6,0.1l0-0.1c4-1.7,11.4-4.9,11.5-5C393.3,196.1,397,184.1,392.6,172.9z"></path>
        </svg>
                <div className="text-center">
                    <h3 className="md:text-2xl text-base text-headingColor font-semibold text-center">
                        Payment Done!
                    </h3>
                    <p className="text-gray-600 my-2">
                        Thankyou for completing your secure payment
                    </p>
                    <p>Have a great day!</p>
                    <div className="py-10 text-center">
                        <Link to="/home" className="px-12 bg-primaryColor text-white font-semibold rounded-md py-3">
                            Go back to home
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CheckoutSuccess;