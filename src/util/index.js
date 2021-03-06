import moment from 'moment';
import _ from 'lodash';

export const DATE_PREFIX = '2020-10-20T';

export const calcDuration = (start, end) => moment.duration(
  moment(end).diff(moment(start)),
).asMinutes();

// height
export const calcRowSpan = (startTime, endTime, datePrefix = DATE_PREFIX) => {
  // Calculate the duration of class in minutes
  const classDuration = calcDuration(startTime, endTime);
  // The earlist class starts from 8am in the morning
  const classStart = calcDuration(`${datePrefix}08:00:00`, startTime);
  // Calculate the offset in multiple of ten minutes
  const rowStart = Math.floor(classStart / 10) + 1;
  // grid-row-start / grid-row-end
  return `${rowStart}/${rowStart + Math.floor(classDuration / 10)}`;
};

export const calcColSpan = (dayOfWeek) => `${dayOfWeek}/${dayOfWeek + 1}`;

export const calculateCardPosition = (
  startTime,
  endTime,
  dayOfWeek = 1,
  datePrefix = DATE_PREFIX,
) => ({
  gridRow: calcRowSpan(
    datePrefix + startTime,
    datePrefix + endTime,
    datePrefix,
  ),
  gridColumn: calcColSpan(dayOfWeek),
});

export const parseSections = (sections = []) => {
  // organize sections by instruction type: LE, DI
  const groupedSections = _.groupBy(sections, 'instructionType');
  // lecture
  const lecture = groupedSections.LE[0];
  // di
  const discussion = groupedSections.DI;
  // finals
  const final = _.groupBy(lecture.additionalMeetings, 'meetingType').FI[0];
  return {
    lecture,
    discussion,
    final,
  };
};
