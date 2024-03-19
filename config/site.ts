import { NavItem } from "@/types/nav"

interface SiteConfig {
  name: string
  description: string
  mainNav: NavItem[]
  links: {
    twitter: string
    github: string
    docs: string
  }
}

export const siteConfig: SiteConfig = {
  // name: "चौघड़िया",
  name: "ચોઘડિયા",
  description:
    "Beautifully designed components built with Radix UI and Tailwind CSS.",
  mainNav: [
    {
      title: "Home",
      href: "/",
    },
    {
      title: "History",
      href: "/history",
    },
  ],
  links: {
    twitter: "#",
    github: "https://github.com/sinhaGuild/choghadiya",
    docs: "#",
  },
}
