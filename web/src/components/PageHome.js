import titleImg from "../imgs/titleImage.png"
import exampleImg from "../imgs/featured.png"
import PaperBlock from "./PaperBlock"

const PageHome = () => {
    return (
        <div>
            <div className="jumbotron jumbotron-fluid py-5 bg-dark">
                
                <div className={"container pb-5 text-center"}>
                    <img src={titleImg} style={{maxWidth: "90%"}} alt="SUTD-TrafficQA" />
                </div>
                <div className="container">
                    <h1 className="display-3 text-white text-center">SUTD-TrafficQA Dataset</h1>
                    <p className="lead text-white text-capitalize text-center">A <b className="fw-bold">Video</b> <b className="fw-bold">Q</b>uestion <b className="fw-bold">A</b>nswering Benchmark based on Real-world Traffic Scenes</p>
                </div>

            </div>

            
            <div className="pt-5 container-sm">
                <h3 className="m-3">Paper</h3> 
            </div>
            <div className="container-sm d-flex flex-column align-items-center">   
                <PaperBlock 
                paperTitle={"SUTD-TrafficQA: A Question Answering Benchmark and an Efficient Network for Video Reasoning over Traffic Events"}
                authors={"Li Xu, He Huang, Jun Liu"}
                venue={"CVPR 2021"}
                paperLink={"https://arxiv.org/abs/2103.15538"}
                codeLink={"https://github.com/SUTDCV/SUTD-TrafficQA"}
                cite={`@inproceedings{xu2021sutd,
                    title={SUTD-TrafficQA: A Question Answering Benchmark and an Efficient Network for Video Reasoning over Traffic Events},
                    author={Xu, Li and Huang, He and Liu, Jun},
                    booktitle={Proceedings of the IEEE Conference on Computer Vision and Pattern Recognition},
                    year={2021}
                }`}
                />
            </div>
            <div className="pt-4 container-sm">
                <h3 className="m-3">Example</h3> 
            </div>
            <div className="pt-2 container-sm text-center">
                <img src={exampleImg} style={{maxWidth: "90%"}} />
            </div>

        </div>
    )
}

export default PageHome
