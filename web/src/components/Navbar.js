import {
    HashRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";

import { useState } from 'react'
import PageHome from "./PageHome"
import PageDownload from "./PageDownload"
import PageLeaderboard from "./PageLeaderboard"
import PageAbout from "./PageAbout"
// about imports, ref: https://stackoverflow.com/a/41322914

const Navbar = () => {
    const pageRoot = ""

    const initialState = {
        "Home": false,
        "Download": false,
        "Leaderboard": false,
        "About": false,
    }

    const [activePage, setActivePage] = useState({
        "Home": true,
        "Download": false,
        "Leaderboard": false,
        "About": false,
    })

    const handleNavOnClick = (e) => {
        // console.log(e.target.name)
        setActivePage({...initialState, [e.target.name]:true})
    }

    return (
        <Router>
            <nav className="navbar navbar-expand-sm navbar-dark bg-dark" style={{minWidth:400}}> 
                <div className="container">
                    <Link className={activePage.Home? "navbar-brand active" : "navbar-brand"} name="Home" onClick={handleNavOnClick} to={pageRoot + "/"}>SUTD-TrafficQA</Link>

                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <Link className={activePage.Home? "nav-link active" : "nav-link"} name="Home" onClick={handleNavOnClick} to={pageRoot + "/"}>Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link className={activePage.Download? "nav-link active" : "nav-link"} name="Download" onClick={handleNavOnClick} to={pageRoot + "/download"}>Download</Link>
                            </li>
                            <li className="nav-item">
                                <Link className={activePage.Leaderboard? "nav-link active" : "nav-link"} name="Leaderboard" onClick={handleNavOnClick} to={pageRoot + "/leaderboard"}>Leaderboard</Link>
                            </li>
                            <li className="nav-item">
                                <Link className={activePage.About? "nav-link active" : "nav-link"} name="About" onClick={handleNavOnClick} to={pageRoot + "/about"}>About</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>

            <Switch>
                <Route path={pageRoot + "/download"} component={PageDownload} />
                <Route path={pageRoot + "/leaderboard"} component={PageLeaderboard} />
                <Route path={pageRoot + "/about"} component={PageAbout} />
                <Route path={pageRoot + "/"} component={PageHome} />
            </Switch>
        </Router>
        
    )
}

export default Navbar