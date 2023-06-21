/**
 * @category Internal
 */
export interface IBaseTextValueAsString {

    text: string;

}

/**
 * @category Internal
 */
export interface IBaseTextValueAsXml {

    xml: string;

    mapping: string;

}

/**
 * @category Internal
 */
export interface IBaseTextValueAsHtml {

    html: string;

    xml?: string;

}

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
