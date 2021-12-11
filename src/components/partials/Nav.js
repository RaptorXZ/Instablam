import { Link } from "react-router-dom";

const Nav = () => {
    return (
        <nav>
            <div className="App-header">
                <div className="header-left">
                    <Link to="/">
                        <h3>Instablam<span>&copy;</span></h3>
                    </Link>
                </div>
                <div className="header-right">
                    <Link to="/">
                        <h3>Camera</h3></Link><Link to="/gallery"><h3>Gallery</h3>
                    </Link>
                </div>
            </div>
        </nav>
    )
}

export default Nav;