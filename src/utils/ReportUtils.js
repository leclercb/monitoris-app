import moment from 'moment';
import { getConfig } from 'config/Config';

export function fillGapsInArray(array, property = 'timestamp') {
    array = [...array];

    for (let i = 0; i < array.length; i++) {
        const currItem = array[i];
        const nextItem = i + 1 >= array.length ? null : array[i + 1];

        if (!nextItem) {
            continue;
        }

        if (moment(nextItem[property] * 1000).diff(moment(currItem[property] * 1000), 'seconds') > getConfig().instanceQueueMaxDelay) {
            array.splice(i + 1, 0, { [property]: moment(currItem[property] * 1000).add(getConfig().instanceQueueDelay, 'seconds').unix() });
        }
    }

    return array;
}