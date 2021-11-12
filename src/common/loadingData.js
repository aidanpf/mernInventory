import {useEffect, useState} from 'react';

export const useFetcher = (url) => {
    const [state, setState] = useState({status: 'not sent'});
    useEffect(() => {
        fetch(url)
            .then(response => response.json())
            .then(data => {
                setState({status: 'success', data});
            })
        ;
    }, []);

    return state;
};

export const WithSpinner = ({fetcher, Component, passThrough}) => 
    fetcher.status === 'success'
        ? <Component data={fetcher.data} {...passThrough} />
        : <div>Loading</div>
    ;
;