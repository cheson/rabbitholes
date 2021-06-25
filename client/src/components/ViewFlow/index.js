import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useParams } from "react-router-dom";
import styles from "./ViewFlow.module.css";
import ResourceNotFound from "../ResourceNotFound";

export default function ViewFlow(props) {
  let { flowId } = useParams();
  const [flow, setFlow] = useState();
  const [pageLoaded, setPageLoaded] = useState(false);

  useEffect(() => {
    props.apiService.viewFlow(flowId).then((flow) => {
      setFlow(flow);
      setPageLoaded(true);
    });
  }, []);

  function onClick(url) {
    const isTextSelected = window.getSelection().toString();
    if (!isTextSelected) {
      window.open(url);
    }
  }

  const resourceNotFoundComponent = (
    <ResourceNotFound message={`Flow (${flowId}) cannot be found.`} />
  );
  const pageNotLoadedComponent = <div></div>;

  // TODO: if no URL in flow (eg for purely notes based non-external linking blocks), then don't add clickable styling
  // TODO: add image placeholders of a certain reasonable size so the divs don't resize as much
  // TODO: play with vertical images and see how they are handled (ans: terribly - come up with fix)
  return (
    <div>
      {pageLoaded ? (
        flow ? (
          <div>
            {flow.imgUrl && <img className={styles.image} src={flow.imgUrl} />}
            <div className={styles.title}>{flow.flowTitle}</div>
            <div className={styles.metadata}>
              <div className={styles.author}>
                <i className="fa fa-user-circle-o"></i>{" "}
                {flow.user?.username || flow.user?.name || "Anonymous"}
              </div>{" "}
              <div className={styles.date}>
                <i className="fa fa-calendar-o"></i>{" "}
                {new Date(flow.updatedAt).toLocaleDateString() ||
                  "No date recorded"}
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
          resourceNotFoundComponent
        )
      ) : (
        pageNotLoadedComponent
      )}
    </div>
  );
}

ViewFlow.propTypes = {
  apiService: PropTypes.object,
};
