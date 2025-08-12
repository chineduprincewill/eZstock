import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
    const navigate = useNavigate();

    useEffect(() => {
        if(!localStorage.getItem('token') || localStorage.getItem('token') === null){
            navigate('/');
            //window.location.assign('https://apps.apin.org.ng/sitroom/situation-login.php');
        }
    }, [children])

    return children;
}

export default PrivateRoute