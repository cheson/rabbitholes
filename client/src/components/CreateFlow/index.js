import React, { useState, useRef } from "react";
import CreateFlowBlock from "../CreateFlowBlock";
import PropTypes from "prop-types";
import styles from "./CreateFlow.module.css";

export default function CreateFlow(props) {
  const [blocks, setBlocks] = useState(["blue", "green", "black"]);

  function addBlock(color) {
    setBlocks((currentBlocks) => [...currentBlocks, color]);
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
                  <input placeholder="whatever" name="whatever"></input>
                </div>
              );
            })}

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
