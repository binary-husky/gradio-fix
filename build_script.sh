# change version.txt and run `bash build_script.sh`
source ~/miniconda3/bin/activate
rm -r dist
nvm use 18
bash scripts/build_frontend.sh && bash scripts/install_gradio.sh
python -m build
cp ./dist/*.whl ./release
cp ./dist/gradio-3.32.13-py3-none-any.whl /home/fuqingxu/gpt_academic_private/docs/gradio-3.32.13-py3-none-any.whl




# 关于如何搭建gpt-academic测试环境：见 build_reload_mode.sh









# python3 -m twine upload dist/*

# pip uninstall gradio gradio-version-freeze -y
# pip install /home/fuqingxu/gradio-fix/dist/gradio-3.32.2-py3-none-any.whl
# mv /home/fuqingxu/gradio-fix/dist/gradio-3.32.2-py3-none-any.whl docs/gradio-3.32.2-py3-none-any.whl
