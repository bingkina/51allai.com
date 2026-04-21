#!/bin/bash
# R2 图床快速上传脚本
# 用法: image <图片路径>

BUCKET="51allai-images"
FOLDER="51allai.com"
DOMAIN="https://images.51allai.com"

if [ -z "$1" ]; then
    echo "用法: image <图片路径>"
    echo "或者直接把图片拖到终端执行: image <拖入图片>"
    exit 1
fi

FILE="$1"
BASENAME=$(basename "$FILE")
EXT="${BASENAME##*.}"
NAME="${BASENAME%.*}"

# 将空格替换为下划线，确保文件名 URL 安全
NAME=$(echo "$NAME" | tr ' ' '_')

# 添加时间戳避免重名覆盖
TIMESTAMP=$(date +%Y%m%d_%H%M%S)
NEWNAME="${NAME}_${TIMESTAMP}.${EXT}"

# 复制到临时目录并重命名，再上传（rclone 以目标文件名为准）
TMPFILE="/tmp/$NEWNAME"
cp "$FILE" "$TMPFILE"

echo "📤 正在上传: $BASENAME → $NEWNAME"

rclone copy "$TMPFILE" "r2:$BUCKET/$FOLDER/" \
    --timeout 30s \
    --contimeout 15s \
    --retries 3 \
    --progress

STATUS=$?
rm -f "$TMPFILE"

if [ $STATUS -eq 0 ]; then
    URL="$DOMAIN/$FOLDER/$NEWNAME"
    echo ""
    echo "✅ 上传成功!"
    echo ""
    echo "🔗 访问链接: $URL"
    echo ""
    echo "📋 Markdown 格式:"
    echo "![$NAME]($URL)"
    echo ""
    echo "![$NAME]($URL)" | pbcopy
    echo "💡 已复制 Markdown 到剪贴板"
else
    echo "❌ 上传失败（rclone 退出码: $STATUS）"
    echo "请检查网络连接或运行: rclone lsd r2:$BUCKET"
    exit 1
fi
