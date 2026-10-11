import React from 'react';

interface SemanticoIconProps {
  className?: string;
  isDark?: boolean;
}

export const SemanticoIcon: React.FC<SemanticoIconProps> = ({
  className = 'w-full h-full',
  isDark = false,
}) => {
  // Canonical brand colors matching user's uploaded Favicon-Semantico-Novo.png:
  // Black stroke lines and circles, white node fills, and vibrant yellow top-left node.
  const strokeColor = '#000000';
  const whiteNodeFill = '#FFFFFF';
  const yellowNodeFill = '#FFC800';

  return (
    <svg
      viewBox="0 0 512 512"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="Ícone Semântico"
    >
      {/* Edges connecting central node to satellites */}
      <line
        x1="240"
        y1="225"
        x2="82"
        y2="75"
        stroke={strokeColor}
        strokeWidth="28"
        strokeLinecap="round"
      />
      <line
        x1="240"
        y1="225"
        x2="368"
        y2="92"
        stroke={strokeColor}
        strokeWidth="28"
        strokeLinecap="round"
      />
      <line
        x1="240"
        y1="225"
        x2="104"
        y2="362"
        stroke={strokeColor}
        strokeWidth="28"
        strokeLinecap="round"
      />
      <line
        x1="240"
        y1="225"
        x2="240"
        y2="422"
        stroke={strokeColor}
        strokeWidth="28"
        strokeLinecap="round"
      />
      <line
        x1="240"
        y1="225"
        x2="430"
        y2="400"
        stroke={strokeColor}
        strokeWidth="28"
        strokeLinecap="round"
      />

      {/* Central Node */}
      <circle
        cx="240"
        cy="225"
        r="52"
        fill={whiteNodeFill}
        stroke={strokeColor}
        strokeWidth="28"
      />

      {/* Top-Left Node (Signature Yellow / Golden Node) */}
      <circle
        cx="82"
        cy="75"
        r="40"
        fill={yellowNodeFill}
        stroke={strokeColor}
        strokeWidth="28"
      />

      {/* Satellite Nodes */}
      <circle
        cx="368"
        cy="92"
        r="24"
        fill={whiteNodeFill}
        stroke={strokeColor}
        strokeWidth="28"
      />
      <circle
        cx="104"
        cy="362"
        r="28"
        fill={whiteNodeFill}
        stroke={strokeColor}
        strokeWidth="28"
      />
      <circle
        cx="240"
        cy="422"
        r="42"
        fill={whiteNodeFill}
        stroke={strokeColor}
        strokeWidth="28"
      />
      <circle
        cx="430"
        cy="400"
        r="44"
        fill={whiteNodeFill}
        stroke={strokeColor}
        strokeWidth="28"
      />
    </svg>
  );
};
