import Link from "next/link";
import { siteConfig, socialLinks } from "@/lib/config";
import { GithubIcon, LinkedinIcon } from "@/components/icons";

const iconByLabel: Record<string, (props: React.SVGProps<SVGSVGElement>) => React.JSX.Element> = {
  GitHub: GithubIcon,
  LinkedIn: LinkedinIcon,
};

export function Footer() {
  return (
    <footer className="border-t border-border/60">
      <div className="mx-auto flex w-full max-w-5xl flex-col items-center gap-4 px-6 py-10 text-sm text-muted-foreground sm:flex-row sm:justify-between">
        <p>
          © {new Date().getFullYear()} {siteConfig.name}
        </p>

        <div className="flex items-center gap-4">
          {socialLinks.map((social) => {
            const Icon = iconByLabel[social.label];
            return (
              <Link
                key={social.href}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
                className="transition-colors hover:text-foreground"
              >
                {Icon ? <Icon className="size-4" /> : social.label}
              </Link>
            );
          })}
        </div>
      </div>
    </footer>
  );
}
