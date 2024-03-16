import moment from "moment";

export const formatDateFromNow = (ms: number) => {
  moment.locale("RU");
  return moment(ms * 1000)
    .startOf("hour")
    .fromNow();
};
