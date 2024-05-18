import environment from "../../../environment";
import { ShootingSceneStatusEnumArray, ShootingStatusEnumArray } from "../../Ennums/ennums";
import DatabaseSchema from "../database_schema";

const shootingSchema = {
  title: 'shooting schema',
  version: 0,
  type: 'object',
  primaryKey: 'id',
  properties: {
    id: {
      type: 'string',
      maxLength: 250,
    },
    projectId: {
      type: 'number',
    },
    unitId: {
      type: 'number',
    },
    shootDate: {
      type: ['string', 'null'],
    },
    generalCall: {
      type: ['string', 'null'],
    },
    onSet: {
      type: ['string', 'null'],
    },
    estimatedWrap: {
      type: ['string', 'null'],
    },
    firstShoot: {
      type: ['string', 'null'],
    },
    wrap: {
      type: ['string', 'null'],
    },
    lastOut: {
      type: ['string', 'null'],
    },
    status: {
      type: 'number',
      ennum: ShootingStatusEnumArray,
    },
    isTest: {
      type: 'boolean',
    },
    createdAt: {
      type: 'string',
    },
    updatedAt: {
      type: 'string',
    },
    scenes: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          id: {
            type: 'string',
            maxLength: 250,
          },
          projectId: {
            type: 'number',
          },
          shootingId: {
            type: 'number',
          },
          sceneId: {
            type: 'string',
          },
          status: {
            type: 'number',
            ennum: ShootingSceneStatusEnumArray,
          },
          position: {
            type: ['number', 'null'],
          },
          rehersalStart: {
            type: ['string', 'null'],
          },
          rehersalEnd: {
            type: ['string', 'null'],
          },
          startShooting: {
            type: ['string', 'null'],
          },
          endShooting: {
            type: ['string', 'null'],
          },
          producedSeconds: {
            type: ['number', 'null'],
          },
          setups: {
            type: ['number', 'null'],
          },
          createdAt: {
            type: 'string',
          },
          updatedAt: {
            type: 'string',
          },
        },
      },
    },
  },
  required: ['projectId', 'unitId', 'scenes'],
};


const shootingSchemaInput = {
  shootings: {
    schema: shootingSchema,
    checkpointFields: [
      'id',
      'updatedAt',
      'lastProjectId'
    ],
    deletedField: 'deleted',
  },
};

export default class ShootingsSchema extends DatabaseSchema {
  static schemaName = 'shootings';

  static endpointPullName = environment.SHOOTINGS_ENDPOINT_PULL;

  static endpointPushName = environment.SHOOTINGS_ENDPOINT_PUSH;

  getEndpointPullName() {
    return ShootingsSchema.endpointPullName;
  }

  getEndpointPushName() {
    return ShootingsSchema.endpointPushName;
  }

  getSchemaName() {
    return ShootingsSchema.schemaName;
  }

  constructor() {
    const { schemaName } = ShootingsSchema;
    const schemaInput = shootingSchemaInput;
    super(schemaName, schemaInput);
  }
}