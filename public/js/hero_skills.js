/**
 * Copyright(c)2013,Wozlla,www.wozlla.com
 * Version: 1.0
 * Author: Peter Zhang
 * Date: 2013-08-29
 * Description: hero_skills
 */
var isShow = false;
var skills = [];
var skill_levels = [];
var skill_level_index = 0;
var heroId = 1;
var modalType = "";// skills skillLevel
var updateType = "";
var skillId = 0;
var levelId = 1;
$(document).ready(function() {
    $("#createSkill").bind("click", function(e) {
        createSkill();
    });

    $('#myModal').on('hidden', function () {
        modalType = "";
        updateType = "";
        levelId = 1;
    });

    $("#save").bind("click", function(e) {
        if(modalType == "skills") {
            var skillId = $("input[data-name='skillId']").val();
            var name = $("input[data-name='name']").val();
            var description = $("input[data-name='description']").val();
            var type = $("select[data-name='type']").val();
            var scope = $("select[data-name='scope']").val();
            var skilltype = $("select[data-name='skilltype']").val();
            var data = {
                heroId: heroId,
                skillId: skillId,
                name: name,
                description: description,
                type: type,
                scope: scope,
                skilltype: skilltype
            };
            var saveRoute = "";
            if(updateType == "add") {
                saveRoute = '/hero_skills/addSkills';
            } else {
                var id = $("input[data-name='id']").val();
                data.id = id;
                saveRoute = '/hero_skills/updateSkills/' + id;
            }
            console.log(data);
            var that = this;
            $.ajax({
                type: "post",
                url: saveRoute,
                data: {data: data},
                success: function(data, status) {
                    var data = JSON.parse(data);
                    console.log(data);
                    if(data.result == 1) {
                        reset(heroId);
                        utils.alert(that, "保存成功！");
                    } else {
                        utils.alert(that, "保存失败！");
                    }
                }
            });
        } else if(modalType == "skillLevel") {
            var skillId = $("input[data-levelName='skillId']").val();
            var level = $("input[data-levelName='level']").val();
            var description = $("textarea[data-levelName='description']").val();
            var speed = [];
            var effects = [];
            var requirement = [];

            var speeds = $("input[data-levelName='speed']");
            console.log(speeds);
            for(var i = 0 ; i < speeds.length ; i++) {
                speed.push({
                    type: $(speeds[i]).attr("data-type"),
                    value: $(speeds[i]).val()
                });
            }

            effects = getEffectsData();
            requirement = getRequirementData();

            var data = {
                skillId: skillId,
                level: level,
                description: description,
                speed: JSON.stringify(speed),
                effects: JSON.stringify(effects),
                requirement: JSON.stringify(requirement)
            };
            if(updateType == "add") {
                saveRoute = '/hero_skills/addSkillLevel';
            } else {
                var id = $("input[data-levelName='id']").val();
                data.id = id;
                saveRoute = '/hero_skills/updateSkillLevel/' + id;
            }
            console.log(data);
            var that = this;
            $.ajax({
                type: "post",
                url: saveRoute,
                data: {data: data},
                success: function(data, status) {
                    var data = JSON.parse(data);
                    console.log(data);
                    if(data.result == 1) {
                        isShow = false;
                        getSkillLevel(skillId);
                        utils.alert(that, "保存成功！");
                    } else {
                        utils.alert(that, "保存失败！");
                    }
                }
            });
        }
    });

    heroId = 1;
    reset(heroId);
});

