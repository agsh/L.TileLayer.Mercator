(function() {
	var Mercator = L.TileLayer.extend({
		options: {
			tilesCRS: L.CRS.EPSG3395
		},
		_getTiledPixelBounds: function (center) {
			var pixelBounds = L.TileLayer.prototype._getTiledPixelBounds.call(this, center);
			var shiftY = this._getShiftY(this._tileZoom);
			pixelBounds.min.y += shiftY;
			pixelBounds.max.y += shiftY;
			return pixelBounds;
		},

		_getTilePos: function (coords) {
			var tilePos = L.TileLayer.prototype._getTilePos.call(this, coords);
			var shiftY = this._getShiftY(this._tileZoom);
			return tilePos.subtract([0, shiftY]);
		},

		_getShiftY: function(zoom) {
			var map = this._map,
				pos = map.getCenter(),
				shift = (map.options.crs.project(pos).y - this.options.tilesCRS.project(pos).y);

			return Math.floor(L.CRS.scale(zoom) * shift / 40075016.685578496);
		}
	});
	L.TileLayer.Mercator = Mercator;
	L.tileLayer.Mercator = function (options) {
		return new Mercator(options);
	};
})();
