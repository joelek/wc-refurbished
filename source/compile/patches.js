const action_button_hotkey_patch = require("./patches/action_button_hotkey_patch.js");
const bugfix_patch = require("./patches/bugfix_patch.js");
const building_placement_patch = require("./patches/building_placement_patch.js");
const contextual_command_patch = require("./patches/contextual_command_patch.js");
const drag_select_patch = require("./patches/drag_select_patch.js");
const entity_balance_patch = require("./patches/entity_balance_patch.js");
const entity_group_patch = require("./patches/entity_group_patch.js");
const entity_group_rendering_patch = require("./patches/entity_group_rendering_patch.js");
const fog_of_war_patch = require("./patches/fog_of_war_patch.js");
const health_bar_patch = require("./patches/health_bar_patch.js");
const hotkey_patch = require("./patches/hotkey_patch.js");
const hover_status_patch = require("./patches/hover_status_patch.js");
const hover_scroll_patch = require("./patches/hover_scroll_patch.js");
const main_menu_background_patch = require("./patches/main_menu_background_patch.js");
const resource_bar_patch = require("./patches/resource_bar_patch.js");

module.exports =  [
	action_button_hotkey_patch,
	bugfix_patch,
	building_placement_patch,
	contextual_command_patch,
	drag_select_patch,
	entity_balance_patch,
	entity_group_patch,
	entity_group_rendering_patch,
	fog_of_war_patch,
	health_bar_patch,
	hotkey_patch,
	hover_status_patch,
	hover_scroll_patch,
	main_menu_background_patch,
	resource_bar_patch
];
