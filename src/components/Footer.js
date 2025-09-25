import React from 'react';

const contributors = [
  {
    name: 'Win Pisi',
    githubUsername: 'pisichi',
  },
  {
    name: 'Narets Ng',
    githubUsername: 'Naretss',
  },
  // Add more contributors here
];

const Footer = () => {
  return (
    <footer className="text-center p-4 text-xs text-gray-500">
      <p>Contributors</p>
      <div className="flex justify-center items-center space-x-4 mt-2">
        {contributors.map((contributor) => (
          <a
            key={contributor.githubUsername}
            href={`https://github.com/${contributor.githubUsername}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center"
          >
            <img
              src={`https://github.com/identicons/${contributor.githubUsername}.png`}
              alt={contributor.name}
              className="w-8 h-8 rounded-full"
            />
            <span>{contributor.name}</span>
          </a>
        ))}
      </div>
    </footer>
  );
};

export default Footer;