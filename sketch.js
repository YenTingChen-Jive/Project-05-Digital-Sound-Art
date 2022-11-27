let table, table_setting;
var star_array = [];
var img_width, img_height;
var f;
var star_length, star_dist;
var table_r, table_setting_r;
var star_size_lower, star_size_upper;
var bgm = [];
var bgm_src = [];
var bgm_now;
let bg;
var ran_center_x, ran_center_y;

function preload() {
	// load table
	table = loadTable("start.csv", "csv");
	table_setting = loadTable("setting.csv", "csv");

	bg = loadImage("bg/bg.jpg");
}

function add_bgm() {
	for (var i = 0; i < table_setting.getRowCount(); i++) {
		print("number of songs = " + table_setting.getString(i, 1));
		for (var j = 0; j < table_setting.getString(i, 1); j++) {
			print("songs = " + table_setting.getString(i, j + 2));
			bgm.push(loadSound("music/" + table_setting.getString(i, j + 2)));
			bgm_src.push(table_setting.getString(i, 0));
		}
	}
}

function setup() {
	// get all bgm
	add_bgm();

	// frame rate
	frameRate(30);

	// table_iteration
	table_r = 0;
	table_setting_r = 0;
	bgm_now = 0;

	// random center
	ran_center_x = windowWidth / 3;
	ran_center_y = windowHeight / 3;

	//background
	createCanvas(windowWidth, windowHeight);
	noFill();
	stroke(255, 45);
	radius = width;
}

function draw_star() {
	if (table_r < table.getRowCount()) {
		if (table_r == 0) {
			// get img_width and img_height of meme
			img_width = int(table.getString(0, 0));
			img_height = int(table.getString(0, 1));
			print(img_width, img_height);

			// set star size
			if (img_width >= img_height) {
				star_length = img_width;
			} else {
				star_length = img_height;
			}

			star_size_upper = star_length * 0.015;
			star_size_lower = star_length * 0.007;
			star_dist = star_length * 0.00005;

			table_r++;
		}
		//get star coordinate
		row_set = int(table.getString(table_r, 0));
		col_set = int(table.getString(table_r, 1));
		table_r++;
	}

	// center coordinate
	row_set += ran_center_y;
	col_set += ran_center_x;

	// random star parameter
	star_size = random(star_size_lower, star_size_upper);
	var star = {
		r: int(random(255, 255)),
		g: int(random(255, 255)),
		b: int(random(255, 255)),
		full: 255,

		t: random(TAU),
		size: star_size,
		row: row_set,
		col: col_set,

		a_upx: col_set,
		a_upy: row_set - star_size,
		a_rightx: col_set + star_size / 5,
		a_righty: row_set,
		a_downx: col_set,
		a_downy: row_set + star_size,
		a_leftx: col_set - star_size / 5,
		a_lefty: row_set,

		b_upx: col_set,
		b_upy: row_set - star_size / 5,
		b_rightx: col_set + star_size,
		b_righty: row_set,
		b_downx: col_set,
		b_downy: row_set + star_size / 5,
		b_leftx: col_set - star_size,
		b_lefty: row_set,
	};

	// avoid overlap
	var overlapping = false;
	for (var j = 0; j < star_array.length; j++) {
		var other = star_array[j];
		var d = dist(row_set, col_set, other.row, other.col);
		if (d < star_size + other.size + star_dist) {
			overlapping = true;
		}

		//delete
		noStroke();
		fill(0);
		quad(
			other.a_upx,
			other.a_upy - sin(other.t) * f,
			other.a_rightx + sin(other.t) * f,
			other.a_righty,
			other.a_downx,
			other.a_downy,
			other.a_leftx - sin(other.t) * f,
			other.a_lefty + sin(other.t) * f
		);
		quad(
			other.b_upx,
			other.b_upy - sin(other.t) * f,
			other.b_rightx + sin(other.t) * f,
			other.b_righty,
			other.b_downx,
			other.b_downy + sin(other.t) * f,
			other.b_leftx - sin(other.t) * f,
			other.b_lefty
		);

		// redraw stars already exist
		f = 1.5;
		other.t += 0.03;
		noStroke();
		fill(255, 255, 255, other.full);
		quad(
			other.a_upx,
			other.a_upy - sin(other.t) * f,
			other.a_rightx + sin(other.t) * f,
			other.a_righty,
			other.a_downx,
			other.a_downy,
			other.a_leftx - sin(other.t) * f,
			other.a_lefty + sin(other.t) * f
		);
		quad(
			other.b_upx,
			other.b_upy - sin(other.t) * f,
			other.b_rightx + sin(other.t) * f,
			other.b_righty,
			other.b_downx,
			other.b_downy + sin(other.t) * f,
			other.b_leftx - sin(other.t) * f,
			other.b_lefty
		);
	}

	// if no overlap, draw a new star
	if (!overlapping) {
		star_array.push(star);
		noStroke();
		fill(star.r, star.g, star.b, star.full);
		quad(
			star.a_upx,
			star.a_upy,
			star.a_rightx,
			star.a_righty,
			star.a_downx,
			star.a_downy,
			star.a_leftx,
			star.a_lefty
		);
		quad(
			star.b_upx,
			star.b_upy,
			star.b_rightx,
			star.b_righty,
			star.b_downx,
			star.b_downy,
			star.b_leftx,
			star.b_lefty
		);
	}
}

