# DaiPhat - Ứng dụng chấm công

Repo này chứa source code app chấm công Đại Phát (Grok App Builder workspace).

## Cấu trúc chính đã push

- `package.json`, `tsconfig.json`, `vite.config.ts`, `vercel.json`
- `src/routes/` (index, login, __root)
- `src/router.tsx`
- Migrations SQL cơ bản

## Lưu ý

Workspace gốc có ~350 files (bao gồm `.grok/skills`, build `.vercel/`, screenshots, attachments lớn). Do giới hạn tool push, chỉ các file source chính được đẩy lên trước.

Nếu cần full source (toàn bộ `src/`, `scripts/`, `server/`, `migrations/`, public assets), hãy cho mình biết để push tiếp từng phần hoặc bạn có thể download zip gốc và push thủ công:

```bash
git clone https://github.com/pimainet/DaiPhat.git
cd DaiPhat
# giải nén source rồi commit
```

## Chạy local

```bash
npm install
npm run db:migrate
npm run dev
```

App chạy tại `http://0.0.0.0:8080`.
