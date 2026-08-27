"use client";

import DesktopShell from "@/components/DesktopShell";
import { UNIT_NAV } from "@/components/UnitNav";
import { UNIT_PROFILE } from "@/components/UnitRole";

export default function AreaLayout({ children }: LayoutProps<"/area">) {
  const role = UNIT_PROFILE;

  return (
    <DesktopShell
      accent={role.accent}
      system={role.system}
      org={role.org}
      url={role.url}
      device="Webapp Desktop · Web Mobile"
      nav={UNIT_NAV}
      user={role.user}
      collapsibleSections
    >
      {children}
    </DesktopShell>
  );
}
