const probe = require('probe-image-size'),
hasTemplateFormat = require("@11ty/eleventy-plugin-syntaxhighlight/src/hasTemplateFormat");

module.exports = {
	image_resize: function(image_path, width, dpr, height = null) {
		let transformations = `auto=compress&auto=format&w=${width}&dpr=${dpr}`
		if (height !== null && height !== 0 && height !== "0" && Number.isInteger(height)) {
			transformations += `&crop=faces&fit=crop&height=${height}`
		}
		return `${image_path}?${transformations}`
	},

	image_dimensions: async function(image_path) {
		let html = '',
			width = 0,
			height = 0;

		try {
			let result = await probe(image_path);

			width = result.width;
			height = result.height;

			if (width !== undefined && width > 0) {
				html += ` width="${width}"`
			}

			if (height !== undefined && height > 0) {
				html += ` height="${height}"`
			}

			return html;
		} catch (error) {
			return '';
		}
	}
};