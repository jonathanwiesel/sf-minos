import { Connection } from 'jsforce'; 

import { Result } from './result';
import { MetadataType } from './metadataType';


export class Minos {
    
    conn: Connection;
    typesCache: Map<string, MetadataType>;
    usagePerType: Map<string, Map<string, Result>>;

    constructor(conn: Connection) {
        if (!conn.accessToken) {
            throw new Error('You must pass a valid and authenticated connection to the constructor');
        }
        this.conn = conn;
        this.typesCache = new Map();
        this.usagePerType = new Map();
    }

    public getReportableTypes(): Array<string> {
        //TODO
        return;
    }

    public async reportUsage(types: Array<string>): Promise<Map<string, Map<string, Result>>> {
        
        //TODO: check types are from supported types

        await this.createDescriptorsAndDetermineUsage(types);
        
        let result: Map<string, Map<string, Result>> = new Map();

        //TODO

        return result;
    }


    private async createDescriptorsAndDetermineUsage(types: Array<string>): Promise<void> {

        let typeDef: MetadataType;
        let dependencies: Array<string>;
        let usagesForType: Map<string, Result>;

        for (let type of types) {

            if (!this.typesCache.has(type)) {

                typeDef = MetadataType.createMetadataTypeDefinition(type, this.conn);
                this.typesCache.set(type, typeDef);

                dependencies = typeDef.getDependantTypes();

                if (dependencies.length) {
                    await this.createDescriptorsAndDetermineUsage(dependencies);
                }

                await typeDef.fillTypeData();

                usagesForType = typeDef.reportUsage(this.usagePerType);

                this.usagePerType.set(type, usagesForType);
            }
        }
    }    
}