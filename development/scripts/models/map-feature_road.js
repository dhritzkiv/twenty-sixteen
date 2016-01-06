"use strict";

const THREE = require("three.js");
const MapFeature = require("./map-feature");
const consts = require("../consts");

const MeshLine = require("../THREE.MeshLine").MeshLine;
const MeshLineMaterial = require("../THREE.MeshLine").MeshLineMaterial;

module.exports = MapFeature.extend({
	props: {
		renderOrder: {
			type: "number",
			default: 0.01
		},
		z_position: {
			type: "number",
			default: 0.0000001
		}
	},
	getMesh: function() {

		const self = this;
		
		const materials = {};
		
		console.time(this.name);
		
		this.points = this.points
		.map(feature => {
			
			let expandedFeature = [];
			
			if (feature.geometry.type === "MultiLineString") {
				expandedFeature = feature.geometry.coordinates.map(coords => {
					
					const newFeature = {
						properties: {},
						geometry: {}
					};
					
					newFeature.properties = feature.properties;
					newFeature.geometry.type = "LineString";
					newFeature.geometry.coordinates = coords;
					return newFeature;
				});
				
				expandedFeature.sort((a, b) => b.geometry.coordinates.length - a.geometry.coordinates.length);
				
				//expandedFeature = expandedFeature.splice(0,12);//remove this
			} else {
				expandedFeature.push(feature);
			}
			
			return expandedFeature;
		}).reduce((a, b) => a.concat(b));
				
		const lines = this.points
		.filter(feature => {
			return [
				"motorway",
				"primary",
				"secondary",
				"trail",
				"bus",
				"sc",
				"max",
				"at",
				"subway"
			].indexOf(feature.properties.type) !== -1;
		})
		.map(function(feature) {
			
			let width = 1;
			let color = consts.COLOR_ROADS_MINOR;
			
			if (feature.properties.type === "motorway") {
				width = 3;
				color = consts.COLOR_ROADS_MAJOR;
			} else if (feature.properties.type === "primary") {
				width = 3;
			} else if (feature.properties.type === "secondary") {
				width = 2;
			}
			
			if (["bus", "sc", "max", "at", "subway"].indexOf(feature.properties.type) !== -1) {
				color = "#f7e4f1";
			}
			
			function getMaterial() {
				const tunnel = feature.properties.tunnel || false;
				const materialKey = width.toString() + color.toString() + tunnel.toString();
				
				let material = materials[materialKey];
				
				if (!material) {
					material = new MeshLineMaterial({
						lineWidth: 0.0001 * width,//size of individual street
						sizeAttenuation: 1,
						opacity: tunnel ? 0.1 : 1,
						depthTest: tunnel ? false : true,
						transparent: tunnel ? true : false,
						color: new THREE.Color(color),
						blending: tunnel ? THREE.AdditiveAlphaBlending : THREE.AdditiveBlending
					});
					
					materials[materialKey] = material;
				}
				
				return material;
			}
			
			const coords = feature.geometry.coordinates;
						
			const lineGeometry = new Float32Array(coords.length * 3);
			
			coords.forEach((point, index) => {	
				lineGeometry[index * 3 + 0] = point[0];
				lineGeometry[index * 3 + 1] = point[1];
				lineGeometry[index * 3 + 2] = 0;
			});

			const line = new MeshLine();
			line.setGeometry(lineGeometry);
			
			const mesh = new THREE.Mesh(line.geometry, getMaterial());
			mesh.renderOrder = self.renderOrder;
			mesh.position.z = self.z_position;
			mesh.matrixAutoUpdate = false;
			
			return mesh;
		});
		
		const plane = new THREE.Object3D();
		
		lines.forEach(line => plane.add(line));
		plane.renderOrder = this.renderOrder;
		console.timeEnd(this.name);
		return plane;
	}
});