const mode = "live";
const ssIdLive = "1puqturm6WCBtfL3uaT_YICKHI9StLcPA4SosBuMs4ZY" 
const ssIdTest = "11mfnGVNA2PhCs5hsp5-bmKhndv7nFg-ZiVVKf1caTqg"
const ss = SpreadsheetApp.openById(ssIdLive);
const ssId = (mode=="test") ? ssIdTest : ssIdLive;
const wsName = (mode=="test") ? "Sheet1" : "Member Directory";
const statusCol = 3;

function doGet() {
    const ws = ss.getSheetByName(wsName);  
    const data = ws.getRange("A3:J"+ws.getLastRow()).getValues();
    const headers = data.shift(); // remove header row and put in new array

    const jsonArray = data.map(r => {
        let obj = {};

        // check member status
        if (r[statusCol]=="removed") {
            return false;
        }
        headers.forEach((h, i) => {
            // make header names all lower case without spaces for ease of use when calling
            h=h.toLowerCase().replace(/\s/g, '');
            // filter data range and only keep these four columns
            if (h=="firstname" || h=="lastname" || h=="status" || h=="email") {
                obj[h] = r[i];               
            }
        })

        return obj;
    })

    const response = [{data: jsonArray}];

    return ContentService
        .createTextOutput(JSON.stringify(response))
        .setMimeType(ContentService.MimeType.JSON);

}

function doPost(e) {
    const body = e.postData.contents;
    const bodyJSON = JSON.parse(body);
    //const ss = SpreadsheetApp.openById('11mfnGVNA2PhCs5hsp5-bmKhndv7nFg-ZiVVKf1caTqg');
    const ws = ss.getSheetByName('Sheet2');
    ws.appendRow([bodyJSON.name]);
}