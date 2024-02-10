import Alpine from 'alpinejs';
import intersect from '@alpinejs/intersect';
import collapse from '@alpinejs/collapse';
import Splide from 'alpine-splide'
import focus from '@alpinejs/focus'
import persist from '@alpinejs/persist'
import ScrollPadlock from "scroll-padlock";
import { Instance, Input, ResultList, Summary, FilterPills } from "@pagefind/modular-ui";
import FilterComponent from './js/FilterComponent';


Alpine.plugin(focus);
Alpine.plugin(intersect);
Alpine.plugin(collapse);
Alpine.plugin(persist)
Alpine.data('Splide', Splide)
Alpine.data('filterComponent', FilterComponent)



/* Search localstorage helper functions */
Alpine.magic('getRecentSearches', () => {
	return () => {
		try {
			return JSON.parse(localStorage.getItem("docs-pagefind-recents")) ?? [];
		} catch {
			return [];
		}
	}
});
Alpine.magic('deleteRecentSearch', () => {
	return (recent) => {
		try {
			let recents = JSON.parse(localStorage.getItem("docs-pagefind-recents")) ?? [];
			recents = recents.filter(r => r !== recent);
			localStorage.setItem("docs-pagefind-recents", JSON.stringify(recents));
			return recents;
		} catch {
			return [];
		}
	}
});
Alpine.magic('triggerSearch', () => {
	return (term) => {
		window.searchInstance.triggerSearch(term);
	}
});

/* Focus search modal once opened, and lock the body scroll behind */
const scrollElement = document.body, LOCKED_CLASS = "t-scroll-lock";

new ScrollPadlock(
	scrollElement,
	LOCKED_CLASS
);

Alpine.magic('focusSearch', () => {
	return (searchModalOpen) => {
		if (searchModalOpen) {
			scrollElement.classList.add(LOCKED_CLASS);
			window?.searchInput?.focus?.();
			setTimeout(() => {
				window?.searchInput?.focus?.();
			}, 100);
		} else {
			scrollElement.classList.remove(LOCKED_CLASS);
		}
	}
});

window.Alpine = Alpine;

Alpine.start();

// Prefetch links
const anchorTagElements = document.getElementsByTagName('a');
let urls = [];

[ ...anchorTagElements ].forEach(anchor => {
	anchor.addEventListener('mouseover', event => {
		const href = event.target.href;

		if (href !== undefined && !urls.includes(href)) {
			urls.push(href);
			const link = document.createElement('link');
			link.rel = 'prefetch';
			link.href = href;
			document.head.appendChild(link);
		}
	});
});

/* script load delay logic */

const autoLoadDuration = 5; //In Seconds
const eventList = ["keydown", "mousemove", "wheel", "touchmove", "touchstart", "touchend"];

const autoLoadTimeout = setTimeout(runScripts, autoLoadDuration * 1000);

eventList.forEach(function(event) {
		window.addEventListener(event, triggerScripts, { passive: true })
});

function triggerScripts() {
		runScripts();
		clearTimeout(autoLoadTimeout);
		eventList.forEach(function(event) {
				 window.removeEventListener(event, triggerScripts, { passive: true });
		});
}

function runScripts() {
		document.querySelectorAll("script[delay]").forEach(function(scriptTag) {
				scriptTag.setAttribute("src", scriptTag.getAttribute("delay"));
		});
}

/* Pagefind implementation */

const trimExcerpt = (excerpt, target) => {
	const words = excerpt.split(/\s/);
	let core = words.findIndex(s => s.startsWith("<mark>"));
	if (core === -1) {
		core = target/2;
	}
	const start = core - Math.floor(target * 0.2);
	const end = core + Math.floor(target * 0.8);
	const res = words.slice(
		start < 0 ? 0 : start,
		end > words.length-1 ? words.length-1 : end
	);
	return res.join(' ');
}

const search = new Instance({
	bundlePath: "/_pagefind/",
	indexWeight: 2,
	excerptLength: 15,
});
window.searchInstance = search;

window.searchInput = new Input({
	containerElement: "#searchbox"
});
search.add(window.searchInput);

const searchResultTemplate = (result) => {
	let base_title = result.meta.title;
	if (result.meta.guide_title) {
	  base_title = `${result.meta.guide_title} • ${base_title}`;
	}
  
	let base_result = `<li class="result base"><a class="link" href="${result.url}">
	  <span class="section">${result.meta.site}</span>
	  <span class="title">${base_title}</span>
	</a></li>`;
  
	const has_root_result = !result.sub_results[0].anchor;
	if (has_root_result) {
	  const root_result = result.sub_results.shift();
	  base_result = `<li class="result base"><a class="link" href="${root_result.url}">
		<span class="section">${result.meta.site}</span>
		<span class="title">${base_title}</span>
		<span class="info">${root_result.excerpt}</span>
	  </a></li>`;
	}
  
	result.sub_results.sort((a, b) => b.locations.length - a.locations.length);
  
	const subs = result.sub_results.slice(0, 3).map((sub) => {
	  return `<li class="result sub"><a class="link" href="${sub.url}">
		<span class="title">${sub.title}
		<span class="info">${sub.excerpt}</span>
	  </a></li>`;
	});
	return base_result + subs.join("\n");
  };

search.add(new ResultList({
	containerElement: "#searchresults",
	resultTemplate: searchResultTemplate
}));
search.add(new Summary({
	containerElement: "#summary",
	defaultMessage: "Search",
}));
search.add(new FilterPills({
	containerElement: "#searchfilter",
	filter: "site"
}));

let recentSearches = null, thisSearch = null;
search.on("search", (term) => {
	if (recentSearches === null) {
		try {
			recentSearches = JSON.parse(localStorage.getItem("docs-pagefind-recents")) ?? [];
		} catch {
			recentSearches = [];
		}
	}
	thisSearch = term;
	if (thisSearch?.trim?.()?.length) {
		localStorage.setItem("docs-pagefind-recents", JSON.stringify([term, ...recentSearches.filter(r => r !== thisSearch).slice(0, 4)]));
	}
});

const messageElement = document.querySelector("#searchmessage");

if (messageElement) {
	search.on("loading", () => {
		if (messageElement.innerText.trim().length) messageElement.innerText = "Loading...";
	});
	search.on("results", (results) => {
		if (!results.results.length) {
			messageElement.innerText = "No results";
		} else {
			messageElement.innerText = "";
		}
	});
}

window.rehydrate = (el) => {
	const url = el.dataset.svg,
		classes = el.dataset.classes;

	var ajax = new XMLHttpRequest();
	ajax.open("GET", url, true);
	ajax.responseType = "document";
	ajax.onload = function(e) {
		var svg = ajax.responseXML.documentElement;
		if (classes) {
			var c = classes.split(' ');
			c.forEach(function(e) { if(e) { svg.classList.add(e)}});
		}
		el.replaceWith(svg);
	}
	ajax.send();
};
