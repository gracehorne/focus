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

  if (data.action === 'delete_task') {
    return handleDeleteTask(data);
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
      data.priority || '',
      data.taskId || ''
    ]);

    return jsonResponse({ status: 'ok' });
  } catch (err) {
    return jsonResponse({ status: 'error', message: String(err && err.message || err) });
  }
}

function handleDeleteTask(data) {
  try {
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    if (!ss) {
      return jsonResponse({ status: 'error', message: 'no active spreadsheet; this script must be bound to the target Google Sheet' });
    }

    var sheet = ss.getSheetByName('Log') || ss.getSheets()[0];
    var lastRow = sheet.getLastRow();
    if (lastRow < 1) return jsonResponse({ status: 'ok', deleted: 0 });

    var lastCol = Math.max(sheet.getLastColumn(), 9);
    var values = sheet.getRange(1, 1, lastRow, lastCol).getValues();
    var targetDate = String(data.date || '').trim();
    var targetTask = String(data.task || '').trim();
    var targetTaskId = String(data.taskId || '').trim();
    var targetEvent = String(data.event || 'done').trim().toLowerCase();

    var rowToDelete = -1;
    for (var i = values.length - 1; i >= 0; i--) {
      var row = values[i];
      var rowDate = String(row[0] || '').trim();
      var rowTask = String(row[1] || '').trim();
      var rowEvent = String(row[6] || '').trim().toLowerCase();
      var rowTaskId = String(row[8] || '').trim();

      var matchesById = targetTaskId && rowTaskId && rowTaskId === targetTaskId;
      var matchesByFields = (!targetTaskId) && rowDate === targetDate && rowTask === targetTask && rowEvent === targetEvent;
      if (matchesById || matchesByFields) {
        rowToDelete = i + 1;
        break;
      }
    }

    if (rowToDelete > 0) {
      sheet.deleteRow(rowToDelete);
      return jsonResponse({ status: 'ok', deleted: 1 });
    }

    return jsonResponse({ status: 'ok', deleted: 0, message: 'no matching log row found' });
  } catch (err) {
    return jsonResponse({ status: 'error', message: String(err && err.message || err) });
  }
}

function jsonResponse(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}
