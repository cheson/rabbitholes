import React from "react";

function CreateFlowBlock() {
  return (
    <div>
      <form action="/api/images" method="post" encType="multipart/form-data">
        <div>
          <input tyoe="text" name="text"></input>
        </div>
        <div>
          <input type="file" name="image" />
        </div>
      </form>
    </div>
  );
}

export default CreateFlowBlock;
