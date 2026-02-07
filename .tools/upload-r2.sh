#!/bin/bash
# R2 图床快速上传脚本
# 用法: image <图片路径>

BUCKET="51allai-images"
FOLDER="blog"
DOMAIN="https://images.51allai.com"

if [ -z "$1" ]; then
    echo "用法: image <图片路径>"
    echo "或者直接把图片拖到终端执行: image "
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

echo "📤 正在上传: $BASENAME → $NEWNAME"
rclone copy "$FILE" "r2:$BUCKET/$FOLDER/" --copy-dest-name "$NEWNAME" 2>/dev/null

# 如果上面的方法不支持，使用备用方案
if [ $? -ne 0 ]; then
    # 先复制到临时位置再上传
    TMPFILE="/tmp/$NEWNAME"
    cp "$FILE" "$TMPFILE"
    rclone copy "$TMPFILE" "r2:$BUCKET/$FOLDER/"
    rm "$TMPFILE"
fi

if [ $? -eq 0 ]; then
    URL="$DOMAIN/$FOLDER/$NEWNAME"
    echo "✅ 上传成功!"
    echo ""
    echo "🔗 访问链接: $URL"
    echo ""
    echo "📋 Markdown 格式:"
    echo "![$NAME]($URL)"
    echo ""
    # 复制 Markdown 格式到剪贴板
    echo "![$NAME]($URL)" | pbcopy
    echo "💡 已复制 Markdown 到剪贴板"
else
    echo "❌ 上传失败"
    exit 1
fi
