import {JsonObject, JsonProperty} from 'json2typescript';
import {ReadValue} from './read-value';
import {Constants} from '../../Constants';

/**
 * Precision for DateSalsah.
 */
export enum Precision {
    yearPrecision,
    monthPrecision,
    dayPrecision
}

/**
 * Represents a Salsah date object with a precision information.
 */
export class Date {

    // TODO: support instantiation of a JDNConvertibleCalendar subclass, e.g., GregorianCalendarDate

    private static separator = '-';

    readonly precision: Precision;

    constructor(
            readonly calendar: string,
            readonly era: string,
            readonly year: number,
            readonly month?: number,
            readonly day?: number
    ) {
        if (this.month === undefined) {
            // year precision
            this.precision = Precision.yearPrecision;
        } else if (this.day === undefined) {
            // month precision
            this.precision = Precision.monthPrecision;
        } else {
            // day precision
            this.precision = Precision.dayPrecision;
        }

    }
}

/**
 * Represents a period (with start date and end date).
 */
export class Period {

    constructor(
            readonly start: Date,
            readonly end: Date
    ) {}

}

@JsonObject('ReadDateValue')
export class ReadDateValue extends ReadValue {

    date: Date | Period;

    @JsonProperty(Constants.DateValueHasCalendar, String)
    private calendar: string = "";

    @JsonProperty(Constants.DateValueHasStartDay, Number, true)
    private startDay?: number = undefined;

    @JsonProperty(Constants.DateValueHasStartMonth, Number, true)
    private startMonth?: number = undefined;

    @JsonProperty(Constants.DateValueHasStartYear, Number)
    private startYear: number = 0;

    @JsonProperty(Constants.DateValueHasStartEra, String)
    private startEra: string = "";

    @JsonProperty(Constants.DateValueHasEndDay, Number, true)
    private endDay?: number = undefined;

    @JsonProperty(Constants.DateValueHasEndMonth, Number, true)
    private endMonth?: number = undefined;

    @JsonProperty(Constants.DateValueHasEndYear, Number)
    private endYear: number = 0;

    @JsonProperty(Constants.DateValueHasEndEra, String)
    private endEra: string = "";

    private parseDate() {

        if (this.startYear === this.endYear && this.startMonth === this.endMonth && this.startDay === this.endDay && this.startEra === this.endEra) {
            // single date
            this.date = new Date(this.calendar, this.startEra, this.startYear, this.startMonth, this.startDay);
        } else {
            // date period
            this.date = new Period(new Date(this.calendar, this.startEra, this.startYear, this.startMonth, this.startDay), new Date(this.calendar, this.endEra, this.endYear, this.endMonth, this.endDay));
        }
    }
}
