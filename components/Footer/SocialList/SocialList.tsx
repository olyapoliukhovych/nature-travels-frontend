import css from "./SocialList.module.css";
import { Icon } from "@/components/Icon/Icon";
import AppLink from "@/components/AppLink/AppLink";
export default function SocialList() {
  const socials = [
    { id: "facebook", href: "https://www.facebook.com", label: "Фейсбук" },
    { id: "instagram", href: "https://www.instagram.com", label: "Інстаграм" },
    { id: "x", href: "https://www.x.com", label: "X (Твіттер)" },
    { id: "youtube", href: "https://www.youtube.com", label: "Ютуб" },
  ];
  return (
    <div className={css.socialListWrapper}>
      {socials.map((social) => (
        <AppLink
          key={social.id}
          className={css.socialListLink}
          href={social.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Перейти на сторінку ${social.label}`}
        >
          <Icon id={`icon-${social.id}`} className={css.socialListSvg} />
        </AppLink>
      ))}
    </div>
  );
}
