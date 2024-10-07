const dateFormatter = Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    hourCycle: 'h24'
});

/**
 * @deprecated
 * use formattedDate
 * */
export const datetime = (date: string | Date, placeholder = '') => {
    if (!date) {
        if (!placeholder) {
            return '--';
        }

        return placeholder;
    }

    let formatted;

    formatted = dateFormatter.format(toDate(date));
    formatted = replaceSlashesToSeperator(formatted);

    return formatted;
};

const beforeBracketsPart = /(.*)\s\(.*\)$/;

export const filtersdate = (date: Date | string) => {
    return date.toString().replace(beforeBracketsPart, '$1');
};

const toDate = (date: Date | string) => {
    return typeof date === 'string' ? new Date(date) : date;
};

const replaceSlashesToSeperator = (value: string, replaceTo = '.') => {
    return value.split('/').join(replaceTo);
};

export const formattedDate = (
    value: null | Date | string = null,
    settings?: {
        dateSeparator?: '.' | '-' | '/',
        replaceSlashes?: boolean,
        dateTimeSeparator?: '' | ',',
        replaceEmptyValue?: string,
        type?: 'date' | 'time' | 'date-time',
    }
) => {
    const {
        dateSeparator = '.',
        replaceSlashes = false, // it is necessary to turn on? slashes/any separators used by locale default format, no need to replace it
        dateTimeSeparator = ',',
        replaceEmptyValue = '--',
        type = 'date',
    } = settings || {};

    if (!value) {
        return replaceEmptyValue;
    }

    const locale = 'en-US';

    const dateFormatOptions = {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
    };

    try {
        let formattedDate = new Intl.DateTimeFormat(locale, dateFormatOptions).format(toDate(value));

        formattedDate = replaceSlashes ? replaceSlashesToSeperator(formattedDate, dateSeparator) : formattedDate;

        const formattedTime = new Intl.DateTimeFormat(locale, {
            hour: '2-digit',
            minute: '2-digit',
            hourCycle: 'h23',
        }).format(toDate(value));

        switch (type) {
            case 'date':
                return formattedDate;
            case 'time':
                return formattedTime;
            case 'date-time':
                return `${formattedDate}${dateTimeSeparator} ${formattedTime}`;
        }
    } catch (e) {

        return replaceEmptyValue;
    }
};