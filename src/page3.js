import React , {useState, useEffect} from 'react';
import videoLinks from './media.json';
import './App.css'
import { useLocation } from 'react-router-dom';

function FileViewer() {
    
    const location = useLocation();
    const query = location.state?.query;

    const [filteredLinks, setFilteredLinks] = useState([]);
    const [selectedPdf, setSelectedPdf] = useState(() => {return fetchFile('prasangaPrathi')});
    const [selectedStory, setSelectedStory] = useState(() => {return fetchFile('story')});
    const [content, setContent] = useState("prasangaPrathi");

    useEffect(()=>{
        presetMediaLink();
    })

    function fetchFile (endpoint) {

        // Fetch the PDF file
        const server_url = `https://server-uh0b.onrender.com`
        fetch(`${server_url}/yakshagana/search/${endpoint}?query=${query}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to fetch PDF');
                }
                if (endpoint === 'prasangaPrathi') {
                    return response.blob(); // Fetch PDF as blob
                } else {
                    return response.text(); 
                }
            })
            .then(data => {
                // Handle the fetched data accordingly
                if (endpoint === 'prasangaPrathi') {
                    const pdfUrl = URL.createObjectURL(data);
                    setSelectedPdf(pdfUrl);
                } else {
                    setSelectedStory(data);
                }
            })
            .catch(error => {
                console.error('Error fetching ',endpoint, error);
            });
    };

    const presetMediaLink = ()=>{
        const filtered = videoLinks.filter(link =>
            link.title.includes(query.toLowerCase())
        );
        setFilteredLinks(filtered);
    }

    const openYoutubeVideo =() =>{
        if (filteredLinks.length > 0) {
            window.open(filteredLinks[0].link, '_blank');
        } 
    };

    return (
        <div className='file-viewer-container'>

            <h2>Prasanga Prathi</h2>
            <button onClick={() => setContent("prasangaPrathi")}>Open PDF</button>

           {selectedStory &&(
            <>
            <h2>Story & Ranga nade</h2>
            <button onClick={() => setContent('story')}>Text File Viewer</button>
            </>
           )} 

            {content === "prasangaPrathi" && selectedPdf && (
                <iframe src={selectedPdf} type='application/pdf' style={{position: "absolute", 
                    left:"380px", top:"30px", padding: "10px", width:"645px", height:"500px"}} ></iframe>
            )}
            {content === "story" && selectedStory && (
                <textarea value={selectedStory} 
                style={{position:"absolute", left:"380px", width:"600px", height:"500px", padding:"10px", 
                    top:"30px", border_radius:"8px", box_sizing:"border-box", border_color:"lightgray"}}readOnly/>
            )}
          
            <h2>Youtube video</h2>
            <button onClick={openYoutubeVideo} >Media File Viewer</button>
            
        </div>
    );
}

export default FileViewer;