function getEffectsData() {
    var effects = [];
    var effectDiv = $("#effectsDiv");
    console.log(effectDiv);
    var skill_effect = {};
    var effectEls = [];
    var effectEl = {};
    var dataType = "";
    var effect = {};
    for(var i = 1 ; i < effectDiv.children().length ; i++) {// 0 - row skill_header
        effectEl = {};
        skill_effect = effectDiv.children()[i];
        dataType = $(skill_effect).children().first().children().val();
        effectEls = $(skill_effect).children().last().children();
        for(var j = 0 ; j < effectEls.length ; j++) {
            effectEl[$(effectEls[j]).children().first().attr("data-levelName")] = $(effectEls[j]).children().first().val();
        }
        console.log(dataType);
        effect = getColumns(dataType);
        effect.attr = effectEl.attr = dataType;
        for(var o in effect) {
            effect[o] = effectEl[o];
        }
        effects.push(effect);
    }
    console.log(effects);
    return effects;
}

function getRequirementData() {
    var requirements = [];
    var requirementDiv = $("#requirementDiv");
    var skill_requirement = {};
    var requirement = {};
    var type = "";
    var value = 0;
    for(var i = 1 ; i < requirementDiv.children().length ; i++) {// 0 - row skill_header
        skill_requirement = requirementDiv.children()[i];
        type = $(skill_requirement).children().first().children().val();
        value = $(skill_requirement).children().last().children().val();
        console.log(skill_requirement);
        requirement = {
            type: type,
            value: value
        }
        requirements.push(requirement);
    }
    return requirements;
}

function createSkill(skill) {
    $('#myModal').modal('show');
    $("#myModal > .modal-body").empty();
    modalType = "skills";
    var id = 0;
    var html = '';
    var skillId = 0;
    var name = "";
    var description = "";
    var type = 1;
    var scope = 1;
    var skilltype = 1;
    if(typeof skill == "undefined") {
        updateType = "add";
    } else {
        updateType = "update";
        id = skill.id;
        skillId = skill.skillId;
        name = skill.name;
        description = skill.description;
        type = skill.type;
        scope = skill.scope;
        skilltype = skill.skilltype;
    }
    html += '<div class="row">' +
        '<input type="hidden" data-name="id" value="' + id + '" />' +
        '<div class="span2">技能Id</div>' +
        '<div class="span2"><input type="text" data-name="skillId" class="span2" value="' + skillId + '" placeholder="skillId" /></div>' +
        '<div class="clearfix"></div>' +

        '<div class="span2">技能名称</div>' +
        '<div class="span2"><input type="text" data-name="name" class="span2" value="' + name + '" placeholder="name" /></div>' +
        '<div class="clearfix"></div>' +

        '<div class="span2">描述</div>' +
        '<div class="span2"><input type="text" data-name="description" class="span2" value="' + description + '" placeholder="description" /></div>' +
        '<div class="clearfix"></div>' +

        getSkillType(type) +
        getScope(scope) +
        getSkillCategory(skilltype) +

        '<div class="clearfix"></div>' +
        '</div>';
    $("#myModal > .modal-body").append(html);

    $("select[name='type']").selectpicker({style: 'btn-primary', menuStyle: 'dropdown-inverse'});
    $("select[name='scope']").selectpicker({style: 'btn-primary', menuStyle: 'dropdown-inverse'});
    $("select[name='skilltype']").selectpicker({style: 'btn-primary', menuStyle: 'dropdown-inverse'});
}

function getSkillType(type) {
    var html = '<div class="span2">技能类型</div>' +
        '<div class="span2">' +
        '<select data-name="type" name="type" data-type="attr-name" value="请选择" class="select-block span1" style="display: none;">';
    for(var o in skillType) {
        if(type == o) {
            html += '<option value="' + o + '" selected="selected">' + skillType[o] + '</option>';
        } else {
            html += '<option value="' + o + '">' + skillType[o] + '</option>';
        }
    }
    html += '</select>' +
        '</div>' +
        '<div class="clearfix"></div>';
    return html;
}

function getScope(scope) {
    var html = '<div class="span2">技能范围</div>' +
        '<div class="span2">' +
        '<select data-name="scope" name="scope" data-type="attr-name" value="请选择" class="select-block span1" style="display: none;">';
    for(var o in skillScope) {
        if(scope == o) {
            html += '<option value="' + o + '" selected="selected">' + skillScope[o] + '</option>';
        } else {
            html += '<option value="' + o + '">' + skillScope[o] + '</option>';
        }
    }
    html += '</select>' +
        '</div>' +
        '<div class="clearfix"></div>';
    return html;
}

