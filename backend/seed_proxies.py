import json
from sqlalchemy.orm import Session
from app.database import SessionLocal, engine, Base
from app import models

# Tạo bảng nếu chưa có
Base.metadata.create_all(bind=engine)

# Load dữ liệu proxy từ file
with open("sample_proxies.json", "r") as f:
    proxy_data = json.load(f)

db: Session = SessionLocal()

# Xoá toàn bộ proxy cũ để tránh trùng (tuỳ chọn)
db.query(models.Proxy).delete()
db.commit()

# Thêm mới các proxy từ file
for item in proxy_data:
    proxy = models.Proxy(
        ip=item["ip"],
        port=item["port"],
        type=item["type"],
        status=item["status"]
    )
    db.add(proxy)

db.commit()
print(f"✅ Đã thêm {len(proxy_data)} proxy vào cơ sở dữ liệu.")
