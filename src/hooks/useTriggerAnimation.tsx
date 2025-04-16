import { useEffect } from "react";

export const useTriggerAnimation = <T extends HTMLElement>(
  ref: React.RefObject<T>,
  animationClass: string,
  trigger: string | number,
  condition: boolean,
) => {
  useEffect(() => {
    if (condition && ref.current) {
      const el = ref.current;
      el.classList.add(animationClass);

      const handleAnimationEnd = () => {
        el.classList.remove(animationClass);
        el.removeEventListener("animationend", handleAnimationEnd);
      };

      el.addEventListener("animationend", handleAnimationEnd);
    }
  }, [trigger]);
};
