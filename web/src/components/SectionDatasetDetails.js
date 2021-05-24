import exampleImg from "../imgs/featured.png"
import DownloadButton from "./DownloadButton"

const SectionDatasetDetails = () => {
    return (
        <div>
            <div className={"container my-4 py-3 px-3 jumbotron"} style={{minWidth: 400}}>
                <div className={"container pb-5"}>
                    <h3 className="mb-4">Example</h3>

                    <div className={"container"}>
                        <img src={exampleImg} alt="exampleImg" style={{maxWidth: "100%"}} />
                    </div>
                    
                </div>
                <div className={"container d-flex flex-column align-items-start"}>

                    <h3 className="my-3">Annotations (Text QAs)</h3>
                    <p>Our annotation is in JSON Lines (<code>.jsonl</code>) text-file format where each line is a JSON list. </p>
                    <p>Each list contains the following items:</p>
                    <table className="table  table-striped table-hover">
                        <thead>
                        <tr>
                        <th align="center" className="text-center">List Idx</th>
                        <th align="center" className="text-center">Header</th>
                        <th align="center" className="text-center">Type</th>
                        <th align="center" className="text-center">Description</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                        <td align="center"><code>0</code></td>
                        <td align="center">record_id</td>
                        <td align="center"><code>int</code></td>
                        <td align="center">Unique ID of this data point</td>
                        </tr>
                        <tr>
                        <td align="center"><code>1</code></td>
                        <td align="center">vid_id</td>
                        <td align="center"><code>int</code></td>
                        <td align="center">Unique ID of the source video</td>
                        </tr>
                        <tr>
                        <td align="center"><code>2</code></td>
                        <td align="center">vid_filename</td>
                        <td align="center"><code>str</code></td>
                        <td align="center">File name of the source video</td>
                        </tr>
                        <tr>
                        <td align="center"><code>3</code></td>
                        <td align="center">perspective</td>
                        <td align="center"><code>int</code></td>
                        <td align="center"><code>1</code> or <code>3</code> denotes first-person or third-person perspective</td>
                        </tr>
                        <tr>
                        <td align="center"><code>4</code></td>
                        <td align="center">q_body</td>
                        <td align="center"><code>str</code></td>
                        <td align="center">Question</td>
                        </tr>
                        {/*  q_type is removed from R3 release */}
                        {/* <tr>
                        <td align="center"><code>5</code></td>
                        <td align="center">q_type</td>
                        <td align="center"><code>str</code></td>
                        <td align="center">Question Type</td>
                        </tr> */}
                        <tr>
                        <td align="center"><code>5</code></td>
                        <td align="center">option0</td>
                        <td align="center"><code>str</code></td>
                        <td align="center">Option (index <code>0</code>)</td>
                        </tr>
                        <tr>
                        <td align="center"><code>6</code></td>
                        <td align="center">option1</td>
                        <td align="center"><code>str</code></td>
                        <td align="center">Option (index <code>1</code>)</td>
                        </tr>
                        <tr>
                        <td align="center"><code>7</code></td>
                        <td align="center">option2</td>
                        <td align="center"><code>str</code></td>
                        <td align="center">Option (index <code>2</code>)</td>
                        </tr>
                        <tr>
                        <td align="center"><code>8</code></td>
                        <td align="center">option3</td>
                        <td align="center"><code>str</code></td>
                        <td align="center">Option (index <code>3</code>)</td>
                        </tr>
                        <tr>
                        <td align="center"><code>9</code></td>
                        <td align="center">answer</td>
                        <td align="center"><code>int</code></td>
                        <td align="center">The index (<code>0</code>/<code>1</code>/<code>2</code>/<code>3</code>) of the correct answer</td>
                        </tr>
                        </tbody>
                    </table>
                    <ul>
                        <li>View Sample Annotations: <a href="https://github.com/SUTDCV/SUTD-TrafficQA/blob/master/examples/annotation_sample.jsonl">annotation_sample.jsonl</a></li>
                        <li>View Example Reader: <a href="https://github.com/SUTDCV/SUTD-TrafficQA/blob/master/examples/jsonl_reader.py">jsonl_reader.py</a></li>
                    </ul>


                    <h3 className="my-3">Video Features</h3>
                    <p>Video Features are in HDF5 (<code>.h5</code>) format.</p>
                    <ol>
                        <li>Appearance Feature</li>
                            <ul><li>
                                extracted using
                                <code> MobileNetV2</code>, 
                                <code> ResNet-101</code>, and 
                                <code> ResNet-18</code>.
                            </li></ul>

                        <li>Motion Feature</li>
                            <ul><li>
                                extracted using
                                <code> ResNeXt101</code>.
                            </li></ul>
                    </ol>

                    <h3 className="my-3">Raw Videos</h3>
                    <p>All videos are in MP4 (<code>.mp4</code>) format with variable lengths.</p>


                    <h3 className="my-3">Download Dataset</h3>
                    <DownloadButton text={"Request Download"} href={"#download"} disabled={false} openNewTab={true}/>



                </div>
                
            </div>
        </div>
    )
}



export default SectionDatasetDetails
