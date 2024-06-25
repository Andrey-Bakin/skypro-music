import React, { ChangeEvent } from "react";
import styles from "./ProgressBar.module.css";

type ProgressType = {
    max: number;
    value: number;
    step: number;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const ProgressBar = React.memo(({
  max,
  value,
  step,
  onChange,
}: ProgressType) => {
  return (
    <input
      className={styles.styledProgressInput}
      type="range"
      min={0}
      max={max}
      value={value}
      step={step}
      onChange={onChange}
    />
  );
});

ProgressBar.displayName = "ProgressBar"
export default ProgressBar;