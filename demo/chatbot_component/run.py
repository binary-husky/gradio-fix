import gradio as gr

css = "footer {display: none !important;} .gradio-container {min-height: 0px !important;}"
global cnt
cnt = 0
def func(cb):
    if len(cb) == 0:
        
        cb.append([
"""
请你给出围绕“{subject}”的逻辑关系图，使用mermaid语法，mermaid语法举例：
<pre class='mermaid'>
<code>
graph TD
    P(编程) --> L1(Python)
    P(编程) --> L2(C)
    P(编程) --> L3(C++)
    P(编程) --> L4(Javascipt)
    P(编程) --> L5(PHP)
</code>
<code_finish_render style="display:none">
graph TD
    P(编程) --> L1(Python)
    P(编程) --> L2(C)
</code_finish_render>
<span>goooood<span>
<pre>
""",

"very good"
    ]
    )
        return cb
    if len(cb) == 1:
        cb.append([
"""
请你给出围绕“{subject}”的逻辑关系图，使用mermaid语法，mermaid语法举例：
<pre class='mermaid'>
<code>
graph TD
    P(编程) --> L1(Python)
    P(编程) --> L2(C)
    P(编程) --> L3(C++)
    P(编程) --> L4(Javascipt)
    P(编程) --> L5(PHP)
</code>
<pre>
""",

"very good"
    ]
    )
        return cb
        
    if len(cb) == 2:
        cb.append([
"""
请你给出围绕“{subject}”的逻辑关系图，使用mermaid语法，mermaid语法举例：
<pre class='mermaid'>
<code>
graph TD
    P(编程) --> L1(Python)
    P(编程) --> L2(C#)
    P(编程) --> L3(C++)
    P(编程) --> L4(Javascipt)
    P(编程) --> L5(PHP)
</code>
<pre>
""",

"very good"
    ]
    )
        return cb
    return cb
    
with gr.Blocks(css=css) as demo:
    cb = gr.Chatbot(value=[])
    b = gr.Button('run')
    b.click(func, [cb], [cb])

demo.launch()