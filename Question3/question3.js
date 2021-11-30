var csv = require('csvtojson');

async function sumOfValues() {
	const data = await csv().fromFile('question3.csv');
	var sum = 0;
	for (var i = 0; i < data.length; i++) sum = sum + parseInt(data[i].value);
	return sum;
}

sumOfValues().then((res) => console.log(res));
