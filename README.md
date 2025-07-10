# SRT Translation Workflow

Workflow n8n để dịch tự động file SRT từ tiếng Anh sang tiếng Việt sử dụng Google Drive và Google Gemini AI.

## 📁 Cấu trúc Files

```
├── .env.example              # Template cho environment variables
├── .env                      # File chứa credentials thực tế (KHÔNG commit)
├── workflows/
│   ├── srt-translation-safe.json    # Workflow an toàn để share
│   └── workflow_translate...json    # Workflow gốc (KHÔNG commit)
├── create-safe-workflow.js   # Script tạo safe workflow
├── restore-from-env.js       # Script restore workflow từ env vars
└── package.json
```

## 🔧 Cách sử dụng

### 1. Chuẩn bị
```bash
# Clone repository
git clone https://github.com/phandat00011469/my-n8n-workflows.git
cd my-n8n-workflows

# Cài đặt dependencies
npm install
```

### 2. Cấu hình Environment Variables
```bash
# Copy file template
cp .env.example .env

# Chỉnh sửa .env với credentials thực tế của bạn
# Thay thế các giá trị YOUR_* bằng credentials thực tế
```

### 3. Tạo workflow với credentials thực tế
```bash
# Tạo workflow có thể import vào n8n
npm run restore-env
```

### 4. Import vào n8n
1. Mở n8n
2. Click "Import from file" 
3. Chọn file `workflows/srt-translation-restored.json`
4. Workflow sẽ có đầy đủ credentials để sử dụng

## 🔐 Bảo mật

### Files an toàn để share:
- ✅ `workflows/srt-translation-safe.json` - Workflow template
- ✅ `.env.example` - Template environment variables
- ✅ Scripts và README

### Files KHÔNG được commit:
- ❌ `.env` - Chứa credentials thực tế
- ❌ `workflows/workflow_translate...json` - Workflow gốc với credentials
- ❌ `workflows/srt-translation-restored.json` - Workflow đã restore

## 📝 Cách thêm workflow mới

1. Export workflow từ n8n
2. Thêm sensitive values vào `.env`
3. Chỉnh sửa `create-safe-workflow.js` để xử lý workflow mới
4. Chạy `npm run create-safe`
5. Commit file safe version

## 🚀 Workflow Flow

```
Chat Input → Get Folder ID → Get All SRT Files → Download Files → 
Convert to Text → Translate → Convert to Binary → Upload to Drive
```

## 📋 Yêu cầu API

- Google Drive API (OAuth2)
- Google Gemini API (PaLM)
- N8N instance (cloud hoặc self-hosted)
