const StyleRenderer = require('../../src/config/style_renderer.js'),
// ImageRenderer = require('../../src/config/image_renderer.js'),
Helpers = require('../../src/config/helpers.js');

module.exports = function (Liquid) {
	this.registerFilter('render_padding', StyleRenderer.render_padding);
	this.registerFilter("render_margin", StyleRenderer.render_margin);
	this.registerFilter("render_position", StyleRenderer.render_position);
	this.registerFilter("render_position_percentage", StyleRenderer.render_position_percentage);
	this.registerFilter("render_transform", StyleRenderer.render_transform);
	this.registerFilter("render_logo_transform", StyleRenderer.render_logo_transform);
	this.registerFilter("render_text_alignment", StyleRenderer.render_text_alignment);
	this.registerFilter("render_heading_text_size", StyleRenderer.render_heading_text_size);
	this.registerFilter("render_text_block_text_size", StyleRenderer.render_text_block_text_size);
	this.registerFilter("render_justify", StyleRenderer.render_justify);
	this.registerFilter("render_spacer", StyleRenderer.render_spacer);
	this.registerFilter("render_block_alignment", StyleRenderer.render_block_alignment);
	this.registerFilter("render_visibility", StyleRenderer.render_visibility);
	this.registerFilter("render_columns", StyleRenderer.render_columns);
	this.registerFilter("render_vertical_block_alignment", StyleRenderer.render_vertical_block_alignment);

	// this.registerFilter("image_dimensions", ImageRenderer.image_dimensions);
	// this.registerFilter("image_resize", ImageRenderer.image_resize);
	this.registerFilter("UUID", Helpers.uuid);
	this.registerFilter("excerpt", Helpers.excerpt);

	this.registerFilter("svgContents", function(url, classes) {
		if (!classes) {
			classes = "";
		}
		let newUrl = url.replace(/^\/src(.+)/, "$1");
		return `<img loading=lazy src data-svg='${newUrl}' data-classes='${classes}' onerror='window.rehydrate(this)'>`;
	});
}