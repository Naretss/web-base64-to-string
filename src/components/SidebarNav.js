import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";

const navLinks = [
  {
    title: "Encoders / Decoders",
    links: [
      { path: "/", label: "Base64" },
    ],
  },
  {
    title: "Formatters",
    links: [
      { path: "/pretty-xml", label: "XML Formatter" },
      { path: "/pretty-json", label: "JSON Formatter" },
    ],
  },
  {
    title: "Generators",
    links: [
        { path: "/avatar-gen", label: "Avatar Generator" },
        { path: "/hash-generator", label: "Hash Generator" }
    ],
  },
  {
    title: "Utilities",
    links: [{ path: "/string-utils", label: "String Utilities" }],
  },
];

export function SidebarNav() {
  const location = useLocation();

  return (
    <nav className="flex flex-col space-y-4">
      {navLinks.map((group, index) => (
        <div key={index}>
          <h4 className="font-medium">{group.title}</h4>
          <div className="mt-2 flex flex-col space-y-1">
            {group.links.map((link, linkIndex) => (
              <Link
                key={linkIndex}
                to={link.path}
                className={cn(
                  "group flex items-center rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
                  location.pathname === link.path ? "bg-accent" : "transparent"
                )}
              >
                <span>{link.label}</span>
              </Link>
            ))}
          </div>
        </div>
      ))}
    </nav>
  );
}