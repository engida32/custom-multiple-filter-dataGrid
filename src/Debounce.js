import React from "react";
export default function Debounce() {
  const [searchtext, setSearchText] = React.useState();

  return (
    <div className="App">
      <h1>Hello CodeSandbox</h1>
      <h2>Start editing to see some magic happen!</h2>
      debouncing input
      <br />
      <br />
      <input
        onChange={(e) =>
          setTimeout(() => {
            setSearchText(e.target.value);
          }, 1000)
        }
      />
      <br />
      <span>{searchtext} </span>
    </div>
  );
}
