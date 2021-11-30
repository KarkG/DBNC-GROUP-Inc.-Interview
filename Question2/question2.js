function fooBarFunction(NUMBER) {
	if (Number.isInteger(NUMBER) && NUMBER > 0) {
		if (NUMBER % 2 == 0 && NUMBER % 7 == 0) console.log('foobar');
		else if (NUMBER % 2 == 0) console.log('foo');
		else if (NUMBER % 7 == 0) console.log('bar');
		else console.log(NUMBER);
	}
}
