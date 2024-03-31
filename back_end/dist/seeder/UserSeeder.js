"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserSeeder = void 0;
const User_1 = require("../entity/User");
const HashingPassword_1 = require("../helper/HashingPassword");
const Constant_1 = require("../core/Constant");
class UserSeeder {
    async run(dataSource, factoryManager) {
        const userRepository = dataSource.getRepository(User_1.User);
        const { password } = (0, HashingPassword_1.hasingPassword)(String("password"));
        const userData = {
            username: 'admin',
            email: 'admin@email.com',
            password: password,
            createdAt: new Date(),
            createdBy: 'Seeder',
            role: Constant_1.Constants.USER_ROLE.ADMIN
        };
        const userExists = await userRepository.findOneBy({ email: userData.email });
        if (!userExists) {
            const newUser = userRepository.create(userData);
            await userRepository.save(newUser);
        }
    }
}
exports.UserSeeder = UserSeeder;
