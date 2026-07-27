"use client";

import { Drawer } from "vaul";
import { clsx } from "clsx";
import css from "./BurgerMenu.module.css";
import NavLinks from "../NavLinks/NavLinks";
import AuthBar from "../AuthBar/AuthBar";
import UserBar from "../UserBar/UserBar";
import Logo from "../Logo/Logo";
import BurgerMenuBtn from "../BurgerMenuBtn/BurgerMenuBtn";
import { useAuthStore } from "@/lib/store/authStore";
import AppLink from "../AppLink/AppLink";
import { useEffect, useState } from "react";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onLogoutClick: () => void;
}

export default function BurgerMenu({ isOpen, onClose, onLogoutClick }: Props) {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const [isTablet, setIsTablet] = useState(false);

  useEffect(() => {
    const checkScreen = () => {
      setIsTablet(window.innerWidth >= 480);
    };
    checkScreen();
    window.addEventListener("resize", checkScreen);
    return () => window.removeEventListener("resize", checkScreen);
  }, []);

  useEffect(() => {
    if (!isOpen) return;

    const handlePopState = () => {
      onClose();
    };

    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, [isOpen, onClose]);

  return (
    <Drawer.Root
      open={isOpen}
      onOpenChange={(open) => !open && onClose()}
      direction={isTablet ? "right" : "bottom"}
    >
      <Drawer.Portal>
        <Drawer.Overlay className={css.backdrop} />

        <Drawer.Content
          className={clsx(
            css.panel,
            isTablet ? css.panelRight : css.panelBottom,
          )}
        >
          {!isTablet && (
            <div className={css.dragHandleWrapper}>
              <div className={css.dragHandle} />
            </div>
          )}

          <div className={clsx(css.wrapper, "container")}>
            <div className={css.header}>
              <div className={css.logoWrapper}>
                <Logo onClick={onClose} />
              </div>

              <div className={css.closeButtonWrapper}>
                <BurgerMenuBtn isOpen={true} setIsOpen={onClose} />
              </div>
            </div>

            <div className={css.content}>
              <div className={css.navWrap}>
                <NavLinks onClick={onClose} />
              </div>

              <div className={css.actions}>
                {isAuthenticated ? (
                  <div className={css.profileWrapper}>
                    <AppLink
                      href="/stories/new"
                      variant="mantis"
                      className={css.publish}
                      onClick={onClose}
                    >
                      Опублікувати статтю
                    </AppLink>
                    <UserBar onLogoutClick={onLogoutClick} />
                  </div>
                ) : (
                  <AuthBar direction="column" onClick={onClose} />
                )}
              </div>
            </div>
          </div>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
}
