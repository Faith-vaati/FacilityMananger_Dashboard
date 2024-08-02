import React, { useEffect, useState } from 'react';

const useFetch = (url) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const fetchData = async () => {
        setLoading(true);
        try {
            const response = await fetch(url);
            const data = await response.json();
            setData(data);
        } catch (error) {
            setError(error.message);
        }
        setLoading(false);
    };

    useEffect(() => { 
        fetchData();
    }, []);

    const reFetch = () => {
        setLoading(true);
        fetchData();
    };

    return { data, loading, error, reFetch, setLoading };
};

export default useFetch;