/**
 * Copyright(c)2013,Wozlla,www.wozlla.com
 * Version: 1.0
 * Author: Peter Zhang
 * Date: 2013-07-09
 * Description: data
 */
var taskType = [{
    id: 1,
    typeName: "主线任务"
},{
    id: 2,
    typeName: "支线任务"
},{
    id: 3,
    typeName: "日常任务"
},{
    id: 4,
    typeName: "活动任务"
}];

var skillType = {
    1: "主动技能",
    2: "被动技能"
};

/**
 * 1 - single attack 2 - single to party attack 3 - party attack 4 - single skill 5 - single to party skill 6 - party skill
 * @type {{1: string}}
 */
var skillScope = {
    1: "single attack",
    2: "single to party attack",
    3: "party attack",
    4: "single skill",
    5: "single to party skill",
    6: "party skill"
};

var skillCategory = {
    1: "主要技能",
    2: "永久加成属性",
    3: "提升装备",
    4: "辅助技能"
};

var skill_speedType = {
    ea: "each attack",
    ehr: "each hit received",
    eshr: "each skill hit received"
};

/**
 *
 * @type {{}}
 */
var effect_attr = {
    1: {
        name: "hp",
        showName: "HP"
    },
    2: {
        name: "experience",
        showName: "经验"
    },
    3: {
        name: "attack",
        showName: "攻击"
    },
    4: {
        name: "defense",
        showName: "防御"
    },
    5: {
        name: "focus",
        showName: "集中值"
    },
    6: {
        name: "speed",
        showName: "速度"
    },
    7: {
        name: "dodge",
        showName: "闪避"
    },
    8: {
        name: "criticalHit",
        showName: "暴击几率"
    },
    9: {
        name: "critDamage",
        showName: "暴击伤害"
    },
    10: {
        name: "block",
        showName: "格挡"
    },
    11: {
        name: "counter",
        showName: "反击"
    },
    12: {
        name: "parallelDamage",
        showName: "溅射伤害"
    },
    13: {
        name: "burn",
        showName: "点燃"
    },
    14: {
        name: "stunt",
        showName: "禁锢"
    },
    15: {
        name: "poison",
        showName: "施毒"
    },
    16: {
        name: "confusion",
        showName: "迷惑"
    },
    17: {
        name: "defense_focus",
        showName: "防御力加成(focus)"
    },
    18: {
        name: "hpRecoverySpeed",
        showName: "血量回复"
    },
    19: {
        name: "addItemAttr",
        showName: "装备加成"
    },
    20: {
        name: "addAttack",
        showName: "增加自己攻击力"
    },
    21: {
        name: "bounceAttack",
        showName: "反弹伤害"
    },
    22: {
        name: "money",
        showName: "额外金钱"
    },
    23: {
        name: "addBlood",
        showName: "吸血"
    },
    24: {
        name: "attack_focus",
        showName: "攻击力加成(focus)"
    },
    25: {
        name: "skill",
        showName: "技能"
    },
    26: {
        name: "ice",
        showName: "冰冻"
    }
};

var requirementType = [{
    name: "coins",
    showName: "金币"
}, {
    name: "level",
    showName: "等级"
}, {
    name: "skills",
    showName: "技能"
}, {
    name: "items",
    showName: "物品"
}];

var requirementColumns = {
    coins: "金币",
    level: "等级",
    skills: "技能",
    items: "物品"
};

var skilllevel_header_default = {
    1: "技能Id",
    2: "等级",
    3: "描述",
    4: "获得怒气",
    5: "技能效果",
    6: "升级需要条件"
};

var special_effect = [{
    name: "parallelDamage",
    showName: "溅射",
    columns: {
        value: 0
    }
}, {
    name: "burn",
    showName: "点燃",
    columns: {
        value: 0,
        timeValue: 0
    }
}, {
    name: "stunt",
    showName: "禁锢",
    columns: {
        value: 0
    }
}, {
    name: "poison",
    showName: "施毒",
    columns: {
        value: 0,
        timeValue: 0
    }
}, {
    name: "confusion",
    showName: "迷惑",
    columns: {
        value: 0
    }
}, {
    name: "ice",
    showName: "冰冻",
    columns: {
        speedValue: 0,
        value: 0,
        timeValue: 0
    }
}, {
    name: "skill",
    showName: "技能",
    columns: {
        skillId: "",
        valueType: 0,
        value: 0
    }
}];

var skilllevel_header_class = {
    1: {
        className: "span2"
    },
    2: {
        className: "span1"
    },
    3: {
        className: "span2"
    },
    4: {
        className: "span1"
    },
    5: {
        className: "span2"
    },
    6: {
        className: "span1"
    }
};

