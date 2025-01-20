import React from "react";

const Footer: React.FC = () => {
  const connectionLinks = [
    {
      name: "X",
      href: "https://x.com/meArun_Kumar_",
    },
    {
      name: "GitHub",
      href: "https://github.com/Arun-Kumar21",
    },
    {
      name: "Blog",
      href: "https://yourblog.com",
    },
    {
      name: "Portfolio",
      href: "https://yourportfolio.com",
    },
  ];

  return (
    <footer className="text-zinc-700 text-sm bottom-4 w-full p-4">
      <p>Connect with me:</p>
      <ul className="flex items-center space-x-4 mt-2">
        {connectionLinks.map((link) => (
          <li key={link.name} className="hover:text-zinc-900 hover:underline">
            <a
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-zinc-900"
            >
              {link.name}
            </a>
          </li>
        ))}
      </ul>
    </footer>
  );
};

export default Footer;
