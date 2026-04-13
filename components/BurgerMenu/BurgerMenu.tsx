// "use client";
// import css from "./BurgerMenu.module.css";
// import NavLinks from "../NavLinks/NavLinks";
// import AuthBar from "../AuthBar/AuthBar";
// import UserBar from "../UserBar/UserBar";
// import { clsx } from "clsx";
// import BurgerMenuBtn from "../BurgerMenuBtn/BurgerMenuBtn";
// import Logo from "../Logo/Logo";
// import { useAuthStore } from "@/lib/store/authStore";
// import AppLink from "../AppLink/AppLink";

// interface Props {
//   isOpen: boolean;
//   onClose: () => void;
// }

// export default function BurgerMenu({ isOpen, onClose }: Props) {
//   const isAuthenticated = useAuthStore((s) => s.isAuthenticated);

//   return (
//     <div className={css.panel}>
//       <div className={clsx(css.wrapper, "container")}>
//         <div className={css.header}>
//           <div className={css.logoWrapper}>
//             <Logo onClick={onClose} />
//           </div>

//           {isAuthenticated ? (
//             <div className={css.publishWrapper}>
//               <AppLink
//                 href="/stories/new"
//                 variant="mantis"
//                 className={css.publish}
//               >
//                 Опублікувати статтю
//               </AppLink>
//             </div>
//           ) : (
//             <div className={css.authBarWrapper}>
//               <AuthBar onClick={onClose} />
//             </div>
//           )}
//           <div className={css.closeButtonWrapper}>
//             <BurgerMenuBtn isOpen={isOpen} setIsOpen={onClose} />
//           </div>
//         </div>

//         <div className={css.content}>
//           <div className={css.navWrap}>
//             <NavLinks onClick={onClose} />
//           </div>

//           {isAuthenticated ? (
//             <UserBar />
//           ) : (
//             <AuthBar direction="column" onClick={onClose} />
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

"use client";

import { clsx } from "clsx";
import css from "./BurgerMenu.module.css";
import NavLinks from "../NavLinks/NavLinks";
import AuthBar from "../AuthBar/AuthBar";
import UserBar from "../UserBar/UserBar";
import Logo from "../Logo/Logo";
import BurgerMenuBtn from "../BurgerMenuBtn/BurgerMenuBtn";
import { useAuthStore } from "@/lib/store/authStore";
import AppLink from "../AppLink/AppLink";
import { useEffect } from "react";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export default function BurgerMenu({ isOpen, onClose }: Props) {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <div
      className={clsx(css.backdrop, isOpen && css.backdropActive)}
      onClick={onClose}
    >
      <div
        className={clsx(css.panel, isOpen && css.panelActive)}
        onClick={(e) => e.stopPropagation()}
      >
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
                  >
                    Опублікувати статтю
                  </AppLink>
                  <UserBar />
                </div>
              ) : (
                <AuthBar direction="column" onClick={onClose} />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
