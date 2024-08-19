

const PageDownload = () => {
    return (
        <div>
            <div className="jumbotron jumbotron-fluid py-5 bg-dark">
                <div className="container">
                    <h1 className="display-3 text-white text-center" id="dataset-download-request-form">Dataset Download</h1>
                </div>
            </div>
            <div className="container my-4 py-4 px-3 jumbotron jumbotron-fluid text-center" style={{ minWidth: 400 }}>

                <h5 className="mb-4">Terms & Conditions</h5>

                <div className="container text-center modal-dialog-centered align-items-center flex-column">
                    <p className={"alert alert-primary text-start"} style={{ maxWidth: 500 }}>
                        The Singapore University of Technology and Design (SUTD) provides access
                        to the <em className="fw-bold">SUTD-TrafficQA Dataset</em> (referred to as "the Dataset" below)
                        under the following conditions:
                        <p></p>
                        <ul>
                            <li>The Dataset should only be used for non-commercial scientific research purposes. Any other use is strictly prohibited.</li>
                            <li>Showing videos and images from the Dataset are only allowed in academic publications or presentations.</li>
                            <li>The Dataset must not be shared or redistributed in part or full with any third-party individual or organization.</li>
                            <li>The Dataset must not be altered to produce a new dataset without written consent from the authors.</li>
                        </ul>
                    </p>
                </div>

                <p className="text-center">By downloading the dataset, you agree to the terms and conditions above.</p>

                <div className="container">
                    <a href="https://bit.ly/SUTDTrafficQA-Google" className="button btn btn-outline-primary mt-3 mx-1" target="_blank" rel="noopener noreferrer">Google Drive Link</a>
                    <a href="https://bit.ly/SUTDTrafficQA-OneDrive" className="button btn btn-outline-primary mt-3 mx-1" target="_blank" rel="noopener noreferrer">MS OneDrive Link</a>
                </div>
            </div>


        </div>
    )
}

export default PageDownload
