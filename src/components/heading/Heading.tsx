{
  /* Testing only, and demonstrate how to style by using normal css file */
}

import React from "react";
import styles from "./heading.module.css";

/* for typeScirpt need to define type first*/
interface HeadingProps {
  text: string;
  name: string;
}

/*using destructuring, it allows you to extract specific properties directly from props */
function Heading({ text, name }: HeadingProps) {
  return (
    <div className={styles.heading}>
      <h1>
        --- Welcome, {name}! {text} ---
      </h1>
    </div>
  );
}

export default Heading;
