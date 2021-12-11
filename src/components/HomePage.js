import Nav from './partials/Nav.js';
import Camera from './media/Camera.jsx';
import Notifications from './media/Notifications.js';

export default function HomePage() {
    return (
      <div className="App">
        <Nav />
        <Camera />
        <Notifications />
      </div>
    );
}
