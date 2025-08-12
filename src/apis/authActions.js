import axios from "./baseUrl";

export const loginUser = async ( data, setSuccess, setError, setLoggingIn ) => {

    setLoggingIn(true);

    try{
        const response  = await axios.post(`login`,
            data,
            {
                headers: { 'Accept' : 'application/json' }
            }
        );    

        console.log(response.data);
        setSuccess(response.data);
    }
    catch (err) {
        if (!err?.response) {
            setError('No Response from Server');
        } else {
            console.log(err.response.data);
            setError(err.response.data);
        }
    }

    setLoggingIn(false);
}

export const resetUserPassword = async ( token, data, setSuccess, setError, setResetting ) => {

    setResetting(true);

    try{
        const response  = await axios.post(`reset-user-password`,
            data,
            {
                headers: { 'Accept' : 'application/json', 'Authorization' : `Bearer ${token}` }
            }
        );    

        console.log(response.data);
        setSuccess(response.data);
    }
    catch (err) {
        if (!err?.response) {
            setError('No Response from Server');
        } else {
            console.log(err.response.data);
            setError(err.response.data);
        }
    }

    setResetting(false);
}