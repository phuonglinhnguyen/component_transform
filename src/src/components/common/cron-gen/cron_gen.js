import React, { Component } from 'react';
import { Tabs, Tab } from 'material-ui/Tabs';
import Popover from 'material-ui/Popover';
import TextField from 'material-ui/TextField';
import MinutesTab from '../../common/cron-gen/minutes_tab';
import HourlyTab from '../../common/cron-gen/hourly_tab';
import DailyTab from '../../common/cron-gen/daily_tab';
import WeeklyTab from '../../common/cron-gen/weekly_tab';

import * as constants from './cron_gen_constants';
import { getCronString } from './cron_gen_function';

class CronGen extends Component {
  constructor(props) {
    super(props);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleRadioChange = this.handleRadioChange.bind(this);
    this.handleSelectFieldHourChange = this.handleSelectFieldHourChange.bind(this);
    this.handleSelectFieldMinuteChange = this.handleSelectFieldMinuteChange.bind(this);
    this.handleSelectFieldIndexChange = this.handleSelectFieldIndexChange.bind(
      this
    );
    this.handleSelectFieldDayChange = this.handleSelectFieldDayChange.bind(
      this
    );
    this.handleDaysChecked = this.handleDaysChecked.bind(this);
    this.state = {
      cronValue: this.props.cronValue,
      cronString: getCronString(this.props.cronValue),
      errorText: '',
      open: false,
      activeTab: constants.MINUTES_TAB,
      minutes: { minute: '1' },
      hourly: {
        type: '1',
        everyHour: '1',
        hour: 0,
        minute: 0
      },
      daily: {
        type: '1',
        everyDay: '1',
        hour: 0,
        minute: 0
      },
      weekly: {
        days: [],
        hour: 0,
        minute: 0
      },
      monthly: {
        type: '1',
        day: { day: '1', everyMonth: '1' },
        dayIndex: { index: 1, dayOfWeek: 'MON', everyMonth: '1' },
        hour: 0,
        minute: 0
      }
    };
  }
  handleTouchTap = event => {
    // This prevents ghost click.
    event.preventDefault();

    this.setState({
      open: true,
      anchorEl: event.currentTarget
    });
   
  };

  handleRequestClose = () => {
 this.setState({
      open: false
    });
    this.props.handleChange(this.state.cronValue);
  };

  handleDaysChecked(event, checked) {
    const weekly = this.state.weekly;
    const value = event.target.value;

    const newDay = constants.days.find(day => day.val === value);

    if (checked) {
      if (!weekly.days.find(day => day.val === value)) {
        weekly.days.push(newDay);
      }
    } else {
      // if (weekly.days.find(day => day.val === value)) {
      weekly.days.pop(newDay);
      //}
    }
    weekly.days.sort(function (a, b) {
      return a.key - b.key;
    });
    this.setState({ weekly: weekly });
    this.getCronValue();
  }

  handleTabChange = value => {
    this.setState({
      activeTab: value
    });
  };
  handleRadioChange(event) {
    const activeTab = this.state.activeTab;

    const target = event.target;
    const value = target.value;
    const name = target.name;
    switch (activeTab) {
      case constants.HOURLY_TAB: {
        const hourly = this.state.hourly;
        hourly[name] = value;

        this.setState({ hourly: hourly });
        break;
      }
      case constants.DAILY_TAB: {
        const daily = this.state.daily;
        daily[name] = value;

        this.setState({ daily: daily });
        break;
      }
      case constants.MONTHLY_TAB: {
        const monthly = this.state.monthly;
        monthly[name] = value;

        this.setState({ monthly: monthly });
        break;
      }
      default:
        break;
    }
    this.getCronValue();
  }