radius = 0;
r = 100;
g = 54;
b = 60;
function draw_background() {
	var center_x, center_y, noiseFactor, x, y;
	center_x = mouseX;
	center_y = mouseY;
	stroke(100, 54, 60, 30);
	noFill();
	beginShape();
	TOTAL_DEGREES = document.getElementById("degrees").value;

	for (var i = 0, _pj_a = TOTAL_DEGREES; i < _pj_a; i += 1) {
		noiseFactor = noise(i * 0.02, Number.parseFloat(frameCount) / 140);
		x = center_x + radius * cos(radians(i)) * noiseFactor;
		y = center_y + radius * sin(radians(i)) * noiseFactor;
		r = random(255);
		g = random(120);
		b = random(220);
		curveVertex(x, y);
	}

	endShape();
	radius -= 1;

	if (radius === -600) {
		radius += 1200;
	}
}

function draw() {
	// update background

	draw_background();

	// draw star
	for (var i = 0; i < 10; i++) {
		draw_star();
	}
}

function keyPressed() {
	if (keyCode === RIGHT_ARROW) {
		// previous meme
		// get next image name
		if (table_setting_r + 1 < table_setting.getRowCount()) {
			table_setting_r++;
		} else {
			table_setting_r = 0;
		}
		// open new csv
		var filename_in = table_setting.getString(table_setting_r, 0);
		print("meme:" + filename_in);

		// load table
		table = loadTable("csv/" + filename_in + ".csv", "csv");

		//reset
		star_array = [];

		// new random center
		ran_center_x = random(5, windowWidth / 3);
		ran_center_y = random(5, windowHeight / 3);

		table_r = 0;

		// stop music
		if (bgm[bgm_now].isPlaying()) {
			bgm[bgm_now].stop();
		}

		// select random music
		ran_song = [];
		for (var i = 0; i < bgm_src.length; i++) {
			if (bgm_src[i] == filename_in) {
				ran_song.push(i);
			}
		}
		bgm_now = ran_song[Math.floor(Math.random() * ran_song.length)];
		bgm[bgm_now].play();

		// prevent default
		return false;
	}
	if (keyCode === LEFT_ARROW) {
		// previous meme
		// get next image name
		if (table_setting_r - 1 >= 0) {
			table_setting_r--;
		} else {
			table_setting_r = table_setting.getRowCount() - 1;
		}
		// open new csv
		var filename_in = table_setting.getString(table_setting_r, 0);
		print("meme:" + filename_in);

		// load table
		table = loadTable("csv/" + filename_in + ".csv", "csv");

		//reset
		star_array = [];

		// new random center
		ran_center_x = random(5, windowWidth / 3);
		ran_center_y = random(5, windowHeight / 3);

		table_r = 0;

		// stop music
		if (bgm[bgm_now].isPlaying()) {
			bgm[bgm_now].stop();
		}

		// select random music
		ran_song = [];
		for (var i = 0; i < bgm_src.length; i++) {
			if (bgm_src[i] == filename_in) {
				ran_song.push(i);
			}
		}
		bgm_now = ran_song[Math.floor(Math.random() * ran_song.length)];
		bgm[bgm_now].play();

		// prevent default
		return false;
	}
}
function keyReleased() {
	if (keyCode === RIGHT_ARROW) {
		table_r = 0;
		background(0);
	} else if (keyCode === LEFT_ARROW) {
		table_r = 0;
		background(0);
	}
}

function windowResized() {
	resizeCanvas(windowWidth, windowHeight);
}
