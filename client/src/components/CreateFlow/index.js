import React, { useState, useRef } from "react";
import CreateFlowBlock from "../CreateFlowBlock";
import PropTypes from "prop-types";
import { nanoid } from "nanoid";

export default function CreateFlow(props) {
  const [blocks, setBlocks] = useState([
    { url: "url1", image: "image1", description: "description1", id: nanoid() },
  ]);

  function addBlock() {
    const randNum = Math.floor(Math.random() * 100);
    const newBlock = {
      url: "url" + randNum,
      image: "image" + randNum,
      description: "description" + randNum,
      id: nanoid(),
    };
    setBlocks((currentBlocks) => [...currentBlocks, newBlock]);
  }

  // CreateFlow
  // CreateFlowIntro
  // [CreateFlowBlock]
  // Start out by just being div blocks with: optional img, optional description, resource url
  // [{img: xxx, description: xxx, url: xxx, deepDive: [{xxx}, {xxx}, {xxx}]}]

  // ViewFlow
  // FlowIntro
  // [FlowBlock]

  // CreateFlowIntro
  // FlowIntro

  // CreateFlowBlock
  // FlowBlock

  // what should show up on first creation? default block with helpful suggestions + UI to add new block

  function onRemove(id) {
    const newBlocks = blocks.filter((block) => block.id !== id);

    setBlocks(newBlocks);
  }

  let form = useRef(null);

  const onSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(form.current);
    console.log(Array.from(formData.entries()));

    props.apiService.createFlow(formData);
  };

  return (
    <div>
      <h2>Create Flow</h2>

      <div className={styles.grid}>
        {true && <div className={styles.box1}>hello space placeholder</div>}
        <div className={styles.box2}>
          <form onSubmit={onSubmit} ref={form}>
            <div className={styles.flexCentered}>
              <CreateFlowBlock />
            </div>

            <hr />

            <div className={styles.flowBlockContainer}>
              {blocks.map((block) => {
                return (
                  <div className={styles.flowBlock} key={block.id}>
                    <button type="button" onClick={() => onRemove(block.id)}>
                      Remove
                    </button>

                    <label htmlFor={block.id}>URL</label>
                    <input
                      placeholder={block.url}
                      className={styles.urlText}
                      type="text"
                      id={block.id}
                      name="url"
                    ></input>

                    <label htmlFor="description">Description</label>
                    <textarea
                      className={styles.descriptionText}
                      placeholder={block.description}
                      type="text"
                      id={block.id}
                      name="description"
                    ></textarea>
                  </div>
                );
              })}
            </div>

            <button type="button" onClick={() => addBlock("purple")}>
              add color!
            </button>
            <button type="submit">Submit form</button>
          </form>
        </div>
      </div>
    </div>
  );
}

CreateFlow.propTypes = {
  apiService: PropTypes.object,
};
