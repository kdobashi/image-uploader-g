import DateFnsUtils from '@date-io/date-fns';
import format from "date-fns/format"

export class ExtendedDateFnsUtils extends DateFnsUtils {
    getCalendarHeaderText(date: Date) {
        return format(date, "yyyy年 MMM", { locale: this.locale });
    }
    getDatePickerHeaderText(date: Date) {
        return format(date, "MMMd日(E)", { locale: this.locale });
    }
}

export default ExtendedDateFnsUtils;