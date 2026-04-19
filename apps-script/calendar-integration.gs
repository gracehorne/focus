// daily-focus calendar integration webhook (standalone recommended)
//
// Deploy this as a Web App and use its /exec URL in the app field:
//   Calendar integration script URL
//
// Handles:
//   1) POST { action: 'get_calendar_events', date: 'YYYY-MM-DD' }
//   2) POST { action: 'create_focus_time', title, start, end }
//   3) GET  { action, ... , callback } for JSONP/mobile fallback

function doGet(e) {
  return handleRequest(e);
}

// Optional: set explicit calendar IDs. If empty, uses default calendar only.
var CAL_IDS = [
  // 'your-email@gmail.com',
  // 'calendar-id@group.calendar.google.com'
];

function doPost(e) {
  return handleRequest(e);
}

function handleRequest(e) {
  var data;
  try {
    data = parseRequestData(e);
  } catch (_) {
    return jsonResponse({ status: 'error', message: 'invalid JSON' });
  }

  var result;
  if (data.action === 'get_calendar_events') {
    result = handleGetEvents(data);
  } else if (data.action === 'create_focus_time') {
    result = handleCreateFocusTime(data);
  } else {
    result = jsonResponse({ status: 'error', message: 'unknown action' });
  }

  return respond(result, e);
}

function parseRequestData(e) {
  var body = (e && e.postData && e.postData.contents) || '';
  if (body) {
    try {
      return JSON.parse(body);
    } catch (_) {
      return parseQueryData(e);
    }
  }
  return parseQueryData(e);
}

function parseQueryData(e) {
  var params = (e && e.parameter) || {};
  return {
    action: params.action || '',
    date: params.date || '',
    title: params.title || '',
    start: params.start || '',
    end: params.end || ''
  };
}

function respond(result, e) {
  var callback = e && e.parameter && e.parameter.callback;
  if (callback && /^[A-Za-z_$][0-9A-Za-z_$]*$/.test(callback)) {
    return ContentService
      .createTextOutput(callback + '(' + result.getContent() + ');')
      .setMimeType(ContentService.MimeType.JAVASCRIPT);
  }
  return result;
}

function handleGetEvents(data) {
  try {
    var dateStr = data.date || Utilities.formatDate(new Date(), Session.getScriptTimeZone(), 'yyyy-MM-dd');
    var parts = dateStr.split('-').map(Number);
    var start = new Date(parts[0], parts[1] - 1, parts[2], 0, 0, 0);
    var end = new Date(parts[0], parts[1] - 1, parts[2], 23, 59, 59);

    var ids = (CAL_IDS && CAL_IDS.length) ? CAL_IDS : [CalendarApp.getDefaultCalendar().getId()];
    var events = [];

    ids.forEach(function(id) {
      try {
        var cal = CalendarApp.getCalendarById(id);
        if (!cal) return;
        cal.getEvents(start, end).forEach(function(ev) {
          events.push({
            id: ev.getId(),
            title: ev.getTitle(),
            start: ev.getStartTime().toISOString(),
            end: ev.getEndTime().toISOString(),
            calendar: cal.getName()
          });
        });
      } catch (_) {
        // Ignore calendars without access.
      }
    });

    events.sort(function(a, b) { return new Date(a.start) - new Date(b.start); });
    return jsonResponse(events);
  } catch (err) {
    return jsonResponse({ status: 'error', message: String(err && err.message || err) });
  }
}

function handleCreateFocusTime(data) {
  try {
    var cal = CalendarApp.getDefaultCalendar();
    var start = new Date(data.start);
    var end = new Date(data.end);
    var title = 'Focus: ' + (data.title || 'focus block');

    var ev = cal.createEvent(title, start, end);
    ev.setColor(CalendarApp.EventColor.GREEN);
    ev.setDescription('created by daily-focus');

    return jsonResponse({ status: 'created', id: ev.getId() });
  } catch (err) {
    return jsonResponse({ status: 'error', message: String(err && err.message || err) });
  }
}

function jsonResponse(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}
