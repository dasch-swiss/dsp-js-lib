/**
 * @category Internal
 */
export interface IBaseUnformattedTextValue {

    text: string;

}

/**
 * @category Internal
 */
export interface IBaseFormattedTextValue {

    xml: string;

    mapping: string;

}

/**
 * @category Internal
 */
export interface IBaseCustomFormattedTextValue {

    html: string;

    xml?: string;

}
