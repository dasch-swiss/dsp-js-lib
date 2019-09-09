import { JsonObject, JsonProperty } from "json2typescript";
import { Constants } from "../../Constants";
import { ReadValue } from "./read-value";

@JsonObject("ReadGeomValue")
export class ReadGeomValue extends ReadValue {

    @JsonProperty(Constants.GeometryValueAsGeometry, String)
    geometryString: string = "";

    geometry: RegionGeometry;

    private parseGeometry(): void {
        const geometryJSON = JSON.parse(this.geometryString);

        const points: Point2D[] = [];
        for (const point of geometryJSON.points) {
            points.push(new Point2D(point.x, point.y));
        }

        let radius;
        if (geometryJSON.radius) {
            radius = new Point2D(geometryJSON.radius.x, geometryJSON.radius.y);
        }

        this.geometry = new RegionGeometry(
            geometryJSON.status,
            geometryJSON.lineColor,
            geometryJSON.lineWidth,
            points,
            geometryJSON.type,
            radius
        );
    }
}

/**
 * Represents a point in a 2D-coordinate system (for geometry values).
 */
export class Point2D {
    constructor(public x: number, public y: number) {
    }
}

/**
 * Represents a geometry value parsed from JSON.
 */
export class RegionGeometry {
    constructor(public status: string,
                public lineColor: string,
                public lineWidth: number,
                public points: Point2D[],
                public type: string,
                public radius?: Point2D
    ) {
    }
}
