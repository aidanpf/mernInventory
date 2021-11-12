import React, {Component, useEffect, useState} from 'react';
import {Link} from 'react-router-dom';

export const Home = () => {
    return <ul>
        <li><Link to={'/ingredients/'} >Ingredients</Link></li>
        <li><Link to={'/places/'} >Places</Link></li>
    </ul>;
};