import { useEffect } from 'react';
import Nav from './partials/Nav.js';
import Goteborg from './goteborg.jpg';
import NewYork from './newyork.jpg';


export default function Gallery() {
    useEffect(() => {
      /* // Loop through local storage
      for (let i = 0; i < localStorage.length; i++) {
        // Grab the data from local storage
        let dataImage = localStorage.getItem(localStorage.key(i));
        // Grab the gallery container
        let galleryContainer = document.querySelector('#gallery-container');
        // Create a new image element and add the src
        let node = document.createElement("IMG");
        node.src = "data:image/png;base64," + dataImage;
        galleryContainer.appendChild(node);
      } */
      
      let dataImage = localStorage.getItem('imgData');
      let exampleImg = document.querySelector('#image-example');
      exampleImg.src = "data:image/png;base64," + dataImage;
      let imgDownload = document.querySelector('#image-download');
      imgDownload.href = "data:image/png;base64," + dataImage;
      imgDownload.download = dataImage;
      let geoExample = document.querySelector('#geo-example');
      geoExample.innerHTML = localStorage.getItem('geoData');
    }, []);

    return (
      <div className="App">
        <Nav />
        <div id="gallery-container">
            <div className="photo-container">
                <img src={Goteborg} alt="Gothenburg in the sunset" />
                <p>Sweden<br />Göteborg<br />Första Långgatan</p>
                <a href={Goteborg} download="Gothenburg">Download</a>
            </div>
            <div className="photo-container">
                <img src={NewYork} alt="New York in the sunset" />
                <p>USA<br />New York<br />Central Park</p>
                <a href={NewYork} download="New York">Download</a>
            </div>
            <div className="photo-container">
                <img id="image-example" src="" alt="" />
                <p id="geo-example"></p>
                <a href="" download="" id="image-download">Download</a>
            </div>
        </div>
      </div>
    );
}