var skilllevel_header_effect = {
    default: {
        1: {
            name: "valueType",
            showName: "属性值类型",
            type: "enum",
            enum: "valueType"
        },
        2: {
            name: "value",
            showName: "属性值",
            type: "int"
        },
        3: {
            name: "targetType",
            showName: "作用目标类型",
            type: "enum",
            enum: "targetType"
        },
        4: {
            name: "targetValue",
            showName: "作用目标值",
            type: "int"
        },
        5: {
            name: "timeType",
            showName: "时间类型",
            type: "enum",
            enum: "timeType"
        },
        6: {
            name: "timeValue",
            showName: "时间值",
            type: "int"
        }
    },
    parallelDamage: {
        1: {
            name: "value",
            showName: "溅射伤害",
            type: "int"
        },
        2: "",
        3: "",
        4: "",
        5: "",
        6: ""
    },
    burn: {
        1: {
            name: "value",
            showName: "点燃伤害",
            type: "int"
        },
        2: {
            name: "timeValue",
            showName: "持续几轮",
            type: "int"
        },
        3: "",
        4: "",
        5: "",
        6: ""
    },
    stunt: {
        1: {
            name: "value",
            showName: "禁锢次数",
            type: "int"
        },
        2: "",
        3: "",
        4: "",
        5: "",
        6: ""
    },
    poison: {
        1: {
            name: "value",
            showName: "施毒伤害",
            type: "int"
        },
        2: {
            name: "timeValue",
            showName: "持续几轮",
            type: "int"
        },
        3: "",
        4: "",
        5: "",
        6: ""
    },
    confusion: {
        1: {
            name: "value",
            showName: "持续次数",
            type: "int"
        },
        2: "",
        3: "",
        4: "",
        5: "",
        6: ""
    },
    ice: {
        1: {
            name: "speedValue",
            showName: "减速值",
            type: "int"
        },
        2: {
            name: "timeValue",
            showName: "持续几轮",
            type: "int"
        },
        3: {
            name: "value",
            showName: "冰冻伤害",
            type: "int"
        },
        4: "",
        5: "",
        6: ""
    },
    skill: {
        1: {
            name: "skillId",
            showName: "技能Id",
            type: "string"
        },
        2: {
            name: "valueType",
            showName: "加成类型",
            type: "enum",
            enum: "valueType"
        },
        3: {
            name: "value",
            showName: "加成数值",
            type: "int"
        },
        4: "",
        5: "",
        6: ""
    }
}

/**
 * 溅射
 * @type {{1: string, 2: string, 3: string, 4: string, 5: string, 6: string}}
 */
var skilllevel_header_parallelDamage = {
    1: "溅射伤害",
    2: "",
    3: "",
    4: "",
    5: "",
    6: ""
}

/**
 * 点燃
 * @type {{1: string, 2: string, 3: string, 4: string, 5: string, 6: string}}
 */
var skilllevel_header_burn = {
    1: "点燃伤害",
    2: "持续几轮",
    3: "",
    4: "",
    5: "",
    6: ""
}

/**
 * 禁锢
 * @type {{1: string, 2: string, 3: string, 4: string, 5: string, 6: string}}
 */
var skilllevel_header_stunt = {
    1: "禁锢次数",
    2: "",
    3: "",
    4: "",
    5: "",
    6: ""
}

/**
 * 施毒
 * @type {{1: string, 2: string, 3: string, 4: string, 5: string, 6: string}}
 */
var skilllevel_header_poison = {
    1: "施毒伤害",
    2: "持续几轮",
    3: "",
    4: "",
    5: "",
    6: ""
}

/**
 * 迷惑
 * @type {{1: string, 2: string, 3: string, 4: string, 5: string, 6: string}}
 */
var skilllevel_header_confusion = {
    1: "持续次数",
    2: "",
    3: "",
    4: "",
    5: "",
    6: ""
}

/**
 * 冰冻
 * @type {{1: string, 2: string, 3: string, 4: string, 5: string, 6: string}}
 */
var skilllevel_header_ice = {
    1: "减速值",
    2: "持续几轮",
    3: "冰冻伤害",
    4: "",
    5: "",
    6: ""
}

/**
 * 技能类型
 * @type {{1: string, 2: string, 3: string, 4: string, 5: string, 6: string}}
 */
var skilllevel_header_skill = {
    1: "技能Id",
    2: "加成类型",
    3: "加成数值",
    4: "",
    5: "",
    6: ""
}

var dataType = {
    int: 0,
    enum: 1
}

var enumType = {
    valueType: {
        1: "数值",
        2: "百分比",
        3: "获取目标值(百分比）"
    },
    timeType: {
        0: "攻击次数",
        1: "受攻击次数",
        2: "回合",
        3: "永久"
    },
    targetType: {
        1: "己方单体",
        2: "敌方单体",
        3: "己方全体",
        4: "敌方全体",
        5: "己方随机目标",
        6: "敌方随机目标",
        7: "己方特定目标",
        8: "敌方特定目标"
    }
}

var valueType = {
    0: "百分比",
    1: "数值"
}

var timeType = {
    0: "攻击次数",
    1: "受攻击次数",
    2: "回合",
    3: "永久"
}

var targetType = {
    1: "己方单体",
    2: "敌方单体",
    3: "己方全体",
    4: "敌方全体",
    5: "己方随机目标",
    6: "敌方随机目标",
    7: "己方特定目标",
    8: "敌方特定目标"
}

var data = {
    effect_attr: effect_attr
};

module.exports = data;