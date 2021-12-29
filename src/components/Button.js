import React from 'react';

function Button({link}) {
  return (
    <>
      <div>
        {link ? (
          <button></button>
        ) : (
          <a href={link}></a>
        )}
      </div>
    </>
  );
}

export default Button;