"use client";

import type { ComponentProps } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

type SectionNavLinkProps = Omit<ComponentProps<typeof Link>, "href" | "aria-current"> & {
  href: string;
};

export default function SectionNavLink({ href, ...props }: SectionNavLinkProps) {
  const pathname = usePathname();
  const isPage = pathname === href;
  const isSection = pathname.startsWith(`${href}/`);

  return <Link {...props} href={href} aria-current={isPage ? "page" : isSection ? "location" : undefined} />;
}
