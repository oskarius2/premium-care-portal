import type { ReactNode } from "react";
import { siteContact, telHref, mailtoHref } from "@/config/siteContact";

type ClassProps = { className?: string; children: ReactNode };

/** tel:-länk om phoneTel är satt, annars span med samma utseende */
export function TelLink({ className, children }: ClassProps) {
  const href = telHref(siteContact.phoneTel);
  if (!href) return <span className={className}>{children}</span>;
  return (
    <a href={href} className={className}>
      {children}
    </a>
  );
}

export function MailLink({ className, children }: ClassProps) {
  const href = mailtoHref(siteContact.emailAddress);
  if (!href) return <span className={className}>{children}</span>;
  return (
    <a href={href} className={className}>
      {children}
    </a>
  );
}

/** Hel klickyta (kort) för telefon */
export function TelSurfaceLink({
  className,
  children,
}: ClassProps) {
  const href = telHref(siteContact.phoneTel);
  if (!href) return <div className={className}>{children}</div>;
  return (
    <a href={href} className={className}>
      {children}
    </a>
  );
}

/** Hel klickyta för e-post */
export function MailSurfaceLink({
  className,
  children,
}: ClassProps) {
  const href = mailtoHref(siteContact.emailAddress);
  if (!href) return <div className={className}>{children}</div>;
  return (
    <a href={href} className={className}>
      {children}
    </a>
  );
}
