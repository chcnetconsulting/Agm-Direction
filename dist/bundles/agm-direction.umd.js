(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('rxjs'), require('rxjs/operators'), require('@angular/common')) :
    typeof define === 'function' && define.amd ? define('agm-direction', ['exports', '@angular/core', 'rxjs', 'rxjs/operators', '@angular/common'], factory) :
    (global = global || self, factory((global.ng = global.ng || {}, global.ng.agmDirection = {}), global.ng.core, global.rxjs, global.rxjs.operators, global.ng.common));
}(this, function (exports, core, rxjs, operators, common) { 'use strict';

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation.

    Permission to use, copy, modify, and/or distribute this software for any
    purpose with or without fee is hereby granted.

    THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
    REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
    AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
    INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
    LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
    OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
    PERFORMANCE OF THIS SOFTWARE.
    ***************************************************************************** */

    function __awaiter(thisArg, _arguments, P, generator) {
        function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
            function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
            function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    }

    class MapsAPILoader {
    }
    MapsAPILoader.decorators = [
        { type: core.Injectable }
    ];

    /**
     * Wrapper class that handles the communication with the Google Maps Javascript
     * API v3
     */
    class GoogleMapsAPIWrapper {
        constructor(_loader, _zone) {
            this._loader = _loader;
            this._zone = _zone;
            this._map =
                new Promise((resolve) => { this._mapResolver = resolve; });
        }
        createMap(el, mapOptions) {
            return this._zone.runOutsideAngular(() => {
                return this._loader.load().then(() => {
                    const map = new google.maps.Map(el, mapOptions);
                    this._mapResolver(map);
                    return;
                });
            });
        }
        setMapOptions(options) {
            return this._zone.runOutsideAngular(() => {
                this._map.then((m) => { m.setOptions(options); });
            });
        }
        /**
         * Creates a google map marker with the map context
         */
        createMarker(options = {}, addToMap = true) {
            return this._zone.runOutsideAngular(() => {
                return this._map.then((map) => {
                    if (addToMap) {
                        options.map = map;
                    }
                    return new google.maps.Marker(options);
                });
            });
        }
        createInfoWindow(options) {
            return this._zone.runOutsideAngular(() => {
                return this._map.then(() => new google.maps.InfoWindow(options));
            });
        }
        /**
         * Creates a google.map.Circle for the current map.
         */
        createCircle(options) {
            return this._zone.runOutsideAngular(() => {
                return this._map.then((map) => {
                    options.map = map;
                    return new google.maps.Circle(options);
                });
            });
        }
        /**
         * Creates a google.map.Rectangle for the current map.
         */
        createRectangle(options) {
            return this._zone.runOutsideAngular(() => {
                return this._map.then((map) => {
                    options.map = map;
                    return new google.maps.Rectangle(options);
                });
            });
        }
        createPolyline(options) {
            return this._zone.runOutsideAngular(() => {
                return this.getNativeMap().then((map) => {
                    const line = new google.maps.Polyline(options);
                    line.setMap(map);
                    return line;
                });
            });
        }
        createPolygon(options) {
            return this._zone.runOutsideAngular(() => {
                return this.getNativeMap().then((map) => {
                    const polygon = new google.maps.Polygon(options);
                    polygon.setMap(map);
                    return polygon;
                });
            });
        }
        /**
         * Creates a new google.map.Data layer for the current map
         */
        createDataLayer(options) {
            return this._zone.runOutsideAngular(() => {
                return this._map.then(m => {
                    const data = new google.maps.Data(options);
                    data.setMap(m);
                    return data;
                });
            });
        }
        /**
         * Creates a TransitLayer instance for a map
         * @returns a new transit layer object
         */
        createTransitLayer() {
            return this._zone.runOutsideAngular(() => {
                return this._map.then((map) => {
                    const newLayer = new google.maps.TransitLayer();
                    newLayer.setMap(map);
                    return newLayer;
                });
            });
        }
        /**
         * Creates a BicyclingLayer instance for a map
         * @returns a new bicycling layer object
         */
        createBicyclingLayer() {
            return this._zone.runOutsideAngular(() => {
                return this._map.then((map) => {
                    const newLayer = new google.maps.BicyclingLayer();
                    newLayer.setMap(map);
                    return newLayer;
                });
            });
        }
        /**
         * Determines if given coordinates are insite a Polygon path.
         */
        containsLocation(latLng, polygon) {
            return this._map.then(() => google.maps.geometry.poly.containsLocation(latLng, polygon));
        }
        subscribeToMapEvent(eventName) {
            return new rxjs.Observable((observer) => {
                this._map.then(m => m.addListener(eventName, () => this._zone.run(() => observer.next(arguments[0]))));
            });
        }
        clearInstanceListeners() {
            return this._zone.runOutsideAngular(() => {
                this._map.then((map) => {
                    google.maps.event.clearInstanceListeners(map);
                });
            });
        }
        setCenter(latLng) {
            return this._zone.runOutsideAngular(() => {
                return this._map.then((map) => map.setCenter(latLng));
            });
        }
        getZoom() {
            return this._zone.runOutsideAngular(() => {
                return this._map.then((map) => map.getZoom());
            });
        }
        getBounds() {
            return this._zone.runOutsideAngular(() => {
                return this._map.then((map) => map.getBounds());
            });
        }
        getMapTypeId() {
            return this._zone.runOutsideAngular(() => {
                return this._map.then((map) => map.getMapTypeId());
            });
        }
        setZoom(zoom) {
            return this._zone.runOutsideAngular(() => {
                return this._map.then((map) => map.setZoom(zoom));
            });
        }
        getCenter() {
            return this._zone.runOutsideAngular(() => {
                return this._map.then((map) => map.getCenter());
            });
        }
        panTo(latLng) {
            return this._zone.runOutsideAngular(() => {
                return this._map.then((map) => map.panTo(latLng));
            });
        }
        panBy(x, y) {
            return this._zone.runOutsideAngular(() => {
                return this._map.then((map) => map.panBy(x, y));
            });
        }
        fitBounds(latLng, padding) {
            return this._zone.runOutsideAngular(() => {
                return this._map.then((map) => map.fitBounds(latLng, padding));
            });
        }
        panToBounds(latLng, padding) {
            return this._zone.runOutsideAngular(() => {
                return this._map.then((map) => map.panToBounds(latLng, padding));
            });
        }
        /**
         * Returns the native Google Maps Map instance. Be careful when using this instance directly.
         */
        getNativeMap() { return this._map; }
        /**
         * Triggers the given event name on the map instance.
         */
        triggerMapEvent(eventName) {
            return this._map.then((m) => google.maps.event.trigger(m, eventName));
        }
    }
    GoogleMapsAPIWrapper.decorators = [
        { type: core.Injectable }
    ];
    GoogleMapsAPIWrapper.ctorParameters = () => [
        { type: MapsAPILoader },
        { type: core.NgZone }
    ];

    /**
     * Class to implement when you what to be able to make it work with the auto fit bounds feature
     * of AGM.
     */
    class FitBoundsAccessor {
    }

    class AgmGeocoder {
        constructor(loader) {
            const connectableGeocoder$ = new rxjs.Observable(subscriber => {
                loader.load().then(() => subscriber.next());
            })
                .pipe(operators.map(() => this._createGeocoder()), operators.multicast(new rxjs.ReplaySubject(1)));
            connectableGeocoder$.connect(); // ignore the subscription
            // since we will remain subscribed till application exits
            this.geocoder$ = connectableGeocoder$;
        }
        geocode(request) {
            return this.geocoder$.pipe(operators.switchMap((geocoder) => this._getGoogleResults(geocoder, request)));
        }
        _getGoogleResults(geocoder, request) {
            const geocodeObservable = rxjs.bindCallback(geocoder.geocode);
            return geocodeObservable(request).pipe(operators.switchMap(([results, status]) => {
                if (status === google.maps.GeocoderStatus.OK) {
                    return rxjs.of(results);
                }
                return rxjs.throwError(status);
            }));
        }
        _createGeocoder() {
            return new google.maps.Geocoder();
        }
    }
    AgmGeocoder.ɵprov = core.ɵɵdefineInjectable({ factory: function AgmGeocoder_Factory() { return new AgmGeocoder(core.ɵɵinject(MapsAPILoader)); }, token: AgmGeocoder, providedIn: "root" });
    AgmGeocoder.decorators = [
        { type: core.Injectable, args: [{ providedIn: 'root' },] }
    ];
    AgmGeocoder.ctorParameters = () => [
        { type: MapsAPILoader }
    ];

    var GoogleMapsScriptProtocol;
    (function (GoogleMapsScriptProtocol) {
        GoogleMapsScriptProtocol[GoogleMapsScriptProtocol["HTTP"] = 1] = "HTTP";
        GoogleMapsScriptProtocol[GoogleMapsScriptProtocol["HTTPS"] = 2] = "HTTPS";
        GoogleMapsScriptProtocol[GoogleMapsScriptProtocol["AUTO"] = 3] = "AUTO";
    })(GoogleMapsScriptProtocol || (GoogleMapsScriptProtocol = {}));
    /**
     * Token for the config of the LazyMapsAPILoader. Please provide an object of type {@link
     * LazyMapsAPILoaderConfig}.
     */
    const LAZY_MAPS_API_CONFIG = new core.InjectionToken('angular-google-maps LAZY_MAPS_API_CONFIG');

    class MarkerManager {
        constructor(_mapsWrapper, _zone) {
            this._mapsWrapper = _mapsWrapper;
            this._zone = _zone;
            this._markers = new Map();
        }
        convertAnimation(uiAnim) {
            return __awaiter(this, void 0, void 0, function* () {
                if (uiAnim === null) {
                    return null;
                }
                else {
                    return this._mapsWrapper.getNativeMap().then(() => google.maps.Animation[uiAnim]);
                }
            });
        }
        deleteMarker(markerDirective) {
            const markerPromise = this._markers.get(markerDirective);
            if (markerPromise == null) {
                // marker already deleted
                return Promise.resolve();
            }
            return markerPromise.then((marker) => {
                return this._zone.run(() => {
                    marker.setMap(null);
                    this._markers.delete(markerDirective);
                });
            });
        }
        updateMarkerPosition(marker) {
            return this._markers.get(marker).then((m) => m.setPosition({ lat: marker.latitude, lng: marker.longitude }));
        }
        updateTitle(marker) {
            return this._markers.get(marker).then((m) => m.setTitle(marker.title));
        }
        updateLabel(marker) {
            return this._markers.get(marker).then((m) => { m.setLabel(marker.label); });
        }
        updateDraggable(marker) {
            return this._markers.get(marker).then((m) => m.setDraggable(marker.draggable));
        }
        updateIcon(marker) {
            return this._markers.get(marker).then((m) => m.setIcon(marker.iconUrl));
        }
        updateOpacity(marker) {
            return this._markers.get(marker).then((m) => m.setOpacity(marker.opacity));
        }
        updateVisible(marker) {
            return this._markers.get(marker).then((m) => m.setVisible(marker.visible));
        }
        updateZIndex(marker) {
            return this._markers.get(marker).then((m) => m.setZIndex(marker.zIndex));
        }
        updateClickable(marker) {
            return this._markers.get(marker).then((m) => m.setClickable(marker.clickable));
        }
        updateAnimation(marker) {
            return __awaiter(this, void 0, void 0, function* () {
                const m = yield this._markers.get(marker);
                m.setAnimation(yield this.convertAnimation(marker.animation));
            });
        }
        addMarker(marker) {
            const markerPromise = new Promise((resolve) => __awaiter(this, void 0, void 0, function* () {
                return this._mapsWrapper.createMarker({
                    position: { lat: marker.latitude, lng: marker.longitude },
                    label: marker.label,
                    draggable: marker.draggable,
                    icon: marker.iconUrl,
                    opacity: marker.opacity,
                    visible: marker.visible,
                    zIndex: marker.zIndex,
                    title: marker.title,
                    clickable: marker.clickable,
                    animation: yield this.convertAnimation(marker.animation),
                }).then(resolve);
            }));
            this._markers.set(marker, markerPromise);
        }
        getNativeMarker(marker) {
            return this._markers.get(marker);
        }
        createEventObservable(eventName, marker) {
            return new rxjs.Observable(observer => {
                this._markers.get(marker).then(m => m.addListener(eventName, e => this._zone.run(() => observer.next(e))));
            });
        }
    }
    MarkerManager.decorators = [
        { type: core.Injectable }
    ];
    MarkerManager.ctorParameters = () => [
        { type: GoogleMapsAPIWrapper },
        { type: core.NgZone }
    ];

    class InfoWindowManager {
        constructor(_mapsWrapper, _zone, _markerManager) {
            this._mapsWrapper = _mapsWrapper;
            this._zone = _zone;
            this._markerManager = _markerManager;
            this._infoWindows = new Map();
        }
        deleteInfoWindow(infoWindow) {
            const iWindow = this._infoWindows.get(infoWindow);
            if (iWindow == null) {
                // info window already deleted
                return Promise.resolve();
            }
            return iWindow.then((i) => {
                return this._zone.run(() => {
                    i.close();
                    this._infoWindows.delete(infoWindow);
                });
            });
        }
        setPosition(infoWindow) {
            return this._infoWindows.get(infoWindow).then((i) => i.setPosition({
                lat: infoWindow.latitude,
                lng: infoWindow.longitude,
            }));
        }
        setZIndex(infoWindow) {
            return this._infoWindows.get(infoWindow)
                .then((i) => i.setZIndex(infoWindow.zIndex));
        }
        open(infoWindow) {
            return this._infoWindows.get(infoWindow).then((w) => {
                if (infoWindow.hostMarker != null) {
                    return this._markerManager.getNativeMarker(infoWindow.hostMarker).then((marker) => {
                        return this._mapsWrapper.getNativeMap().then((map) => w.open(map, marker));
                    });
                }
                return this._mapsWrapper.getNativeMap().then((map) => w.open(map));
            });
        }
        close(infoWindow) {
            return this._infoWindows.get(infoWindow).then((w) => w.close());
        }
        setOptions(infoWindow, options) {
            return this._infoWindows.get(infoWindow).then((i) => i.setOptions(options));
        }
        addInfoWindow(infoWindow) {
            const options = {
                content: infoWindow.content,
                maxWidth: infoWindow.maxWidth,
                zIndex: infoWindow.zIndex,
                disableAutoPan: infoWindow.disableAutoPan,
            };
            if (typeof infoWindow.latitude === 'number' && typeof infoWindow.longitude === 'number') {
                options.position = { lat: infoWindow.latitude, lng: infoWindow.longitude };
            }
            const infoWindowPromise = this._mapsWrapper.createInfoWindow(options);
            this._infoWindows.set(infoWindow, infoWindowPromise);
        }
        /**
         * Creates a Google Maps event listener for the given InfoWindow as an Observable
         */
        createEventObservable(eventName, infoWindow) {
            return new rxjs.Observable((observer) => {
                this._infoWindows.get(infoWindow).then((i) => {
                    i.addListener(eventName, (e) => this._zone.run(() => observer.next(e)));
                });
            });
        }
    }
    InfoWindowManager.decorators = [
        { type: core.Injectable }
    ];
    InfoWindowManager.ctorParameters = () => [
        { type: GoogleMapsAPIWrapper },
        { type: core.NgZone },
        { type: MarkerManager }
    ];

    let infoWindowId = 0;
    /**
     * AgmInfoWindow renders a info window inside a {@link AgmMarker} or standalone.
     *
     * ### Example
     * ```typescript
     * import { Component } from '@angular/core';
     *
     * @Component({
     *  selector: 'my-map-cmp',
     *  styles: [`
     *    .agm-map-container {
     *      height: 300px;
     *    }
     * `],
     *  template: `
     *    <agm-map [latitude]="lat" [longitude]="lng" [zoom]="zoom">
     *      <agm-marker [latitude]="lat" [longitude]="lng" [label]="'M'">
     *        <agm-info-window [disableAutoPan]="true">
     *          Hi, this is the content of the <strong>info window</strong>
     *        </agm-info-window>
     *      </agm-marker>
     *    </agm-map>
     *  `
     * })
     * ```
     */
    class AgmInfoWindow {
        constructor(_infoWindowManager, _el) {
            this._infoWindowManager = _infoWindowManager;
            this._el = _el;
            /**
             * Sets the open state for the InfoWindow. You can also call the open() and close() methods.
             */
            this.isOpen = false;
            /**
             * Emits an event when the info window is closed.
             */
            this.infoWindowClose = new core.EventEmitter();
            this._infoWindowAddedToManager = false;
            this._id = (infoWindowId++).toString();
        }
        ngOnInit() {
            this.content = this._el.nativeElement.querySelector('.agm-info-window-content');
            this._infoWindowManager.addInfoWindow(this);
            this._infoWindowAddedToManager = true;
            this._updateOpenState();
            this._registerEventListeners();
        }
        /** @internal */
        ngOnChanges(changes) {
            if (!this._infoWindowAddedToManager) {
                return;
            }
            // tslint:disable: no-string-literal
            if ((changes['latitude'] || changes['longitude']) && typeof this.latitude === 'number' &&
                typeof this.longitude === 'number') {
                this._infoWindowManager.setPosition(this);
            }
            if (changes['zIndex']) {
                this._infoWindowManager.setZIndex(this);
            }
            if (changes['isOpen']) {
                this._updateOpenState();
            }
            this._setInfoWindowOptions(changes);
        }
        // tslint:enable: no-string-literal
        _registerEventListeners() {
            this._infoWindowManager.createEventObservable('closeclick', this).subscribe(() => {
                this.isOpen = false;
                this.infoWindowClose.emit();
            });
        }
        _updateOpenState() {
            this.isOpen ? this.open() : this.close();
        }
        _setInfoWindowOptions(changes) {
            const options = {};
            const optionKeys = Object.keys(changes).filter(k => AgmInfoWindow._infoWindowOptionsInputs.indexOf(k) !== -1);
            optionKeys.forEach((k) => { options[k] = changes[k].currentValue; });
            this._infoWindowManager.setOptions(this, options);
        }
        /**
         * Opens the info window.
         */
        open() { return this._infoWindowManager.open(this); }
        /**
         * Closes the info window.
         */
        close() {
            return this._infoWindowManager.close(this).then(() => { this.infoWindowClose.emit(); });
        }
        /** @internal */
        id() { return this._id; }
        /** @internal */
        toString() { return 'AgmInfoWindow-' + this._id.toString(); }
        /** @internal */
        ngOnDestroy() { this._infoWindowManager.deleteInfoWindow(this); }
    }
    AgmInfoWindow._infoWindowOptionsInputs = ['disableAutoPan', 'maxWidth'];
    AgmInfoWindow.decorators = [
        { type: core.Component, args: [{
                    selector: 'agm-info-window',
                    template: `<div class='agm-info-window-content'>
      <ng-content></ng-content>
    </div>
  `
                },] }
    ];
    AgmInfoWindow.ctorParameters = () => [
        { type: InfoWindowManager },
        { type: core.ElementRef }
    ];
    AgmInfoWindow.propDecorators = {
        latitude: [{ type: core.Input }],
        longitude: [{ type: core.Input }],
        disableAutoPan: [{ type: core.Input }],
        zIndex: [{ type: core.Input }],
        maxWidth: [{ type: core.Input }],
        isOpen: [{ type: core.Input }],
        infoWindowClose: [{ type: core.Output }]
    };

    let markerId = 0;
    /**
     * AgmMarker renders a map marker inside a {@link AgmMap}.
     *
     * ### Example
     * ```typescript
     * import { Component } from '@angular/core';
     *
     * @Component({
     *  selector: 'my-map-cmp',
     *  styles: [`
     *    .agm-map-container {
     *      height: 300px;
     *    }
     * `],
     *  template: `
     *    <agm-map [latitude]="lat" [longitude]="lng" [zoom]="zoom">
     *      <agm-marker [latitude]="lat" [longitude]="lng" [label]="'M'">
     *      </agm-marker>
     *    </agm-map>
     *  `
     * })
     * ```
     */
    class AgmMarker {
        constructor(_markerManager) {
            this._markerManager = _markerManager;
            /**
             * If true, the marker can be dragged. Default value is false.
             */
            // tslint:disable-next-line:no-input-rename
            this.draggable = false;
            /**
             * If true, the marker is visible
             */
            this.visible = true;
            /**
             * Whether to automatically open the child info window when the marker is clicked.
             */
            this.openInfoWindow = true;
            /**
             * The marker's opacity between 0.0 and 1.0.
             */
            this.opacity = 1;
            /**
             * All markers are displayed on the map in order of their zIndex, with higher values displaying in
             * front of markers with lower values. By default, markers are displayed according to their
             * vertical position on screen, with lower markers appearing in front of markers further up the
             * screen.
             */
            this.zIndex = 1;
            /**
             * If true, the marker can be clicked. Default value is true.
             */
            // tslint:disable-next-line:no-input-rename
            this.clickable = true;
            /**
             * This event is fired when the marker's animation property changes.
             */
            this.animationChange = new core.EventEmitter();
            /**
             * This event emitter gets emitted when the user clicks on the marker.
             */
            this.markerClick = new core.EventEmitter();
            /**
             * This event emitter gets emitted when the user clicks twice on the marker.
             */
            this.markerDblClick = new core.EventEmitter();
            /**
             * This event is fired when the user rightclicks on the marker.
             */
            this.markerRightClick = new core.EventEmitter();
            /**
             * This event is fired when the user starts dragging the marker.
             */
            this.dragStart = new core.EventEmitter();
            /**
             * This event is repeatedly fired while the user drags the marker.
             */
            // tslint:disable-next-line: no-output-native
            this.drag = new core.EventEmitter();
            /**
             * This event is fired when the user stops dragging the marker.
             */
            this.dragEnd = new core.EventEmitter();
            /**
             * This event is fired when the user mouses over the marker.
             */
            this.mouseOver = new core.EventEmitter();
            /**
             * This event is fired when the user mouses outside the marker.
             */
            this.mouseOut = new core.EventEmitter();
            /** @internal */
            this.infoWindow = new core.QueryList();
            this._markerAddedToManger = false;
            this._observableSubscriptions = [];
            this._fitBoundsDetails$ = new rxjs.ReplaySubject(1);
            this._id = (markerId++).toString();
        }
        /* @internal */
        ngAfterContentInit() {
            this.handleInfoWindowUpdate();
            this.infoWindow.changes.subscribe(() => this.handleInfoWindowUpdate());
        }
        handleInfoWindowUpdate() {
            if (this.infoWindow.length > 1) {
                throw new Error('Expected no more than one info window.');
            }
            this.infoWindow.forEach(marker => {
                marker.hostMarker = this;
            });
        }
        /** @internal */
        ngOnChanges(changes) {
            if (typeof this.latitude === 'string') {
                this.latitude = Number(this.latitude);
            }
            if (typeof this.longitude === 'string') {
                this.longitude = Number(this.longitude);
            }
            if (typeof this.latitude !== 'number' || typeof this.longitude !== 'number') {
                return;
            }
            if (!this._markerAddedToManger) {
                this._markerManager.addMarker(this);
                this._updateFitBoundsDetails();
                this._markerAddedToManger = true;
                this._addEventListeners();
                return;
            }
            // tslint:disable: no-string-literal
            if (changes['latitude'] || changes['longitude']) {
                this._markerManager.updateMarkerPosition(this);
                this._updateFitBoundsDetails();
            }
            if (changes['title']) {
                this._markerManager.updateTitle(this);
            }
            if (changes['label']) {
                this._markerManager.updateLabel(this);
            }
            if (changes['draggable']) {
                this._markerManager.updateDraggable(this);
            }
            if (changes['iconUrl']) {
                this._markerManager.updateIcon(this);
            }
            if (changes['opacity']) {
                this._markerManager.updateOpacity(this);
            }
            if (changes['visible']) {
                this._markerManager.updateVisible(this);
            }
            if (changes['zIndex']) {
                this._markerManager.updateZIndex(this);
            }
            if (changes['clickable']) {
                this._markerManager.updateClickable(this);
            }
            if (changes['animation']) {
                this._markerManager.updateAnimation(this);
            }
            // tslint:enable: no-string-literal
        }
        /** @internal */
        getFitBoundsDetails$() {
            return this._fitBoundsDetails$.asObservable();
        }
        _updateFitBoundsDetails() {
            this._fitBoundsDetails$.next({ latLng: { lat: this.latitude, lng: this.longitude } });
        }
        _addEventListeners() {
            const cs = this._markerManager.createEventObservable('click', this).subscribe(() => {
                if (this.openInfoWindow) {
                    this.infoWindow.forEach(infoWindow => infoWindow.open());
                }
                this.markerClick.emit(this);
            });
            this._observableSubscriptions.push(cs);
            const dcs = this._markerManager.createEventObservable('dblclick', this).subscribe(() => {
                this.markerDblClick.emit(null);
            });
            this._observableSubscriptions.push(dcs);
            const rc = this._markerManager.createEventObservable('rightclick', this).subscribe(() => {
                this.markerRightClick.emit(null);
            });
            this._observableSubscriptions.push(rc);
            const ds = this._markerManager.createEventObservable('dragstart', this)
                .subscribe(e => this.dragStart.emit(e));
            this._observableSubscriptions.push(ds);
            const d = this._markerManager.createEventObservable('drag', this)
                .subscribe(e => this.drag.emit(e));
            this._observableSubscriptions.push(d);
            const de = this._markerManager.createEventObservable('dragend', this)
                .subscribe(e => this.dragEnd.emit(e));
            this._observableSubscriptions.push(de);
            const mover = this._markerManager.createEventObservable('mouseover', this)
                .subscribe(e => this.mouseOver.emit(e));
            this._observableSubscriptions.push(mover);
            const mout = this._markerManager.createEventObservable('mouseout', this)
                .subscribe(e => this.mouseOut.emit(e));
            this._observableSubscriptions.push(mout);
            const anChng = this._markerManager.createEventObservable('animation_changed', this)
                .subscribe(() => {
                this.animationChange.emit(this.animation);
            });
            this._observableSubscriptions.push(anChng);
        }
        /** @internal */
        id() { return this._id; }
        /** @internal */
        toString() { return 'AgmMarker-' + this._id.toString(); }
        /** @internal */
        ngOnDestroy() {
            this._markerManager.deleteMarker(this);
            // unsubscribe all registered observable subscriptions
            this._observableSubscriptions.forEach((s) => s.unsubscribe());
        }
    }
    AgmMarker.decorators = [
        { type: core.Directive, args: [{
                    selector: 'agm-marker',
                    providers: [
                        { provide: FitBoundsAccessor, useExisting: core.forwardRef(() => AgmMarker) },
                    ],
                },] }
    ];
    AgmMarker.ctorParameters = () => [
        { type: MarkerManager }
    ];
    AgmMarker.propDecorators = {
        latitude: [{ type: core.Input }],
        longitude: [{ type: core.Input }],
        title: [{ type: core.Input }],
        label: [{ type: core.Input }],
        draggable: [{ type: core.Input, args: ['markerDraggable',] }],
        iconUrl: [{ type: core.Input }],
        visible: [{ type: core.Input }],
        openInfoWindow: [{ type: core.Input }],
        opacity: [{ type: core.Input }],
        zIndex: [{ type: core.Input }],
        clickable: [{ type: core.Input, args: ['markerClickable',] }],
        animation: [{ type: core.Input }],
        animationChange: [{ type: core.Output }],
        markerClick: [{ type: core.Output }],
        markerDblClick: [{ type: core.Output }],
        markerRightClick: [{ type: core.Output }],
        dragStart: [{ type: core.Output }],
        drag: [{ type: core.Output }],
        dragEnd: [{ type: core.Output }],
        mouseOver: [{ type: core.Output }],
        mouseOut: [{ type: core.Output }],
        infoWindow: [{ type: core.ContentChildren, args: [AgmInfoWindow,] }]
    };

    /**
     * AgmPolylinePoint represents one element of a polyline within a  {@link
     * AgmPolyline}
     */
    class AgmPolylinePoint {
        constructor() {
            /**
             * This event emitter gets emitted when the position of the point changed.
             */
            this.positionChanged = new core.EventEmitter();
        }
        ngOnChanges(changes) {
            // tslint:disable: no-string-literal
            if (changes['latitude'] || changes['longitude']) {
                this.positionChanged.emit({
                    lat: changes['latitude'] ? changes['latitude'].currentValue : this.latitude,
                    lng: changes['longitude'] ? changes['longitude'].currentValue : this.longitude,
                });
            }
            // tslint:enable: no-string-literal
        }
        /** @internal */
        getFitBoundsDetails$() {
            return this.positionChanged.pipe(operators.startWith({ lat: this.latitude, lng: this.longitude }), operators.map(position => ({ latLng: position })));
        }
    }
    AgmPolylinePoint.decorators = [
        { type: core.Directive, args: [{
                    selector: 'agm-polyline-point',
                    providers: [
                        { provide: FitBoundsAccessor, useExisting: core.forwardRef(() => AgmPolylinePoint) },
                    ],
                },] }
    ];
    AgmPolylinePoint.ctorParameters = () => [];
    AgmPolylinePoint.propDecorators = {
        latitude: [{ type: core.Input }],
        longitude: [{ type: core.Input }],
        positionChanged: [{ type: core.Output }]
    };

    /**
     * @license agm-direction
     * MIT license
     */

    var AgmDirection = /** @class */ (function () {
        function AgmDirection(gmapsApi) {
            this.gmapsApi = gmapsApi;
            this.waypoints = [];
            this.optimizeWaypoints = true;
            this.provideRouteAlternatives = false;
            this.avoidHighways = false;
            this.avoidTolls = false;
            this.markerOptions = { origin: {}, destination: {}, waypoints: {} };
            // Remove or draw direction
            this.visible = true;
            // Direction change event handler
            this.onChange = new core.EventEmitter();
            // Direction response for the new request
            this.onResponse = new core.EventEmitter();
            // Send a custom infowindow
            this.sendInfoWindow = new core.EventEmitter();
            // Status of Directions Query (google.maps.DirectionsStatus.OVER_QUERY_LIMIT)
            this.status = new core.EventEmitter();
            // Marker drag event handler
            this.originDrag = new core.EventEmitter();
            this.destinationDrag = new core.EventEmitter();
            this.waypointsMarker = [];
            // Use for visible flag
            this.isFirstChange = true;
        }
        AgmDirection.prototype.ngOnInit = function () {
            if (this.visible === true) {
                this.directionDraw();
            }
        };
        AgmDirection.prototype.ngOnChanges = function (obj) {
            /**
             * When visible is false then remove the direction layer
             */
            if (!this.visible) {
                try {
                    this.removeMarkers();
                    this.removeDirections();
                }
                catch (e) { }
            }
            else {
                if (this.isFirstChange) {
                    /**
                     * When visible is false at the first time
                     */
                    if (typeof this.directionsRenderer === 'undefined') {
                        this.directionDraw();
                    }
                    this.isFirstChange = false;
                    return;
                }
                /**
                 * When renderOptions are not first change then reset the display
                 */
                if (typeof obj.renderOptions !== 'undefined') {
                    if (obj.renderOptions.firstChange === false) {
                        this.removeMarkers();
                        this.removeDirections();
                    }
                }
                this.directionDraw();
            }
        };
        AgmDirection.prototype.ngOnDestroy = function () {
            this.destroyMarkers();
            this.removeDirections();
        };
        /**
         * This event is fired when the user creating or updating this direction
         */
        AgmDirection.prototype.directionDraw = function () {
            var _this = this;
            this.gmapsApi.getNativeMap().then(function (_map) {
                var map = _map;
                if (typeof _this.directionsRenderer === 'undefined') {
                    _this.directionsRenderer = new google.maps.DirectionsRenderer(_this.renderOptions);
                    // @ts-ignore
                    _this.directionsRenderer.setMap(map);
                    _this.directionsRenderer.addListener('directions_changed', function () {
                        _this.onChange.emit(_this.directionsRenderer.getDirections());
                    });
                }
                if (typeof _this.directionsService === 'undefined') {
                    _this.directionsService = new google.maps.DirectionsService();
                }
                if (typeof _this.panel === 'undefined') {
                    // @ts-ignore
                    _this.directionsRenderer.setPanel(null);
                }
                else {
                    _this.directionsRenderer.setPanel(_this.panel);
                }
                // Render exist direction
                if (_this.renderRoute) {
                    _this.directionsRenderer.setDirections(_this.renderRoute);
                    _this.renderRoute = undefined;
                }
                else {
                    // Request new direction
                    _this.directionsService.route({
                        origin: _this.origin,
                        destination: _this.destination,
                        travelMode: _this.travelMode || google.maps.TravelMode.DRIVING,
                        transitOptions: _this.transitOptions,
                        drivingOptions: _this.drivingOptions,
                        waypoints: _this.waypoints,
                        optimizeWaypoints: _this.optimizeWaypoints,
                        provideRouteAlternatives: _this.provideRouteAlternatives,
                        avoidHighways: _this.avoidHighways,
                        avoidTolls: _this.avoidTolls,
                    }, function (response, status) {
                        _this.onResponse.emit(response);
                        // Emit Query Status
                        _this.status.emit(status);
                        /**
                         * DirectionsStatus
                         * https://developers.google.com/maps/documentation/javascript/directions#DirectionsStatus
                         */
                        switch (status) {
                            case google.maps.DirectionsStatus.OK:
                                _this.directionsRenderer.setDirections(response);
                                /**
                                 * Emit The DirectionsResult Object
                                 * https://developers.google.com/maps/documentation/javascript/directions?hl=en#DirectionsResults
                                 */
                                // Custom Markers
                                if (typeof _this.markerOptions !== 'undefined') {
                                    _this.destroyMarkers();
                                    // Set custom markers
                                    var _route_1 = response.routes[0].legs[0];
                                    try {
                                        // Origin Marker
                                        if (typeof _this.markerOptions.origin !== 'undefined') {
                                            _this.markerOptions.origin.map = map;
                                            _this.markerOptions.origin.position = _route_1.start_location;
                                            _this.originMarker = _this.setMarker(map, _this.originMarker, _this.markerOptions.origin, _route_1.start_address);
                                            if (_this.markerOptions.origin.draggable) {
                                                _this.originMarker.addListener('dragend', function () {
                                                    _this.origin = _this.originMarker.position;
                                                    _this.directionDraw();
                                                    _this.originDrag.emit(_this.origin);
                                                });
                                            }
                                        }
                                        // Destination Marker
                                        if (typeof _this.markerOptions.destination !== 'undefined') {
                                            _this.markerOptions.destination.map = map;
                                            _this.markerOptions.destination.position = _route_1.end_location;
                                            _this.destinationMarker = _this.setMarker(map, _this.destinationMarker, _this.markerOptions.destination, _route_1.end_address);
                                            if (_this.markerOptions.destination.draggable) {
                                                _this.destinationMarker.addListener('dragend', function () {
                                                    _this.destination = _this.destinationMarker.position;
                                                    _this.directionDraw();
                                                    _this.destinationDrag.emit(_this.destination);
                                                });
                                            }
                                        }
                                        // Waypoints Marker
                                        if (typeof _this.markerOptions.waypoints !== 'undefined') {
                                            _this.waypoints.forEach(function (waypoint, index) {
                                                // If waypoints are not array then set all the same
                                                if (!Array.isArray(_this.markerOptions.waypoints)) {
                                                    _this.markerOptions.waypoints.map = map;
                                                    _this.markerOptions.waypoints.position = _route_1.via_waypoints[index];
                                                    _this.waypointsMarker.push(_this.setMarker(map, waypoint, _this.markerOptions.waypoints, _route_1.via_waypoints[index]));
                                                }
                                                else {
                                                    _this.markerOptions.waypoints[index].map = map;
                                                    _this.markerOptions.waypoints[index].position = _route_1.via_waypoints[index];
                                                    _this.waypointsMarker.push(_this.setMarker(map, waypoint, _this.markerOptions.waypoints[index], _route_1.via_waypoints[index]));
                                                }
                                            }); // End forEach
                                        }
                                    }
                                    catch (err) {
                                        console.error('MarkerOptions error.', err);
                                    }
                                }
                                break;
                            case google.maps.DirectionsStatus.OVER_QUERY_LIMIT:
                                console.warn('The webpage has sent too many requests within the allowed time period.');
                                break;
                            default:
                                // console.warn(status);
                                break;
                        } // End switch
                    });
                }
            });
        };
        /**
         * Custom Origin and Destination Icon
         * @param map map
         * @param marker marker
         * @param markerOpts properties
         * @param content marker's infowindow content
         * @returns new marker
         * @memberof AgmDirection
         */
        AgmDirection.prototype.setMarker = function (map, marker, markerOpts, content) {
            var _this = this;
            if (typeof this.infoWindow === 'undefined') {
                this.infoWindow = new google.maps.InfoWindow();
                this.sendInfoWindow.emit(this.infoWindow);
            }
            marker = new google.maps.Marker(markerOpts);
            // https://developers.google.com/maps/documentation/javascript/reference/marker?hl=zh-tw#MarkerOptions.clickable
            if (marker.getClickable()) {
                marker.addListener('click', function () {
                    var infowindoContent = typeof markerOpts.infoWindow === 'undefined' ? content : markerOpts.infoWindow;
                    _this.infoWindow.setContent(infowindoContent);
                    _this.infoWindow.open(map, marker);
                });
            }
            return marker;
        };
        /**
         * This event is fired when remove markers
         */
        AgmDirection.prototype.removeMarkers = function () {
            if (typeof this.originMarker !== 'undefined') {
                this.originMarker.setMap(null);
            }
            if (typeof this.destinationMarker !== 'undefined') {
                this.destinationMarker.setMap(null);
            }
            this.waypointsMarker.forEach(function (w) {
                if (typeof w !== 'undefined') {
                    w.setMap(null);
                }
            });
        };
        /**
         * This event is fired when remove directions
         */
        AgmDirection.prototype.removeDirections = function () {
            if (this.directionsRenderer !== undefined) {
                // @ts-ignore
                this.directionsRenderer.setPanel(null);
                this.directionsRenderer.setMap(null);
                // @ts-ignore
                this.directionsRenderer = undefined;
            }
        };
        /**
         * This event is fired when destroy markers
         */
        AgmDirection.prototype.destroyMarkers = function () {
            // Remove origin markers
            try {
                if (typeof this.originMarker !== 'undefined') {
                    google.maps.event.clearListeners(this.originMarker, 'click');
                    if (this.markerOptions.origin.draggable) {
                        google.maps.event.clearListeners(this.originMarker, 'dragend');
                    }
                }
                if (typeof this.destinationMarker !== 'undefined') {
                    google.maps.event.clearListeners(this.destinationMarker, 'click');
                    if (this.markerOptions.origin.draggable) {
                        google.maps.event.clearListeners(this.destinationMarker, 'dragend');
                    }
                }
                this.waypointsMarker.forEach(function (w) {
                    if (typeof w !== 'undefined') {
                        google.maps.event.clearListeners(w, 'click');
                    }
                });
                this.removeMarkers();
            }
            catch (err) {
                console.error('Can not reset custom marker.', err);
            }
        };
        AgmDirection.decorators = [
            { type: core.Directive, args: [{
                        selector: 'agm-direction',
                    },] }
        ];
        AgmDirection.ctorParameters = function () { return [
            { type: GoogleMapsAPIWrapper }
        ]; };
        AgmDirection.propDecorators = {
            origin: [{ type: core.Input }],
            destination: [{ type: core.Input }],
            travelMode: [{ type: core.Input }],
            transitOptions: [{ type: core.Input }],
            drivingOptions: [{ type: core.Input }],
            waypoints: [{ type: core.Input }],
            optimizeWaypoints: [{ type: core.Input }],
            provideRouteAlternatives: [{ type: core.Input }],
            avoidHighways: [{ type: core.Input }],
            avoidTolls: [{ type: core.Input }],
            renderOptions: [{ type: core.Input }],
            panel: [{ type: core.Input }],
            markerOptions: [{ type: core.Input }],
            infoWindow: [{ type: core.Input }],
            visible: [{ type: core.Input }],
            renderRoute: [{ type: core.Input }],
            onChange: [{ type: core.Output }],
            onResponse: [{ type: core.Output }],
            sendInfoWindow: [{ type: core.Output }],
            status: [{ type: core.Output }],
            originDrag: [{ type: core.Output }],
            destinationDrag: [{ type: core.Output }]
        };
        return AgmDirection;
    }());

    var AgmDirectionModule = /** @class */ (function () {
        function AgmDirectionModule() {
        }
        AgmDirectionModule.forRoot = function () {
            return {
                ngModule: AgmDirectionModule,
            };
        };
        AgmDirectionModule.forChild = function () {
            return {
                ngModule: AgmDirectionModule,
            };
        };
        AgmDirectionModule.decorators = [
            { type: core.NgModule, args: [{
                        declarations: [
                            AgmDirection,
                        ],
                        exports: [
                            AgmDirection,
                        ]
                    },] }
        ];
        return AgmDirectionModule;
    }());

    exports.AgmDirection = AgmDirection;
    exports.AgmDirectionModule = AgmDirectionModule;

    Object.defineProperty(exports, '__esModule', { value: true });

}));
//# sourceMappingURL=agm-direction.umd.js.map