function getSkillCategory(skilltype) {
    var html = '<div class="span2">技能类型</div>' +
        '<div class="span2">' +
        '<select data-name="skilltype" name="skilltype" data-type="attr-name" value="请选择" class="select-block span1" style="display: none;">';
    for(var o in skillCategory) {
        if(skilltype == o) {
            html += '<option value="' + o + '" selected="selected">' + skillCategory[o] + '</option>';
        } else {
            html += '<option value="' + o + '">' + skillCategory[o] + '</option>';
        }
    }
    html += '</select>' +
        '</div>';
    return html;
}

function updateSkill(e, el) {
    e.stopPropagation();
    var skill = getSkillById($(el).attr("data-id"));
    createSkill(skill);
}

function getSkillById(id) {
    for(var i = 0 ; i < skills.length ; i++) {
        if(id == skills[i].id) {
            return skills[i];
        }
    }
}

function reset(heroId) {
    $.ajax({
        type: "get",
        url: "/hero_skills/getSkills/" + heroId,
        success: function(data, status) {
            var data = JSON.parse(data);
            skills = data;
            console.log(data);

            var template = $("#skillsTemplate").html();
            $("#skills").html(_.template(template, {skills:data}));
        }
    });
}

function selectHero(el) {
    if($(el).hasClass("active"))
        return;
    $(".active").removeClass("active");
    $(el).addClass("active");
    heroId = el.id;
    reset(heroId);
}

function getSkillLevel(_skillId) {
    skillId = _skillId;
    if(!isShow) {
        $.ajax({
            type: "get",
            url: "/hero_skills/getSkillLevels/" + skillId,
            success: function(data, status) {
                var data = JSON.parse(data);
                console.log(data);
                skill_levels = data;

                var template = $("#skillLevelsTemplate").html();
                $("#skills_levels_" + skillId).html(_.template(template, {skillLevels:data}));
            }
        });
        isShow = true;
    } else {
        $("#skills_levels_" + skillId).html("");
        isShow = false;
    }
}

function addSkillLevel(e, el) {
    e.stopPropagation();
    updateType = "add";
    var skill_level = {
        id: 0,
        skillId: $(el).attr("data-skillId"),
        level: skill_levels.length + 1,
        description: "",
        speed: '[{"type":"ea","value":0},{"type":"ehr","value":0},{"type":"eshr","value":0}]',
        effects: '[]',
        requirement: '[]'
    };
    createSkillLevel(skill_level);
}

function updateSkillLevel(e, el) {
    console.log(e);
    console.log(el);
    e.stopPropagation();
    updateType = "update";
    var skill_level = getSkillLevelFromLevels($(el).attr("data-id"), skill_levels);
    createSkillLevel(skill_level);
}

