import { ReadResource } from "../../../../src";
import testthing from "../v2/resources/resource-sequence.json";

export namespace MockResource {

    export const getTestthing = (): ReadResource[] => {
        return testthing as unknown as ReadResource[];
    };

}
