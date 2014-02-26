/**
 * Copyright(c)2013,Wozlla,www.wozlla.com
 * Version: 1.0
 * Author: Peter Zhang
 * Date: 2013-07-15
 * Description: PartnerService
 */
var partnerDao = require('../dao/PartnerDao')
    , utils = require('../utils/utils');

var PartnerService = function() {

}

PartnerService.prototype.getAllPartners = function(next) {
    partnerDao.getAllPartners(next);
}

PartnerService.prototype.update = function(partner, next) {
    delete partner["heroName"];
    partnerDao.update(partner, next);
}

PartnerService.prototype.export = function(next) {
    this.getAllPartners(function(data) {
        for(var i = 0 ; i < data.length ; i++) {
            data[i]._id = data[i].id;
            data[i].id = data[i].heroId;
        }
        utils.writeJSONFile(data, "partners", next);
    });
}

module.exports = new PartnerService();