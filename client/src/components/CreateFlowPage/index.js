import React, { useState, useRef, useEffect } from "react";
import CreateFlowIntro from "../CreateFlowIntro";
import CreateFlowBlock from "../CreateFlowBlock";
import ResourceNotFound from "../ResourceNotFound";
import PropTypes from "prop-types";
import { nanoid } from "nanoid";
import { Button } from "react-bootstrap";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { MenuButtonWide, UiChecksGrid } from "react-bootstrap-icons";
import { withRouter, Prompt, useParams } from "react-router-dom";
import { VIEW_FLOW_PREFIX } from "../../constants/routes";
import styles from "./CreateFlowPage.module.css";

function CreateFlowPage(props) {
  let { flowId } = useParams();
  const defaultEmptyBlock = {
    url: "",
    image: "",
    description: "",
    id: nanoid(),
  };
  const [blocks, setBlocks] = useState([defaultEmptyBlock]);
  const defaultEmptyIntro = [{ title: "", image: "", description: "" }];
  const [intro, setIntro] = useState(defaultEmptyIntro);
  const [editFlowAllowed, setEditFlowAllowed] = useState(undefined);
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    if (props.editMode) {
      props.apiService.viewFlow(flowId).then((flow) => {
        const newBlocks = flow.blocks.map((block) => {
          return {
            url: block.url,
            description: block.description,
            image: block.imgUrl,
            id: block._id,
          };
        });
        setBlocks(newBlocks);
        setIntro({
          title: flow.flowTitle,
          description: flow.flowDescription,
          image: flow.imgUrl,
        });
        setEditFlowAllowed(flow.userId == props.authUser?.uid);
      });
    } else {
      setBlocks([defaultEmptyBlock]);
      setIntro(defaultEmptyIntro);
    }
  }, [props.editMode]);

  function addBlock() {
    setBlocks((currentBlocks) => [...currentBlocks, defaultEmptyBlock]);
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
    const apiCall = props.editMode
      ? () => props.apiService.editFlow(flowId, formData)
      : () => props.apiService.createFlow(formData);
    apiCall().then(
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
    // Moves block from sourceIndex to destinationIndex
    const tempBlock = newBlocks.splice(sourceIndex, 1)[0];
    newBlocks.splice(destinationIndex, 0, tempBlock);
    setBlocks(newBlocks);
  }

  const resourceNotOwnedComponent = (
    <ResourceNotFound message={`This user does not own flow (${flowId}).`} />
  );

  const notLoggedInComponent = (
    <ResourceNotFound message={`No user logged in.`} />
  );

  const createFlowComponent = (
    <div>
      {/* TODO: investigate some bug where this prompt will reoccur multiple times when trying to log out */}
      <Prompt
        message={(location) => {
          return location.pathname.startsWith(VIEW_FLOW_PREFIX)
            ? true
            : `Are you sure you want to leave? Your progress will be lost.`;
        }}
      />

      <form onSubmit={onSubmit} ref={form}>
        <div className={styles.header}>
          {props.editMode ? <h3> Edit List </h3> : <h3> Create List </h3>}
          <hr />
        </div>

        <CreateFlowIntro {...intro} />

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
            disabled={isUploading}
          >
            Add Block!
          </Button>
          <Button type="submit" variant="success" disabled={isUploading}>
            {isUploading ? "Uploading..." : "Submit Form"}
          </Button>
        </div>
      </form>
    </div>
  );

  if (props.editMode) {
    if (editFlowAllowed === undefined) {
      return <div></div>;
    } else if (!editFlowAllowed) {
      return resourceNotOwnedComponent;
    }
  }
  if (!props.authUser) {
    return notLoggedInComponent;
  }
  return createFlowComponent;
}

export default withRouter(CreateFlowPage);

CreateFlowPage.propTypes = {
  history: PropTypes.object,
  apiService: PropTypes.object,
  editMode: PropTypes.bool,
  authUser: PropTypes.object,
};
