/**
 * Copyright(c)2013,Wozlla,www.wozlla.com
 * Version: 1.0
 * Author: Peter Zhang
 * Date: 2013-07-15
 * Description: partner
 */
var partnerService = require('../app/services/PartnerService');

exports.index = function(req, res) {
    var partners = [];
    partnerService.getAllPartners(function(data) {
        partners = data;
        console.log(partners);
        res.render('partner', {
            title: 'partner',
            partners: JSON.stringify(partners)
        });
    });
}

exports.update = function(req, res) {
    var id = req.params.id;
    var partner = req.body.partner;
    partner = JSON.parse(partner);
    partnerService.update(partner, function(data) {
        var result = {
            result: 1
        };
        res.send(JSON.stringify(result));
    });
}

exports.export = function(req, res) {
    var partners = [];
    partnerService.export(function(data) {
        partners = data;
        console.log(partners);
        var result = {
            result: 1
        };
        res.send(JSON.stringify(result));
    });
}