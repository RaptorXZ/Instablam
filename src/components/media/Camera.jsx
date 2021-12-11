import { useState, useEffect, useRef } from 'react';
import { Geolocator } from './Geolocator.js';
import { Notify } from './Notifications.js';
import './Media.css';

// Global variables
let videoStream = null;
let facing = 'user';

const Camera = () => {
    const [canUseMd, setCanUseMd] = useState(false);
    const [statusMessage, setStatusMessage] = useState('');
    const [cameraIsOn, setCameraIsOn] = useState(false);
    const videoRef = useRef(null);
    const handleCameraToggle = () => {
        if( cameraIsOn ) {
            cameraOff(videoRef.current, () => setCameraIsOn(false));
        } else {
            cameraOn(videoRef.current, setStatusMessage, () =>
            setCameraIsOn(true));
        }
    }

    useEffect(() => {
        // Runs once, when the component mounts
        setCanUseMd( 'mediaDevices' in navigator );
    }, []);

    return (
        <div>
            <div id="camera-container">
                {canUseMd ? <video ref={videoRef}></video> : null}
                <div id="media-button-container">
                    <button className="media-button" onClick={handleCameraToggle}>
                        <span className="material-icons md-light md-48 video-icon">
                        { cameraIsOn ? 'videocam_off' : 'videocam' }
                        </span>
                    </button>
                    <button disabled className="media-button" id="take-photo">
                        <span className="material-icons md-light md-48 video-icon">
                            add_a_photo
                        </span>
                    </button>
                    <button disabled className="media-button" id="flip-camera">
                        <span className="material-icons md-light md-48 video-icon">
                            flip_camera_ios
                        </span>
                    </button>
                    <p> {statusMessage} </p>
                </div>
            </div>
            <div className="hidden" id="photo-container">
                <img id="new-photo" alt="Newest" />
                <p>What a lovely picture! Save it to the gallery?</p>
                <button onClick={saveImage}>Yes!</button><button onClick={gobacktoCamera}>No!</button>
                <p id="photo-location"></p>
            </div>
        </div>
    )
}

async function cameraOff(videoElement, whenDone) {
    if (!videoStream)
        return;

    let tracks = videoStream.getTracks();
    tracks.forEach(track => track.stop());

    videoElement.srcObject = null;
    document.querySelector('#take-photo').disabled = true;
    document.querySelector('#flip-camera').disabled = true;

    whenDone();
}

async function cameraOn(videoElement, showMessage, whenDone) {
    const constraints = {
        video: {
            width: 400,
            height: 300,
            aspectRatio: { ideal: 1.7777777778 },
            facingMode: { facing }
          }
    }
    try {
        videoStream = await navigator.mediaDevices.getUserMedia(constraints)
        videoElement.srcObject = videoStream

        const snapshotButton = document.querySelector('#take-photo');
        const facingButton = document.querySelector('#flip-camera');
        snapshotButton.disabled = false;
        snapshotButton.addEventListener("click", snapShot);
        facingButton.disabled = false;
        facingButton.addEventListener("click", changeFacing);

        videoElement.addEventListener('loadedmetadata', () => {
            videoElement.play();
            whenDone();
        });
    } catch(error) {
        console.log('Could not use camera: ', error);
        showMessage('Sorry, could not display camera. Have you granted permission?');
    }
}

async function snapShot(videoElement) {
    try {
        let stream = await navigator.mediaDevices.getUserMedia(
            { video: true });
        let imageCapture = new ImageCapture(
            stream.getVideoTracks()[0]);
        let blob = await imageCapture.takePhoto();

        let imgElement = document.querySelector('#new-photo');
        imgElement.src = URL.createObjectURL(blob);
        
        Geolocator();
        showNewphoto();

    } catch(error) { console.log(error); }
}

async function saveImage() {
    let imgElement = document.querySelector('#new-photo');

    // Save image to local storage
    let base64Image = await getBase64Image(imgElement);
    localStorage.setItem('imgData', base64Image);

    Notify();
    gobacktoCamera();
}

function getBase64Image(img) {
    let canvas = document.createElement("canvas");
    canvas.width = img.width;
    canvas.height = img.height;

    let ctx = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0, img.width, img.height);

    let dataURL = canvas.toDataURL("image/png");

    return dataURL.replace(/^data:image\/(png|jpg);base64,/, "");
}

async function showNewphoto() {
    const photoContainer = await document.querySelector('#photo-container');
    const cameraContainer = await document.querySelector('#camera-container');
    if(photoContainer) {
        photoContainer.classList.remove("hidden");
    }
    if(cameraContainer) {
        cameraContainer.classList.add("hidden");
    }
}

async function gobacktoCamera() {
    const photoContainer = await document.querySelector('#photo-container');
    const cameraContainer = await document.querySelector('#camera-container');
    if(photoContainer) {
        photoContainer.classList.add("hidden");
    }
    if(cameraContainer) {
        cameraContainer.classList.remove("hidden");
    }
}

function changeFacing() {
    if ( facing === 'user' ) {
        facing = 'environment';
    } else {
        facing = 'user';
    }
}

export default Camera;