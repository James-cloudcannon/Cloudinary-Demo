const defaultTheme = require('tailwindcss/defaultTheme');


module.exports = {
	content: ['_site/**/*.html'],
	safelist: [
		'text-ellipsis'
	],
	theme: {
		extend: {
			screens: {
				'xsm': '500px',
			},
			typography: {
				DEFAULT: {
					css: {
						"code::before": {content: ''},
						"code::after": {content: ''},
						"code": {
							background: '#f2f2f2'
						}
					}
				}
			},
			fontFamily: {
				'sans': ['Inter', ...defaultTheme.fontFamily.sans],
			},
			colors: {
				cloudinary: '#3F5FFF',
				"cloudinary-hover": '#2e4ccf',
				"cloudinary-btn-blue": '#4598F7',
				"cloudinary-dark-blue": '#162436',
			    "cloudinary-red": '#ff5050',
				"cloudinary-grey": '#f3f4f6',
				"cloudinary-red-hover": '#D6364B',
				"cloudinary-blue": {
					DEFAULT: '#3F5FFF',
					900: '#3F5FFF',
					800: '#6881FF',
					600: '#91A3FF',
					400: '#B9C5FF',
					200: '#E2E7FF',
					100: '#E6EDFB'
		  		},
				carbon: {
					DEFAULT: '#393939',
					900: '#393939',
					800: '#616161',
					600: '#888888',
					400: '#B0B0B0',
					200: '#D7D7D7',
					100: '#ECECEC',
					50: '#F5F5F5'
				},
				ruby: {
					DEFAULT: '#F03A47',
					900: '#F03A47',
					800: '#F3616C',
					600: '#F68991',
					400: '#F9B0B5',
					200: '#FCD8DA',
					100: '#FEECED'
				},
				space: {
					DEFAULT: '#354361',
					900: '#354361',
					800: '#5D6981',
					600: '#868EA0',
					400: '#AEB4C0',
					200: '#D7D9DF',
					100: '#EBEDF0'
				},
				amber: {
					DEFAULT: '#FC6D26',
					900: '#FC6D26',
					800: '#FD8A51',
					600: '#FDA77D',
					400: '#FEC5A8',
					200: '#FEE2D4',
					100: '#FFF1EA'
				},
				emerald: {
					DEFAULT: '#38A413',
					900: '#38A413',
					800: '#60B642',
					600: '#88C871',
					400: '#AFDBA1',
					200: '#D7EDD0',
					100: '#ECF6E8'
				},
				gold: {
					DEFAULT: '#C9B25F',
					900: '#C9B25F',
					800: '#F9E683',
					600: '#FAECA2',
					400: '#FCF3C1',
					200: '#FDF9E0',
					100: '#FFFCF0'
				},
				'electric-purple': {
					DEFAULT: '#C703D8',
					900: '#C703D8',
					800: '#D235E0',
					600: '#DD68E8',
					400: '#E99AEF',
					200: '#F4CDF7',
					100: '#FAE6FC'
				},				
				nimbus: '#707070',
				caramel: '#fdf6db',
				sea: '#B9E5E3',
				sky: '#b4e7f7',
				ash: '#f7f5f2',
				night: '#2B2B31',
				midnight: '#26252A',								
				comet: "#8BB4ED",
				bronze: "#F4A34E",
				silver: "#C0C0C0",				
				platinum: "#B9C8E6",
				"rich-black": "#0E1A27",

			},
			boxShadow: {
				'menu': '0 24px 30px 4px rgb(0 0 0 / 0.08)'
			}
		},
		container: {
			center: true,
			padding: '2rem',
			screens: {
				sm: "100%",
				md: "100%",
				lg: "1024px",
				xl: "1280px"
			}
		},
		transitionTimingFunction: {
			'cc-cubic': 'cubic-bezier(.22 ,1, .36 ,1)',
		}

	},
	plugins: [
		require('@tailwindcss/typography')
	],
}