import React, { useState } from "react";
import CreateFlowBlock from "../CreateFlowBlock";

export default function CreateFlow() {
  const [blocks, setBlocks] = useState(["blue", "green", "black"]);

  function addBlock(color) {
    setBlocks((currentBlocks) => [...currentBlocks, color]);
  }

  return (
    <div>
      <CreateFlowBlock />

      <h2>Create Flow</h2>
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
    </div>
  );
}
