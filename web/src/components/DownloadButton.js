import React from 'react'
import PropTypes from 'prop-types'

const DownloadButton = (props) => {
    return(
        <a 
        href={props.href} 
        className={"me-2 my-2 btn btn-outline-primary btn-sm" + (props.disabled ? " disabled" : "")}
        target={props.openNewTab ? "_blank": null} 
        rel="noopener noreferrer"
        >
            {props.text}
        </a>
    )
    
}

DownloadButton.defaultProps = {
    href: "",
    disabled: false,
    openNewTab: false,
    text: "Download"
}

DownloadButton.propTypes = {
    href: PropTypes.string,
    disabled: PropTypes.bool,
    text: PropTypes.string,
}

export default DownloadButton
