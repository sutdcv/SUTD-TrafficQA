import React from 'react'
import PropTypes from 'prop-types'

const DataSummary = props => {
    return (
        <div>
            <table className={"table table-sm mb-4 fw-light"}>
                <tbody>
                    <tr>
                        <th scope="row">Country / Region</th>
                        <td>{props.data.region}</td>
                    </tr>
                    <tr>
                        <th scope="row">Organization</th>
                        <td>{props.data.org}</td>
                    </tr>
                    <tr>
                        <th scope="row">Organization Type</th>
                        <td>{props.data.orgType}</td>
                    </tr>
                    <tr>
                        <th scope="row">Title</th>
                        <td>{props.data.title}</td>
                    </tr>
                    <tr>
                        <th scope="row">Name</th>
                        <td>{props.data.firstName + " " + props.data.lastName}</td>
                    </tr>
                    <tr>
                        <th scope="row">Role</th>
                        <td>{props.data.role}</td>
                    </tr>
                    <tr>
                        <th scope="row">Email Address</th>
                        <td>{props.data.email}</td>
                    </tr>
                    <tr>
                        <th scope="row">Gmail Address</th>
                        <td>{props.data.gmail? props.data.gmail: "None"}</td>
                    </tr>
                    <tr>
                        <th scope="row">PI Title</th>
                        <td>{props.data.piTitle? props.data.piTitle: "None"}</td>
                    </tr>
                    <tr>
                        <th scope="row">PI Name</th>
                        <td>{props.data.piFirstName? (props.data.piFirstName + " " + props.data.piLastName): "None"}</td>
                    </tr>
                    <tr>
                        <th scope="row">PI Role</th>
                        <td>{props.data.piRole? props.data.piRole: "None"}</td>
                    </tr>
                    <tr>
                        <th scope="row">PI Email Address</th>
                        <td>{props.data.piEmail? props.data.piEmail: "None"}</td>
                    </tr>
                </tbody>
            </table>
            
        </div>
    )
}


DataSummary.defaultProps = {
    data: {},
}

DataSummary.propTypes = {
    data: PropTypes.object
}

export default DataSummary
