import { useEffect, useState } from "react";
import { AuthPanel } from "@/components/auth-panel";
import { VN } from "@/lib/vn-time";

function useFace() {
  const [now, setNow] = useState(() => new Date());
  useEffect(() => {
    const id = window.setInterval(() => setNow(new Date()), 1000);
    return () => window.clearInterval(id);
  }, []);
  const time = new Intl.DateTimeFormat("vi-VN", {
    timeZone: VN,
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  }).format(now);
  const date = new Intl.DateTimeFormat("vi-VN", {
    timeZone: VN,
    weekday: "long",
    day: "numeric",
    month: "long",
  }).format(now);
  return { time, date };
}

export function Landing() {
  const face = useFace();
  return (
    <div className="tech-stage flex min-h-dvh justify-center text-ink">
      <div className="flex w-full max-w-md flex-col">
        <header className="safe-top relative overflow-hidden px-7 pb-10">
          <span className="ring-spin pointer-events-none absolute -right-16 top-16 size-64 rounded-full border-2 border-pine/40" aria-hidden="true" />
          <span className="pointer-events-none absolute -right-6 top-24 size-44 rounded-full border border-line" aria-hidden="true" />
          <p className="relative text-xs font-medium tracking-widest text-ice">VÀO CA</p>
          <h1 className="relative mt-8 max-w-xs">
            <span className="block text-5xl font-light leading-none">Đúng chỗ</span>
            <span className="mt-4 block text-xs font-medium tracking-widest text-ice">MỚI LÀ</span>
            <span className="mt-4 block text-5xl font-light leading-none">đúng giờ.</span>
          </h1>
          <p className="relative mt-6 text-sm tabular-nums text-muted">
            {face.time}
            <span className="px-2 text-line">·</span>
            {face.date}
          </p>
        </header>
        <section className="flex flex-1 flex-col rounded-t-3xl bg-card px-7 pt-7 pb-8 text-ink">
          <AuthPanel />
        </section>
      </div>
    </div>
  );
}
