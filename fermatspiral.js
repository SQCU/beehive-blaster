//fermatspiral.js
//drawing from  logos-funk, logos-test. 
//procedurally draw a fermat spiral.
console.log("bzzz");
const canv = document.getElementById('drawzone');
const ctx = canv.getContext('2d');
const sheet = document.getElementById("hivis"); 
const sneed = document.getElementById("feed"); 
let start;
let last = Date.now();	//There ought to be a better way.  I still don't like it.
canv.width = canv.offsetWidth;	
canv.height = canv.offsetHeight;

const goldang = 2.4;	//Golden angle.
seed = new Sprite(sneed, 0, 0, 4, 3);	// probably the right hardcodes, don't look at me like that

function Sprite(img, sx, sy, swidth, sheight) {	//long and venerable history.  Rewrite as soon as there's a reason to.
this.img = img;
this.sx = sx;
this.sy = sy;
this.swidth = swidth;
this.sheight = sheight;
this.width = swidth; //scaling factor width
this.height = sheight; //scaling factor height
}

function draw(sprite, xpos, ypos) { //draw updated to logos-funk spec
ctx.drawImage(sprite.img, sprite.sx, sprite.sy, sprite.swidth, sprite.sheight, xpos-(sprite.width/2), ypos-(sprite.sheight/2), sprite.swidth, sprite.height);
//console.log("drawn at "+xpos+","+ypos+".");
}

function plotRot(sprite, targetxpos, targetypos, theta){	//plot rotation haha!
	ctx.translate(targetxpos, targetypos);
	ctx.rotate(theta);	//do state
	draw(sprite, 0, 0);
	ctx.rotate(-theta);	//undo state
	ctx.translate(-targetxpos, -targetypos);//undo state
}

function plotPolar(sprite, polarCoord, targetxpos, targetypos){	//now what if, get this, what if, we had a draw function accepting polar units
	ctx.translate(targetxpos, targetypos);
	ctx.rotate(polarCoord.theta);	//rotate state
	ctx.translate(polarCoord.radius, 0);	//translate state
	draw(sprite, 0, 0);
	ctx.translate(-polarCoord.radius, 0);	//these steps are intended to undo state but 
	ctx.rotate(-polarCoord.theta);	
	ctx.translate(-targetxpos, -targetypos);
	//ctx.setTransform(1, 0, 0, 1, 0, 0);		//Appears to be the best method for undoing state but
}

function polarCoord(radius, theta){	//object so we aren't just slapping around length-2 unlabeled arrays willy nilly
	this.radius = radius;
	this.theta = theta;
}

function fermatTheta(n){		//takes current grain n, returns 
return n * goldang;	
}

function fermatRadius(c, n){	//takes c, current grain n. returns radius at grain n.
return c * Math.sqrt(n);
}

function fermatSpiral(seedCount, con){
	con = con * Math.sqrt(seedCount);	//constant 
	const fermatList = [];
	for(let i=1; i<=seedCount; i++){
		fermatList.push(new polarCoord(fermatRadius(con, i), fermatTheta(i)));
		//console.log("list appended w/ :"+fermatRadius(con, i)+", "+fermatTheta(i));
	}
	return fermatList;
}

function step(timestamp)	{
	//timing
	if(start === undefined)
		start = timestamp;
	const elapsed = timestamp - start;
	const current = timestamp;
	const delta = current - last;
	//console.log("dt = "+delta);	//werks, some frames take 6ms and others 12ms (how tf is it so slow?)
	
	//dimensioning
	canv.width = canv.offsetWidth;
	canv.height = canv.offsetHeight;
	const center = [Math.floor(canv.width/2), Math.floor(canv.height/2)];	//why arrays? I thought I had a matrix-add in the standard library.  Actually math and Math are two different libraries, silly me!
	const displacement = Math.ceil(canv.width/8);
	const spinny = (elapsed/1200);

	fermatSpiral(256, .2).forEach(point =>{
		plotPolar(seed, point, center[0], center[1]);
	}
	);
	
	fermatSpiral(72, .3).forEach(point =>{
		ctx.translate(center[0]-1.5*displacement, center[1]);
		ctx.rotate(-spinny);
		plotPolar(seed, point, 0, 0);
		ctx.setTransform(1, 0, 0, 1, 0, 0);
	}
	);
	
	fermatSpiral(72, .3).forEach(point =>{
		ctx.translate(center[0]+1.5*displacement, center[1]);
		ctx.rotate(spinny);
		plotPolar(seed, point, 0, 0);
		ctx.setTransform(1, 0, 0, 1, 0, 0);
	}
	);
	
	//cleanup
	last = timestamp;	// set global state for last timestamp
	ctx.setTransform(1, 0, 0, 1, 0, 0);		//JUST IN CASE, reset transformation matrix for context.
	window.requestAnimationFrame(step);		//next frame call
}

//first invocation of reqanifra callback
window.requestAnimationFrame(step);