  handleSelectFieldMinuteChange(event, index, value) {
    this.handleSelectFieldChange('minute', value);
  }
  handleSelectFieldHourChange(event, index, value) {
    this.handleSelectFieldChange('hour', value);
  }
  handleSelectFieldIndexChange(event, index, value) {
    this.handleSelectFieldChange('index', value);
  }
  handleSelectFieldDayChange(event, index, value) {
    this.handleSelectFieldChange('dayOfWeek', value);
  }
  handleSelectFieldChange(name, value) {
    const activeTab = this.state.activeTab;
    switch (activeTab) {
      case constants.HOURLY_TAB: {
        const hourly = this.state.hourly;
        hourly[name] = value;
        this.setState({ hourly: hourly });
        break;
      }
      case constants.DAILY_TAB: {
        const daily = this.state.daily;
        daily[name] = value;
        this.setState({ daily: daily });
        break;
      }
      case constants.WEEKLY_TAB: {
        const weekly = this.state.weekly;
        weekly[name] = value;
        this.setState({ weekly: weekly });
        break;
      }
      case constants.MONTHLY_TAB: {
        const monthly = this.state.monthly;

        monthly.dayIndex[name] = value;

        this.setState({ monthly: monthly });
        break;
      }
      default:
        break;
    }
    this.getCronValue();
  }
  handleKeyDown(event) {


    const tag = event.target.tagName.toLowerCase();
    const name = event.target.name;
    if (tag !== "input" || name === 'cronValue') {
      return;
    }
    var charCode = event.which || event.keyCode;


    this.handleEvent(event);
    if (charCode === 13) {
      this.handleRequestClose();
    }

  }

