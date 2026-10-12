"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/", label: "The box" },
  { href: "/recipes/new", label: "Write a card" },
  { href: "/chat", label: "Kitchen" },
  { href: "/settings", label: "Settings" },
];

function isCurrent(pathname: string, href: string) {
  if (href === "/recipes/new") return pathname === "/recipes/new";
  if (href === "/") {
    return pathname === "/" || (pathname.startsWith("/recipes") && pathname !== "/recipes/new");
  }
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function KitchenNav() {
  const pathname = usePathname();

  return (
    <nav aria-label="Kitchen" className="flex flex-wrap gap-x-5 gap-y-2 text-sm">
      {links.map((link) => {
        const current = isCurrent(pathname, link.href);
        return (
          <Link
            key={link.href}
            href={link.href}
            aria-current={current ? "page" : undefined}
            className={
              current
                ? "underline decoration-paprika decoration-2 underline-offset-[6px]"
                : "text-ink-soft hover:text-ink"
            }
          >
            {link.label}
          </Link>
        );
      })}
    </nav>
  );
}

export function KitchenNavFallback() {
  return (
    <nav aria-label="Kitchen" className="flex flex-wrap gap-x-5 gap-y-2 text-sm text-ink-soft">
      {links.map((link) => (
        <Link key={link.href} href={link.href}>
          {link.label}
        </Link>
      ))}
    </nav>
  );
}
