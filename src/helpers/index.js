import moment from 'moment';

export default {
  URLify(val) {
    return val.replace(
      /((http|https|ftp):\/\/[\w?=&./-;#~%-]+(?![\w\s?&./;#~%"=-]*>))/g,
      '<a class="urlify" href="$1" target="_BLANK">$1</a> ',
    );
  },
  fromNow(val) {
    return moment(val, 'ddd MMM DD HH:mm:ss Z YYYY').fromNow();
  },
};
