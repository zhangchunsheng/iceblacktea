/**
 * Copyright(c)2013,Wozlla,www.wozlla.com
 * Version: 1.0
 * Author: Peter Zhang
 * Date: 2013-06-24
 * Description: routes
 */
var routes = require('./routes')
    , user = require('./routes/user')
    , login = require('./routes/login')
    , hero =  require('./routes/hero')
    , heroV2 = require('./routes/v2/heroV2')
    , battle = require('./routes/battle')
    , serverList = require('./routes/serverList')
    , task = require('./routes/task')
    , character = require('./routes/character')
    , partner = require('./routes/partner')
    , monster = require('./routes/monster')
    , instancedungeon = require('./routes/indu/instancedungeon')
    , induEvent = require('./routes/indu/induEvent')
    , equipment = require('./routes/equipment/equipment')
    , equipmentLevelup = require('./routes/equipment/equipmentLevelup')
    , item = require('./routes/item')
    , shop = require('./routes/shop/shop')
    , city = require('./routes/city')
    , npc = require('./routes/npc')
    , hero_skills = require('./routes/hero_skills')
    , skill = require('./routes/skill/skill')
    , skill_attr = require('./routes/skill/skill_attr')
    , skill_list = require('./routes/skill/skill_list')
    , skill_effect = require('./routes/skill/skill_effect')
    , skillV2 = require('./routes/v2/skillV2')
    , tactical = require('./routes/formation/tactical')
    , formation = require('./routes/formation/formation')
    , formationUpgrade = require('./routes/formation/formationUpgrade')
    , ghost = require('./routes/character/ghost')
    , aptitude = require('./routes/character/aptitude')
    , altar = require('./routes/character/altar')
    , altar_exchange = require('./routes/character/altar_exchange')
    , soulFusion = require('./routes/character/soulFusion')
    , equipmentV2 = require('./routes/v2/equipmentV2')
    , forgeUpgrade = require('./routes/equipment/forgeUpgrade')
    , diamond = require('./routes/equipment/diamond')
    , upload = require('./routes/upload')
    , scene = require('./routes/index/scene')
    , gm = require('./routes/gm/gm')
    , authRequired = require('./middlewares/auth_required');

