'use client';
import React, { useState, useMemo } from 'react';
import { calculateTransferTime } from '@/lib/bandwidthCalculator';

export default function BandwidthCalculatorTool() {
  const [mb, setMb] = useState(100);
  const [speed, setSpeed] = useState(100);
  const res = useMemo(() => calculateTransferTime(mb * 1024 * 1024, speed), [mb, speed]);

  return (
    <div className="space-y-6">
      <div className="surface-card rounded-2xl p-6 space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <input type="number" placeholder="File Size (MB)" value={mb} onChange={(e) => setMb(Number(e.target.value))} className="rounded-xl border p-2 text-xs" />
          <input type="number" placeholder="Speed (Mbps)" value={speed} onChange={(e) => setSpeed(Number(e.target.value))} className="rounded-xl border p-2 text-xs" />
        </div>
        <div className="p-4 bg-emerald-500/10 rounded-xl text-center font-bold text-lg text-emerald-600">
          Estimated Transfer Time: {res.formattedTime}
        </div>
      </div>
    </div>
  );
}
