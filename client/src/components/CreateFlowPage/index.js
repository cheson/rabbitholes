import React, { useState, useRef } from "react";
import CreateFlowIntro from "../CreateFlowIntro";
import CreateFlowBlock from "../CreateFlowBlock";
import PropTypes from "prop-types";
import { nanoid } from "nanoid";
import { Button } from "react-bootstrap";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { MenuButtonWide, UiChecksGrid } from "react-bootstrap-icons";
import { withRouter, Prompt } from "react-router-dom";
import { VIEW_FLOW_PREFIX } from "../../constants/routes";
import styles from "./CreateFlowPage.module.css";

function CreateFlowPage(props) {
  // TODO: what should show up on first creation? default block with helpful suggestions + UI to add new block
  const [blocks, setBlocks] = useState([
    { url: "url1", image: "image1", description: "description1", id: nanoid() },
  ]);

  const [isUploading, setIsUploading] = useState(false);

  function addBlock() {
    const randNum = Math.floor(Math.random() * 100);
    const newBlock = {
      url: "url" + randNum,
      image: "image" + randNum,
      description: "description" + randNum,
      id: nanoid(),
    };
    setBlocks((currentBlocks) => [...currentBlocks, newBlock]);
    setTimeout(
      () =>
        window.scrollTo({
          left: 0,
          top: document.body.scrollHeight,
          behavior: "smooth",
        }),
      50
    );
  }

  function removeBlock(id) {
    const newBlocks = blocks.filter((block) => block.id !== id);
    setBlocks(newBlocks);
  }

  let form = useRef(null);
  const onSubmit = (e) => {
    setIsUploading(true);
    e.preventDefault();
    const formData = new FormData(form.current);
    props.apiService.createFlow(formData).then(
      (result) => {
        setIsUploading(false);
        props.history.push(VIEW_FLOW_PREFIX + result.flowId);
      },
      (err) => {
        setIsUploading(false);
        console.log(err);
      }
    );
  };

  function onDragEnd(result) {
    let newBlocks = [...blocks];
    const sourceIndex = result.source?.index;
    const destinationIndex = result.destination?.index;
    if (sourceIndex === undefined || destinationIndex === undefined) {
      return;
    }
    const tempDestinationBlock = blocks[destinationIndex];

    newBlocks[destinationIndex] = blocks[sourceIndex];
    newBlocks[sourceIndex] = tempDestinationBlock;

    setBlocks(newBlocks);
  }

  return (
    <div>
      <Prompt
        message={(location) => {
          return location.pathname.startsWith(VIEW_FLOW_PREFIX)
            ? true
            : `Are you sure you want to leave? Your progress will be lost.`;
        }}
      />

      <form onSubmit={onSubmit} ref={form}>
        <div className={styles.header}>
          <h3> Create Flow </h3>
          <hr />
        </div>

        <CreateFlowIntro />

        {/* <hr /> */}
        <div className={styles.flowBlocksInformation}>
          <MenuButtonWide className={styles.menuButtonWide} /> Drag and drop to
          reorder list blocks. <br />
        </div>
        <div className={styles.flowBlocksInformation}>
          <UiChecksGrid className={styles.uiChecksGrid} /> All form fields are
          optional.
        </div>

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
                            index={index}
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
          <Button
            id="addBlockButton"
            variant="primary"
            onClick={() => addBlock()}
          >
            Add Block!
          </Button>
          <Button type="submit" variant="success">
            {isUploading ? "Uploading..." : "Submit Form"}
          </Button>
        </div>
      </form>
    </div>
  );
}

export default withRouter(CreateFlowPage);

CreateFlowPage.propTypes = {
  history: PropTypes.object,
  apiService: PropTypes.object,
};
