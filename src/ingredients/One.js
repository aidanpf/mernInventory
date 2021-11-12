import React, {Component, useEffect, useState} from 'react';
import {Link, useParams} from 'react-router-dom';
import {Api} from '../common/data/urls';
import {useFetcher, WithSpinner} from '../common/loadingData';

export const One = ({mode}) => {
    const {id} = useParams();
    const fetcher = useFetcher(`${Api}/ingredients/${id}`);
    
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

const emptyIngredient = {
    name: ''
};

const Ui = ({data, mode}) => {
    const [form, setForm] = useState(
        mode === 'add'
            ? emptyIngredient
            : data
    );
    const {textField} = makeFormBindings([form, setForm]);
    const {id} = useParams();

    const create = () => {
        fetch(`${Api}/ingredients/add`, {
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
                alert('Ingredient added');
            }
        });
    };

    const edit = () => {
        fetch(`${Api}/ingredients/update/${id}`, {
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
                alert('Ingredient updated');
            }
        });
    };

    const deleteIngredient = () => {
        fetch(`${Api}/ingredients/${id}`, {
            method: 'DELETE'
        }).then((response) => {
            if(response.status === 200) {
                // api call button
                alert('Ingredient deleted');
            }
        });
    };

    return <>
        <div>
            <Link to='/'>Home</Link> {'>'} 
            <Link to='/ingredients/'>Ingredients</Link> {'>'} 
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
                ? <button onClick={edit}>Update ingredient</button>
                : <button onClick={create}>Save new ingredient</button>
            }           
        </div>
        

        {mode === 'edit' && 
            <button onClick={deleteIngredient}>Delete ingredient</button>
        }
    </>;
};