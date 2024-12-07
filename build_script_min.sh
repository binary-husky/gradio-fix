# change version.txt and run `bash build_script.sh`
rm -r dist
nvm use 18
bash scripts/build_frontend.sh && bash scripts/install_gradio.sh










# python3 -m twine upload dist/*

# pip uninstall gradio gradio-version-freeze -y
# pip install /home/fuqingxu/gradio-fix/dist/gradio-3.32.2-py3-none-any.whl
# mv /home/fuqingxu/gradio-fix/dist/gradio-3.32.2-py3-none-any.whl docs/gradio-3.32.2-py3-none-any.whl