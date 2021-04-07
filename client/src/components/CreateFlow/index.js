import React, { useState } from "react";
import CreateFlowBlock from "../CreateFlowBlock";
import styles from "./CreateFlow.module.css";

export default function CreateFlow() {
  const [blocks, setBlocks] = useState(["blue", "green", "black"]);

  function addBlock(color) {
    setBlocks((currentBlocks) => [...currentBlocks, color]);
  }

  return (
    <div>
      <h2>Create Flow</h2>

      <div className={styles.grid}>
        {true && <div className={styles.box1}>hello space placeholder</div>}
        <div className={styles.box2}>
          <form
            action="/createFlow"
            method="post"
            encType="multipart/form-data"
          >
            <div className={styles.flexCentered}>
              <CreateFlowBlock />
            </div>

            <hr />

            {blocks.map((block) => {
              return (
                <div
                  style={{
                    backgroundColor: block,
                    height: 100,
                    width: 100,
                    float: "left",
                    margin: 15,
                  }}
                  key={block}
                >
                  {block}
                </div>
              );
            })}
            <button onClick={() => addBlock("purple")}>add color!</button>
          </form>
        </div>
      </div>
    </div>
  );
}
