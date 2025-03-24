import json
from sqlalchemy.orm import Session
from app.database import SessionLocal, engine, Base
from app import models

# Tạo bảng nếu chưa có
Base.metadata.create_all(bind=engine)

# Load dữ liệu proxy từ file JSON
with open("sample_proxies.json", "r", encoding="utf-8") as f:
    proxy_data = json.load(f)

db: Session = SessionLocal()

# Xoá toàn bộ proxy cũ để tránh trùng (nếu cần reset dữ liệu)
db.query(models.Proxy).delete()
db.commit()

# Thêm proxy mới từ file JSON
for item in proxy_data:
    proxy = models.Proxy(
        ip=item["ip"],
        port=item["port"],
        username=item.get("username"),
        password=item.get("password"),
        type=item["type"],
        status=item["status"],
        country=item.get("country"),
        expires_at=item.get("expire_at"),
        user_id=item.get("user_id", 1)  # Gán user mặc định là ID=1 nếu không có
    )
    db.add(proxy)

db.commit()
db.close()

print(f"✅ Đã thêm {len(proxy_data)} proxy vào cơ sở dữ liệu.")
