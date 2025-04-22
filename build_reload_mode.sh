

# 准备npm环境
nvm use 18
pnpm dev

# 加载conda
source ~/miniconda3/bin/activate
pip install -e .

# 运行！
cd ~/chatgpt_academic/chatgpt_academic && WEB_PORT=7860 python main.py

# 开始调试，打开http://localhost:9876/

# 解除 /home/fuqingxu/gradio-fix/js/app/index.html 中的注释
<script src="file=themes/common.js"></script>
<script src="file=themes/theme.js"></script>
<script src="file=themes/tts.js"></script>
<script src="file=themes/init.js"></script>
<script src="file=themes/welcome.js"></script>

# 从学术GPT同步主题文件
# rm -rf ~/gradio-fix/js/app/file=themes/
# rsync -av ~/chatgpt_academic/chatgpt_academic/themes/ ~/gradio-fix/js/app/file=themes/

# 刷新http://localhost:9876/
