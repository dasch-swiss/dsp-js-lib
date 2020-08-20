export namespace CustomConverterUtils {

    export const isString = (maybeString: any): boolean => {
        return (typeof maybeString === "string");
    };

}

export class Utils {

    /**
     * Lambda function eliminating duplicates in a collection to be passed to [[filter]].
     *
     * @param elem element of an Array that is currently being looked at.
     * @param index current elements index.
     * @param self reference to the whole Array.
     * @returns {boolean true if the same element does not already exist in the Array.
     */
    static filterOutDuplicates = (elem: any, index: number, self: any) => {

        // https://stackoverflow.com/questions/16747798/delete-duplicate-elements-from-an-array
        // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter?v=example

        // returns true if the element's index equals the index of the leftmost element
        // -> this means that there is no identical element before this index, hence it is not a duplicate
        // for all other elements, false is returned
        return index === self.indexOf(elem);

    }
}
