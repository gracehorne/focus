// daily-focus time tracking webhook (spreadsheet-contained or standalone)
//
// Deploy this as a Web App and use its /exec URL in the app field:
//   Time tracking webhook URL
//
// Recommended when this script is container-bound to your tracking spreadsheet.

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
    // If container-bound, use the active spreadsheet.
    // If standalone, replace with SpreadsheetApp.openById('YOUR_SHEET_ID').
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    if (!ss) {
      return jsonResponse({ status: 'error', message: 'no active spreadsheet; bind this script to the sheet or use openById' });
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
