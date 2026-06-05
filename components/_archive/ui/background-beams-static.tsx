"use client";
import React from "react";
import { cn } from "@/lib/utils";

export const BackgroundBeams = React.memo(
  ({ className }: { className?: string }) => {
    return (
      <div
        className={cn(
          "absolute inset-0 overflow-hidden",
          className,
        )}
      >
        <svg
          className="pointer-events-none absolute z-0 h-full w-full opacity-30"
          width="100%"
          height="100%"
          viewBox="0 0 696 316"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="xMidYMid slice"
        >
          <path
            d="M-380 -189C-380 -189 -312 216 152 343C616 470 684 875 684 875"
            stroke="url(#beam1)"
            strokeOpacity="0.3"
            strokeWidth="0.5"
          />
          <path
            d="M-310 -269C-310 -269 -242 136 222 263C686 390 754 795 754 795"
            stroke="url(#beam2)"
            strokeOpacity="0.25"
            strokeWidth="0.5"
          />
          <path
            d="M-240 -349C-240 -349 -172 56 292 183C756 310 824 715 824 715"
            stroke="url(#beam3)"
            strokeOpacity="0.2"
            strokeWidth="0.5"
          />
          <path
            d="M-170 -429C-170 -429 -102 -24 362 103C826 230 894 635 894 635"
            stroke="url(#beam1)"
            strokeOpacity="0.15"
            strokeWidth="0.5"
          />
          <defs>
            <linearGradient id="beam1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop stopColor="#18CCFC" stopOpacity="0" />
              <stop offset="50%" stopColor="#0EA5E9" />
              <stop offset="100%" stopColor="#18CCFC" stopOpacity="0" />
            </linearGradient>
            <linearGradient id="beam2" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop stopColor="#6344F5" stopOpacity="0" />
              <stop offset="50%" stopColor="#6344F5" />
              <stop offset="100%" stopColor="#6344F5" stopOpacity="0" />
            </linearGradient>
            <linearGradient id="beam3" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop stopColor="#AE48FF" stopOpacity="0" />
              <stop offset="50%" stopColor="#AE48FF" />
              <stop offset="100%" stopColor="#AE48FF" stopOpacity="0" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    );
  },
);

BackgroundBeams.displayName = "BackgroundBeams";
