<script>
	import { Meta, Template, Story } from "@storybook/addon-svelte-csf";
	import Floating from "./static";
	import Image from "@gradio/image/interactive";
</script>

<Meta title="Layout Elements/Floating" component={Floating} />

<Template let:args>
	<Floating {...args}>
		<Image {...args} value="https://i.ibb.co/6BgKdSj/groot.jpg" />
		<Image {...args} value="https://i.ibb.co/6BgKdSj/groot.jpg" />
	</Floating>
</Template>

<Story name="Floating" />
