interface CurvedSeparatorProps {
  fromColor?: string;
  toColor?: string;
  direction?: 'up' | 'down';
  className?: string;
  backgroundImage?: string;
}

const CurvedSeparator = ({ 
  fromColor = 'hsl(var(--background))', 
  toColor = 'hsl(var(--muted))', 
  direction = 'down',
  className = '',
  backgroundImage
}: CurvedSeparatorProps) => {
  const uniqueId = Math.random().toString(36).substr(2, 9);
  
  return (
    <div className={`relative w-full h-24 overflow-hidden ${className}`}>
      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 1200 200"
        preserveAspectRatio="none"
      >
        <defs>
          {backgroundImage ? (
            <pattern id={`image-pattern-${uniqueId}`} patternUnits="userSpaceOnUse" width="1200" height="200">
              <image href={backgroundImage} x="0" y="0" width="1200" height="200" preserveAspectRatio="xMidYMid slice" />
            </pattern>
          ) : (
            <linearGradient id={`gradient-${uniqueId}`} x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" style={{ stopColor: fromColor, stopOpacity: 1 }} />
              <stop offset="30%" style={{ stopColor: fromColor, stopOpacity: 1 }} />
              <stop offset="70%" style={{ stopColor: fromColor, stopOpacity: 0.4 }} />
              <stop offset="100%" style={{ stopColor: toColor, stopOpacity: 1 }} />
            </linearGradient>
          )}
        </defs>
        
        {direction === 'down' ? (
          <path
            d="M0,0 C200,150 400,50 600,100 C800,150 1000,50 1200,100 L1200,200 L0,200 Z"
            fill={backgroundImage ? `url(#image-pattern-${uniqueId})` : `url(#gradient-${uniqueId})`}
          />
        ) : (
          <path
            d="M0,200 C200,50 400,150 600,100 C800,50 1000,150 1200,100 L1200,0 L0,0 Z"
            fill={backgroundImage ? `url(#image-pattern-${uniqueId})` : `url(#gradient-${uniqueId})`}
          />
        )}
      </svg>
    </div>
  );
};

export default CurvedSeparator;