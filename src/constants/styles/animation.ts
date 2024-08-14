'use client';
import { useEffect } from "react";
import { useAnimate, stagger } from "framer-motion";

export const staggerMenuItems = stagger(0.1, { startDelay: 0.15 });

export function useSidebarMenuAnimation(isOpenSidebar: boolean) {

    const [scope, animate] = useAnimate();

    useEffect(() => {

        animate(
            ".menu-list",
            {
                clipPath: isOpenSidebar
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
            ".menu-list li",
            isOpenSidebar
                ? { opacity: 1, scale: 1, filter: "blur(0px)" }
                : { opacity: 0, scale: 0.3, filter: "blur(20px)" },
            {
                duration: 0.2,
                delay: isOpenSidebar ? staggerMenuItems : 0,
            }
        );
    }, [isOpenSidebar, animate]);

    return scope;
}

export function useSelectAuthAnimation(isOpenSelectAuth: boolean) {

    const [scope, animate] = useAnimate();

    useEffect(() => {
        animate(".arrow", { rotate: isOpenSelectAuth ? 180 : 0 }, { duration: 0.2 });
        
        animate(
            ".select-auth-menu",
            {
                clipPath: isOpenSelectAuth
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
            ".select-auth-menu li",
            isOpenSelectAuth
                ? { opacity: 1, scale: 1, filter: "blur(0px)" }
                : { opacity: 0, scale: 0.3, filter: "blur(20px)" },
            {
                duration: 0.2,
                delay: isOpenSelectAuth ? staggerMenuItems : 0,
            }
        );
    }, [isOpenSelectAuth, animate]);

    return scope;
}