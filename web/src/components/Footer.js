import React from 'react'

const Footer = () => {
    return (
        <footer className="mt-5 footer user-select-none">
            <div style={{ height: 70 }}></div>
            <hr className="mt-auto mx-5"></hr>
            <div className="container d-flex flex-row justify-content-center">
                <p className="text-capitalize fw-light text-muted"><a href="https://github.com/sutdcv" className="text-reset">SUTD Computer Vision & Learning Group (VLG)</a> © 2021-2024. All rights reserved.</p>
            </div>
        </footer>
    )
}

export default Footer
