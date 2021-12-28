import useEventListener from "./useEventListener";
import {RefObject} from "react";

type Handler = (event: MouseEvent) => void;

function useOnClickOutside<T extends HTMLElement = HTMLElement>(
  ref: RefObject<T>,
  handler: Handler,
  state?: boolean,
  mouseEvent: "mousedown" | "mouseup" = "mousedown",
): void {
  useEventListener(mouseEvent, (event) => {
    const el = ref?.current;
    if (state && el && !el.contains(event.target as Node)) {
      handler(event as unknown as MouseEvent);
    }
    return;
  });
}

export default useOnClickOutside;


// import { useEffect } from "react";
// import {RefObject} from "react";
//
// const useOutsideClick = ( ref: RefObject<HTMLElement>,callback: ()  => void | undefined, state?:boolean) => {
//   const handleClick = (e:MouseEvent) => {
//     if (state && ref.current && !ref.current.contains(e.target as Node)) {
//       callback()
//     }
//   };
//   useEffect(() => {
//     document.addEventListener("click", handleClick);
//
//     return () => {
//       document.removeEventListener("click", handleClick);
//     };
//   });
// };
//
// export default useOutsideClick;