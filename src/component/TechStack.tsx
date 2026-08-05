import type { TechnologyResponse } from "../api/types";
import { isEmojiIcon } from "../utils/icon.util";
import Wave from "./Wave";

type TechStackProps = {
  technologies: TechnologyResponse[];
};

function TechStack({ technologies }: TechStackProps) {
    // Filter visible technologies
    const visibleTechs = technologies.filter(tech => tech.isVisible);

    // Split into 3 rows for varied visual rhythm
    const rowSize = Math.ceil(visibleTechs.length / 3);
    const row1 = visibleTechs.slice(0, rowSize);
    const row2 = visibleTechs.slice(rowSize, rowSize * 2);
    const row3 = visibleTechs.slice(rowSize * 2);

    // Badge component for consistency
    const TechBadge = ({ tech, index, rowKey }: { tech: TechnologyResponse; index: number; rowKey: string }) => (
        <div
            key={`${rowKey}-${index}`}
            className="inline-flex items-center flex-shrink-0 px-8 py-4 rounded-full text-lg font-bold shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-110 cursor-pointer"
            style={{
                backgroundColor: `${tech.color}15`,
                color: tech.color,
                border: `3px solid ${tech.color}`,
            }}
        >
            <span className="mr-3">
            {isEmojiIcon(tech.iconUrl) ? (
              <span className="text-2xl">{tech.iconUrl}</span>
            ) : (
              <img
                src={tech.iconUrl}
                alt={tech.name}
                className="w-7 h-7 object-contain"
              />
            )}
            </span>
            <span>{tech.name}</span>
        </div>
    );

    return (
        <>
            <div id="techstack" className="w-full bg-white py-16 pb-20 overflow-hidden">
                <div className="container mx-auto px-4 mb-12">
                    <h2 className="text-center text-4xl font-bold mb-4 animate-fade-in-down text-gray-800">
                        Tech Stack
                    </h2>
                    <div className="text-center text-sm text-gray-600 mb-12 animate-fade-in" style={{ animationDelay: '0.2s', animationFillMode: 'both' }}>
                        Technologies I work with
                    </div>

                    <div className="space-y-6">
                        {visibleTechs.length > 0 ? (
                        <>
                        {/* Row 1 - Scroll Left (slower) */}
                        {row1.length > 0 && (
                        <div className="relative overflow-hidden w-full">
                            <div className="flex gap-6 animate-scroll-left-slow hover:pause whitespace-nowrap">
                                {[...row1, ...row1].map((tech, index) => (
                                    <TechBadge key={`row1-${index}`} tech={tech} index={index} rowKey="row1" />
                                ))}
                            </div>
                        </div>
                        )}

                        {/* Row 2 - Scroll Right (medium speed) */}
                        {row2.length > 0 && (
                        <div className="relative overflow-hidden w-full">
                            <div className="flex gap-6 animate-scroll-right hover:pause whitespace-nowrap">
                                {[...row2, ...row2].map((tech, index) => (
                                    <TechBadge key={`row2-${index}`} tech={tech} index={index} rowKey="row2" />
                                ))}
                            </div>
                        </div>
                        )}

                        {/* Row 3 - Scroll Left (faster) */}
                        {row3.length > 0 && (
                        <div className="relative overflow-hidden w-full">
                            <div className="flex gap-6 animate-scroll-left hover:pause whitespace-nowrap">
                                {[...row3, ...row3].map((tech, index) => (
                                    <TechBadge key={`row3-${index}`} tech={tech} index={index} rowKey="row3" />
                                ))}
                            </div>
                        </div>
                        )}
                        </>
                        ) : (
                        <p className="text-center text-gray-500 text-lg py-8">
                            Belum ada teknologi yang ditampilkan.
                        </p>
                        )}
                    </div>
                </div>
            </div>

            {/* Wave Divider - Outside main container to prevent clipping */}
            <Wave
                flip={false}
                color="#3E8DE3"
                className="animate-fade-in"
                style={{ animationDelay: '0.4s', animationFillMode: 'both' } as React.CSSProperties}
            />
        </>
    );
}

export default TechStack;
