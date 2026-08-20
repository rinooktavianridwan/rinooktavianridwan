import { useState } from "react";
import { isEmojiIcon } from "../../utils/icon.util";

interface CardIconProps {
  color: string;
  destination: string;
  source: string;
  platformName?: string;
}

function CardIcon({ color, destination, source, platformName }: CardIconProps) {
  const [showTooltip, setShowTooltip] = useState(false);
  const isEmoji = isEmojiIcon(source);

  return (
    <div
      className="relative"
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
    >
      {showTooltip && platformName && (
        <div
          role="tooltip"
          className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-3 py-1 rounded-md whitespace-nowrap z-10 opacity-0 animate-[fadeIn_0.2s_ease-out_forwards]"
        >
          {platformName}
          <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-gray-800 rotate-45"></div>
        </div>
      )}

      <a
        href={destination || undefined}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={platformName || "social link"}
        className="w-10 h-10 rounded-full flex items-center justify-center cursor-pointer transition-all duration-300 hover:scale-125 hover:rotate-12 hover:shadow-xl relative overflow-hidden group"
        style={{
          backgroundColor: color,
          boxShadow: `0 4px 15px ${color}40`,
        }}
      >
        <div
          className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{ boxShadow: `0 0 20px ${color}, 0 0 40px ${color}80` }}
        ></div>

        {isEmoji ? (
          <span className="text-2xl relative z-10 group-hover:scale-110 transition-transform duration-300">
            {source}
          </span>
        ) : (
          <img
            src={source}
            alt={platformName || "social"}
            className="w-6 h-6 relative z-10 group-hover:scale-110 transition-transform duration-300"
          />
        )}
      </a>
    </div >
  );
}

export default CardIcon;
