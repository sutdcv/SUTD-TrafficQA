import React from 'react'
import SectionDatasetDetails from "./SectionDatasetDetails"

const PageExplore = () => {
    return (
        <div>
            <div className="jumbotron jumbotron-fluid py-5 bg-dark">
                <div className="container">
                    <h1 className="display-3 text-white text-center">Dataset Usage Details</h1>
                </div>
            </div>
            <SectionDatasetDetails />
        </div>
    )
}

export default PageExplore