function createSkillLevel(skill_level) {
    modalType = "skillLevel";

    $('#myModal').modal('show');
    $("#myModal > .modal-body").empty();

    var html = '<div class="row show-grid-row">' +
        '<input type="hidden" data-levelName="id" value="' + skill_level.id + '" />' +
        '<div class="span2 show-grid-row">技能Id</div>' +
        '<div class="span3"><input type="text" data-levelName="skillId" value="' + skill_level.skillId + '" disabled="disabled" placeholder="skillId" class="span3"></input></div>' +
        '<div class="clearfix"></div>' +

        '<div class="span2 show-grid-row">等级</div>' +
        '<div class="span3"><input type="text" data-levelName="level" value="' + skill_level.level + '" placeholder="level" class="span3"></input></div>' +
        '<div class="clearfix"></div>' +

        '<div class="span2 show-grid-row">描述</div>' +
        '<div class="clearfix"></div>' +
        '<div class="span9"><textarea data-levelName="description" placeholder="description" class="span9" cols=100>' + skill_level.description + '</textarea></div>' +
        '<div class="clearfix"></div>' +

        getSpeed(skill_level) +
        getEffects(skill_level) +
        getRequirement(skill_level) +

        '</div>';
    $("#myModal > .modal-body").append(html);

    $("select[name='requirement']").selectpicker({style: 'btn-primary', menuStyle: 'dropdown-inverse'});
    //$("select[name='effect']").selectpicker({style: 'btn-primary', menuStyle: 'dropdown-inverse'});
    $("select[name='valueType']").selectpicker({style: 'btn-primary', menuStyle: 'dropdown-inverse'});
    $("select[name='targetType']").selectpicker({style: 'btn-primary', menuStyle: 'dropdown-inverse'});
    $("select[name='timeType']").selectpicker({style: 'btn-primary', menuStyle: 'dropdown-inverse'});
}

function getSpeed(skill_level) {
    var speed = JSON.parse(skill_level.speed);
    var html = '<div class="span2 show-grid-row">获得怒气</div>' +
        '<div class="clearfix"></div>';
    for(var i = 0 ; i < speed.length ; i ++) {
        html += '<div class="span1">' + skill_speedType[speed[i].type] + '</div>';
        html += '<div class="span1"><input data-levelName="speed" data-type="' + speed[i].type + '" type="text" value="' + speed[i].value + '" placeholder="skillId" class="span1"></input></div>';
    }
    html += '<div class="clearfix"></div>';
    return html;
}

function getEffects(skill_level) {
    var effects = JSON.parse(skill_level.effects);
    var html = '<div class="span2 show-grid-row">技能效果</div>' +
        '<div class="span btn btn-primary" onclick="addEffect()">添加</div>' +
        '<div class="clearfix"></div>';

    html += '<div id="effectsDiv" class="span10">' +
        '<div class="row skill_header">' +
        '<div data-type="effectHeader" data-index="0" class="span1">效果名</div>' +
        '<div data-name="skilllevel_header">' +
        getEffectHeader() +
        '</div>' +
        '</div>';

    html += createCells(effects);

    html += '</div>';
    html += '<div class="clearfix"></div>';
    return html;
}

function changeEffectSelect(e, el) {
    console.log(e);
    console.log(el);

    var attrName = el.options[el.selectedIndex].value;
    var dataType = getDataType(attrName);

    resetEffectHeader(dataType);
    resetTypeEl(el, dataType)

    $("select[name='valueType']").selectpicker({style: 'btn-primary', menuStyle: 'dropdown-inverse'});
    $("select[name='targetType']").selectpicker({style: 'btn-primary', menuStyle: 'dropdown-inverse'});
    $("select[name='timeType']").selectpicker({style: 'btn-primary', menuStyle: 'dropdown-inverse'});
}

function resetEffectHeader(dataType) {
    var effectHeaderDiv = $("div[data-name='skilllevel_header']");
    var html = getEffectHeader(dataType);
    effectHeaderDiv.html(html);
}

function getEffectHeader(dataType) {
    var html = '';
    if(typeof dataType == "undefined")
        dataType = "default";
    var el = skilllevel_header_effect[dataType];
    for(var o in el) {
        if(el[o] == "") {
            html += '<div data-type="effectHeader" data-index="' + o + '" class="' + skilllevel_header_class[o].className + '"></div>';
        } else {
            html += '<div data-type="effectHeader" data-index="' + o + '" class="' + skilllevel_header_class[o].className + '">' + el[o].showName + '</div>';
        }
    }
    return html;
}

