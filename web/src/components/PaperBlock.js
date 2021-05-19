import React from 'react'
import { useState } from 'react'
import PropTypes from 'prop-types'
import { CodeBlock, monokai } from "react-code-blocks";


const PaperBlock = (props) => {
    const [citation, setCitation] = useState(false);
    const toggleCitation = () => {
        if (citation){
            setCitation(false)
        } else {
            setCitation(true)
        }
    }
    return (
        <div className="shadow-sm p-3 mx-4 my-2 bg-light rounded" style={{maxWidth: "90%"}}> 
            <div className="">
                <div className="d-flex flex-column align-items-start text-start">
                    <div className="my-1">
                        <span className="fw-normal  text-start user-select-all">{props.paperTitle}</span>
                        <span className="mx-2 badge bg-info text-dark">{props.venue}</span> 
                    </div>
                    <div className="my-1 fst-italic fw-light">{props.authors}</div>
                    <div className="my-1 d-flex flex-row align-content-center">
                        <a href={props.paperLink} className="me-2 mt-2 py-0 btn btn-outline-dark btn-sm font-monospace" target="_blank" rel="noopener noreferrer">paper</a>
                        <a href={props.codeLink} className="me-2 mt-2 py-0 btn btn-outline-dark btn-sm font-monospace" target="_blank" rel="noopener noreferrer">code</a>
                        <div className="me-2 mt-2 py-0 btn btn-outline-dark btn-sm font-monospace" onClick={toggleCitation}>bibtex</div>
                    </div>
                    {citation ?<div className="mt-3 user-select-all" style={{maxWidth: "100%"}}>
                        <CodeBlock
                        text={props.cite}
                        language={"latex"}
                        showLineNumbers={false}
                        theme={monokai}
                        wrapLines={true}
                        codeBlock
                        />
                        
                    </div>:null}
                </div>
            </div>
        </div>
    )
}

PaperBlock.defaultProps = {
    paperTitle: "SUTD-TrafficQA: A Question Answering Benchmark and an Efficient Network for Video Reasoning over Traffic Events",
    authors: "Li Xu, He Huang, Jun Liu",
    venue: "CVPR 2021",
    paperLink: "https://arxiv.org/abs/2103.15538",
    codeLink: "https://github.com/SUTDCV/SUTD-TrafficQA",
    cite: `@inproceedings{xu2021sutd,
        title={SUTD-TrafficQA: A Question Answering Benchmark and an Efficient Network for Video Reasoning over Traffic Events},
        author={Xu, Li and Huang, He and Liu, Jun},
        booktitle={Proceedings of the IEEE Conference on Computer Vision and Pattern Recognition},
        year={2021}
      }`,
}

PaperBlock.propTypes = {
    paperTitle: PropTypes.string,
    authors: PropTypes.string,
    venue: PropTypes.string,
    paperLink: PropTypes.string,
    codeLink: PropTypes.string,
    cite: PropTypes.string,
}



export default PaperBlock
