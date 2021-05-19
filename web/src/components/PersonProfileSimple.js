import React from 'react'
import PropTypes from 'prop-types'

const PersonProfileSimple = (props) => {
    const nameLinkStyle = {
        textDecoration: "none",
        color: "#505050",
    }

    return (
        <div className="container px-3 pb-3 col-sm-6 text-center">
          <h4><a href={props.link} style={nameLinkStyle} target="_blank" rel="noopener noreferrer">{props.name}</a></h4>
          <div>
            <p className="my-1">{props.title}</p>  
            <p>{props.org}</p>
          </div>
        </div>
    )
}

PersonProfileSimple.defaultProps = {
    name: "J. Random Hacker",
    link: "",
    title: "Title",
    org: "Organization",
}

PersonProfileSimple.propTypes = {
    name: PropTypes.string,
    link: PropTypes.string,
    title: PropTypes.string,
    org: PropTypes.string,
}


export default PersonProfileSimple
