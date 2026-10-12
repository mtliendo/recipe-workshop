import { useId, type ReactNode } from "react";

type FrameProps = {
  well: string;
  rim?: string;
  children: ReactNode;
};

function Frame({ well, rim = "#f6f0e4", children }: FrameProps) {
  return (
    <svg viewBox="0 0 320 260" className="h-full w-full" aria-hidden="true">
      <ellipse cx="160" cy="224" rx="104" ry="14" fill="#241910" opacity="0.12" />
      <ellipse cx="160" cy="126" rx="138" ry="108" fill={rim} />
      <ellipse cx="160" cy="126" rx="120" ry="92" fill={well} />
      {children}
      <ellipse cx="112" cy="78" rx="36" ry="14" fill="#fff" opacity="0.28" />
      <ellipse
        cx="160"
        cy="126"
        rx="138"
        ry="108"
        fill="none"
        stroke="#241910"
        strokeOpacity="0.16"
      />
    </svg>
  );
}

function Preset({ photo }: { photo: string }) {
  switch (photo) {
    case "brisket":
      return (
        <Frame well="#f3e4d0">
          <ellipse cx="160" cy="132" rx="92" ry="54" fill="#6b3218" />
          <ellipse cx="160" cy="132" rx="92" ry="54" fill="none" stroke="#3a1c12" strokeWidth="9" />
          <ellipse cx="136" cy="120" rx="32" ry="16" fill="#c45b3c" />
          <ellipse cx="196" cy="150" rx="18" ry="10" fill="#e09a4a" />
          <circle cx="100" cy="168" r="9" fill="#e07a2f" />
          <circle cx="214" cy="104" r="7" fill="#3f6b3a" />
          <path d="M206 92c12 18 8 34-2 46" fill="none" stroke="#2f6b3a" strokeWidth="4" />
        </Frame>
      );
    case "cornbread":
      return (
        <Frame well="#2c211c" rim="#1a1411">
          <rect x="118" y="92" width="42" height="36" rx="3" fill="#e2a84a" />
          <rect x="164" y="92" width="42" height="36" rx="3" fill="#f0c16a" />
          <rect x="118" y="132" width="42" height="36" rx="3" fill="#c9842e" />
          <path d="M176 150l28 18-8 22-34-8z" fill="#f6d48a" />
          <ellipse cx="198" cy="168" rx="10" ry="6" fill="#f7f1c8" />
        </Frame>
      );
    case "cobbler":
      return (
        <Frame well="#f6e2c4">
          <ellipse cx="160" cy="136" rx="78" ry="48" fill="#e07a32" />
          <ellipse cx="132" cy="118" rx="18" ry="12" fill="#f4d7a2" />
          <ellipse cx="168" cy="112" rx="20" ry="13" fill="#f8e2b8" />
          <ellipse cx="196" cy="128" rx="16" ry="11" fill="#f0c98a" />
          <ellipse cx="150" cy="146" rx="14" ry="9" fill="#f6d7a4" />
          <circle cx="176" cy="150" r="4" fill="#f8f1e4" opacity="0.8" />
          <circle cx="214" cy="146" r="3" fill="#f8f1e4" opacity="0.7" />
        </Frame>
      );
    case "citrus":
      return (
        <Frame well="#f7f1e6">
          <ellipse cx="154" cy="136" rx="48" ry="30" fill="#f3e1c4" />
          <ellipse cx="154" cy="132" rx="34" ry="18" fill="#e7c99a" />
          <circle cx="214" cy="118" r="16" fill="#f0c93a" />
          <circle cx="214" cy="118" r="8" fill="#f7e7a2" />
          <circle cx="112" cy="156" r="12" fill="#e2b423" />
          <path d="M196 156c16 10 28 8 36-2" fill="none" stroke="#7a8f4a" strokeWidth="3" />
        </Frame>
      );
    case "greens":
      return (
        <Frame well="#243024" rim="#d9cbb6">
          <ellipse cx="150" cy="128" rx="34" ry="22" fill="#1d4a32" />
          <ellipse cx="184" cy="140" rx="30" ry="18" fill="#3f6b3a" />
          <ellipse cx="132" cy="148" rx="24" ry="14" fill="#2f5a34" />
          <ellipse cx="168" cy="156" rx="40" ry="10" fill="#c4a15a" opacity="0.85" />
        </Frame>
      );
    case "tomato":
      return (
        <Frame well="#f7f1e6">
          <ellipse cx="142" cy="132" rx="28" ry="22" fill="#c2412d" transform="rotate(-18 142 132)" />
          <ellipse cx="176" cy="124" rx="26" ry="20" fill="#a33222" transform="rotate(12 176 124)" />
          <ellipse cx="188" cy="152" rx="24" ry="16" fill="#d25a3e" transform="rotate(20 188 152)" />
          <ellipse cx="150" cy="158" rx="18" ry="8" fill="#e7c27a" opacity="0.7" />
          <circle cx="206" cy="112" r="3" fill="#f4efe4" />
        </Frame>
      );
    default:
      return (
        <Frame well="#f7f1e6">
          <ellipse
            cx="160"
            cy="126"
            rx="78"
            ry="58"
            fill="none"
            stroke="#241910"
            strokeOpacity="0.28"
            strokeDasharray="5 6"
          />
        </Frame>
      );
  }
}

function PhotoPlate({ src }: { src: string }) {
  const clipId = useId().replace(/:/g, "");
  return (
    <svg viewBox="0 0 320 260" className="h-full w-full" aria-hidden="true">
      <ellipse cx="160" cy="224" rx="104" ry="14" fill="#241910" opacity="0.12" />
      <ellipse cx="160" cy="126" rx="138" ry="108" fill="#f6f0e4" />
      <defs>
        <clipPath id={clipId}>
          <ellipse cx="160" cy="126" rx="120" ry="92" />
        </clipPath>
      </defs>
      <image
        href={src}
        x="40"
        y="34"
        width="240"
        height="184"
        preserveAspectRatio="xMidYMid slice"
        clipPath={`url(#${clipId})`}
      />
      <ellipse cx="160" cy="126" rx="120" ry="92" fill="#c2412d" opacity="0.12" />
      <ellipse
        cx="160"
        cy="126"
        rx="138"
        ry="108"
        fill="none"
        stroke="#241910"
        strokeOpacity="0.16"
      />
    </svg>
  );
}

export function Plate({ photo, className = "" }: { photo: string; className?: string }) {
  return (
    <div className={`aspect-[6/5] ${className}`}>
      {photo.startsWith("data:") || photo.startsWith("https://") || photo.startsWith("http://") ? (
        <PhotoPlate src={photo} />
      ) : (
        <Preset photo={photo} />
      )}
    </div>
  );
}
