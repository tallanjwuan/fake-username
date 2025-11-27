'use client';

import { useState, useEffect } from 'react';

type UsernameResponse = {
  display_name: string;
  username: string;
  generated_at: string;
};

export default function HomePage() {
  const [data, setData] = useState<UsernameResponse | null>(null);
  const [loading, setLoading] = useState(false);

  async function fetchUsername() {
    try {
      setLoading(true);
      const res = await fetch('/api/names');
      const json = (await res.json()) as UsernameResponse;
      setData(json);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchUsername();
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      {/* 中间主体 */}
      <main className="flex-1 flex items-center justify-center px-4">
        <div className="w-full max-w-md">
          <div className="rounded-2xl border border-slate-800 bg-slate-900/70 shadow-xl p-6 space-y-4">
            <div className="space-y-1">
              <h1 className="text-xl font-semibold tracking-tight">
                Username Generator
              </h1>
              <p className="text-sm text-slate-400">
                一键生成好看又不容易重名的英文用户名。
              </p>
            </div>

            <div className="rounded-xl bg-slate-900 border border-slate-800 px-4 py-3 space-y-1">
              <div className="text-xs uppercase tracking-[0.18em] text-slate-500">
                Display name
              </div>
              <div className="text-2xl font-medium">
                {data ? data.display_name : '——'}
              </div>
              <div className="text-xs uppercase tracking-[0.18em] text-slate-500 mt-3">
                Username
              </div>
              <div className="text-lg text-emerald-300 font-mono">
                {data ? data.username : '——'}
              </div>
            </div>

            <button
              onClick={fetchUsername}
              disabled={loading}
              className="w-full inline-flex items-center justify-center rounded-xl bg-emerald-500 text-slate-950 text-sm font-medium py-2.5 hover:bg-emerald-400 disabled:opacity-60 transition-colors"
            >
              {loading ? '生成中…' : '再来一个'}
            </button>

            {data && (
              <p className="text-[11px] text-slate-500 text-right">
                Generated at {new Date(data.generated_at).toLocaleTimeString()}
              </p>
            )}
          </div>
        </div>
      </main>

      {/* 底部签名 */}
      <footer className="w-full py-4 px-4">
        <div className="max-w-md mx-auto flex items-center justify-between text-[11px] text-slate-500">
          <span>Built by Tallan Jwuan</span>
          <a
            href="https://t.me/tallanjwuan"
            target="_blank"
            rel="noreferrer"
            className="hover:text-slate-300 underline underline-offset-4"
          >
            @tallanjwuan on Telegram
          </a>
        </div>
      </footer>
    </div>
  );
}
