"use strict";

const MapFeature = require("../models/map-feature");
const LakeMapFeature = require("../models/map-feature_lake");
//const RoadMapFeature = require("../models/map-feature_road");
const LabelMapFeature = require("../models/map-feature_label");

const consts = require("../consts");

module.exports = {
	to: {
		name: "Toronto",
		text: (
			`"Quietly slipping out of the shadow of Montreal and Vancouver"
			&ndash; The New York Times.
			`
		),
		sources: [
			["Open Street Maps via Mapzen", "https://mapzen.com/data/metro-extracts"],
			["City of Toronto", "http://www1.toronto.ca/wps/portal/contentonly?vgnextoid=1a66e03bb8d1e310VgnVCM10000071d60f89RCRD"],
			["Statistics Canada", "http://www12.statcan.gc.ca/census-recensement/2011/geo/bound-limit/bound-limit-2011-eng.cfm"],
			"Strava",
			"Moves",
			"Foursquare"
		],
		projection: consts.PROJECTION_MTM10,
		bounds: [
			[-81, 42],
			[-78, 45]
		],
		features: [
			new MapFeature({
				geojson_uri: "/data/toronto-border.geojson",
				visible: false
			}),
			new LakeMapFeature({
				name: "Lake Ontario",
				geojson_uri: "/data/lake-ontario-coastline.geojson"
			}),
			/*new LakeMapFeature({
				name: "Lake Simcoe",
				geojson_uri: "/data/lake-simcoe-coastline.geojson"
			}),*/
			new MapFeature({
				name: "Billy Bishop Grounds",
				geojson_uri: "/data/ytz-airport-grounds.geojson",
				color: consts.COLOR_AIRPORT_GROUNDS,
				renderOrder: 0.005
			}),
			new MapFeature({
				name: "Billy Bishop Features",
				geojson_uri: "/data/ytz-airport-features.geojson",
				color: consts.COLOR_AIRPORT_FEATURES,
				renderOrder: 0.01
			}),
			new MapFeature({
				name: "Pearson Grounds",
				geojson_uri: "/data/yyz-airport-grounds.geojson",
				color: consts.COLOR_AIRPORT_GROUNDS,
				renderOrder: 0.005
			}),
			new MapFeature({
				name: "Pearson Features",
				geojson_uri: "/data/yyz-airport-features.geojson",
				color: consts.COLOR_AIRPORT_FEATURES,
				renderOrder: 0.01
			}),
			/*new MapFeature({
				name: "Toronto Parks",
				geojson_uri: "/data/toronto-parks.geojson",
				color: consts.COLOR_PARKS,
				renderOrder: 0.02
			}),*/
			/*new RoadMapFeature({
				name: "TTC Subways",
				geojson_uri: "/data/toronto-subway.geojson",
				renderOrder: 0.025
			}),*/
			/*new RoadMapFeature({
				name: "TTC RT",
				geojson_uri: "/data/toronto-rt.geojson",
				renderOrder: 0.025
			}),*/
			new LabelMapFeature({
				name: "Toronto",
				points: [ [-79.4, 43.7] ],
				z_position: 1000,
				size: consts.LABEL_SIZE_METRO
			}),
			new LabelMapFeature({
				name: "Hamilton",
				points: [ [-79.866091, 43.250021] ],
				z_position: 500,
				size: consts.LABEL_SIZE_MEDIUM
			}),
			new LabelMapFeature({
				name: "Guelph",
				points: [ [-80.248167, 43.544805] ],
				z_position: 500,
				size: consts.LABEL_SIZE_MEDIUM
			}),
			new LabelMapFeature({
				name: "Oakville",
				points: [ [-79.687666, 43.467517] ],
				z_position: 500,
				size: consts.LABEL_SIZE_SMALL
			}),
			new LabelMapFeature({
				name: "Barrie",
				points: [ [-79.690332, 44.389356] ],
				z_position: 500,
				size: consts.LABEL_SIZE_MEDIUM
			}),
			new LabelMapFeature({
				name: "Mississauga",
				points: [ [-79.65, 43.6] ],
				z_position: 500,
				size: consts.LABEL_SIZE_SMALL
			}),
			new LabelMapFeature({
				name: "Oro-Medonte",
				points: [ [-79.523333, 44.5] ],
				z_position: 500,
				size: consts.LABEL_SIZE_SMALL
			}),
			new LabelMapFeature({
				name: "Burlington",
				points: [ [-79.8, 43.316667] ],
				z_position: 500,
				size: consts.LABEL_SIZE_SMALL
			}),
			new LabelMapFeature({
				name: "Vaughan",
				points: [ [-79.5, 43.83333] ],
				z_position: 500,
				size: consts.LABEL_SIZE_SMALL
			}),
			new LabelMapFeature({
				name: "King",
				points: [ [-79.6044, 44.0463] ],
				z_position: 500,
				size: consts.LABEL_SIZE_SMALL
			}),
			new LabelMapFeature({
				name: "Bradford",
				points: [ [-79.633333, 44.13333] ],
				z_position: 500,
				size: consts.LABEL_SIZE_SMALL
			}),
			new LabelMapFeature({
				name: "Innisfil",
				points: [ [-79.583333, 44.3] ],
				z_position: 500,
				size: consts.LABEL_SIZE_SMALL
			}),
			new LabelMapFeature({
				name: "Pickering",
				points: [ [-79.089, 43.8354] ],
				z_position: 500,
				size: consts.LABEL_SIZE_SMALL
			}),
			new LabelMapFeature({
				name: "Newmarket",
				points: [ [-79.466667, 44.05] ],
				z_position: 500,
				size: consts.LABEL_SIZE_SMALL
			}),
			new LabelMapFeature({
				name: "Broke Wrist Here",
				points: [ [-79.545822, 44.112856] ],
				z_position: 20,
				size: consts.LABEL_SIZE_NANO,
				hide_at_z: 6500
			}),
			new LabelMapFeature({
				name: "WayHome",
				points: [ [-79.520159, 44.479942] ],
				z_position: 20,
				size: consts.LABEL_SIZE_NANO,
				hide_at_z: 6500
			}),
			new LabelMapFeature({
				name: "YTZ",
				points: [ [-79.396111, 43.6275] ],
				z_position: 20,
				size: consts.LABEL_SIZE_NANO,
				hide_at_z: 6500
			}),
			new LabelMapFeature({
				name: "YYZ",
				points: [ [-79.630556, 43.676667] ],
				z_position: 20,
				size: consts.LABEL_SIZE_NANO,
				hide_at_z: 6500
			})
		]
	}
};
