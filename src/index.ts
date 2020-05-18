import { Connection } from 'jsforce'; 

import { Result } from './result';
import { MetadataType, SupportedType } from './metadataType';


export class Minos {
    
    conn: Connection;
    typesCache: Map<SupportedType, MetadataType>;
    usagePerType: Map<SupportedType, Map<string, Result>>;

    constructor(conn: Connection) {
        if (!conn.accessToken) {
            throw new Error('You must pass a valid and authenticated connection to the constructor');
        }
        this.conn = conn;
        this.typesCache = new Map();
        this.usagePerType = new Map();
    }

    public async reportUsage(types: Array<SupportedType>): Promise<Map<SupportedType, Map<string, Result>>> {
        
        await this.createDescriptorsAndDetermineUsage(types);
        
        let result: Map<SupportedType, Map<string, Result>> = new Map();

        //TODO

        return result;
    }


    private async createDescriptorsAndDetermineUsage(types: Array<SupportedType>): Promise<void> {

        let typeDef: MetadataType;
        let dependencies: Array<SupportedType>;
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