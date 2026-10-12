import Link from "next/link";
import type { ButtonHTMLAttributes, ReactNode } from "react";

const tones = {
  primary: "bg-paprika text-foam hover:bg-paprika-deep",
  quiet: "border border-ink/20 bg-transparent text-ink hover:border-ink",
  danger: "bg-ink text-foam hover:bg-paprika-deep",
};

const base =
  "inline-flex items-center justify-center px-4 py-2.5 text-sm transition disabled:cursor-not-allowed disabled:opacity-50";

export function Button({
  tone = "primary",
  className = "",
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & {
  tone?: keyof typeof tones;
}) {
  return <button className={`${base} ${tones[tone]} ${className}`} {...props} />;
}

export function ButtonLink({
  href,
  tone = "primary",
  className = "",
  children,
}: {
  href: string;
  tone?: keyof typeof tones;
  className?: string;
  children: ReactNode;
}) {
  return (
    <Link href={href} className={`${base} ${tones[tone]} ${className}`}>
      {children}
    </Link>
  );
}
