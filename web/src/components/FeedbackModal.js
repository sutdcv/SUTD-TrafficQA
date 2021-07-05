import React from 'react'
import PropTypes from 'prop-types'
import Button from '@material-ui/core/Button';
import Modal from 'react-bootstrap/Modal'
// import DataSummary from "./DataSummary"

const FeedbackModal = (props) => {
    return (
        <Modal
        centered
        show={props.showModal}
        onHide={props.handleCloseModal}
        backdrop="static"
        keyboard={false}
        onExited={props.callback}
        >
            <Modal.Header>
                <Modal.Title>
                    <div className={props.success?"text-success":"text-danger"}>
                        {props.success ? "Success!": "Error!"}
                    </div>
                    
                </Modal.Title>
            </Modal.Header>

            <Modal.Body>
                {/* <DataSummary data={props.data} /> */}
                {props.success ? 
                
                <div>
                    <b className="text-success">You have successfully requested SUTD-TrafficQA dataset, please use the link below to download the dataset!</b>
                    <a href="https://bit.ly/SUTDTrafficQA-Google" className="button btn btn-outline-primary mt-3 mx-1" target="_blank" rel="noopener noreferrer">Google Drive Link</a>
                    <a href="https://bit.ly/SUTDTrafficQA-OneDrive" className="button btn btn-outline-primary mt-3 mx-1" target="_blank" rel="noopener noreferrer">MS OneDrive Link</a>
                </div>
                : 
                <div>
                    <p>Sorry, something is wrong at server side. (error: {props.statusCode})</p>
                    <b className="text-danger">Please take a screenshot now and send it to us via email.</b>
                    <p><code>he_huang [AT] mymail.sutd.edu.sg</code></p>
                </div>}
            </Modal.Body>

            <Modal.Footer>
                <Button href="" variant="contained" onClick={props.handleCloseModal}>OK</Button>
            </Modal.Footer>
            
        </Modal>
    )
}

FeedbackModal.defaultProps = {
    title: "Title",
    success: false,
    body: "Body",
    data: {},
    showModal:false,
    handleCloseModal: ()=>{},
    callback: ()=>{},
    statusCode: "000",
}

FeedbackModal.propTypes = {
    title: PropTypes.string,
    body: PropTypes.string,
    showModal: PropTypes.bool,
    handleCloseModal: PropTypes.func,
}

export default FeedbackModal
