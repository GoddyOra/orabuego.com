export const siteConfig = {
  name: "Godwin Orabuego",
  shortName: "Ora",
  title: "Godwin Orabuego — Software Engineer",
  description:
    "I build and ship full products end to end — placeholder tagline until final copy lands.",
  url: "https://orabuego.com",
  githubHandle: "GoddyOra",
};

export type NavLink = {
  label: string;
  href: string;
};

export const navLinks: NavLink[] = [
  { label: "About", href: "/about" },
  { label: "Experience", href: "/experience" },
  { label: "Projects", href: "/projects" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

export type SocialLink = {
  label: string;
  href: string;
};

// Placeholder URLs — replace with Ora's real profiles during content-fill.
export const socialLinks: SocialLink[] = [
  { label: "GitHub", href: "https://github.com/GoddyOra" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/" },
];
