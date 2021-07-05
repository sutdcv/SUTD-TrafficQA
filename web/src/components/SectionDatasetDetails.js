import DownloadButton from "./DownloadButton"

const SectionDatasetDetails = () => {
    return (
        <div>
            <div className={"container my-4 py-3 px-3 jumbotron"} style={{minWidth: 400}}>
                <div className={"container d-flex flex-column align-items-start"}>

                    <h3 className="my-3">Annotations (Text QAs)</h3>
                    <p>Our annotation is in JSON Lines (<code>.jsonl</code>) text-file format where each line is a JSON list. </p>
                    <p>In each line, the list contains the following items:</p>
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th align="center" className="text-center">List Idx</th>
                                <th align="center" className="text-center">Header</th>
                                <th align="center" className="text-center">Type</th>
                                <th align="left" className="">Description</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td align="center"><code>0</code></td>
                                <td align="center">record_id</td>
                                <td align="center"><code>int</code></td>
                                <td align="left">Unique ID of this data point</td>
                            </tr>
                            <tr>
                                <td align="center"><code>1</code></td>
                                <td align="center">vid_id</td>
                                <td align="center"><code>int</code></td>
                                <td align="left">Unique ID of the source video</td>
                            </tr>
                            <tr>
                                <td align="center"><code>2</code></td>
                                <td align="center">vid_filename</td>
                                <td align="center"><code>str</code></td>
                                <td align="left">File name of the source video</td>
                            </tr>
                            <tr>
                                <td align="center"><code>3</code></td>
                                <td align="center">perspective</td>
                                <td align="center"><code>int</code></td>
                                <td align="left"><code>1</code> or <code>3</code> denotes first-person or third-person perspective</td>
                            </tr>
                            <tr>
                                <td align="center"><code>4</code></td>
                                <td align="center">q_body</td>
                                <td align="center"><code>str</code></td>
                                <td align="left">Question</td>
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
                                <td align="left">Option (index <code>0</code>)</td>
                            </tr>
                            <tr>
                                <td align="center"><code>6</code></td>
                                <td align="center">option1</td>
                                <td align="center"><code>str</code></td>
                                <td align="left">Option (index <code>1</code>)</td>
                            </tr>
                            <tr>
                                <td align="center"><code>7</code></td>
                                <td align="center">option2</td>
                                <td align="center"><code>str</code></td>
                                <td align="left">Option (index <code>2</code>)</td>
                            </tr>
                            <tr>
                                <td align="center"><code>8</code></td>
                                <td align="center">option3</td>
                                <td align="center"><code>str</code></td>
                                <td align="left">Option (index <code>3</code>)</td>
                            </tr>
                            <tr>
                                <td align="center"><code>9</code></td>
                                <td align="center">answer</td>
                                <td align="center"><code>int</code></td>
                                <td align="left">The index (<code>0</code>/<code>1</code>/<code>2</code>/<code>3</code>) of the correct answer</td>
                            </tr>
                        </tbody>
                    </table>
                    <div className="m-1 alert alert-info">
                        <span className="fst-italic fw-bold me-2">Note:</span> 
                        In the dataset, we provide 4 options for every question. 
                        But for some Yes-or-No questions, we may use empty strings as padding in the annotation,
                        so that you could treat every question as a 4-class classification problem.
                        <p className=""></p> 
                        For instance, such a question could be: <code>"Did a vehicle violate the traffic light?"</code>, 
                        the four options provided could be <code>["", "No", "", "Yes"]</code> in random order.
                    </div>
                    <ul>
                        <li>View Sample JSONL Annotations: <a href="https://github.com/SUTDCV/SUTD-TrafficQA/blob/master/examples/annotation_sample.jsonl">annotation_sample.jsonl</a></li>
                        <li>View Example JSONL Reader: <a href="https://github.com/SUTDCV/SUTD-TrafficQA/blob/master/examples/jsonl_reader.py">jsonl_reader.py</a></li>
                    </ul>



                    <h3 className="my-3">Video Features</h3>
                    <p>Video Features are in HDF5 (<code>.h5</code>) format.</p>
                    <ol>
                        <li>Appearance Feature</li>
                            <div className="my-1 mx-3 alert alert-secondary">
                                <span className="fst-italic fw-bold me-2">Note:</span> 
                                For appearance features, we uniformly sample 128 frames for each video and use the pre-trained networks to compute the appearance feature of each frame.
                                <ul>
                                    <li>View preprocessing source code: <a href="https://github.com/SUTDCV/SUTD-TrafficQA/blob/master/examples/preprocess_video_appearance_example.py">preprocess_video_appearance_example.py</a></li>
                                </ul>
                            </div>
                            <ul>
                                <li>
                                    <code>trafficqa_resnet18_feat.h5</code> (2.6 GB) extracted using <code> ResNet-18</code>.
                                </li>
                                <li>
                                    <code>trafficqa_resnet101_feat.h5</code> (10.6 GB) extracted using <code> ResNet-101</code>.
                                </li>
                                <li>
                                    <code>trafficqa_mobilenetv2_feat.h5</code> (6.6 GB) extracted using <code> MobileNetV2</code>.
                                </li>
                                
                            </ul>

                        <li>Motion Feature</li>
                            <div className="my-1 mx-3 alert alert-secondary">
                                <span className="fst-italic fw-bold me-2">Note:</span> 
                                For motion features, we divide each video into 8 clips, and use the pre-trained ResNext-101 model to compute the motion features of each clip. 
                                <ul>
                                    <li>View preprocessing source code: <a href="https://github.com/SUTDCV/SUTD-TrafficQA/blob/master/examples/preprocess_video_motion_example.py">preprocess_video_motion_example.py</a></li>
                                </ul>
                            </div>
                            <ul>
                                <li>
                                    <code>trafficqa_motion_feat.h5</code> (668.2 MB) extracted using <code> ResNeXt101</code>.
                                </li>
                            </ul>
                    </ol>

                    <div className="my-1 alert alert-info">
                        <span className="fst-italic fw-bold me-2">Note:</span> 
                        To use the features stored in HDF5 file:
                        <ul>
                            <li>
                                Treat the loaded object as a dictionary with a structure like this <code>Dict[str, List[Features]]</code>.
                            </li>
                            <li>
                                Use the top-level keys to access the list of features: <code>"resnet18_features"</code>, <code>"resnet101_features"</code>, <code>"mobilenetv2_features"</code>, and <code>"resnext101_features"</code>.
                            </li>
                            <li>
                                Use the top-level key <code>"ids"</code> to access a list of corresponding <code>vid_ids</code> in the exact same order as the list of features.
                            </li>
                            <li>
                                View Example Data-loader: <a href="https://github.com/SUTDCV/SUTD-TrafficQA/blob/master/examples/dataloader_example.py">dataloader_example.py</a>
                            </li>
                        </ul>
                    </div>

                    <h3 className="my-3">Raw Videos</h3>
                    <p>All 10,080 raw videos are in <code>H.265</code>-encoded MP4 (<code>.mp4</code>) file format with variable video lengths.</p>
                    <ul>
                        <li>
                            <code>raw_videos.zip</code> (12.8 GB).
                        </li>
                    </ul>

                    <h3 className="my-3">Download Dataset</h3>
                    <p>Our dataset is completely open-source, you just need to fill in the request form and agree to our terms and conditions, download it now!</p>
                    <DownloadButton text={"Request Download"} href={"#download"} disabled={false} openNewTab={false}/>

                </div>
                
            </div>
        </div>
    )
}



export default SectionDatasetDetails
