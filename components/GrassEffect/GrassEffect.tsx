"use client";
import React, { isValidElement, cloneElement, ReactElement } from "react";
import css from "./GrassEffect.module.css";
import clsx from "clsx";
import { useSettingsStore } from "@/lib/store/settingsStore";

interface Props {
  children: React.ReactNode;
}

export default function GrassEffect({ children }: Props) {
  const isAnimationEnabled = useSettingsStore((s) => s.isAnimationEnabled);

  if (!isAnimationEnabled) return <>{children}</>;

  const renderAnimatedText = (text: string) => {
    const words = text.split(" ");

    return words.map((word, wordIndex) => {
      const subWords = word.split(/(?<=-)/g);

      return (
        <React.Fragment key={wordIndex}>
          {subWords.map((subWord, subIndex) => (
            <span key={subIndex} style={{ whiteSpace: "nowrap" }}>
              {subWord.split("").map((char, charIndex) => {
                const globalIndex = wordIndex * 10 + subIndex * 5 + charIndex;
                return (
                  <span
                    key={charIndex}
                    className={css.grassLetter}
                    style={{ "--index": globalIndex } as React.CSSProperties}
                  >
                    {char}
                  </span>
                );
              })}
            </span>
          ))}

          {wordIndex < words.length - 1 && (
            <span className={css.space}>&nbsp;</span>
          )}
        </React.Fragment>
      );
    });
  };

  return (
    <>
      {typeof children === "string"
        ? renderAnimatedText(children)
        : isValidElement(children)
          ? cloneElement(children as ReactElement<{ className?: string }>, {
              className: clsx(
                (children.props as { className?: string }).className,
                css.grassLetter,
              ),
            })
          : children}
    </>
  );
}
