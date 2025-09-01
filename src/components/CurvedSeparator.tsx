interface CurvedSeparatorProps {
  fromColor?: string;
  toColor?: string;
  direction?: 'up' | 'down';
  className?: string;
}

const CurvedSeparator = ({ 
  fromColor = 'hsl(var(--background))', 
  toColor = 'hsl(var(--muted))', 
  direction = 'down',
  className = ''
}: CurvedSeparatorProps) => {
  return (
    <div className={`relative w-full h-16 overflow-hidden ${className}`}>
      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 1200 120"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id={`gradient-${direction}`} x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" style={{ stopColor: fromColor, stopOpacity: 1 }} />
            <stop offset="100%" style={{ stopColor: toColor, stopOpacity: 1 }} />
          </linearGradient>
        </defs>
        
        {direction === 'down' ? (
          <path
            d="M0,0 C150,120 350,0 600,60 C850,120 1050,0 1200,60 L1200,120 L0,120 Z"
            fill={`url(#gradient-${direction})`}
          />
        ) : (
          <path
            d="M0,120 C150,0 350,120 600,60 C850,0 1050,120 1200,60 L1200,0 L0,0 Z"
            fill={`url(#gradient-${direction})`}
          />
        )}
      </svg>
    </div>
  );
};

export default CurvedSeparator;