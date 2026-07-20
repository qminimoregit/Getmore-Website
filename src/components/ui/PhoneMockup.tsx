import React from 'react';

interface PhoneMockupProps {
  children?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  size?: 'sm' | 'md' | 'lg';
}

const PhoneMockup: React.FC<PhoneMockupProps> = ({ children, className = '', style, size = 'md' }) => {
  const dimensions = {
    sm: { width: 180, height: 360, screenPad: 10, topBar: 20, radius: 28, notch: 80 },
    md: { width: 240, height: 480, screenPad: 14, topBar: 26, radius: 36, notch: 100 },
    lg: { width: 300, height: 600, screenPad: 16, topBar: 30, radius: 44, notch: 120 },
  }[size];

  return (
    <div
      className={`relative flex-shrink-0 ${className}`}
      style={{
        width: dimensions.width,
        height: dimensions.height,
        ...style,
      }}
      aria-hidden="true"
    >
      {/* Phone outer frame */}
      <div
        className="absolute inset-0 phone-frame"
        style={{ borderRadius: dimensions.radius }}
      />

      {/* Side buttons */}
      <div
        className="absolute bg-gray-700 rounded-r-sm"
        style={{ top: 80, right: -3, width: 3, height: 40, borderRadius: '0 2px 2px 0' }}
      />
      <div
        className="absolute bg-gray-700 rounded-l-sm"
        style={{ top: 60, left: -3, width: 3, height: 28, borderRadius: '2px 0 0 2px' }}
      />
      <div
        className="absolute bg-gray-700 rounded-l-sm"
        style={{ top: 96, left: -3, width: 3, height: 28, borderRadius: '2px 0 0 2px' }}
      />

      {/* Screen area */}
      <div
        className="absolute phone-screen"
        style={{
          top: dimensions.screenPad,
          left: dimensions.screenPad,
          right: dimensions.screenPad,
          bottom: dimensions.screenPad,
          borderRadius: dimensions.radius - 8,
        }}
      >
        {/* Status bar */}
        <div
          className="flex items-center justify-between px-4 py-1"
          style={{
            height: dimensions.topBar,
            background: 'linear-gradient(135deg, #00BFA5, #1565C0)',
          }}
        >
          <span className="text-white text-[8px] font-semibold opacity-90">9:41</span>
          <div style={{ width: dimensions.notch / 4, height: 10, borderRadius: 10, background: 'rgba(0,0,0,0.4)' }} />
          <div className="flex items-center gap-1">
            <svg className="w-2 h-2 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z"/>
            </svg>
            <svg className="w-2 h-2 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd"/>
            </svg>
          </div>
        </div>

        {/* Content slot */}
        <div className="flex-1 h-full overflow-hidden">
          {children || <DefaultScreenContent />}
        </div>
      </div>
    </div>
  );
};

const DefaultScreenContent: React.FC = () => (
  <div className="h-full p-3 space-y-2.5" style={{ background: 'linear-gradient(160deg, #e0f7fa 0%, #e3f2fd 100%)' }}>
    {/* App header */}
    <div className="flex items-center gap-2 mb-3">
      <div className="w-6 h-6 rounded-lg" style={{ background: 'linear-gradient(135deg, #00BFA5, #1565C0)' }} />
      <div className="h-2.5 rounded-full bg-gray-300 flex-1" style={{ maxWidth: 80 }} />
    </div>

    {/* Notification items */}
    {[
      { color: '#00BFA5', w: '75%' },
      { color: '#0288D1', w: '60%' },
      { color: '#00BFA5', w: '85%' },
      { color: '#1565C0', w: '50%' },
    ].map((item, i) => (
      <div key={i} className="bg-white rounded-lg p-2 flex items-center gap-2 shadow-sm">
        <div className="w-5 h-5 rounded-md flex-shrink-0" style={{ background: item.color, opacity: 0.2 }}>
          <div className="w-full h-full rounded-md" style={{ background: item.color }} />
        </div>
        <div className="flex-1 space-y-1">
          <div className="h-1.5 rounded-full bg-gray-200" style={{ width: item.w }} />
          <div className="h-1 rounded-full bg-gray-100" style={{ width: '40%' }} />
        </div>
      </div>
    ))}

    {/* Bottom nav bar */}
    <div className="absolute bottom-2 left-0 right-0 px-3">
      <div className="bg-white rounded-xl p-2 flex justify-around shadow-sm">
        {[0,1,2,3].map(i => (
          <div key={i} className="w-4 h-4 rounded-md" style={{
            background: i === 0 ? 'linear-gradient(135deg, #00BFA5, #1565C0)' : '#e5e7eb'
          }} />
        ))}
      </div>
    </div>
  </div>
);

export default PhoneMockup;
