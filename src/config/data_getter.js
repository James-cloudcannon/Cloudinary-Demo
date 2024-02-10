const EleventyFetch = require("@11ty/eleventy-fetch"); // here to keep bookshop happy

module.exports = {
	download_github_readme: async function(repo, branch, readme) {
		let githubFileOrigin = repo.replace(/https\:\/\/github\.com\//, 'https://raw.githubusercontent.com/'),
		readmeUrl = `${githubFileOrigin}/${branch}/${readme}`;
		console.log(`Downloading ${readmeUrl}...`);

		return EleventyFetch(readmeUrl, {
			duration: "1d",
			type: "text"
		});
	},

	strip_markdown_images: function(markdown) {
		return markdown.replace(/(^!\[.*?\]\()(.+?)(\))/gm, '');
	},

	strip_first_h1: function(markdown){
		return markdown.replace(/#(.*)/, "")
	}
};
