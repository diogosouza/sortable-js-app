import React from "react";
import SimpleList from "./components/SimpleList";

const App = () => {
  return (
    <div className="container">
      <div className="px-3 py-3 pt-md-5 pb-md-4 mx-auto text-center">
        <h1 className="display-4">SortableJS</h1>
        <p className="lead">
          Let's test together the amazing features of this library along with
          React.
        </p>
      </div>
      <SimpleList />
    </div>
  );
};

export default App;
