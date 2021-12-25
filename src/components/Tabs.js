import React from 'react';

function Tabs({index, setIndex}) {
  return (
    <div className="btn_tabs">
      <button
        className={index === 1 ? "btn_tab active" : "btn_tab"}
        onClick={() => setIndex(1)}
      >
        Cast
      </button>
      <button
        className={index === 2 ? "btn_tab active" : "btn_tab"}
        onClick={() => setIndex(2)}
      >
        Videos
      </button>
      <button
        className={index === 3 ? "btn_tab active" : "btn_tab"}
        onClick={() => setIndex(3)}
      >
        Photos
      </button>
    </div>
  );
}

export default Tabs;