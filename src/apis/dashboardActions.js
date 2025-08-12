import axios from "./baseUrl";

export const fetchAdminDashboardStatistics = async ( token, setStatistics, setError, setFetching ) => {

    setFetching(true);

    try{
        const response  = await axios.get(`admin-dashboard-statistics`,
            {
                headers: { 'Accept' : 'application/json', 'Authorization' : `Bearer ${token}` }
            }
        );    

        console.log(response.data);
        setStatistics(response.data);
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


export const fetchtVendorSummary = async ( token, setSummary, setError, setFetching ) => {

    setFetching(true);

    try{
        const response  = await axios.get(`vendor-category-summary`,
            {
                headers: { 'Accept' : 'application/json', 'Authorization' : `Bearer ${token}` }
            }
        );    

        console.log(response.data);
        setSummary(response.data);
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


export const fetchVendorsScopeSummary = async ( token, setScopeArray, setError, setFetching ) => {

    setFetching(true);

    try{
        const response  = await axios.get(`vendor-scope-summary`,
            {
                headers: { 'Accept' : 'application/json', 'Authorization' : `Bearer ${token}` }
            }
        );    

        console.log(response.data);
        setScopeArray(response.data);
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
