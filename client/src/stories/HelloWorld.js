import React from 'react';
import PropTypes from 'prop-types';

export default function HelloWorld({words: {defaultText, extra, doubleExtra}, onDivClick }) {
  return (
    <div className="hello-world-div">
      <input type="text" value={defaultText} readOnly={true} />
      <button onClick={() => onDivClick(defaultText)}> click me! </button>
    </div>
  );
}

HelloWorld.propTypes = {
    /** Composition of the hello world element */
    words: PropTypes.shape({
      /** Text to display */
      defaultText: PropTypes.string.isRequired,
      /** Extra stuff */
      extra: PropTypes.string,
      /** Doubly extra stuff */
      doubleExtra: PropTypes.string,
    }),
    /** Event to react to div click */
    onDivClick: PropTypes.func,
  };