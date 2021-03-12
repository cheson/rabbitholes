import React, { useState, useEffect } from "react";

export default function Count() {
  const [count, setCount] = useState(0);
  const [quote, setQuote] = useState("");

  useEffect(() => {
    document.title = `You clicked ${count} times`;
  });

  useEffect(() => {
    // testing fetch API, works great!
    let url = "https://baconipsum.com/api/?type=meat-and-filler";
    fetch(url).then(function (response) {
      response.text().then(function (text) {
        setQuote(text);
      });
    });
  }, []); //empty dependencies array means no need to re-evaluate effect after render unless something in array changed.

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>Click me</button>
      <p>{quote}</p>
    </div>
  );
}
