'use client';
import React, { useState, useMemo } from 'react';
import { buildAwsIamPolicy } from '@/lib/awsIamPolicyBuilder';

export default function AwsIamPolicyBuilderTool() {
  const policy = useMemo(() => buildAwsIamPolicy([{ effect: 'Allow', actions: ['s3:GetObject'], resources: ['arn:aws:s3:::my-bucket/*'] }]), []);

  return (
    <div className="space-y-6">
      <div className="surface-card rounded-2xl p-6 space-y-4">
        <textarea readOnly rows={12} value={policy} className="w-full rounded-xl border bg-slate-900 p-3 font-mono text-xs text-emerald-400" />
      </div>
    </div>
  );
}
