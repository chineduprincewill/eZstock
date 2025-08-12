import axios from "./baseUrl";

export const dispatchRequest = async ( token, data, setSuccess, setError, setDispatching ) => {

    setDispatching(true);

    try{
        const response  = await axios.post(`dispatch`,
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

    setDispatching(false);
}

export const fetchDispatches = async ( token, setDispatches, setError, setFetching ) => {

    setFetching(true);

    try{
        const response  = await axios.get(`dispatches`,
            {
                headers: { 'Accept' : 'application/json', 'Authorization' : `Bearer ${token}` }
            }
        );    

        console.log(response.data);
        setDispatches(response.data);
    }
    catch (err) {
        if (!err?.response) {
            setError('No Response from Server');
        } else {
            console.log(err.response.data);
            setError(err.response.data);
        }
    }

    setFetching(false);
}

export const acknowledgeDispatch = async ( token, data, setSuccess, setError, setAcknowledging ) => {

    setAcknowledging(true);

    try{
        const response  = await axios.post(`acknowledge-dispatch`,
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

    setAcknowledging(false);
}

export const fetchDispatchHistory = async ( token, data, setHistory, setError, setFetching ) => {

    setFetching(true);

    try{
        const response  = await axios.post(`dispatch-history`,
            data,
            {
                headers: { 'Accept' : 'application/json', 'Authorization' : `Bearer ${token}` }
            }
        );    

        console.log(response.data);
        setHistory(response.data);
    }
    catch (err) {
        if (!err?.response) {
            setError('No Response from Server');
        } else {
            console.log(err.response.data);
            setError(err.response.data);
        }
    }

    setFetching(false);
}