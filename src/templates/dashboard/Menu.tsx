'use client'
import { useState, useEffect } from "react";
import { useAnimate, stagger, motion } from "framer-motion";

const staggerMenuItems = stagger(0.1, { startDelay: 0.15 });

function useSidebarMenuAnimation(isOpen: boolean) {
  const [scope, animate] = useAnimate();

  useEffect(() => {

    animate(
      "ul",
      {
        clipPath: isOpen
          ? "inset(0% 0% 0% 0% round 10px)"
          : "inset(10% 50% 90% 50% round 10px)",
      },
      {
        type: "spring",
        bounce: 0,
        duration: 0.5,
      }
    );

    animate(
      "li",
      isOpen
        ? { opacity: 1, scale: 1, filter: "blur(0px)" }
        : { opacity: 0, scale: 0.3, filter: "blur(20px)" },
      {
        duration: 0.2,
        delay: isOpen ? staggerMenuItems : 0,
      }
    );
  }, [isOpen,animate]);

  return scope;
}

export const Menu=()=>{
  const [isOpen, setIsOpen] = useState(false);
  const scope = useSidebarMenuAnimation(isOpen);

  return (
    <>
    <nav className="bg-blue-500 text-black" ref={scope}>
      <div
        style={{
          position: "fixed",
          bottom: -210,
          left: 200,
          width: 100,
          height: 100,
          background: "white",
        }}
      />
      <motion.button
        whileTap={{ scale: 0.97 }}
        onClick={() => setIsOpen(!isOpen)}
      >
        Menu

      </motion.button>
      <ul
        style={{
          pointerEvents: isOpen ? "auto" : "none",
          clipPath: "inset(10% 50% 90% 50% round 10px)",
        }}
      >
        <li>Item 1 </li>
        <li>Item 2 </li>
        <li>Item 3 </li>
        <li>Item 4 </li>
        <li>Item 5 </li>
      </ul>{" "}
    </nav>
    </>
  );
}
