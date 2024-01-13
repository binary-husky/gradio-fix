import gradio as gr

css = "footer {display: none !important;} .gradio-container {min-height: 0px !important;}"

with gr.Blocks(css=css) as demo:
    gr.Chatbot(value=[[
        """
<div class="markdown-body"><p>0000000000000000</p>
""",
"""
<div class="markdown-body"><p>在Chrome中触发断点，当某个特定元素被修改时，需要使用MutationObserver来监视元素的变化并触发断点。</p>
<p>111111111111111111您可以按照以下步骤进行操作：</p>
<ol>
<li>打开Chrome浏览器并导航到您想要调试的网页。</li>
<li>打开开发者工具。您可以通过右键单击网页上的任何位置然后选择“检查”或按下Ctrl+Shift+I（Windows/Linux）或Cmd+Opt+I（Mac）快捷键来打开开发者工具。</li>
<li>在开发者工具中，切换到“Console”（控制台）选项卡。</li>
<li>在控制台中，输入以下代码来创建一个MutationObserver，用于监视特定元素的变化并触发断点：</li>
</ol>
<div class="highlight"><pre><span></span><code><span class="c1">// 替换 &quot;element-id&quot; 为要监视的具体元素的 ID</span>
<span class="kd">const</span><span class="w"> </span><span class="nx">elementToObserve</span><span class="w"> </span><span class="o">=</span><span class="w"> </span><span class="nb">document</span><span class="p">.</span><span class="nx">getElementById</span><span class="p">(</span><span class="s2">&quot;element-id&quot;</span><span class="p">);</span>

<span class="c1">// 创建一个MutationObserver实例</span>
<span class="kd">const</span><span class="w"> </span><span class="nx">observer</span><span class="w"> </span><span class="o">=</span><span class="w"> </span><span class="ow">new</span><span class="w"> </span><span class="nx">MutationObserver</span><span class="p">(</span><span class="kd">function</span><span class="p">(</span><span class="nx">mutationsList</span><span class="p">)</span><span class="w"> </span><span class="p">{</span>
<span class="w">  </span><span class="c1">// 每次观察到变化时触发的回调函数</span>
<span class="w">  </span><span class="k">debugger</span><span class="p">;</span>
<span class="p">});</span>

<span class="c1">// 配置观察器，只监视子元素的修改</span>
<span class="kd">const</span><span class="w"> </span><span class="nx">config</span><span class="w"> </span><span class="o">=</span><span class="w"> </span><span class="p">{</span><span class="w"> </span><span class="nx">childList</span><span class="o">:</span><span class="w"> </span><span class="kc">true</span><span class="w"> </span><span class="p">};</span>

<span class="c1">// 启动观</span>
</code></pre></div></div>
"""
],[None,"😍"],[
"""2222222222222222222""",
"""
<div class="markdown-body"><p>在Chrome中触发断点，当某个特定元素被修改时，需要使用MutationObserver来监视元素的变化并触发断点。</p>
<p>333333333333333333您可以按照以下步骤进行操作：</p>
<ol>
<li>打开Chrome浏览器并导航到您想要调试的网页。</li>
<li>打开开发者工具。您可以通过右键单击网页上的任何位置然后选择“检查”或按下Ctrl+Shift+I（Windows/Linux）或Cmd+Opt+I（Mac）快捷键来打开开发者工具。</li>
<li>在开发者工具中，切换到“Console”（控制台）选项卡。</li>
<li>在控制台中，输入以下代码来创建一个MutationObserver，用于监视特定元素的变化并触发断点：</li>
</ol>
<div class="highlight"><pre><span></span><code><span class="c1">// 替换 &quot;element-id&quot; 为要监视的具体元素的 ID</span>
<span class="kd">const</span><span class="w"> </span><span class="nx">elementToObserve</span><span class="w"> </span><span class="o">=</span><span class="w"> </span><span class="nb">document</span><span class="p">.</span><span class="nx">getElementById</span><span class="p">(</span><span class="s2">&quot;element-id&quot;</span><span class="p">);</span>

<span class="c1">// 创建一个MutationObserver实例</span>
<span class="kd">const</span><span class="w"> </span><span class="nx">observer</span><span class="w"> </span><span class="o">=</span><span class="w"> </span><span class="ow">new</span><span class="w"> </span><span class="nx">MutationObserver</span><span class="p">(</span><span class="kd">function</span><span class="p">(</span><span class="nx">mutationsList</span><span class="p">)</span><span class="w"> </span><span class="p">{</span>
<span class="w">  </span><span class="c1">// 每次观察到变化时触发的回调函数</span>
<span class="w">  </span><span class="k">debugger</span><span class="p">;</span>
<span class="p">});</span>

<span class="c1">// 配置观察器，只监视子元素的修改</span>
<span class="kd">const</span><span class="w"> </span><span class="nx">config</span><span class="w"> </span><span class="o">=</span><span class="w"> </span><span class="p">{</span><span class="w"> </span><span class="nx">childList</span><span class="o">:</span><span class="w"> </span><span class="kc">true</span><span class="w"> </span><span class="p">};</span>

<span class="c1">// 启动观</span>
</code></pre></div></div>
"""
]])

demo.launch()