import type { Metadata } from "next";
import { AppShell } from "./app-shell";

export const metadata: Metadata = {
    robots: { index: false, follow: false, nocache: true },
};

export default async function AuthenticatedLayout({
    children,
}: {
    children: React.ReactNode;
    params: { locale: string };
}) {
    // No login redirect - allow direct instant access
    return <AppShell>{children}</AppShell>;
}

