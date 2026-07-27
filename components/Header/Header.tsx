"use client";

import { useState } from "react";
import css from "./Header.module.css";
import NavLinks from "../NavLinks/NavLinks";
import AuthBar from "../AuthBar/AuthBar";
import UserBar from "../UserBar/UserBar";
import BurgerMenu from "../BurgerMenu/BurgerMenu";
import BurgerMenuBtn from "../BurgerMenuBtn/BurgerMenuBtn";
import AppLink from "../AppLink/AppLink";
import { useAuthStore } from "@/lib/store/authStore";
import clsx from "clsx";
import Logo from "../Logo/Logo";
import Modal from "../Modal/Modal";
import { ModeModal } from "../ModeModal/ModeModal";
import { logoutUser } from "@/lib/api/auth/clientApi";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const clear = useAuthStore((s) => s.clearIsAuthenticated);

  const handleLogout = async () => {
    try {
      await logoutUser();
    } catch {
    } finally {
      clear();
      window.location.href = "/";
    }
  };

  const handleLogoutClick = () => {
    setIsOpen(false);
    setIsLogoutModalOpen(true);
  };

  return (
    <header className={css.header}>
      <div className={clsx(css.container, "container")}>
        <div className={css.logoWrapper}>
          <Logo />
        </div>
        <div className={css.desktopNav}>
          <NavLinks />
        </div>

        {isAuthenticated ? (
          <>
            <div className={css.publishWrapper}>
              <AppLink
                href="/stories/new"
                variant="mantis"
                className={css.publish}
              >
                Опублікувати статтю
              </AppLink>
            </div>
            <div className={css.userBarWrapper}>
              <UserBar onLogoutClick={handleLogoutClick} />
            </div>
          </>
        ) : (
          <div className={css.authBarWrapper}>
            <AuthBar />
          </div>
        )}

        <div className={css.burgerMenuBtn}>
          <BurgerMenuBtn setIsOpen={setIsOpen} />
        </div>
      </div>

      <BurgerMenu
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onLogoutClick={handleLogoutClick}
      />

      {isLogoutModalOpen && (
        <Modal onClose={() => setIsLogoutModalOpen(false)}>
          <ModeModal
            mode="logout"
            onClose={() => setIsLogoutModalOpen(false)}
            logout={handleLogout}
          />
        </Modal>
      )}
    </header>
  );
}
