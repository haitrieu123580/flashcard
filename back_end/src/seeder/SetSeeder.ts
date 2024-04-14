import { DataSource } from 'typeorm'
import { Seeder, SeederFactoryManager } from 'typeorm-extension'
import { Sets } from '../entity/Sets'
import { Cards } from '../entity/Cards';
import { S3Service } from '../services/s3/S3Service';
import { Container } from 'typedi'
import fs from 'fs';
import { create } from 'domain';

export class SetSeeder implements Seeder {
    private s3Service: S3Service;

    constructor() {
        this.s3Service = Container.get(S3Service);
    }

    async run(
        dataSource: DataSource,
        factoryManager: SeederFactoryManager
    ): Promise<void> {

        const setsData = [
            {
                name: "Set 1",
                description: "This is set 1",
                image: "./src/seeder/image/dog.jpg",
                created_by: "Seeder",
                created_at: new Date(),
                cards: [
                    {
                        term: "Term 1",
                        define: "Define 1",
                        set: null,
                        example: [
                            {
                                sentence: "abc",
                                translation: "zyx"
                            },
                        ],
                        created_by: "Seeder",
                        created_at: new Date()
                    },
                    {
                        term: "Term 2",
                        define: "Define 2",
                        set: null,
                        created_by: "Seeder",
                        created_at: new Date()
                    },
                ]
            },
        ]

        for (const set of setsData) {
            const newSet = new Sets()
            newSet.name = set.name
            newSet.description = set.description

            if (set.image) {
                const image_url = await this.s3Service.uploadFile({
                    filename: String(set.name) + '.jpg',
                    path: set.image,
                    mimetype: 'image/jpeg',

                });
                newSet.image = image_url?.Location || "";
            }

            newSet.created_by = set.created_by
            newSet.created_at = set.created_at

            if (!newSet.cards) {
                newSet.cards = [];
            }

            for (const card of set.cards) {
                const newCard = new Cards()
                newCard.term = card.term
                newCard.define = card.define
                newCard.example = JSON.stringify(card.example)
                newCard.created_by = card.created_by
                newSet.cards.push(newCard)
            }

            await dataSource.transaction(async manager => {
                await manager.save(newSet.cards)
                await manager.save(newSet)
            })
        }
    }
}