/**
 * Oveda API
 * This API provides endpoints to interact with the Oveda data.
 *
 * OpenAPI spec version: 0.1.0
 *
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 */

export interface PlaceDump {
  readonly createdAt?: Date;
  description?: string;
  readonly id?: number;
  locationId?: number;
  name: string;
  organizationId?: number;
  photoId?: number;
  readonly updatedAt?: Date;
  url?: string;
}
