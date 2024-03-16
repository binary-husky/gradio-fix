bash scripts/install_gradio.sh

python demo/floating_button/run.py

# 安装 tailwindcss
cd js/button
pnpm install tailwindcss@latest

# 安装 flowbite-svelte & flowbite
i：这是 install 的简写，表示安装一个或多个软件包。
-D：这是 --save-dev 或 --save-dev 的简写，用于将软件包作为开发依赖项安装。开发依赖项通常是在开发过程中需要用到的工具，比如测试框架、构建工具等，它们不会包含在生产环境的最终构建中。
pnpm i -D flowbite-svelte flowbite

# 记得修改【.config/tailwind.config.cjs】 https://flowbite-svelte.com/docs/pages/introduction#Configuration

# 调试
gradio demo/floating_button/run.py