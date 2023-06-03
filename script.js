let category = null;
let apiHost = "https://jsonplaceholder.typicode.com/";
let oTable = null;

async function createTable() {
  const url = apiHost + category;
  console.log("Calling API method: " + url);

  // Fetch data from API
  var queryDataResponse = await fetch(url);
  var queryData = await queryDataResponse.json();

  // Clear ColumnHeaders
  var columnHeaders = $("#columnHeaders").empty();

  // Remove the table and clear everything to prepare to populate data
  if (oTable) {
    oTable.clear().draw();
    oTable.destroy();
  }

  // Get all columnNames dynamically from retrieved data
  var columnNames = Object.keys(queryData[0]).map(function (column) {
    return column;
  });

  console.log(columnNames);
  console.log(queryData);

  // Populate columnArray and add <th> elements to the table
  var columnArray = [];
  columnNames.forEach(function (column) {
    columnHeaders.append(
      "<th>" + column.charAt(0).toUpperCase() + column.slice(1) + "</th>"
    );
    columnArray.push({ data: column });
  });

  oTable = $("#testTable").DataTable({
    columns: columnArray,
    language: {
      url: "//cdn.datatables.net/plug-ins/9dcbecd42ad/i18n/Swedish.json",
    },
    dom: "Blfrtip", //default: lfrtip
    // buttons: [
    //   {
    //     extend: "copyHtml5",
    //     text: "Kopiera",
    //   },
    //   {
    //     extend: "csvHtml5",
    //     text: "CSV",
    //     exportOptions: {
    //       charset: "utf-8",
    //       fieldBoundary: "",
    //       bom: true,
    //       //columns: [0, 1, 2, 3, 4, 5, 6, 7]
    //     },
    //   },
    //   {
    //     extend: "excelHtml5",
    //     text: "Excel",
    //   },
    //   //'pdf' or pdfHtml5
    // ],
    // order: [
    //   [0, "asc"],
    //   [1, "asc"],
    //   [2, "asc"],
    //   [3, "asc"],
    //   [4, "asc"],
    // ],
    // bProcessing: true,
    // bJQueryUI: false,
    // bSortClasses: true, // disable for performance boost
  });

  // Populate the table with retrieved data
  oTable.rows.add(queryData);
  console.log(oTable);
}

// Bind events
$(".load-button").on("click", async function (e) {
  // await ClearData()
  console.log("search button clicked");
  category = e.target.id;
  createTable();
});

// function ClearData(){
//     return new Promise((resolve,reject) => {
//         // Retrieve table columns dynamically and clear all data
//         $('#columnHeaders').empty();
//         if (oTable) {
//             // Remove the table and clear everything to prepare to populate data
//             oTable.clear().draw();
//             oTable.destroy();
//         }
//         resolve();
//     });
// }