function createCells(effects) {
    var html = '';
    var dataType = "";
    for(var i = 0 ; i < effects.length ; i++) {
        html += '<div data-type="skill_effect" data-rowid="' + levelId + '" class="row skill_content">';
        html += '<div data-type="' + effects[i].attr + '" class="span1" data-index="0">' +
            '<select data-levelName="effect-name" name="effect" data-type="effect-name" value="请选择" class="select-block span1" style="display: block;" onchange="changeEffectSelect(event, this)">';
        for(var o in skill_attrs) {
            if(effects[i].attr == skill_attrs[o].name) {
                html += '<option value="' + skill_attrs[o].name + '" selected="selected">' + skill_attrs[o].showName + '</option>';
            } else {
                html += '<option value="' + skill_attrs[o].name + '">' + skill_attrs[o].showName + '</option>';
            }
        }
        html += '</select>' +
            '</div>';

        dataType = getDataType(effects[i].attr);
        html += '<div data-name="dataTypeCell">';
        html += getDataTypeEl(effects[i], dataType);
        html += '</div>';

        html += '</div>';

        levelId++;
    }
    return html;
}

function getDataType(attrName) {
    for(var i = 0 ; i < special_effect.length ; i++) {
        if(attrName == special_effect[i].name) {
            return attrName;
        }
    }
    return "default";
}

function getDataTypeEl(effect, dataType) {
    var html = '';
    var el = skilllevel_header_effect[dataType];
    for(var o in el) {
        html += createTypeEl(effect, o, el[o]);
    }
    return html;
}

function resetTypeEl(el, dataType) {
    var div = $(el).parent().parent().children("[data-name='dataTypeCell']");
    var effect = {

    };
    $(el).parent().attr("data-type", dataType);

    if(dataType == "default") {
        effect = {
            valueType: 0,
            value: 1,
            targetType: 1,
            targetValue: 0,
            timeType: 0,
            timeValue: 0
        };
    } else {
        effect = getColumns(dataType);
    }
    var html = getDataTypeEl(effect, dataType);
    div.html(html);
}

function getColumns(dataType) {
    for(var i = 0 ; i < special_effect.length ; i++) {
        if(special_effect[i].name == dataType) {
            return special_effect[i].columns;
        }
    }
    return {
        valueType: 0,
        value: 1,
        targetType: 1,
        targetValue: 0,
        timeType: 0,
        timeValue: 0
    };
}

function createTypeEl(effect, i, el) {
    var html = '';
    if(el == "") {
        html += '<div class="' + skilllevel_header_class[i].className + '" data-index="' + i + '"></div>';
    } else if(el.type == "int") {
        html += '<div class="' + skilllevel_header_class[i].className + '" data-index="' + i + '">' +
            el.showName + '<input data-levelName="' + el.name + '" data-attr="value" data-type="int" type="text" value="' + effect[el.name] + '" placeholder="' + el.showName + '" class="' + skilllevel_header_class[i].className + '"></input>' +
            '</div>';
    } else if(el.type == "string") {
        html += '<div class="' + skilllevel_header_class[i].className + '" data-index="' + i + '">' +
            el.showName + '<input data-levelName="' + el.name + '" data-attr="value" data-type="int" type="text" value="' + effect[el.name] + '" placeholder="' + el.showName + '" class="' + skilllevel_header_class[i].className + '"></input>' +
            '</div>';
    } else if(el.type == "enum") {
        html += '<div class="' + skilllevel_header_class[i].className + '" data-index="' + i + '">' +
            el.showName + '<select data-levelName="' + el.name + '" name="' + el.name + '" data-attr="name" data-type="enum" value="请选择" class="select-block span1" style="display: block;" onchange="changeEffectSelect(event, this)">';
        for(var o in enumType[el.name]) {
            if(effect[el.name] == o) {
                html += '<option value="' + o + '" selected="selected">' + enumType[el.name][o] + '</option>';
            } else {
                html += '<option value="' + o + '">' + enumType[el.name][o] + '</option>';
            }
        }
        html += '</select>' +
            '</div>';
    }

    return html;
}

