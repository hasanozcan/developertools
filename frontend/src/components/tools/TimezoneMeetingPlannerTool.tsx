'use client';
import React, { useState, useMemo } from 'react';
import { planMeetingSlots } from '@/lib/timezoneMeetingPlanner';

export default function TimezoneMeetingPlannerTool() {
  const [utcHour, setUtcHour] = useState(14);
  const slots = useMemo(() => planMeetingSlots(utcHour, ['UTC', 'EST', 'PST', 'CET', 'TRT', 'JST']), [utcHour]);

  return (
    <div className="space-y-6">
      <div className="surface-card rounded-2xl p-6 space-y-4">
        <label className="text-xs font-bold">UTC Hour: {utcHour}:00</label>
        <input type="range" min={0} max={23} value={utcHour} onChange={(e) => setUtcHour(Number(e.target.value))} className="w-full" />
        <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
          {Object.entries(slots).map(([tz, time]) => (
            <div key={tz} className="p-3 bg-indigo-500/10 rounded-xl text-center font-mono text-xs">
              <p className="font-bold text-indigo-600">{tz}</p>
              <p className="pt-1 font-bold">{time}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
