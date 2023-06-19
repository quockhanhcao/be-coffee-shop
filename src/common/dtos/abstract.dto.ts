import { AbstractEntity } from "@common/entities/abstract.entity";
import { Expose } from "class-transformer";

export class AbstractDto {
    @Expose()
    id: number;

    createdAt: Date;

    createdBy: string;

    updatedAt: Date;

    updatedBy: string;

    constructor(entity?: AbstractEntity) {

    }
}