import React, { useState, useEffect } from 'react';

export const StatusBar: React.FC = () => {
  const [keralaTime, setKeralaTime] = useState<string>('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      // Format time in Asia/Kolkata timezone (Kerala)
      const formatted = new Intl.DateTimeFormat('en-GB', {
        timeZone: 'Asia/Kolkata',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
      }).format(now);
      setKeralaTime(formatted);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="absolute bottom-0 left-0 w-full z-40 px-6 py-4 md:px-12 md:py-6 flex justify-between items-center text-[13px] sm:text-[14px] md:text-[15px] font-mono font-normal uppercase tracking-tight text-[#383838] pointer-events-auto select-none">
      {/* Location and Live Time */}
      <div className="flex items-center gap-2 text-[#383838]">
        <span>BASED IN KERALA</span>
        <span className="text-[#383838]/60">•</span>
        <span className="tabular-nums font-mono font-normal">{keralaTime || '22:07:29'}</span>
      </div>

      {/* Open to Work with Minimal Pulsating Green Halo */}
      <div className="flex items-center gap-2.5">
        <span className="relative flex h-2.5 w-2.5 items-center justify-center">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-30"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
        </span>
        <span className="text-[#383838] font-mono tracking-tight font-normal">
          OPEN TO WORK
        </span>
        <span className="text-[10px] text-[#383838]/50 ml-0.5 select-none">▼</span>
      </div>
    </div>
  );
};
