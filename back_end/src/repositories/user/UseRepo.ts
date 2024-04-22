import UserRepoInterface from "./UserRepoInterface";
import { User } from '../../entity/User';
import { AppDataSource } from "../../data-source"
import { Service } from "typedi";
import { hasingPassword, comparePassword } from "@helper/HashingPassword";
@Service()
class UserRepo implements UserRepoInterface {
    private userDataSource = AppDataSource.getRepository(User)

    getUserByUsername = async (username: string): Promise<any> => {
        const result = await this.userDataSource.findOne(
            {
                where: {
                    username: username
                },
                select: [
                    'id',
                    'username',
                    'email',
                    'password',
                    'role',
                ]
            }
        )
        return result;
    };

    isExistedEmail = async (email: string): Promise<boolean> => {
        const user = await this.userDataSource.find({
            where: {
                email: email
            }
        })
        if (user.length) {
            return true;
        }
        return false;
    }

    createUser = async (data: any): Promise<User | null> => {
        const user = new User();
        user.email = data.email;
        user.username = data.username;
        const { password } = hasingPassword(String(data.password))
        user.password = password;
        const created = await this.userDataSource.save(user);
        return created
    }

    me = async (id: string): Promise<User | null> => {
        const result = await this.userDataSource.findOne({
            where: {
                id: id
            },
        })

        return result;
    }

    updateUser = async (userId: string, userData: any): Promise<boolean> => {
        return false;
    }

    isExistedToken = async (token: string): Promise<boolean> => {
        const user = await this.userDataSource.findOneBy({
            token: token
        })
        if (user) {
            return true;
        }
        return false;
    }

    storeToken = async (id: string, token: string): Promise<boolean> => {
        const user = await this.userDataSource.findOneBy({
            id: id
        })
        if (user) {
            user.token = token;
            user.updated_at = new Date();
            await this.userDataSource.save(user);
            return true
        }
        return false;
    }

    updateUserPassword = async (id: string, password: string): Promise<boolean> => {
        const user = await this.userDataSource.findOneBy({
            id: id
        })
        if (user) {
            user.password = password;
            await this.userDataSource.save(user);
            return true;
        }
        return false;
    }

    getUserByEmail = async (email: string): Promise<User | null> => {
        const result = await this.userDataSource.findOne(
            {
                where: {
                    email: email
                }
            }
        )
        return result;
    }

}

export default UserRepo;