import { Container } from 'typedi';
import { DataSource } from 'typeorm';
import { Seeder, SeederFactoryManager } from 'typeorm-extension';

import { Constants } from '../core/Constant';
import { Cards } from '../entity/Cards';
import { Sets } from '../entity/Sets';
import setJson from './json/approveUserSet.json';
import { User } from '../entity/User';
import { hasingPassword } from '../helper/HashingPassword';
import { IUploadService } from '../services/upload/IUploadService';
import { FirebaseUpload } from '../services/upload/FirebaseUpload';
export class ApproveUserSet implements Seeder {
    private uploadService : IUploadService;

    constructor() {
        this.uploadService = Container.get(FirebaseUpload);
    }

    async run(
        dataSource: DataSource,
        factoryManager: SeederFactoryManager,
    ): Promise<void> {
        const setsData = setJson.set;
        const userData = setJson.user;
        const { password } = hasingPassword(String('password'));

        const user = new User();
        user.email = userData.email;
        user.password = password;
        user.username = userData.username;
        user.role = Constants.USER_ROLE.USER;
        user.created_at = new Date();

        for (const set of setsData) {
            const newSet = new Sets();
            newSet.name = set.name;
            newSet.description = set.description;
            newSet.status = Constants.SET_STATUS.PENDING
            newSet.user = user;
            newSet.created_by = user.username;
            if (set?.image) {
                // const image_url = await this.s3Service.uploadFile({
                //     filename: String(set.name) + '.jpg',
                //     path: set?.image,
                //     mimetype: 'image/*',
                // });
                // newSet.image = image_url?.Location || '';
                const image_uploaded = await this.uploadService.uploadImage(
                    {
                        originalname: String(set.name) + `${Date.now()}`,
                        path: set?.image,
                        mimetype: 'image/*',
                    });
                const image_url = image_uploaded;
                newSet.image = image_url;
            }

            newSet.is_public = set.is_public;
            newSet.created_at = new Date();

            newSet.cards = [];

            for (const card of set.cards) {
                const newCard = new Cards();
                if (card?.image) {
                    // const image_url = await this.s3Service.uploadFile({
                    //     filename: String(card.term) + '.jpg',
                    //     path: card?.image,
                    //     mimetype: 'image/*',
                    // });
                    // newCard.image = image_url?.Location || '';
                    const image_uploaded = await this.uploadService.uploadImage(
                        {
                            originalname: String(card.term) + `${Date.now()}`,
                            path: card?.image,
                            mimetype: 'image/*',
                        });
                    const image_url = image_uploaded;
                    newCard.image = image_url;
                }
                newCard.term = card.term;
                newCard.define = card.define;
                newCard.example = JSON.stringify(card.example);
                newCard.created_by = 'flashcard.web';
                newSet.cards.push(newCard);
            }

            await dataSource.transaction(async (manager) => {
                await manager.save(user);
                await manager.save(newSet.cards);
                await manager.save(newSet);
            });
        }
    }
}
