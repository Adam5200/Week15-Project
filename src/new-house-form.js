import React, { useState } from 'react';

export const NewHouseForm = (props) => {
    const [name, setName] = useState('');

    //function called when you click the submit button, sends the name of the new house and clears the text input
    const onSubmit = (e) => {
        e.preventDefault();
        props.addNewHouse({ name: name });
        setName('');
    };

    return (
        <div>
            <h4>Add a new house </h4>
            <form onSubmit={onSubmit}>
                <input
                    type='text'
                    placeholder='Name of House'
                    onChange={(e) => setName(e.target.value)}
                    value={name}
                />
                <button type='submit'>Add House</button>
            </form>
        </div>
    )
};