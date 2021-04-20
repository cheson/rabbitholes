import React, { useState, useRef } from "react";
import CreateFlowIntro from "../CreateFlowIntro";
import CreateFlowBlock from "../CreateFlowBlock";
import PropTypes from "prop-types";
import { nanoid } from "nanoid";
import styles from "./CreateFlowPage.module.css";

export default function CreateFlowPage(props) {
  // what should show up on first creation? default block with helpful suggestions + UI to add new block
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

  function removeBlock(id) {
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
              <CreateFlowIntro />
            </div>

            <hr />

            <div className={styles.flowBlockContainer}>
              {blocks.map((block) => {
                return (
                  <CreateFlowBlock
                    key={block.id}
                    blockData={block}
                    removeBlock={removeBlock}
                  />
                );
              })}
            </div>

            <button type="button" onClick={() => addBlock()}>
              add block!
            </button>
            <button type="submit">Submit form</button>
          </form>
        </div>
      </div>
    </div>
  );
}

CreateFlowPage.propTypes = {
  apiService: PropTypes.object,
};
