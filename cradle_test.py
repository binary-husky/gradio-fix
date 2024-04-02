import gradio as gr


# 纯 python

# def on_click():
#     return "ccccccccccccc"

# def on_click2(ttt1):
#     return ttt1

# with gr.Blocks() as demo:
#     with gr.Row():
#         btn = gr.Button("Btn1", elem_id="btnx", info_str="red").style(size="sm")
#         btn2 = gr.Button("Btn1", elem_id="btnx", info_str="red").style(size="sm")
#         ttt1 = gr.Textbox("aaaaaaaaaaaaaaaa", elem_id="ccc").style(size="sm")
#         ttt2 = gr.Textbox("xxxxxxxxxxxxxxxx", elem_id="ddd").style(size="sm")
#     btn.click(on_click, None, [ttt1])
#     btn2.click(on_click2, [ttt1], [ttt2])


# python + js 快速响应改进
js_fn = """
function push_data_to_gradio_component(DAT, ELEM_ID){
    const myEvent = new CustomEvent('gpt_academic_update_gradio_component', {
            detail: {
                data: DAT,
                elem_id: ELEM_ID,
            }
        }
    );
    window.dispatchEvent(myEvent);
}
"""
js = f"""<script>{js_fn}</script>\n"""
if not hasattr(gr, "RawTemplateResponse"):
    gr.RawTemplateResponse = gr.routes.templates.TemplateResponse
gradio_original_template_fn = gr.RawTemplateResponse

def gradio_new_template_fn(*args, **kwargs):
    res = gradio_original_template_fn(*args, **kwargs)
    res.body = res.body.replace(b"</html>", f"{js}</html>".encode("utf8"))
    res.init_headers()
    return res

gr.routes.templates.TemplateResponse = (
    gradio_new_template_fn  # override gradio template
)
with gr.Blocks() as demo:
    with gr.Row():
        btn = gr.Button("Btn1", elem_id="btnx", info_str="red").style(size="sm")
        btn2 = gr.Button("Btn1", elem_id="btnx", info_str="red").style(size="sm")
        ttt1 = gr.Textbox("aaaaaaaaaaaaaaaa", elem_id="ccc").style(size="sm")
        ttt2 = gr.Textbox("xxxxxxxxxxxxxxxx", elem_id="ddd").style(size="sm")
    btn.click(None, None, None, _js = f"""push_data_to_gradio_component("ccccccccccccc","ccc")""")
    btn2.click(None, [ttt1], None, _js = """(DAT)=>push_data_to_gradio_component(DAT,"ddd")""")


demo.launch(server_port=7862)
