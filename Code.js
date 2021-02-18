function doGet() {
  
    const response = [{status: "cool"}];

    return ContentService
        .createTextOutput(JSON.stringify(response))
        .setMimeType(ContentService.MimeType.JSON);

}

function doPost(e) {
    const body = e.postData.contents;
    const bodyJSON = JSON.parse(body);
    const ss = SpreadsheetApp.openById('11mfnGVNA2PhCs5hsp5-bmKhndv7nFg-ZiVVKf1caTqg');
    const ws = ss.getSheetByName('Sheet2');
    ws.appendRow([bodyJSON.name]);
}