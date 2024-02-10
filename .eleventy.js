const svgContents = require("eleventy-plugin-svg-contents"),
			yaml = require("js-yaml"),
			csv = require("csvtojson"),
			pluginBookshop = require("@bookshop/eleventy-bookshop"),
			{ DateTime } = require("luxon"),
			mila = require("markdown-it-link-attributes"),
			markdownIt = require("markdown-it"),
			md = new markdownIt({
				html: true,
			}).use(mila, {
				matcher(href, config) {
					return ! /^(https:\/\/(.*).?cloudcannon\.com|(?!http)).*$/gm.test(href);
				},
				attrs: {
					target: "_blank",
					rel: "noopener noreferrer"
				}
			}),
			syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight"),
			StyleRenderer = require('./src/config/style_renderer.js'),
			ImageRenderer = require('./src/config/image_renderer.js'),
			DataGetter = require('./src/config/data_getter.js'),
			Helpers = require('./src/config/helpers.js'),
			{ Tokenizer, assert } = require('liquidjs'),
			path = require("node:path"),
			fs = require('fs'),
			Image = require("@11ty/eleventy-img");			

module.exports = function (eleventyConfig) {
	eleventyConfig.addWatchTarget("component-library/");
	eleventyConfig.addWatchTarget('src/styles/tailwind.config.js');
	eleventyConfig.addWatchTarget('src/styles/tailwind.css');
	

	eleventyConfig.setLibrary("md", markdownIt({ 
		html: true
	}).use(mila, {
		matcher(href, config) {
			return ! /^(https:\/\/(.*).?cloudcannon\.com|(?!http)).*$/gm.test(href);
		},
		attrs: {
			target: "_blank",
			rel: "noopener noreferrer"
		}
	}).disable('code'));
	eleventyConfig.addPassthroughCopy("src/uploads")
	eleventyConfig.addPassthroughCopy("src/images")
	eleventyConfig.addPassthroughCopy("src/assets")
	eleventyConfig.addPassthroughCopy("src/fonts")
	eleventyConfig.addPassthroughCopy("src/robots.txt");
	eleventyConfig.addPassthroughCopy({
		"node_modules/@zachleat/table-saw/table-saw.js": "/js/table-saw.js"
	});
	

	eleventyConfig.addDataExtension('yaml', contents => yaml.load(contents))
	eleventyConfig.addDataExtension('yml', contents => yaml.load(contents))
	eleventyConfig.addDataExtension('csv', async (contents) => {
		return await csv().fromString(contents);
	});

	// Plugins
	eleventyConfig.addPlugin(pluginBookshop({
		bookshopLocations: ["component-library"],
		pathPrefix: '',
	}));

	eleventyConfig.addFilter("excerpt", Helpers.excerpt);
	eleventyConfig.addFilter("UUID", Helpers.uuid);
	eleventyConfig.addFilter("is_integer", Helpers.is_integer);
	eleventyConfig.addFilter("push", Helpers.push_to_array);
	eleventyConfig.addFilter("download_github_readme", DataGetter.download_github_readme);
	eleventyConfig.addFilter("strip_markdown_images", DataGetter.strip_markdown_images);
	eleventyConfig.addFilter("strip_first_h1", DataGetter.strip_first_h1);

	eleventyConfig.addFilter("ymlify", (yml) => yaml.load(yml));

	eleventyConfig.addPlugin(svgContents);
	eleventyConfig.addPlugin(syntaxHighlight);
	eleventyConfig.addFilter("render_padding", StyleRenderer.render_padding);
	eleventyConfig.addFilter("render_margin", StyleRenderer.render_margin);
	eleventyConfig.addFilter("render_position", StyleRenderer.render_position);
	eleventyConfig.addFilter("render_position_percentage", StyleRenderer.render_position_percentage);
	eleventyConfig.addFilter("render_transform", StyleRenderer.render_transform);
	eleventyConfig.addFilter("render_logo_transform", StyleRenderer.render_logo_transform);
	eleventyConfig.addFilter("render_text_alignment", StyleRenderer.render_text_alignment);
	eleventyConfig.addFilter("render_heading_text_size", StyleRenderer.render_heading_text_size);
	eleventyConfig.addFilter("render_text_block_text_size", StyleRenderer.render_text_block_text_size);
	eleventyConfig.addFilter("render_sub_text_block_text_size", StyleRenderer.render_sub_text_block_text_size);
	eleventyConfig.addFilter("render_justify", StyleRenderer.render_justify);
	eleventyConfig.addFilter("render_spacer", StyleRenderer.render_spacer);
	eleventyConfig.addFilter("render_block_alignment", StyleRenderer.render_block_alignment);
	eleventyConfig.addFilter("render_visibility", StyleRenderer.render_visibility);
	eleventyConfig.addFilter("render_columns", StyleRenderer.render_columns);
	eleventyConfig.addFilter("render_three_columns", StyleRenderer.render_three_columns);
	eleventyConfig.addFilter("render_vertical_block_alignment", StyleRenderer.render_vertical_block_alignment);
	
	eleventyConfig.addFilter("image_resize", ImageRenderer.image_resize);
	eleventyConfig.addFilter("image_dimensions", ImageRenderer.image_dimensions);
	eleventyConfig.addFilter('ymlify', contents => yaml.load(contents))

	// Custom shortcodes
	const IMAGE_OPTIONS = {
		widths: [400, 800, 1280, 1600],
		formats: ["avif", "webp", "svg", "jpeg"],
		outputDir: "./_site/optimized/",
		urlPath: "/optimized/",
		// svgCompressionSize: "br",
	};
	eleventyConfig.addShortcode("image", async (srcFilePath, alt, className, sizes, preferSvg) => {
		let before = Date.now();
		let inputFilePath = srcFilePath == null ? srcFilePath : path.join('src', srcFilePath);
	
		if (fs.existsSync(inputFilePath)) {
		  let metadata = await Image(inputFilePath, Object.assign({
			svgShortCircuit: preferSvg ? "size" : false,
		  }, IMAGE_OPTIONS));
		  console.log( `[11ty/eleventy-img] ${Date.now() - before}ms: ${inputFilePath}` );
	
		  return Image.generateHTML(metadata, {
			alt,
			class: className,
			sizes: sizes || "100vw", // Set default value to "100vw" if sizes is not provided
			loading: "eager",
			decoding: "async",
		  });
		} else {
		  return `<img class='${className}' src='${srcFilePath}' alt='${alt}'>`;
		}
	});
	
	eleventyConfig.addFilter("filterByTags", function(collection=[], ...requiredTags) {
		return collection.filter(post => {
			let tags = requiredTags.flat().filter(t => t !== 'posts');
			return tags.some(tag => post.data.tags.includes(tag));
		});
	});

	eleventyConfig.addFilter('filterCategory', function(collection, category) {
		if(category == null) return collection;
		const filtered = collection.filter(item => {
			if(category.startsWith("!"))			
				return item.data.categories.indexOf(category.replace("!", "")) == -1			
			else
				return item.data.categories.indexOf(category) != -1
		})
		return filtered;
	});

	eleventyConfig.addFilter('filterFrontmatter', function(collection, field) {
		if(field == null) return collection;
		const filtered = collection.filter(item => {
			if(field.startsWith("!"))			
				return !item.data[field.replace("!", "")]			
			else
				return item.data[field]
		})
		return filtered;
	});

	eleventyConfig.addFilter("replaceRE", function(input, regex, replacement) {
		return input.replace(new RegExp(regex), replacement);
	});

	eleventyConfig.addFilter("markdownify", (markdown) => md.render(markdown));

	return {
		dir: {
			input: "src",
			output: "_site"
		}
	}
};