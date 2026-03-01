# Sakura壁纸 - Project Makefile

# 默认目标 (展示帮助信息)
.PHONY: help dev start preview install update

help:
	@echo "===================================================="
	@echo "           Sakura壁纸 - 项目管理命令                 "
	@echo "===================================================="
	@echo "可用操作:"
	@echo "  make dev      - 启动项目本地预览服务器 (访问 3000 端口)"
	@echo "  make preview  - 与 dev 相同，启动预览"
	@echo "  make install  - 检查环境并确保可用"
	@echo "  make update   - 更新本地 serve 工具"
	@echo "===================================================="
	@echo "注意: 启动后请访问 http://localhost:3000"
	@echo "使用 Ctrl+C 停止运行。"

# 启动服务器 (使用 npx -y serve 在当前目录)
dev:
	@echo "[INFO] 正在启动 Sakura壁纸..."
	@echo "[INFO] 请访问 http://localhost:3000"
	@npx -y serve . -l 3000

preview: dev

# 别名
start: dev

# 环境检查
install:
	@echo "[INFO] 正在检查 Node.js 环境..."
	@node --version > /dev/null 2>&1 || (echo "错误: 未检测到 Node.js，请先安装 Node.js"; exit 1)
	@echo "[INFO] 环境已就绪。"

# 更新
update:
	@echo "[INFO] 正在清理/更新 serve 工具缓存..."
	@npx clear-npx-cache
	@echo "[INFO] 完成。"
