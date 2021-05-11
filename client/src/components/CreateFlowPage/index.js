import React, { useState, useRef } from "react";
import CreateFlowIntro from "../CreateFlowIntro";
import CreateFlowBlock from "../CreateFlowBlock";
import PropTypes from "prop-types";
import { nanoid } from "nanoid";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
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

  function onDragEnd(result) {
    let newBlocks = [...blocks];
    const sourceIndex = result.source.index;
    const destinationIndex = result.destination.index;
    const tempDestinationBlock = blocks[destinationIndex];

    newBlocks[destinationIndex] = blocks[sourceIndex];
    newBlocks[sourceIndex] = tempDestinationBlock;

    setBlocks(newBlocks);
  }

  return (
    <div>
      <form onSubmit={onSubmit} ref={form}>
        <CreateFlowIntro />

        <hr />

        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="blocks">
            {(provided) => (
              <div
                className={styles.flowBlockContainer}
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                {blocks.map((block, index) => {
                  return (
                    <Draggable
                      key={block.id}
                      draggableId={block.id}
                      index={index}
                      isDragDisabled={blocks.length < 2}
                    >
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                        >
                          <CreateFlowBlock
                            blockData={block}
                            removeBlock={removeBlock}
                          />
                        </div>
                      )}
                    </Draggable>
                  );
                })}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>

        <div className={styles.formControls}>
          {/* this can be a floating action button */}
          <button type="button" onClick={() => addBlock()}>
            add block!
          </button>
          <button type="submit">Submit form</button>
        </div>
      </form>
    </div>
  );
}

CreateFlowPage.propTypes = {
  apiService: PropTypes.object,
};
