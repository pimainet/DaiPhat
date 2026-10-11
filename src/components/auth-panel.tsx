import { useState, type FormEvent } from "react";
import { authClient, authEnabled } from "@/lib/auth/client";
import { errorText, primaryBtn } from "@/components/ui";
import { normalizeVnPhone, phoneLoginEmail } from "@/lib/phone";

const lineField =
  "h-12 w-full border-b border-line bg-transparent text-base text-ink outline-none placeholder:text-muted/50 focus:border-ink";

function mapAuthError(message: string | undefined): string {
  const text = message ?? "";
  if (/already|exist/i.test(text)) return "Số này đã có tài khoản.";
  if (/invalid email or password|invalid credentials/i.test(text)) return "Số hoặc mật khẩu chưa đúng.";
  if (/password/i.test(text) && /short|least|8/i.test(text)) return "Mật khẩu cần ít nhất 8 ký tự.";
  if (/origin/i.test(text)) return "Không vào được từ trang này.";
  return text || "Không vào được.";
}

export function AuthPanel() {
  const [mode, setMode] = useState<"in" | "up">("in");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  async function onSubmit(event: FormEvent) {
    event.preventDefault();
    setError("");
    const normalized = normalizeVnPhone(phone);
    if (!normalized) {
      setError("Số điện thoại chưa đúng.");
      return;
    }
    setBusy(true);
    try {
      const email = phoneLoginEmail(normalized);
      const result =
        mode === "up"
          ? await authClient.signUp.email({
              email,
              password,
              name: name.trim(),
              callbackURL: "/",
            })
          : await authClient.signIn.email({
              email,
              password,
              callbackURL: "/",
              rememberMe: true,
            });
      if (result.error) {
        setError(mapAuthError(result.error.message));
        setBusy(false);
        return;
      }
      window.location.assign("/");
    } catch (err) {
      setError(errorText(err));
      setBusy(false);
    }
  }

  if (!authEnabled) {
    return <p className="text-sm text-muted">Đăng nhập đang tắt.</p>;
  }

  return (
    <div className="flex flex-1 flex-col">
      <div className="flex gap-6 border-b border-line">
        <ModeButton active={mode === "in"} onClick={() => setMode("in")}>
          Đăng nhập
        </ModeButton>
        <ModeButton active={mode === "up"} onClick={() => setMode("up")}>
          Tạo tài khoản
        </ModeButton>
      </div>
      <form className="mt-7 flex flex-1 flex-col gap-5" onSubmit={onSubmit}>
        {mode === "up" ? (
          <label className="block">
            <span className="text-xs font-medium tracking-widest text-muted">HỌ TÊN</span>
            <input className={lineField} value={name} onChange={(e) => setName(e.target.value)} required minLength={2} autoComplete="name" />
          </label>
        ) : null}
        <label className="block">
          <span className="text-xs font-medium tracking-widest text-muted">SỐ ĐIỆN THOẠI</span>
          <input
            className={lineField}
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            placeholder="0900 000 000"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
        </label>
        <label className="block">
          <span className="text-xs font-medium tracking-widest text-muted">MẬT KHẨU</span>
          <input
            className={lineField}
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength={8}
            autoComplete={mode === "up" ? "new-password" : "current-password"}
          />
        </label>
        {error ? <p className="text-sm text-clay">{error}</p> : null}
        <button
          className={`${primaryBtn} mt-auto w-full`}
          type="submit"
          disabled={busy}
        >
          {busy ? "Đang mở…" : mode === "up" ? "Tạo tài khoản" : "VÀO CA"}
        </button>
      </form>
    </div>
  );
}

function ModeButton({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`-mb-px h-11 border-b-2 text-sm ${active ? "border-ink font-medium text-ink" : "border-transparent text-muted"}`}
    >
      {children}
    </button>
  );
}