  componentDidMount() {
    window.addEventListener("keydown", this.handleKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener("keydown", this.handleKeyDown);
  }
  handleEvent(event) {
    const target = event.target;
    var value = target.type === 'checkbox' ? target.checked : target.value;
    var value = value || "";
    if (value.trim().length === 0 || value.match(/^\d+$/)) {
      const name = target.name;
      const activeTab = this.state.activeTab;

      switch (activeTab) {
        case constants.MINUTES_TAB: {
          const minutes = this.state.minutes;
          minutes[name] = value;

          this.setState({
            minutes: minutes
          });
          break;
        }
        case constants.HOURLY_TAB: {
          const hourly = this.state.hourly;
          hourly[name] = value;

          this.setState({ hourly: hourly });

          break;
        }
        case constants.DAILY_TAB: {
          const daily = this.state.daily;
          daily[name] = value;

          this.setState({ daily: daily });
          break;
        }
        case constants.WEEKLY_TAB: {
          const weekly = this.state.weekly;
          weekly[name] = value;
          this.setState({ weekly: weekly });
          break;
        }
        case constants.MONTHLY_TAB: {
          const monthly = this.state.monthly;
          const nameArray = name.split('.');
          const obj = monthly[nameArray[0]];
          const secondObj = nameArray[1];

          obj[secondObj] = value;

          this.setState({ monthly: monthly });
          break;
        }
        default:
          break;
      }

      this.getCronValue();
    }
  }

  handleInputChange(event) {
    this.handleEvent(event);
  }

  getCronDisplay(cronValue) {
    if (cronValue && cronValue !== '') {
      this.setState({
        cronString: getCronString(cronValue),
        errorText: ''
      });
    } else {
      this.setState({
        cronString: '',
        errorText: 'Schedule is not set'
      });
    }
  }

  getCronValue() {
    const activeTab = this.state.activeTab;
    let cronValue = '';

    switch (activeTab) {
      case constants.MINUTES_TAB: {
        if (this.state.minutes.minute && this.state.minutes.minute.length > 0) {
          cronValue = '* */' + this.state.minutes.minute + ' * * * *';
        }

        break;
      }
      case constants.HOURLY_TAB: {
        if (this.state.hourly.type === '1') {
          if (
            this.state.hourly.everyHour &&
            this.state.hourly.everyHour.length > 0
          ) {
            cronValue = '* * */' + this.state.hourly.everyHour + ' * * *';
          }
        } else {
          cronValue =
            '* ' +
            this.state.hourly.minute +
            ' ' +
            this.state.hourly.hour +
            ' * * *';
        }

        break;
      }
      case constants.DAILY_TAB: {
        if (this.state.daily.everyDay && this.state.daily.everyDay.length > 0) {
          cronValue =
            '* ' +
            this.state.daily.minute +
            ' ' +
            this.state.daily.hour +
            ' */' +
            this.state.daily.everyDay +
            ' * *';
        }

        break;
      }
      case constants.WEEKLY_TAB: {
        var selectedDays = '';
        if (this.state.weekly.days.length > 0) {
          this.state.weekly.days.map(day => (selectedDays += day.key + ','));
          if (selectedDays.length > 0) {
            selectedDays = selectedDays.substr(0, selectedDays.length - 1);
          }
        } else {
          selectedDays = '*';
        }
        cronValue =
          '* ' +
          this.state.weekly.minute +
          ' ' +
          this.state.weekly.hour +
          ' * * ' +
          selectedDays;

        break;
      }
      default:
        break;
    }

    this.setState({ cronValue: cronValue });
    this.getCronDisplay(cronValue);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      cronValue: nextProps.cronValue
    });
    this.getCronDisplay(nextProps.cronValue);
  }

  render() {
   
    return (
      <div>
        <div className="component-inline-flex">
          <div style={{ width: '70%' }}>
            <TextField
              name="cronValue"
              type="text"
              fullWidth={true}
              floatingLabelStyle={{ top: '15px' }}
              floatingLabelText="Acquisition schedule"
              floatingLabelFixed={true}
              inputStyle={{ color: 'blue' }}
              readOnly={true}
              errorText={this.state.errorText}
              value={this.state.cronString}
              onClick={this.handleTouchTap}
              multiLine={true}
            />
          </div>

        </div>

        <Popover
          open={this.state.open}
          anchorEl={this.state.anchorEl}
          anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
          targetOrigin={{ horizontal: 'left', vertical: 'top' }}
          onRequestClose={this.handleRequestClose}
          style={{ width: '40%' }}
        >
          <Tabs value={this.state.activeTab} onChange={this.handleTabChange}>
            <Tab label={constants.MINUTES_TAB} value={constants.MINUTES_TAB}>
              <MinutesTab
                handleKeyPess={this.handleKeyPess}
                handleInputChange={this.handleInputChange}
                minutes={this.state.minutes}
              />
            </Tab>
            <Tab label={constants.HOURLY_TAB} value={constants.HOURLY_TAB}>
              <HourlyTab
                handleRadioChange={this.handleRadioChange}
                handleSelectFieldHourChange={this.handleSelectFieldHourChange}
                handleSelectFieldMinuteChange={
                  this.handleSelectFieldMinuteChange
                }
                handleInputChange={this.handleInputChange}
                hourly={this.state.hourly}
                hours={constants.hours}
                minutes={constants.minutes}
              />
            </Tab>
            <Tab label={constants.DAILY_TAB} value={constants.DAILY_TAB}>
              <DailyTab
                handleRadioChange={this.handleRadioChange}
                handleSelectFieldHourChange={this.handleSelectFieldHourChange}
                handleSelectFieldMinuteChange={
                  this.handleSelectFieldMinuteChange
                }
                handleInputChange={this.handleInputChange}
                daily={this.state.daily}
                hours={constants.hours}
                minutes={constants.minutes}
              />
            </Tab>
            <Tab label={constants.WEEKLY_TAB} value={constants.WEEKLY_TAB}>
              <WeeklyTab
                weekly={this.state.weekly}
                hours={constants.hours}
                minutes={constants.minutes}
                handleDaysChecked={this.handleDaysChecked}
                handleSelectFieldHourChange={this.handleSelectFieldHourChange}
                handleSelectFieldMinuteChange={
                  this.handleSelectFieldMinuteChange
                }
              />
            </Tab>

          </Tabs>
        </Popover>
      </div>
    );
  }
}
export default CronGen;
