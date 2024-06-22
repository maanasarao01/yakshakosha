import React, { useState, useEffect } from 'react';
import './App.css'
import imageTiles from './imageTile'
import { useNavigate } from 'react-router-dom';

function Search() {

    const navigate = useNavigate();

    const [query, setQuery] = useState('');
    const [searchOptions, setSearchOptions] = useState(imageTiles);

    useEffect(() => {
        if (query.trim() !== '') {
            const image_tiles = imageTiles.filter(image => 
                image.title.includes(query.toLowerCase()))
            setSearchOptions(image_tiles)

        } else {
            setSearchOptions(imageTiles);
        }
    }, [query]);


    const handleInputChange = (event) => {
        setQuery(event.target.value);
    }

    const handleSearch = (query) => {
        navigate('/file-viewer', {state: { query }});
    };

    return (
    <>
        <div className='search-container'>
            <input type="text" onChange={handleInputChange} className='searchBar'
            value={query} placeholder='Search Prasanga'/>
            <div className='pictureBoxContainer'>
                {searchOptions.map((image) => (
                    <div key={image.title} className="pictureBox">
                        <img alt={image.title} src={image.path} className="pictureBox" onClick={() => handleSearch(image.title)}/>
                    </div>
                ))}
            </div>
        </div>
    </>
    );
}

export default Search;
