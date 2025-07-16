# n8n self host with docker + Cloudflare Tunnel

This repository contains a Docker Compose setup for running n8n with Cloudflare as a tunneling service. n8n is a workflow automation tool that allows you to connect different services and APIs. Cloudflared exposes local servers behind NATs and firewalls to the public internet over secure tunnels.

## Prerequisites

Before you begin, ensure you have the following configured:

- Docker: [Get Docker](https://docs.docker.com/get-docker/)
- Docker Compose: [Install Docker Compose](https://docs.docker.com/compose/install/)
- [Cloudflare Account](https://cloudflare.com)

## Setup

1. **Clone the Repository**

   Clone this repository to your local machine:

   ```bash
   git clone https://github.com/joffcom/n8n-cloudflare.git
   ```

2. **setting Cloudflare Tunnel**

   Để thiết lập Cloudflare Tunnel, bạn cần làm theo các bước sau trong trang tổng quan Cloudflare của mình:

   - **Truy cập trang Zero Trust:** Điều hướng đến phần `Zero Trust` từ menu chính của Cloudflare.
   - **Tạo một Tunnel mới:**
     - Trong menu `Networks`, chọn `Tunnels`.
     - Nhấp vào nút `Create a tunnel`.
     - Chọn `Cloudflared` làm loại trình kết nối.
     - Đặt tên cho tunnel của bạn (ví dụ: `n8n-server`). Tên này chỉ dùng để nhận dạng.
     - Lưu tunnel của bạn.
   - **Lấy Token của Tunnel:**
     - Sau khi tạo tunnel, bạn sẽ thấy một trang hiển thị các lệnh để chạy trình kết nối. Tìm token của tunnel trong các lệnh đó. Nó sẽ là một chuỗi ký tự dài.
     - Sao chép token này.
   - **Cấu hình `docker-compose.yml`:**
     - Mở tệp `docker-compose.yml`.
     - Tìm dịch vụ `cloudflared`.
     - Thay thế `YOUR_TUNNEL_TOKEN` bằng token bạn vừa sao chép.
   - **Thiết lập Public Hostname:**
     - Quay trở lại trang cấu hình tunnel trên Cloudflare.
     - Chuyển đến tab `Public Hostname`.
     - Nhấp vào `Add a public hostname`.
     - **Subdomain:** Nhập tên miền phụ bạn muốn sử dụng (ví dụ: `n8n`).
     - **Domain:** Chọn tên miền của bạn.
     - **Service:**
       - **Type:** Chọn `HTTP`.
       - **URL:** Nhập `ipv4:5678`. Điều này cho Cloudflare biết cách định tuyến lưu lượng truy cập đến dịch vụ n8n đang chạy trong Docker. ipv4 lấy từ `ipconfig` của cmd.
     - Lưu lại hostname.
   - **Cập nhật các biến môi trường n8n:**
     - Trong tệp `docker-compose.yml`, cập nhật các biến môi trường sau cho dịch vụ `n8n` để khớp với URL đầy đủ của bạn (ví dụ: `https://n8n.your-domain.com`):
       - `N8N_HOST`
       - `WEBHOOK_TUNNEL_URL` (giữ lại dấu `/` ở cuối)
       - `N8N_EDITOR_BASE_URL`
       - `N8N_PUBLIC_API_BASE_URL`

3. **Run app**

   Để chạy n8n với Cloudflare, hãy sử dụng lệnh sau:

   ```bash
   docker compose up -d
   ```

   Lệnh này sẽ khởi động cả hai dịch vụ n8n và Cloudflared. Cloudflared sẽ cung cấp một URL để kết nối đến phiên bản n8n của bạn.

## Accessing n8n

After running the Docker Compose command you can access n8n by navigating to the URL configured in Cloudflare in your web browser.

## Stopping the Application

To stop the n8n and Cloudflared services, use:

```bash
docker compose down
```
