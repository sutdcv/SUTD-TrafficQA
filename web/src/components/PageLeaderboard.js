import React from 'react'

const PageLeaderboard = () => {
    return (
        <div>
            <div className="jumbotron jumbotron-fluid py-5 bg-dark">
                <div className="container">
                    <h1 className="display-3 text-white text-center">Leaderboard</h1>
                </div>
            </div>
            <div className="container">
                <div className="mt-5 alert alert-info">
                    <span className="fst-italic fw-bold me-2">Note:</span> 
                    If you want your work to be shown here, please send us your test set predictions via email, we will compute the testing set accuracy and update the leaderboard.
                </div>

                <table className="mt-4 table">
                    <thead>
                        <tr>
                            <th scope="col">Authors</th>
                            <th scope="col">Paper</th>
                            <th className="text-center" scope="col">Accuracy</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Anonymous</td>
                            <td>Experts Collaboration Learning for Continual VideoQA</td>
                            <td className="text-center">40.12</td>
                        </tr>
                        <tr>
                            <td>Xu et al.</td>
                            <td>TrafficQA: A Question Answering Benchmark and an Efficient Network for Video Reasoning over Traffic Events (CVPR 2021)</td>
                            <td className="text-center">37.05</td>
                        </tr>
                        <tr>
                            <td>Le et al.</td>
                            <td>Hierarchical Conditional Relation Networks for Video Question Answering (CVPR 2020)</td>
                            <td className="text-center">36.49</td>
                        </tr>
                        <tr>
                            <td>Fan et al.</td>
                            <td>Heterogeneous Memory Enhanced Multimodal Attention Model for Video Question Answering (CVPR 2019)</td>
                            <td className="text-center">34.12</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default PageLeaderboard
