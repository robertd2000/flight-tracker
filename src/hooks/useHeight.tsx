import { useEffect, useRef, useState } from "react";

export const useHeight = (dependencies: any[] = []) => {
  const [height, setHeight] = useState(0);

  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setHeight(ref.current?.offsetHeight as number);
  }, dependencies);

  return {
    ref,
    height,
  };
};
