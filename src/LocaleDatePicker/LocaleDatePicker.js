import MomentUtils from '@date-io/moment';
import DateRangeIcon from '@material-ui/icons/DateRange';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import moment from 'moment';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';

import { DateTimePicker } from '../DateTimePicker';

import 'moment/locale/ca';
import 'moment/locale/es';

export function LocaleDatePicker({
  onChange,
  name,
  todayDatePickerLabel,
  clearDatePickerLabel,
  cancelDatePickerLabel,
  okDatePickerLabel,
  ...props
}) {

  const [locale, setLocale] = useState('en');

  useEffect(() => {
    const lng = localStorage.getItem('i18nextLng');
    moment.locale(lng);
  }, []);

  const handleChange = event => {
    return onChange && onChange({ target: { name: name, value: event.target.value } });
  };

  return (
    <MuiPickersUtilsProvider libInstance={moment} utils={MomentUtils} locale={locale}>
      <DateTimePicker
        {...props}
        showTodayButton={false}
        icon={<DateRangeIcon />}
        onChange={handleChange}
        todayLabel={todayDatePickerLabel}
        clearLabel={clearDatePickerLabel}
        cancelLabel={cancelDatePickerLabel}
        okLabel={okDatePickerLabel}
      />
    </MuiPickersUtilsProvider>
  );
}

LocaleDatePicker.propTypes = {
  onChange: PropTypes.func,
  name: PropTypes.string.isRequired,
  todayDatePickerLabel: PropTypes.string,
  clearDatePickerLabel: PropTypes.string,
  cancelDatePickerLabel: PropTypes.string,
  okDatePickerLabel: PropTypes.string
};
