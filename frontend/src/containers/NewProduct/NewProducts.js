import React from 'react';
import {useSelector} from "react-redux";
import {toast} from "react-toastify";

const NewProducts = ({history}) => {
    const user  = useSelector( state => state.users.user);

    if(!user) {
        history.push("/login");
        toast.warn('You need login!', {
            position: "top-right",
            autoClose: 3500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    }
    return (
        <div>

        </div>
    );
};

export default NewProducts;