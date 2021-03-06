/*
 * Copyright 2016 - 2017 Anton Tananaev (anton@traccar.org)
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program. If not, see <http://www.gnu.org/licenses/>.
 */

Ext.define('Traccar.view.dialog.PointOfInterestController', {
    extend: 'Traccar.view.dialog.BaseEditController',
    alias: 'controller.pointOfInterest',

    requires: [
        'Traccar.view.BaseWindow',
        'Traccar.view.map.GeofenceMap'
    ],
    config: {
            listen: {
                controller: {
                    '*': {
                        mapstate: 'setMapState',
                        savearea: 'saveArea'
                    }
                }
            }
        },

    saveArea: function (value) {
        this.lookupReference('areaField').setValue(value);
    },

    getMapState: function () {
            this.fireEvent('mapstaterequest');
        },

    setMapState: function (lat, lon, zoom) {
            this.lookupReference('latitude').setValue(lat);
            this.lookupReference('longitude').setValue(lon);
            this.lookupReference('zoom').setValue(zoom);
        },
    onPointClick: function (button) {
            var dialog, record;
            dialog = button.up('window').down('form');
            record = dialog.getRecord();
            Ext.create('Traccar.view.BaseWindow', {
                title: Strings.sharedArea,
                items: {
                    xtype: 'geofenceMapView',
                    area: record.get('area')
                }
            }).show();
        }
});