module.exports = function (app) {
    app.get('/', authRequired, routes.index);
    app.get('/index', authRequired, routes.index);
    app.get('/index/data', authRequired, routes.data);
    app.get('/export', routes.export);

    app.get('/about', routes.about);

    app.get('/index/character', authRequired, routes.character);

    app.get('/index/scene', authRequired, scene.index);
    app.post('/index/scene/writeRedis', authRequired, scene.writeRedis);

    app.get('/login', login.index); //login
    app.post('/login/:loginName/:password', login.login);

    app.get('/hero', authRequired, hero.index);
    app.post('/hero/:id', authRequired, hero.update);
    app.post('/heros/export', authRequired, hero.export);
    app.post('/heros/exportJson', authRequired, hero.exportJson);

    app.get('/heroV2', authRequired, heroV2.index);
    app.post('/heroV2/:id', authRequired, heroV2.update);
    app.post('/heroV2s/import', authRequired, heroV2.import);
    app.post('/heroV2s/export', authRequired, heroV2.export);
    app.post('/heroV2s/exportJson', authRequired, heroV2.exportJson);

    app.get('/serverList', authRequired, serverList.index);
    app.post('/serverList/:id', authRequired, serverList.update);
    app.post('/serverLists/export', authRequired, serverList.export);
    app.post('/serverLists/exportJson', authRequired, serverList.exportJson);

    app.get('/character', authRequired, character.index);
    app.get('/character_login', authRequired, character.index_login);
    app.get('/character_nickname', authRequired, character.nickname);
    app.post('/character/readRedis', authRequired, character.readRedis);
    app.post('/character/writeRedis', authRequired, character.writeRedis);
    app.post('/character_nickname/import', authRequired, character.nickname_import);
    app.post('/character_nickname/export', authRequired, character.nickname_export);
    app.post('/character_nickname/writeToRedis', authRequired, character.nickname_writeToRedis);

    app.get('/partner', authRequired, partner.index);
    app.post('/partner/:id', authRequired, partner.update);
    app.post('/partners/export', authRequired, partner.export);

    app.get('/task', authRequired, task.index);
    app.post('/task/:id', authRequired, task.update);
    app.post('/taskList/import', authRequired, task.import);
    app.post('/taskList/export', authRequired, task.export);
    app.post('/taskList/exportJson', authRequired, task.exportJson);
    app.post('/taskList/writeToRedis', authRequired, task.writeToRedis);

    app.get('/monster', authRequired, monster.index);
    app.post('/monster/:id', authRequired, monster.update);
    app.post('/monsters/import', authRequired, monster.import);
    app.post('/monsters/export', authRequired, monster.export);
    app.post('/monsters/exportJson', authRequired, monster.exportJson);

    app.get('/indu', authRequired, instancedungeon.index);
    app.post('/indu/:id', authRequired, instancedungeon.update);
    app.post('/indus/import', authRequired, instancedungeon.import);
    app.post('/indus/export', authRequired, instancedungeon.export);
    app.post('/indus/exportJson', authRequired, instancedungeon.exportJson);

    app.get('/indu_monstergroup', authRequired, instancedungeon.monstergroup);
    app.post('/indu_monstergroup/:id', authRequired, instancedungeon.monstergroup_update);
    app.post('/indu_monstergroups/import', authRequired, instancedungeon.monstergroup_import);
    app.post('/indu_monstergroups/export', authRequired, instancedungeon.monstergroup_export);
    app.post('/indu_monstergroups/exportJson', authRequired, instancedungeon.monstergroup_exportJson);

    app.get('/indu_event', authRequired, induEvent.index);
    app.post('/indu_event/:id', authRequired, induEvent.update);
    app.post('/indu_events/import', authRequired, induEvent.import);
    app.post('/indu_events/export', authRequired, induEvent.export);
    app.post('/indu_events/exportJson', authRequired, induEvent.exportJson);

    app.get('/equipment', authRequired, equipment.index);
    app.post('/equipment/:id', authRequired, equipment.update);
    app.post('/equipments/import', authRequired, equipment.import);
    app.post('/equipments/export', authRequired, equipment.export);
    app.post('/equipments/exportJson', authRequired, equipment.exportJson);

    app.get('/equipmentLevelup', authRequired, equipmentLevelup.index);
    app.post('/equipmentLevelup/:id', authRequired, equipmentLevelup.update);
    app.post('/equipmentsLevelup/import', authRequired, equipmentLevelup.import);
    app.post('/equipmentsLevelup/export', authRequired, equipmentLevelup.export);
    app.post('/equipmentsLevelup/exportJson', authRequired, equipmentLevelup.exportJson);

    app.get('/item', authRequired, item.index);
    app.post('/item/:id', authRequired, item.update);
    app.post('/items/import', authRequired, item.import);
    app.post('/items/export', authRequired, item.export);
    app.post('/items/exportJson', authRequired, item.exportJson);

    app.get('/shop', authRequired, shop.index);
    app.post('/shop/:id', authRequired, shop.update);
    app.post('/shops/import', authRequired, shop.import);
    app.post('/shops/export', authRequired, shop.export);
    app.post('/shops/exportJson', authRequired, shop.exportJson);

    app.get('/city', authRequired, city.index);
    app.post('/city/:id', authRequired, city.update);
    app.post('/citys/import', authRequired, city.import);
    app.post('/citys/export', authRequired, city.export);
    app.post('/citys/exportJson', authRequired, city.exportJson);

    app.get('/npc', authRequired, npc.index);
    app.post('/npc/:id', authRequired, npc.update);
    app.post('/npcs/import', authRequired, npc.import);
    app.post('/npcs/export', authRequired, npc.export);
    app.post('/npcs/exportJson', authRequired, npc.exportJson);

    app.get('/hero_skills', authRequired, hero_skills.index);
    app.get('/hero_skills/getSkills/:id', authRequired, hero_skills.getSkills);
    app.get('/hero_skills/getSkillLevels/:id', authRequired, hero_skills.getSkillLevels);
    app.post('/hero_skills/addSkills', authRequired, hero_skills.addSkills);
    app.post('/hero_skills/updateSkills/:id', authRequired, hero_skills.updateSkills);
    app.post('/hero_skills/addSkillLevel', authRequired, hero_skills.addSkillLevel);
    app.post('/hero_skills/updateSkillLevel/:id', authRequired, hero_skills.updateSkillLevel);
    app.post('/hero_skills/export', authRequired, hero_skills.export);
    app.post('/hero_skills/exportJson', authRequired, hero_skills.exportJson);
    app.get('/skill', authRequired, skill.index);
    app.post('/skill/:id', authRequired, skill.update);
    app.get('/skill_attr', authRequired, skill_attr.index);
    app.post('/skill_attr/:id', authRequired, skill_attr.update);

    app.get('/skill_list', authRequired, skill_list.index);
    app.post('/skill_list/:id', authRequired, skill_list.update);
    app.post('/skill_lists/import_skill_list', authRequired, skill_list.import_skill_list);
    app.post('/skill_lists/import_skill_level', authRequired, skill_list.import_skill_level);
    app.post('/skill_lists/import_skill_effect', authRequired, skill_list.import_skill_effect);
    app.post('/skill_lists/export', authRequired, skill_list.export);
    app.post('/skill_lists/export_heroSkills', authRequired, skill_list.export_heroSkills);
    app.post('/skill_lists/exportJson', authRequired, skill_list.exportJson);
    app.post('/skill_lists/tidyData', authRequired, skill_list.tidyData);
    app.post('/skill_lists/export_skill', authRequired, skill_list.export_skill);
    app.post('/skill_lists/export_skillJson', authRequired, skill_list.export_skillJson);
    app.get('/skill_effect', authRequired, skill_effect.index);
    app.post('/skill_effect/:id', authRequired, skill_effect.update);
    app.post('/skill_effects/import', authRequired, skill_effect.import);
    app.post('/skill_effects/export', authRequired, skill_effect.export);
    app.post('/skill_effects/exportJson', authRequired, skill_effect.exportJson);

    app.get('/upload', authRequired, upload.index);
    app.post('/upload', authRequired, upload.upload);

    app.get('/battle', authRequired, battle.index);
    app.get('/battle/battle2', battle.battle2);

    app.get('/skillV2', authRequired, skillV2.index);
    app.post('/skillV2/:id', authRequired, skillV2.update);
    app.post('/skillV2s/import', authRequired, skillV2.import);
    app.post('/skillV2s/export', authRequired, skillV2.export);
    app.post('/skillV2s/exportJson', authRequired, skillV2.exportJson);

    app.get('/tactical', authRequired, tactical.index);
    app.post('/tactical/:id', authRequired, tactical.update);
    app.post('/tacticals/import', authRequired, tactical.import);
    app.post('/tacticals/export', authRequired, tactical.export);
    app.post('/tacticals/exportJson', authRequired, tactical.exportJson);

    app.get('/formation', authRequired, formation.index);
    app.post('/formation/:id', authRequired, formation.update);
    app.post('/formations/import', authRequired, formation.import);
    app.post('/formations/export', authRequired, formation.export);
    app.post('/formations/exportJson', authRequired, formation.exportJson);

    app.get('/formationUpgrade', authRequired, formationUpgrade.index);
    app.post('/formationUpgrade/:id', authRequired, formationUpgrade.update);
    app.post('/formationUpgrades/import', authRequired, formationUpgrade.import);
    app.post('/formationUpgrades/export', authRequired, formationUpgrade.export);
    app.post('/formationUpgrades/exportJson', authRequired, formationUpgrade.exportJson);

    app.get('/ghost', authRequired, ghost.index);
    app.post('/ghost/:id', authRequired, ghost.update);
    app.post('/ghosts/import', authRequired, ghost.import);
    app.post('/ghosts/export', authRequired, ghost.export);
    app.post('/ghosts/exportJson', authRequired, ghost.exportJson);

    app.get('/aptitude', authRequired, aptitude.index);
    app.post('/aptitude/:id', authRequired, aptitude.update);
    app.post('/aptitudes/import', authRequired, aptitude.import);
    app.post('/aptitudes/export', authRequired, aptitude.export);
    app.post('/aptitudes/exportJson', authRequired, aptitude.exportJson);

    app.get('/altar', authRequired, altar.index);
    app.post('/altar/:id', authRequired, altar.update);
    app.post('/altars/import', authRequired, altar.import);
    app.post('/altars/export', authRequired, altar.export);
    app.post('/altars/exportJson', authRequired, altar.exportJson);

    app.get('/altar_exchange', authRequired, altar_exchange.index);
    app.post('/altar_exchange/:id', authRequired, altar_exchange.update);
    app.post('/altar_exchanges/import', authRequired, altar_exchange.import);
    app.post('/altar_exchanges/export', authRequired, altar_exchange.export);
    app.post('/altar_exchanges/exportJson', authRequired, altar_exchange.exportJson);

    app.get('/soulFusion', authRequired, soulFusion.index);
    app.post('/soulFusion/:id', authRequired, soulFusion.update);
    app.post('/soulFusions/import', authRequired, soulFusion.import);
    app.post('/soulFusions/export', authRequired, soulFusion.export);
    app.post('/soulFusions/exportJson', authRequired, soulFusion.exportJson);

    app.get('/equipmentV2', authRequired, equipmentV2.index);
    app.post('/equipmentV2/:id', authRequired, equipmentV2.update);
    app.post('/equipmentV2s/import', authRequired, equipmentV2.import);
    app.post('/equipmentV2s/export', authRequired, equipmentV2.export);
    app.post('/equipmentV2s/exportJson', authRequired, equipmentV2.exportJson);

    app.get('/forgeUpgrade', authRequired, forgeUpgrade.index);
    app.post('/forgeUpgrade/:id', authRequired, forgeUpgrade.update);
    app.post('/forgeUpgrades/import', authRequired, forgeUpgrade.import);
    app.post('/forgeUpgrades/export', authRequired, forgeUpgrade.export);
    app.post('/forgeUpgrades/exportJson', authRequired, forgeUpgrade.exportJson);

    app.get('/diamond', authRequired, diamond.index);
    app.post('/diamond/:id', authRequired, diamond.update);
    app.post('/diamonds/import', authRequired, diamond.import);
    app.post('/diamonds/export', authRequired, diamond.export);
    app.post('/diamonds/exportJson', authRequired, diamond.exportJson);

    app.get('/gm/index', gm.index);
}