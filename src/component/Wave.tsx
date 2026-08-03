interface WaveProps {
    flip?: boolean;
    color: string;
    className?: string;
    style?: React.CSSProperties;
}

function Wave({ flip = false, color, className = "", style }: WaveProps) {
    return (
        <div className={`w-full overflow-hidden ${className}`} style={style}>
            <svg
                viewBox="0 0 1200 120"
                preserveAspectRatio="none"
                className={`w-full h-32 ${flip ? 'scale-y-[-1]' : ''}`}
                style={{ fill: color }}
            >
                <path d="M0,80 C100,50 300,30 450,70 C600,110 750,50 900,80 C1050,110 1400,60 1200,120 L0,120 Z"></path>
            </svg>
        </div>
    );
}

export default Wave;
