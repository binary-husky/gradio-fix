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
            value="Hello World!"
        )
        # 输出组件 
        output_spark = gr.Spark(
            label="输出文本",
            interactive=False
        )
    
    # 添加提交按钮
    submit_btn = gr.Button("提交")
    submit_btn.click(
        fn=echo_value,
        inputs=input_spark,
        outputs=output_spark
    )

if __name__ == "__main__":
    demo.launch()