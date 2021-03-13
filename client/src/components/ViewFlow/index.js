import React from "react";
import { useParams } from "react-router-dom";

export default function ViewFlow() {
  let { id } = useParams();

  return (
    <div>
      <h2>View Flow: {id}</h2>
    </div>
  );
}
