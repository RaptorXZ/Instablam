import { useEffect } from 'react';
import './Media.css'

const Notifications = () => {

    // Runs once, when the component mounts
    useEffect(() => {
        
        const notify = document.querySelector('#notify');

        // Make sure notifications are supported
        if('Notification' in window) {
            if(Notification.permission === 'granted' || 'default') {
                notify.innerText = "Notifications enabled";
            }
            else { 
                notify.innerText = "Notifications disabled";
            }
        }
    }, []);

    return (
        <h3 id="notify">Notifications disabled</h3>
    )
}

export function Notify() {
    // Make sure notifications are supported
    if('Notification' in window) {
        if(Notification.permission === 'granted' || 'default') {
            showNotification();
        }
        else {
            askPermission();
        }
    }
}

async function askPermission() {
    if('Notification' in window) {
        const notify = document.querySelector('#notify');

        Notification.requestPermission().then((result) => {
            if(result === 'granted' || 'default') {
                notify.innerText = "Notifications enabled";
                showNotification();
            }
            else { 
                notify.innerText = "Notifications disabled";
            }
        });
    };
}

async function showNotification() {
    const img = '../public/notification.svg';
    const text = 'New image added to gallery!';
    const notification = new Notification('New image',
        { body: text, icon: img });
    
}

export default Notifications;