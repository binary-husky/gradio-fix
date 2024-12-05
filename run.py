import gradio as gr

def echo_value(text):
    """简单的回显函数,返回输入的文本"""
    return text

# 创建界面
with gr.Blocks() as demo:
    gr.Markdown("# Spark 组件演示")
    
    with gr.Row():
        # 输入组件
        input_spark = gr.Spark(
            label="输入文本",
            value="Spark Hello World!"
        )


if __name__ == "__main__":
    demo.launch()