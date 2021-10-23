"use strict";

var gl;
var points;

var maxNumTriangles = 200;
var maxNumVertices = 3 * maxNumTriangles;
var index = 0;

var colors = [
	0.0, 0.0, 0.0, 1.0, // black
	1.0, 0.0, 0.0, 1.0 , // red
	1.0, 1.0, 0.0, 1.0 , // yellow
	0.0, 1.0, 0.0, 1.0 , // green
	0.0, 0.0, 1.0, 1.0 , // blue
	1.0, 0.0, 1.0, 1.0 , // magenta
	0.0, 1.0, 1.0, 1.0  // cyan
];

window.onload = function init(){
	var canvas = document.getElementById( "canvas" );
	gl = WebGLUtils.setupWebGL( canvas );
	if( !gl ){
		alert( "WebGL isn't available" );
	}

	// Three Vertices
	var vertices = [
		
		-1.0, 0.25,  
		 1.0, 0.25,
		 1.0, 1.0, 
		-1.0, 1.0,

		-1.0, 0.25,
		-1.0, -1.0,
		 1.0, -1.0,
		 1.0, 0.25,
		
		0.0, 0.25,
		0.5, 0.25,
		0.5*Math.cos(10*Math.PI/180),0.25+0.5*Math.sin(10*Math.PI/180)/1.6,
		0.5*Math.cos(20*Math.PI/180),0.25+0.5*Math.sin(20*Math.PI/180)/1.6,
		0.5*Math.cos(30*Math.PI/180),0.25+0.5*Math.sin(30*Math.PI/180)/1.6,
		0.5*Math.cos(40*Math.PI/180),0.25+0.5*Math.sin(40*Math.PI/180)/1.6,
		0.5*Math.cos(50*Math.PI/180),0.25+0.5*Math.sin(50*Math.PI/180)/1.6,
		0.5*Math.cos(60*Math.PI/180),0.25+0.5*Math.sin(60*Math.PI/180)/1.6,
		0.5*Math.cos(70*Math.PI/180),0.25+0.5*Math.sin(70*Math.PI/180)/1.6,
		0.5*Math.cos(80*Math.PI/180),0.25+0.5*Math.sin(80*Math.PI/180)/1.6,
		0.5*Math.cos(90*Math.PI/180),0.25+0.5*Math.sin(90*Math.PI/180)/1.6,
		0.5*Math.cos(100*Math.PI/180),0.25+0.5*Math.sin(100*Math.PI/180)/1.6,
		0.5*Math.cos(110*Math.PI/180),0.25+0.5*Math.sin(110*Math.PI/180)/1.6,
		0.5*Math.cos(120*Math.PI/180),0.25+0.5*Math.sin(120*Math.PI/180)/1.6,
		0.5*Math.cos(130*Math.PI/180),0.25+0.5*Math.sin(130*Math.PI/180)/1.6,
		0.5*Math.cos(140*Math.PI/180),0.25+0.5*Math.sin(140*Math.PI/180)/1.6,
		0.5*Math.cos(150*Math.PI/180),0.25+0.5*Math.sin(150*Math.PI/180)/1.6,
		0.5*Math.cos(160*Math.PI/180),0.25+0.5*Math.sin(160*Math.PI/180)/1.6,
		0.5*Math.cos(170*Math.PI/180),0.25+0.5*Math.sin(170*Math.PI/180)/1.6,
		0.5*Math.cos(180*Math.PI/180),0.25+0.5*Math.sin(180*Math.PI/180)/1.6,
		
		//小船1的坐标
		0.75,-0.375,
		0.5,-0.625,
		0.75,-0.625,
		
		0.75,-0.625,
		0.875,-0.625,
		0.75,-0.375,
		
		0.725,-0.625,
		0.725,-0.68,
		0.74,-0.68,
		0.74,-0.625,
		
		0.5,-0.68,
		0.59,-0.735,
		0.785,-0.735,
		0.875,-0.68,
		
		//小船2的坐标
		-0.625,-0.125,
		-0.875,-0.375,
		-0.625,-0.375,
		
		-0.625,-0.375,
		-0.525,-0.375,
		-0.625,-0.125,
		
		-0.65,-0.375,
		-0.65,-0.43,
		-0.635,-0.43,
		-0.635,-0.375,
		
		-0.875,-0.43,
		-0.785,-0.535,
		-0.59,-0.535,
		-0.5,-0.43,
		
		
	];
	
	
	
	// Configure WebGL
	gl.viewport( 0, 0, canvas.width, canvas.height );
	gl.clearColor( 1.0, 1.0, 1.0, 1.0 );
	
	
	// canvas.addEventListener( "mousedown", function( event ){
	// 	gl.bindBuffer( gl.ARRAY_BUFFER, vBuffer );
	// 	var rect = canvas.getBoundingClientRect();
	// 	var cx = event.clientX - rect.left;
	// 	var cy = event.clientY - rect.top; // offset
	// 	var t = glMatrix.vec2.fromValues( 2 * cx / canvas.width - 1, 2 * ( canvas.height - cy ) / canvas.height - 1 );
	// 	gl.bufferSubData( gl.ARRAY_BUFFER, 8 * index, new Float32Array( t ) );
	
	// 	gl.bindBuffer( gl.ARRAY_BUFFER, cBuffer );
	// 	var c = glMatrix.vec4.fromValues( colors[index%7*4], colors[index%7*4+1], colors[index%7*4+2], colors[index%7*4+3]);
	// 	gl.bufferSubData( gl.ARRAY_BUFFER, 16 * index, new Float32Array( c ) );
	// 	index++;
	// } );
	
	// Load shaders and initialize attribute buffers
	var program = initShaders( gl, "vertex-shader", "fragment-shader" );
	gl.useProgram( program );

	// Load the data into the GPU
	var bufferId = gl.createBuffer();
	gl.bindBuffer( gl.ARRAY_BUFFER, bufferId );
	gl.bufferData( gl.ARRAY_BUFFER, new Float32Array( vertices ), gl.STATIC_DRAW );
	//gl.bufferData( gl.ARRAY_BUFFER, new Float32Array( vertices2 ), gl.STATIC_DRAW );

	// Associate external shader variables with data buffer
	var vPosition = gl.getAttribLocation( program, "vPosition" );
	gl.vertexAttribPointer( vPosition, 2, gl.FLOAT, false, 0, 0 );
	gl.enableVertexAttribArray( vPosition );
	
	//look up uniform locations
		var colorUniformLocation = gl.getUniformLocation(program, "u_color");
		gl.uniform4f(colorUniformLocation, 0.0, 0.05, 0.26, 1.0);
// 	render();

// }

// function render(){
	gl.clear( gl.COLOR_BUFFER_BIT );

	gl.drawArrays( gl.TRIANGLE_FAN, 0, 4 );//天空
	
	gl.uniform4f(colorUniformLocation, 0.067, 0.2, 0.467, 1.0);
	
	gl.drawArrays(gl.TRIANGLE_FAN,4,4)//海水
	
	gl.uniform4f(colorUniformLocation, 0.867, 0.6, 0.134, 1.0);
	
	gl.drawArrays(gl.TRIANGLE_FAN,8,20)//月亮
	
	gl.uniform4f(colorUniformLocation, 0.0, 0.0, 0.0, 1.0);
	
	gl.drawArrays(gl.TRIANGLE_FAN,28,3)//帆船1
	
	gl.uniform4f(colorUniformLocation, 0.276, 0.276, 0.276, 1.0);
	
	gl.drawArrays(gl.TRIANGLE_FAN,31,3)//帆船2
	
	gl.uniform4f(colorUniformLocation, 0.0, 0.0, 0.0, 1.0);
	
	gl.drawArrays(gl.TRIANGLE_FAN,34,4)//帆船3
	
	gl.uniform4f(colorUniformLocation, 0.0, 0.0, 0.0, 1.0);
	
	gl.drawArrays(gl.TRIANGLE_FAN,38,4)//帆船4
	
	
	gl.uniform4f(colorUniformLocation, 0.0, 0.0, 0.0, 1.0);
	
	gl.drawArrays(gl.TRIANGLE_FAN,42,3)//帆船1
	
	gl.uniform4f(colorUniformLocation, 0.276, 0.276, 0.276, 1.0);
	
	gl.drawArrays(gl.TRIANGLE_FAN,45,3)//帆船2
	
	gl.uniform4f(colorUniformLocation, 0.0, 0.0, 0.0, 1.0);
	
	gl.drawArrays(gl.TRIANGLE_FAN,48,4)//帆船3
	
	gl.uniform4f(colorUniformLocation, 0.0, 0.0, 0.0, 1.0);
	
	gl.drawArrays(gl.TRIANGLE_FAN,52,4)//帆船4
	
	
	//window.requestAnimFrame( render );
	
	//gl.drawArrays( gl.TRIANGLES, 0, 3 );
	//gl.drawArrays( gl.TRIANGLES, 5, 4 );
}