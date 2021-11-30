if (province == 'ONTARIO') rate = ONTARIO_RATE;
if (province == 'QUEBEC') {
	rate = QUEBEC_RATE;
	points = 2;
}
if (province == 'ALBERTA') rate = ALBERTA_RATE;
else rate = 1;
amt = base * rate;
calc = 2 * basis(amt) + extra(amt) * 1.05;
