// daily-focus calendar integration webhook (standalone recommended)
//
// Deploy this as a Web App and use its /exec URL in the app field:
//   Calendar integration script URL
//
// Handles:
//   1) POST { action: 'get_calendar_events', date: 'YYYY-MM-DD' }
//   2) POST { action: 'create_focus_time', title, start, end }

// Optional: set explicit calendar IDs. If empty, uses default calendar only.
var CAL_IDS = [
  // 'your-email@gmail.com',
  // 'calendar-id@group.calendar.google.com'
];

function doPost(e) {
  var data;
  try {
    data = JSON.parse((e && e.postData && e.postData.contents) || '{}');
  } catch (_) {
    return jsonResponse({ status: 'error', message: 'invalid JSON' });
  }

  if (data.action === 'get_calendar_events') {
    return handleGetEvents(data);
  }

  if (data.action === 'create_focus_time') {
    return handleCreateFocusTime(data);
  }

  return jsonResponse({ status: 'error', message: 'unknown action' });
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
