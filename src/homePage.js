import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import FileViewer from './page3';
import './App.css'
import imageTiles from './imageTile'

function Search() {

    const [query, setQuery] = useState('');
    const [searchOptions, setSearchOptions] = useState([]);
    const [triggeredSearch, setTriggerSearched] = useState('yes')

    useEffect(() => {
        if (query.trim() !== '') {
            const image_tiles = imageTiles.filter(image => 
                image.title.includes(query.toLowerCase()))
            setSearchOptions(image_tiles)

        } else {
            setSearchOptions([]);
        }
    }, [query]);


    const handleInputChange = (event) => {
        setQuery(event.target.value);
    }

    const handleSearch = (query) => {
        if(searchOptions.length === 0){
            setTriggerSearched('no')
        }
        else{
            setTriggerSearched('yes')
        // Open a new tab and render the FileViewer component
        const newTab = window.open('', '_blank');
        if(newTab){
            newTab.document.title = 'YakshaKosha/resources';
            newTab.document.write(`<title>Kosha</title>
                <div id="file-viewer"></div>`);
            newTab.document.close(); //to signal completion of document construct
            const root = ReactDOM.createRoot(newTab.document.getElementById('file-viewer'));
            root.render(<FileViewer query={query} />);
        }   
        else
            alert('Popup blocked! Please allow popups to see the search results.');
    }};

    return (
    <>
        <div className='search-container'>
            <input type="text" onChange={handleInputChange} className='searchBar'
            value={query} />

            <button onClick={() => handleSearch(query)} className="searchButton">Search</button>
            <div className='pictureBoxContainer'>
                {searchOptions.map((image) => (
                    <div key={image.title} className="pictureBox">
                        <img alt={image.title} src={image.path} className="pictureBox" onClick={() => handleSearch(image.title)}/>
                    </div>
                ))}
            </div>
        </div>
        {triggeredSearch ==='no' && query &&(
              <p className='message' >Oops! No search reults found:(</p>
        )}
    </>
    );
}

export default Search;
