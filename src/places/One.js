import React, {Component, useEffect, useState} from 'react';
import {Link, useParams} from 'react-router-dom';
import {Api} from '../common/data/urls';
import {useFetcher, WithSpinner} from '../common/loadingData';

export const One = ({mode}) => {
    const {id} = useParams();
    const fetcher = useFetcher(`${Api}/places/${id}`);
    
    return <WithSpinner fetcher={fetcher} Component={Ui} passThrough={{mode}} />  
  
};

const makeFormBindings = (formState) => {
    const [form, setForm] = formState;

    const textField = (fieldName) => ({
        onChange: (e) => setForm({
            ...form,
            [fieldName]: e.target.value
        }),
        value: form[fieldName],
        type: 'text',
        id: fieldName
    });

    return {textField};
};

const emptyPlace = {
    name: ''
};

const Ui = ({data, mode}) => {
    const [form, setForm] = useState(
        mode === 'add'
            ? emptyPlace
            : data
    );
    const {textField} = makeFormBindings([form, setForm]);
    const {id} = useParams();

    const create = () => {
        fetch(`${Api}/places/add`, {
            method: 'POST', 
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: form.name
            })
        }).then((response) => {
            if(response.status === 200) {
                // api call button
                alert('Place added');
            }
        });
    };

    const edit = () => {
        fetch(`${Api}/places/update/${id}`, {
            method: 'POST', 
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: form.name
            })
        }).then((response) => {
            if(response.status === 200) {
                // api call button
                alert('Place updated');
            }
        });
    };

    const deletePlace = () => {
        fetch(`${Api}/places/${id}`, {
            method: 'DELETE'
        }).then((response) => {
            if(response.status === 200) {
                // api call button
                alert('Place deleted');
            }
        });
    };

    return <>
        <div>
            <Link to='/'>Home</Link> {'>'} 
            <Link to='/places/'>Places</Link> {'>'} 
            <span>Add</span>
        </div>
        <br/>
        <div>
            <label forName='name'>Name: </label>
            <input 
                {...textField('name')}
            />
        </div>
        <br/>
        <div>
            {mode === 'edit'
                ? <button onClick={edit}>Update place</button>
                : <button onClick={create}>Save new place</button>
            }           
        </div>
        

        {mode === 'edit' && 
            <button onClick={deletePlace}>Delete place</button>
        }
    </>;
};