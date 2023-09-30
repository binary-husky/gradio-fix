import gradio as gr

def on_click():
    print('clicked')
    return None


with gr.Blocks() as demo:
    btn = gr.Button("wdqwd11",  elem_id="btnx", info_str="red")
    btn1 = gr.Button("wdqwd12", elem_id="btnx", info_str="blue")
    btn2 = gr.Button("wdqwd13", elem_id="btnx", info_str="")
    btn.click(on_click, None, None)

demo.launch(server_port=7860)
