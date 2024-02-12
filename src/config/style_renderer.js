module.exports = {
	basic_checks: function(fm) {
		return fm !== undefined && fm.desktop !== undefined;
	},

	get_data: function(fm, device, type) {
		if (!module.exports.basic_checks(fm)) {
			return undefined;
		}

		if (device === undefined) {
			device = 'desktop';
		}

		let attr = fm.desktop[type];

		if (device == 'tablet' && fm.tablet[type].active) {
			attr = fm.tablet[type];
		}

		if (device == 'mobile') {
			if (fm.mobile[type].active) {
				attr = fm.mobile[type];
			} else if (fm.tablet[type].active) {
				attr = fm.tablet[type];
			}
		}

		return attr;
	},

	validInteger: function(key, object) {
		return key in object && Number.isInteger(object[key]);
	},

	render_space: function(styles, fm, device, type) {
		let space = module.exports.get_data(fm, device, type);

		if (space === undefined) {
			return styles;
		}

		if (module.exports.validInteger('top', space)) {
			styles += `${type}-top: ${space.top}px;`
		} 

		if (module.exports.validInteger('right', space)) {
			styles += `${type}-right: ${space.right}px;`
		} 

		if (module.exports.validInteger('bottom', space)) {
			styles += `${type}-bottom: ${space.bottom}px;`
		} 
		
		if (module.exports.validInteger('left', space)) {
			styles += `${type}-left: ${space.left}px;`
		}

		return styles;
	},

	render_padding: function (styles, fm, device) {
		return module.exports.render_space(styles, fm, device, 'padding');
	},

	render_margin: function(styles, fm, device) {
		return module.exports.render_space(styles, fm, device, 'margin');
	},

	render_position: function(styles, fm, device) {
		let position = module.exports.get_data(fm, device, 'position');

		if (position === undefined) {
			return styles;
		}

		if (module.exports.validInteger('top', position)) {
			styles += `top: ${position.top}px;`
		} 

		if (module.exports.validInteger('right', position)) {
			styles += `right: ${position.right}px;`
		} 

		if (module.exports.validInteger('bottom', position)) {
			styles += `bottom: ${position.bottom}px;`
		} 
		
		if (module.exports.validInteger('left', position)) {
			styles += `left: ${position.left}px;`
		}

		return styles;
	},

	render_position_percentage: function(styles, fm, device) {
		let position = module.exports.get_data(fm, device, 'position');

		if (position === undefined) {
			return styles;
		}

		if (module.exports.validInteger('top', position) && position.top != 0) {
				styles += `top: ${position.top}%;`
		} 

		if (module.exports.validInteger('right', position) && position.right != 0) {
			styles += `right: ${position.right}%;`
		} 

		if (module.exports.validInteger('bottom', position) && position.bottom != 0) {
			styles += `bottom: ${position.bottom}%;`
		} 
		
		if (module.exports.validInteger('left', position) && position.left != 0) {
			styles += `left: ${position.left}%;`
		}

		return styles;
	},

	render_heading_text_size: function(styles, fm, device) {
		let sizing = module.exports.get_data(fm, device, 'text_sizing');

		if (sizing === undefined) {
			return styles;
		}

		let textSize = '1rem';
		switch(sizing.text_size) {
			case 'biggest':
				textSize = '4.5rem';
				break;
			case 'bigger':
				textSize = '4rem';
				break;
			case 'big':
				textSize = '3rem';
				break;
			case 'normal':
				textSize = '2.25rem';
				break;
			case 'small':
				textSize = '1.5rem';
				break;
			case 'smallest':
				textSize = '1.1rem';
				break;
		}

		return styles +  `font-size: ${textSize};`;
	},

	

	render_text_block_text_size: function(styles, fm, device) {
		let sizing = module.exports.get_data(fm, device, 'text_sizing');

		if (sizing === undefined) {
			return styles;
		}

		let textSize = '1.125rem';

		switch(sizing.text_size) {
			case 'biggest':
				textSize = '1.5rem';
				break;
			case 'big':
				textSize = '1.3rem';
				break;
			case 'normal':
				textSize = '1.125rem';
				break;
		}

		return styles +  `font-size: ${textSize};`;
	},

	render_sub_text_block_text_size: function(styles, fm, device) {
		let sizing = module.exports.get_data(fm, device, 'text_sizing');

		if (sizing === undefined) {
			return styles;
		}

		let textSize = '1rem';

		switch(sizing.text_size) {
			case 'biggest':
				textSize = '1.25rem';
				break;
			case 'big':
				textSize = '1.125rem';
				break;
			case 'small':
				textSize = '0.875rem';
				break;
			case 'normal':
				textSize = '1rem';
				break;
		}

		return styles +  `font-size: ${textSize};`;
	},


	render_justify: function(styles, fm, device) {
		let justify = module.exports.get_data(fm, device, 'justify');

		if (justify === undefined) {
			return styles;
		}

		let j = 'flex-start';
		switch(justify.align) {
			case 'start':
				j = 'flex-start';
				break;
			case 'end':
				j = 'flex-end';
				break;
			case 'between':
				j = 'space-between';
				break;
			case 'center':
				j = 'center';
				break;
			case 'around':
				j = 'space-around';
				break;
			case 'evenly':
				j = 'space-evenly';
				break;
		}

		return styles + `justify-content: ${j};`;
	},

	render_text_alignment: function(styles, fm, device) {
		let validOptions = [
			'left',
			'right',
			'center',
			'justify',
			'inherit'
		];

		let alignment = module.exports.get_data(fm, device, 'text_alignment');

		if (alignment === undefined) {
			return styles;
		}

		if (validOptions.includes(alignment.align.toLowerCase())) {
			styles += `text-align: ${alignment.align};`;
		}

		return styles;
	},

	render_transform: function(styles, fm, device) {
		let transform = module.exports.get_data(fm, device, 'transform');

		if (transform === undefined) {
			return styles;
		}

		let transformations = '';

		if ('scale' in transform) {
			transformations += `scale(${transform.scale}) `;
		} 

		if (module.exports.validInteger('translate_x', transform)) {
			transformations += `translateX(${transform.translate_x}px) `;
		}

		if (module.exports.validInteger('translate_y', transform)) {
			transformations += `translateY(${transform.translate_y}px) `;
		} 

		if (module.exports.validInteger('rotate', transform)) {
			transformations += `rotate(${transform.rotate}deg) `;
		} 

		if (module.exports.validInteger('skew', transform)) {
			transformations += `skew(${transform.skew}deg) `;
		} 

		return styles + `transform: ${transformations};`
	},

	render_clip_path: function(styles, fm, device) {
		let clipShape = module.exports.get_data(fm, device, 'clip_path');

		if (clipShape === undefined || clipShape.shape === undefined || !Array.isArray(clipShape.points) && clipShape.shape !== 'circle' && clipShape.shape !== 'ellipse') {
			return styles;
		}

		let clipPathValue = '';

		switch (clipShape.shape.toLowerCase()) {
			case 'polygon':
				const points = clipShape.points.map(point => `${point.x}% ${point.y}%`).join(', ');
				clipPathValue = `polygon(${points})`;
				break;
			case 'circle':
				const { radius, cx = 50, cy = 50 } = clipShape; 
				clipPathValue = `circle(${radius}% at ${cx}% ${cy}%)`;
				break;
			case 'ellipse':
				const { rx, ry, cx: ecx = 50, cy: ecy = 50 } = clipShape;
				clipPathValue = `ellipse(${rx}% ${ry}% at ${ecx}% ${ecy}%)`;
				break;
		}

		if (clipPathValue !== '') {
			styles += `clip-path: ${clipPathValue};`;
		}

		if ('hide_overflow' in fm && fm.hide_overflow) {
			styles += 'overflow: hidden;';
		}

		return styles;
	},


	render_logo_transform: function(styles, fm, device) {
		let transform = module.exports.get_data(fm, device, 'logo_transform');

		if (transform === undefined) {
			return styles;
		}

		let transformations = '';

		if ('scale' in transform) {
			transformations += `scale(${transform.scale}) `;
		} 

		if (module.exports.validInteger('translate_x', transform)) {
			transformations += `translateX(${transform.translate_x}px) `;
		}

		if (module.exports.validInteger('translate_y', transform)) {
			transformations += `translateY(${transform.translate_y}px) `;
		} 

		if (module.exports.validInteger('rotate', transform)) {
			transformations += `rotate(${transform.rotate}deg) `;
		} 

		if (module.exports.validInteger('skew', transform)) {
			transformations += `skew(${transform.skew}deg) `;
		} 

		return styles + `transform: ${transformations};`
	},

	render_spacer: function(styles, fm, device) {
		let spacing = module.exports.get_data(fm, device, 'space');

		if (spacing === undefined) {
			return styles;
		}

		if (spacing.size < 0) {
			styles += `margin-top: ${spacing.size}px`;
		} else {
			styles += `padding-top: ${spacing.size}px`;
		}

		return styles;
	},

	render_block_alignment: function(styles, fm, device) {
		let alignment = module.exports.get_data(fm, device, 'block_alignment');

		if (alignment === undefined) {
			return styles;
		}

		switch(alignment.align_block) {
			case 'center':
				styles += `margin-left: auto; margin-right: auto;`
				break;
		}

		return styles;
	},

	render_vertical_block_alignment: function(styles, fm, device) {
		let alignment = module.exports.get_data(fm, device, 'vertical_block_alignment');

		if (alignment === undefined) {
			return styles;
		}

		switch(alignment.v_align) {
			case 'center':
				styles += `display:flex;justify-content: center;flex-direction:column;`
				break;
		}

		return styles;
	},

	render_visibility: function(styles, fm, device) {
		let visibility = module.exports.get_data(fm, device, 'visibility');

		if (visibility === undefined) {
			return styles;
		}

		if (visibility.hide) {
			styles += 'display: none;';
		}

		return styles;
	},

	render_columns: function(styles, fm, device) {
		let columns = module.exports.get_data(fm, device, 'columns');

		if (columns === undefined) {
			return styles;
		}

		var columnData = {
			left: 'box-sizing: border-box;',
			right: 'box-sizing: border-box;'
		};

		switch(columns.type) {
			case 'split':
				columnData.left += `width:50%;`;
				columnData.right += 'width:50%;';
				break;
			case 'split-60-40':
				columnData.left += `width:60%;`;
				columnData.right += 'width:40%;';
				break;
			case 'split-40-60':
				columnData.left += `width:40%;`;
				columnData.right += 'width:60%;';
				break;
			case 'split-70-30':
				columnData.left += `width:70%;`;
				columnData.right += 'width:30%;';
				break;
			case 'split-30-70':
				columnData.left += `width:30%;`;
				columnData.right += 'width:70%;';
				break;
			case 'fixed-fluid':
				columnData.left += `width:${columns.width}px;`;
				columnData.right += 'position:relative; flex:1;';
				break;
			case 'fluid-fixed':
				columnData.left += 'position:relative; flex:1;';
				columnData.right += `width:${columns.width}px;`;
				break;
			case 'stacked':
				columnData.left += 'width:100%;';
				columnData.right += 'width:100%;';
				break;
		}
		
		if (module.exports.validInteger('gap', columns)) {
			columnData.left += `padding-right: ${columns.gap}px;`
			columnData.right += `padding-left: ${columns.gap}px;`
		}

		if (module.exports.validInteger('vertical_gap', columns)) {
			columnData.left += `padding-bottom: ${columns.vertical_gap}px;`
			columnData.right += `padding-top: ${columns.vertical_gap}px;`
		}

		return columnData;
	},

	render_three_columns: function(styles, fm, device) {
		let columns = module.exports.get_data(fm, device, 'columns');

		if (columns === undefined) {
			return styles;
		}

		var styles = '';

		switch(columns.type) {
			case 'split':
				styles += `display: grid;
				grid-template-columns: repeat(3, 1fr);
				grid-template-rows: 1fr;
				grid-column-gap: ${columns.gap}px;
				grid-row-gap: 0px;`;
				break;
			case 'stacked':
				styles += `display: grid;
				grid-template-columns: 1fr;
				grid-template-rows: 1fr;
				grid-column-gap: 0px;
				grid-row-gap:${columns.gap}px;`;
				break;
		}

		return styles;
	}
};
