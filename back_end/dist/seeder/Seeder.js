"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MainSeeder = void 0;
const typeorm_extension_1 = require("typeorm-extension");
const SetSeeder_1 = require("./SetSeeder");
const CardSeeder_1 = require("./CardSeeder");
class MainSeeder {
    async run(dataSource, factoryManager) {
        // await runSeeder(dataSource, UserSeeder)
        await (0, typeorm_extension_1.runSeeder)(dataSource, SetSeeder_1.SetSeeder);
        await (0, typeorm_extension_1.runSeeder)(dataSource, CardSeeder_1.CardsSeeder);
    }
}
exports.MainSeeder = MainSeeder;