function addEffect() {
    var div = $("#effectsDiv");
    var html = '';
    var dataType = "default";
    var effect = {
        valueType: 0,
        value: 1,
        targetType: 1,
        targetValue: 0,
        timeType: 0,
        timeValue: 0
    };

    html += '<div data-rowid="' + levelId + '" class="row skill_content">';
    html += '<div class="span1" data-index="0">' +
        '<select data-levelName="effect-name" name="effect" data-type="effect-name" value="请选择" class="select-block span1" style="display: block;" onchange="changeEffectSelect(event, this)">';
    for(var o in skill_attrs) {
            html += '<option value="' + skill_attrs[o].name + '">' + skill_attrs[o].showName + '</option>';
    }
    html += '</select>' +
        '</div>';

    html += '<div data-name="dataTypeCell">';
    html += getDataTypeEl(effect, dataType);
    html += '</div>';

    html += '</div>';

    levelId++;
    div.append(html);
    //$("select[name='effect']").selectpicker({style: 'btn-primary', menuStyle: 'dropdown-inverse'});
    $("select[name='valueType']").selectpicker({style: 'btn-primary', menuStyle: 'dropdown-inverse'});
    $("select[name='targetType']").selectpicker({style: 'btn-primary', menuStyle: 'dropdown-inverse'});
    $("select[name='timeType']").selectpicker({style: 'btn-primary', menuStyle: 'dropdown-inverse'});
}

function getRequirement(skill_level) {
    var requirement = JSON.parse(skill_level.requirement);
    var html = '<div class="span2 show-grid-row">升级需要条件</div>' +
        '<div class="span btn btn-primary" onclick="addRequiremnt()">添加</div>' +
        '<div class="clearfix"></div>';

    html += '<div id="requirementDiv" class="span9">' +
        '<div class="row skill_header">' +
        '<div class="span3">属性名</div>' +
        '<div class="span3">属性值</div>' +
        '</div>';
    for(var i = 0 ; i < requirement.length ; i ++) {
        html += '<div data-type="skill_requirement" class="row skill_content">';
        html += '<div class="span3">' +
            '<select data-levelName="requirement" name="requirement" data-type="attr-name" value="请选择" class="select-block span3" style="display: none;">';
        for(var o in requirementColumns) {
            if(requirement[i].type == o) {
                html += '<option value="' + o + '" selected="selected">' + requirementColumns[o] + '</option>';
            } else {
                html += '<option value="' + o + '">' + requirementColumns[o] + '</option>';
            }
        }
        html += '</select>' +
            '</div>';
        html += '<div class="span3"><input data-levelName="requirement" data-type="attr-value" type="text" value="' + requirement[i].value + '" placeholder="' + requirement[i].type + '" class="span3"></input></div>';
        html += '</div>';
    }
    html += '</div>';
    return html;
}

function addRequiremnt() {
    var div = $("#requirementDiv");
    var html = '';
    html += '<div class="row skill_content">';
    html += '<div class="span3">' +
        '<select data-levelName="requirement" name="requirement" data-type="attr-name" value="请选择" class="select-block span3" style="display: none;">';
    for(var o in requirementColumns) {
        html += '<option value="' + o + '">' + requirementColumns[o] + '</option>';
    }
    html += '</select>' +
        '</div>';
    html += '<div class="span3"><input data-levelName="requirement" data-type="attr-value" type="text" value="0" placeholder="" class="span3" /></div>';
    html += '</div>';

    div.append(html);
    $("select[name='requirement']").selectpicker({style: 'btn-primary', menuStyle: 'dropdown-inverse'});
}

function getSkillLevelFromLevels(levelId, levels) {
    for(var i = 0 ; i < levels.length ; i++) {
        if(levelId == levels[i].id) {
            skill_level_index = i;
            return levels[i];
        }
    }
    return {
        skillId: "",
        level: 1,
        description: "",
        speed: '[{"type":"ea","value":0},{"type":"ehr","value":0},{"type":"eshr","value":0}]',
        effects: '[]',
        requirement: '[]'
    };
}