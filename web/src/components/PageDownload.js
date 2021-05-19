import RequestForm from './RequestForm'


const PageDownload = () => {
    return (
        <div>
            <div className="jumbotron jumbotron-fluid py-5 bg-dark">
                <div className="container">
                    <h1 className="display-3 text-white text-center" id="dataset-download-request-form">Dataset Download Request Form</h1>
                </div>
                <div className="mt-5 px-5 container text-light text-center">
                    <p className="alert alert-secondary">
                        To download the whole dataset (inc. <code>Annotations</code>, <code>Video Features</code>, and <code>Raw Videos</code>), you need to fill in the form below. 
                        Dataset access link will be sent to your email address within two working days. 
                    </p>
                </div>
            </div>
            <div className={"container my-4 py-4 px-3 jumbotron shadow"} style={{minWidth: 400}}>
                <p className="mb-5 alert alert-success">
                    <p><span className="fst-italic fw-bold me-2">News:</span> We are currently hosting a <a href="https://sutdcv.github.io/multi-modal-video-reasoning/">Multi-Modal Video Reasoning and Analyzing Competition</a> at <b>ICCV 2021</b> from 20 May 2021 to 5 July 2021, 
                    everyone is encouraged to participate!</p>
                    <p><span className="fst-italic fw-bold me-2">Note:</span> If you have registered for the competition, you DO NOT need to request the dataset here again.</p>
                </p>

                <RequestForm />
            </div>
        </div>
    )
}

export default PageDownload
