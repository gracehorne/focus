// daily-focus time tracking webhook (spreadsheet-contained or standalone)
//
// Deploy this as a Web App and use its /exec URL in the app field:
//   Time tracking webhook URL
//
// This script is intended to be container-bound to your tracking spreadsheet.

function doPost(e) {
  var data;
  try {
    data = JSON.parse((e && e.postData && e.postData.contents) || '{}');
  } catch (_) {
    return jsonResponse({ status: 'error', message: 'invalid JSON' });
  }

  return handleLogTask(data);
}

function handleLogTask(data) {
  try {
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    if (!ss) {
      return jsonResponse({ status: 'error', message: 'no active spreadsheet; this script must be bound to the target Google Sheet' });
    }

    var sheet = ss.getSheetByName('Log') || ss.getSheets()[0];
    sheet.appendRow([
      data.date || '',
      data.task || '',
      data.estimate || '',
      data.actual || '',
      data.deferred || '',
      data.notes || '',
      data.event || 'done',
      data.priority || ''
    ]);

    return jsonResponse({ status: 'ok' });
  } catch (err) {
    return jsonResponse({ status: 'error', message: String(err && err.message || err) });
  }
}

function jsonResponse(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}
