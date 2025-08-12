import axios from "./baseUrl";

export const fetchAllVendors = async ( token, setVendors, setError, setFetching ) => {

    setFetching(true);

    try{
        const response  = await axios.get(`registrations`,
            {
                headers: { 'Accept' : 'application/json', 'Authorization' : `Bearer ${token}` }
            }
        );    

        console.log(response.data);
        setVendors(response.data);
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