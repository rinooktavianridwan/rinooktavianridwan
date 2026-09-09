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
          className="absolute -top-12 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-xs px-3 py-1.5 rounded-lg whitespace-nowrap z-10 opacity-0 animate-fade-in-up pointer-events-none"
          style={{ animationDelay: "0.1s", animationFillMode: "forwards" }}
        >
          {platformName}
        </div>
      )}

      <a
        href={destination || undefined}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={platformName || "social link"}
        className="relative w-12 h-12 md:w-14 md:h-14 rounded-xl flex items-center justify-center cursor-pointer transition-all duration-300 hover:scale-110 hover:rotate-3 hover:shadow-2xl group overflow-hidden"
        style={{
          backgroundColor: color,
          boxShadow: `0 8px 25px ${color}40`,
        }}
      >
        {/* Glow ring */}
        <div
          className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-lg"
          style={{ boxShadow: `0 0 30px ${color}, 0 0 60px ${color}80` }}
        />
        {/* Shine sweep */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
        
        {isEmoji ? (
          <span className="text-2xl md:text-3xl relative z-10 group-hover:scale-110 transition-transform duration-300">
            {source}
          </span>
        ) : (
          <img
            src={source}
            alt={platformName || "social"}
            className="w-7 h-7 md:w-8 md:h-8 relative z-10 group-hover:scale-110 transition-transform duration-300"
          />
        )}
      </a>
    </div>
  );
}

export default CardIcon;
