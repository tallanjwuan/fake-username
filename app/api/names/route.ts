import { NextResponse } from 'next/server';
import commonNames from '@/data/common_names.json';
import rareNames from '@/data/rare_names.json';

export const runtime = 'edge';

function pickRandom<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

// 把字符串转成只含字母的小写,方便记忆/输入
function normalizeUsername(raw: string): string {
  return raw
    .replace(/[^a-zA-Z]/g, '')   // 去掉非字母字符
    .toLowerCase();              // 转小写 [web:50][web:52]
}

export async function GET() {
  // 1. 随机高频名
  const firstName = pickRandom(commonNames);
  // 2. 随机低频名
  const lastName = pickRandom(rareNames);

  // 3. 原始展示用(首字母大写风格)
  const displayName = `${firstName} ${lastName}`;

  // 4. 小写、简化后的真正 username
  const username = normalizeUsername(displayName);

  return NextResponse.json(
    {
      display_name: displayName, // AlexaZeemal 这种
      username,                  // alexazeemal 这种
      generated_at: new Date().toISOString(),
    }
  ); // [web:43]
}
