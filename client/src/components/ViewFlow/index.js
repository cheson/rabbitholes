import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useParams } from "react-router-dom";
import styles from "./ViewFlow.module.css";
import ResourceNotFound from "../ResourceNotFound";

export default function ViewFlow(props) {
  let { flowId } = useParams();
  const [flow, setFlow] = useState();

  useEffect(() => {
    props.apiService.viewFlow(flowId).then((flow) => setFlow(flow));
  }, []);

  // function getRandomInt(min, max) {
  //   min = Math.ceil(min);
  //   max = Math.floor(max);
  //   return Math.floor(Math.random() * (max - min) + min);
  // }

  // function getRandomImageURL() {
  //   const width = getRandomInt(1300, 1600);
  //   const height = getRandomInt(600, 900);
  //   return `https://picsum.photos/${width}/${height}`;
  // }

  function onClick(url) {
    const isTextSelected = window.getSelection().toString();
    if (!isTextSelected) {
      // TODO: Open other webpage in a modal
      window.open(url);
    }
  }

  console.log(flow);
  // TODO: if no URL in flow (eg for purely notes based non-external linking blocks), then don't add clickable styling
  // TODO: add image placeholders of a certain reasonable size so the divs don't resize as much
  // TODO: play with vertical images and see how they are handled (ans: terribly - come up with fix)
  // TODO: return appropriate error page for a flow id that doesn't exist
  return (
    <div>
      {flow ? (
        <div>
          {flow.imgUrl && <img className={styles.image} src={flow.imgUrl} />}
          <div className={styles.title}>{flow.flowTitle}</div>
          <div className={styles.metadata}>
            <div className={styles.author}>
              <i className="fa fa-user-circle-o"></i> ProlificUser
            </div>{" "}
            <div className={styles.date}>
              <i className="fa fa-calendar-o"></i> May 4, 2021
            </div>
          </div>
          <div className={styles.description}>{flow.flowDescription}</div>
          <div className={styles.list}>
            {flow.blocks?.map((block, index) => (
              <div
                className={styles.block}
                key={block._id}
                onClick={() => onClick(block.url)}
              >
                <div className={styles.index}>{index + 1}</div>
                <div className={styles.blockDescription}>
                  {block.description}
                  {/* <div className={styles.blockUrl}>{block.url}</div> */}
                </div>
                {block.imgUrl && (
                  <img className={styles.blockImage} src={block.imgUrl}></img>
                )}
              </div>
            ))}
          </div>
        </div>
      ) : (
        <ResourceNotFound message={`Flow (${flowId}) cannot be found.`} />
      )}
    </div>
  );
}

ViewFlow.propTypes = {
  apiService: PropTypes.object,
};
