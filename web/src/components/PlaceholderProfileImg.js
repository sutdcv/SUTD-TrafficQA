import React from 'react'
import PropTypes from 'prop-types'

const PlaceholderProfileImg = (props) => {
    return (
        <svg 
        className="bd-placeholder-img rounded-circle text-center" 
        width={props.dim} 
        height={props.dim}
        xmlns="http://www.w3.org/2000/svg" 
        preserveAspectRatio="xMidYMid slice" 
        focusable="false" 
        role="img" 
        ariaLabel={"Placeholder: " + props.dim + "x" + props.dim}
        >
            <title>Placeholder</title>
            <rect fill="#777" width="100%" height="100%"></rect>
            <text fill="#777" dy=".3em" x="25%" y="50%">{props.dim + "x" + props.dim}</text>
        </svg>
    )
}

PlaceholderProfileImg.defaultProps = {
    dim: 144,
}

PlaceholderProfileImg.propTypes = {
    dim: PropTypes.number,
}

export default PlaceholderProfileImg
