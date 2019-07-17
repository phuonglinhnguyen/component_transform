var f = [
    null,
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
  ],
  h = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
    'Sunday'
  ],
  p = /^0*\d\d?$/;

function n(e) {
  var t = parseInt(e, 10);
  switch (t > 20 ? t % 10 : t) {
    case 1:
      return e + 'st';
    case 2:
      return e + 'nd';
    case 3:
      return e + 'rd';
    default:
      return e + 'th';
  }
}

function r(e) {
  switch (e.length) {
    case 0:
      return '';
    case 1:
      return e[0];
    case 2:
      return e[0] + ' and ' + e[1];
    default:
      return e.slice(0, e.length - 1).join(', ') + ', and ' + e[e.length - 1];
  }
}

function o(e, t, r, o) {
  var u = e.match(/\d+|./g).map(function(e) {
      var t = Number(e);
      return isNaN(t) ? e : t;
    }),
    a = u[0];
  if (Number.isInteger(a)) {
    if (1 === u.length) return '' + (r[a] || a);
    if (3 === u.length && '/' === u[1] && Number.isInteger(u[2]))
      return (
        'every ' +
        n(u[2]) +
        ' ' +
        t +
        ' from ' +
        (r[a] || a) +
        ' through ' +
        (r[o] || o)
      );
    if (3 === u.length && '-' === u[1] && Number.isInteger(u[2]) && u[2] >= a)
      return (
        'every ' + t + ' from ' + (r[a] || a) + ' through ' + (r[u[2]] || u[2])
      );
    if (
      5 === u.length &&
      '-' === u[1] &&
      Number.isInteger(u[2]) &&
      u[2] >= a &&
      '/' === u[3] &&
      Number.isInteger(u[4]) &&
      u[4] >= 1
    )
      return (
        'every ' +
        n(u[4]) +
        ' ' +
        t +
        ' from ' +
        (r[a] || a) +
        ' through ' +
        (r[u[2]] || u[2])
      );
  } else if (
    3 === u.length &&
    '/' === u[1] &&
    Number.isInteger(u[2]) &&
    '*' === u[0]
  )
    return 'every ' + n(u[2]) + ' ' + t;
  return '';
}

function u(e, t, n, r) {
  return '*' === e ? 'every ' + t : o(e, t, n, r);
}

function a(e, t, n, o, a) {
  var s = e.split(','),
    i = a ? '' : t + ' ';
  return ('' +
    i +
    r(
      s.map(function(e) {
        return u(e, t, n, o);
      })
    ))
    .replace('every 1st', 'every')
    .replace(t + ' every', 'every')
    .replace(', ' + t, ', ')
    .replace(', and ' + t, ', and ');
}

function s(e) {
  return a(e, 'minute', {}, 59);
}

function i(e) {
  return '*' === e ? '' : 'past ' + a(e, 'hour', {}, 23);
}

function c(e) {
  return '*' === e ? '' : 'on ' + a(e, 'day-of-month', {}, 31);
}

function l(e) {
  return '*' === e ? '' : 'in ' + a(e, 'month', f, 12, !0);
}

function d(e) {
  return '*' === e ? '' : 'on ' + a(e, 'day-of-week', h, 7, !0);
}

function m(e, t) {
  return p.test(e) && p.test(t)
    ? [('0' + e).slice(-2), ('0' + t).slice(-2)]
    : null;
}

function getCronArray(cronValue) {
  var a = {
      sun: '0',
      mon: '1',
      tue: '2',
      wed: '3',
      thu: '4',
      fri: '5',
      sat: '6'
    },
    s = {
      jan: '1',
      feb: '2',
      mar: '3',
      apr: '4',
      may: '5',
      jun: '6',
      jul: '7',
      aug: '8',
      sep: '9',
      oct: '10',
      nov: '11',
      dec: '12'
    };
  function n(e, t) {
    var n = function(e, t, n) {
      var r = new RegExp('(^|[ ,-/])' + t + '($|[ ,-/])', 'gi'),
        o = '$1' + n + '$2';
      return e.replace(r, o).replace(r, o);
    };
    return Object.keys(t).reduce(function(e, r) {
      return n(e, r, t[r]);
    }, e);
  }

  function r(e) {
    return n(e, a);
  }

  function o(e) {
    return n(e, s);
  }

  function u(e) {
    var t = i[e];
    return void 0 !== t ? t : [e];
  }

  var t = cronValue.trim().split(/\s+/).filter(function(cronValue) {
    return cronValue;
  });
  var _n = 1 === t.length ? u(t[0]) : t,
    _a = _n.map(function(e, t) {
      switch (t) {
        case 3:
          return o(e);
        case 4:
          return r(e);
        default:
          return e;
      }
    })
    //,_s = (!!_a[2] && '*' === _a[2][0]) || (!!_a[4] && '*' === _a[4][0])
    ;
  return _a;
}
export function getCronString(cronValue) {
  if (cronValue) {
    const cronArr = getCronArray(cronValue);

    if (cronArr.length === 6) {
      var indexStart = 1;
      var hour_minute = '',
        dayOfMonth = '',
        month = '',
        dayOfWeek = '';
      dayOfMonth = c(cronArr[indexStart + 2]);
      month = l(cronArr[indexStart + 3]);
      dayOfWeek = d(cronArr[indexStart + 4]);
      var a = m(cronArr[indexStart], cronArr[indexStart + 1]);

      if (a) {
        hour_minute = a[1] + ':' + a[0];
      } else {
        var minute = s(cronArr[indexStart]),
          hour = i(cronArr[indexStart + 1]);
        hour_minute = minute + ' ' + hour;
      }
   
      var result =
        'At ' + hour_minute + ' ' + dayOfMonth + ' ' + month + ' ' + dayOfWeek;
      return result;
    }
  }
  return "";
}
