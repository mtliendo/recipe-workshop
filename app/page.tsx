import type { Metadata } from "next";
import { WorkshopHome } from "@/components/workshop-home";
import { WORKSHOP_TITLE } from "@/lib/workshop";

export const metadata: Metadata = {
  title: WORKSHOP_TITLE,
  description:
    "A hands-on workshop. Build Sunday Box — Maya’s family recipe box — for humans, then for agents.",
};

export default function WorkshopPage() {
  return <WorkshopHome />;
}
