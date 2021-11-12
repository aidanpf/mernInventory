import React, {Component, useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import {Api} from '../common/data/urls';
import {useFetcher, WithSpinner} from '../common/loadingData';

export const List = () => {
    const fetcher = useFetcher(`${Api}/places/`);
    return <WithSpinner fetcher={fetcher} Component={Ui} />;
};

export const Ui = ({data}) => {
    return <>
        <div>
            <Link to='/'>Home</Link> {'>'} 
            <span>Places</span>
        </div>
        <ul>
            {data.map((place) => 
                <li>
                    <span>
                        {place.name}
                    </span>{' - '} 
                    <Link to={`/places/${place._id}`}>
                        edit
                    </Link>
                </li>
            )}    
        </ul>
        <Link to={'/places/add'}>Add place</Link>
    </>;
}