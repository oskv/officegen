var fs = require('fs');

var officegen = require('../lib/index.js');

var xlsx = officegen ( 'xlsx' );

xlsx.on ( 'finalize', function ( written ) {
			console.log ( 'Finish to create an Excel file.\nTotal bytes created: ' + written + '\n' );
		});

xlsx.on ( 'error', function ( err ) {
			console.log ( err );
		});

sheet = xlsx.makeNewSheet ();
sheet.name = 'Excel Test';

// The direct option - two-dimensional array:
sheet.data[0] = [];
sheet.data[0][0] = 1;
sheet.data[1] = [];
sheet.data[1][3] = 'abc';
sheet.data[1][4] = 'More';
sheet.data[1][5] = 'Text';
sheet.data[1][6] = 'Here';
sheet.data[2] = [];
sheet.data[2][5] = 'abc';
sheet.data[2][6] = 900;
sheet.data[6] = [];
sheet.data[6][2] = 1972;

sheet.mergeCells([1,4],[1,5]);

// Using setCell:
sheet.setCell ( 'E7', 340 );
sheet.setCell ( 'I1', -3 );
sheet.setCell ( 'I2', 31.12 );
sheet.setCell ( 'G102', 'Hello World!' );

sheet.setCellStyle(1,6, 'title');
sheet.setCellStyle(1,3, 'caption');

var out = fs.createWriteStream ( 'out.xlsx' );

out.on ( 'error', function ( err ) {
	console.log ( err );
});

xlsx.generate ( out );

