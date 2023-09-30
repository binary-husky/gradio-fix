import gradio as gr

def on_click():
    print('clicked')
    return None


with gr.Blocks() as demo:
    with gr.Row():
        btn = gr.Button("Btn1",  elem_id="btnx", size='sm', info_str="red")
        btn1 = gr.Button("Btn2", elem_id="btnx", size='sm', info_str="")
    with gr.Floating(init_x='0%', init_y='50%', width='10%', len_y='30%'):
        btn2 = gr.Button("Btn3", elem_id="btnx", size='sm', info_str="2445")
        btn3 = gr.Button("Btn4", elem_id="btnx", size='sm', info_str="2361")
    btn.click(on_click, None, None)
    btn1.click(on_click, None, None)
    btn2.click(on_click, None, None)

demo.launch(server_port=7860)
