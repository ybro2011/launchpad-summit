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
  
  const pathData = direction === 'up' 
    ? 'M0,200 C200,20 400,180 600,80 C800,20 1000,180 1200,80 L1200,0 L0,0 Z'
    : 'M0,0 C200,180 400,20 600,120 C800,180 1000,20 1200,120 L1200,200 L0,200 Z';
  
  const svgMask = `<svg viewBox="0 0 1200 200" xmlns="http://www.w3.org/2000/svg"><path d="${pathData}" fill="white"/></svg>`;
  const maskUrl = `url("data:image/svg+xml,${encodeURIComponent(svgMask)}")`;
  
  return (
    <div className={`relative w-full h-24 overflow-hidden ${className}`}>
      {backgroundImage && (
        <div 
          className="absolute inset-0 w-full h-full"
          style={{
            backgroundImage: `url(${backgroundImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center top',
            backgroundRepeat: 'no-repeat',
            maskImage: maskUrl,
            maskSize: 'cover',
            maskRepeat: 'no-repeat',
            WebkitMaskImage: maskUrl,
            WebkitMaskSize: 'cover',
            WebkitMaskRepeat: 'no-repeat'
          }}
        />
      )}
      {!backgroundImage && (
        <svg
          className="absolute inset-0 w-full h-full"
          viewBox="0 0 1200 200"
          preserveAspectRatio="none"
        >
          {direction === 'down' ? (
            <>
              {/* Bottom area - fill entire space first */}
              <rect x="0" y="0" width="1200" height="200" fill={toColor} />
              {/* Top area - curved shape */}
              <path
                d="M0,0 C200,180 400,20 600,120 C800,180 1000,20 1200,120 L1200,0 L0,0 Z"
                fill={fromColor}
              />
            </>
          ) : (
            <>
              {/* Top area - fill entire space first */}
              <rect x="0" y="0" width="1200" height="200" fill={fromColor} />
              {/* Bottom area - curved shape */}
              <path
                d="M0,200 C200,20 400,180 600,80 C800,20 1000,180 1200,80 L1200,200 L0,200 Z"
                fill={toColor}
              />
            </>
          )}
        </svg>
      )}
    </div>
  );
};

export default CurvedSeparator;