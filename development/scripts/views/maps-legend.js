"use strict";

const View = require("ampersand-view");

const MapArea = require("../models/map-area");

module.exports = View.extend({
	props: {
		area_name: {
			type: "string"
		}
	},
	template: `
		<section id="maps-legend" class="overlay">
			<a href="#" data-hook="close">Close</a>
			<main>
				<div class="text-holder">
					<div class="text">
						<h2></h2>
						<p data-hook="body"></p>
						<p class="sources">Data sources: <span></span></p>
					</div>
				</div>
				<div class="legend-holder">
					<div class="legend">
						<h3>Legend</h3>
						<div class="features">
							<article data-feature="cycling"><div class="icon"></div>Cycling</article>
							<article data-feature="walking"><div class="icon"></div>Walking</article>
							<article data-feature="checkins"><div class="icon"></div>Checkins</article>
							<hr/>
							<article data-feature="water"><div class="icon"></div>Water</article>
							<article data-feature="parks"><div class="icon"></div>Parks</article>
							<article data-feature="airport"><div class="icon"></div>Airports</article>
							<article data-feature="transit"><div class="icon"></div>Transit Lines</article>
							<article data-feature="buildings"><div class="icon"></div>Buildings</article>
						</div>				
					</div>
				</div>
			</main>
		</section>
	`,
	derived: {
		sourcesHTML: {
			deps: ["model.sources"],
			fn: function() {
				return this.model.sources.join(", ");
			}
		}
	},
	bindings: {
		"model.name": {
			type: "text",
			selector: "h2"
		},
		"model.text": {
			type: "innerHTML",
			hook: "body"
		},
		"model.sources.length": {
			type: "toggle",
			selector: "p.sources"
		},
		"sourcesHTML": {
			type: "text",
			selector: "p.sources span"
		}
	},
	events: {
		"click [data-hook=close]": "closeHandler"
	},
	/*render: function() {
		this.renderWithTemplate(this);
		
		const choiceEls = this.queryAll(".choices a");
		const defaultClassName = "default";
		
		choiceEls.forEach(el => el.classList.add(defaultClassName));
		
		setTimeout(() => {
			requestAnimationFrame(() => choiceEls.forEach(
				el => el.classList.remove(defaultClassName)
			));
		}, 400);
		
		return this;
	},*/
	initialize: function() {		
		this.model = this.parent.area;
		
		this.listenTo(this.parent, "remove", this.close);
		this.listenTo(this.parent, "change:area_name", this.close);
	},
	closeHandler: function(event) {
		this.close();
		
		app.router.navigate(`/maps/${this.area_name}`, {
			replace: false,
			trigger: false
		});
		
		event.preventDefault();
		event.stopImmediatePropagation();
	},
	close: function() {
		this.el.parentNode.removeChild(this.el);
		this.remove();
	}
});