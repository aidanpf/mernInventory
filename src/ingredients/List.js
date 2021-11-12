import React, {Component, useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import {Api} from '../common/data/urls';
import {useFetcher, WithSpinner} from '../common/loadingData';

export const List = () => {
    const ingredients = useFetcher(`${Api}/ingredients/`);
    const places = useFetcher(`${Api}/places/`);
    return <WithSpinner fetcher={{ingredients, places}} Component={Ui} />;
};

export const Ui = ({data}) => {
    return <>
        <div>
            <Link to='/'>Home</Link> {'>'} 
            <span>Ingredients</span>
        </div>
        <ul>
            {data.map((item) => 
                <li>
                    <span>{item.name}</span>{' - '} 
                    <Link to={`/ingredients/${item._id}`}>
                        edit
                    </Link>
                </li>
            )}    
        </ul>
        <Link to={'/ingredients/add'}>Add ingredient</Link>
    </>;
}