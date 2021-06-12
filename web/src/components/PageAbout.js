import React from 'react'
import SectionTeam from "./SectionTeam"

const PageAbout = () => {
    return (
        <div>
            <div className="jumbotron jumbotron-fluid py-5 bg-dark">
                <div className="container">
                    <h1 className="display-3 text-white text-center">About</h1>
                </div>
            </div>
            <div className={"container my-5"}>
                <h2 className={"container my-5"}>Contributors</h2>
                <SectionTeam />
                <h2 className={"container my-5"}>Contact Us</h2>
                
                <div className={"container my-3 mx-3 px-3 jumbotron"}>
                    {/* <p className={"container fst-italic fw-normal"}>Feel free to contact us if you have any questions!</p> */}
                    <ul className="list-group shadow-sm">
                        <li className="list-group-item list-group-item-action"><code className="text-dark">li_xu [AT] mymail.sutd.edu.sg</code></li>
                        <li className="list-group-item list-group-item-action"><code className="text-dark">he_huang [AT] mymail.sutd.edu.sg</code></li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default PageAbout
