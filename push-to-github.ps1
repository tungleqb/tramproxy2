Write-Host "Đang thêm thay đổi..."
git add .

$commitMsg = Read-Host "Nhập nội dung commit"
git commit -m "$commitMsg"

Write-Host "Đang push lên GitHub..."
git push -u origin main

Write-Host "Đã cập nhật lên GitHub thành công!"
