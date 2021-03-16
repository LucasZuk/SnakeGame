/* 	SNAKE
*	created by Lucas Zuk
* 	version: 0.1
*/

(function (){

/* SETTINGS */

	/* DOM Elements */

		var scoreContent = document.getElementsByClassName("score")[0];
		var board = document.getElementsByClassName("board")[0];
		var resetButton = document.getElementsByClassName("reset_button")[0];


	/* Board Settings */
		
		var context = board.getContext("2d");

		/* Size of the board */
			var nColumn = 30;
			var nRow = 20;

		/* Thiness */
			var unit = 10;

		/* Colors */
			var fillColor = '#234516';

		/* Object's configuration */

			board.width = nColumn * unit;
			board.height = nRow * unit;
			context.fillStyle = fillColor;

		/* Place of the snake */
			initialSnake = [[5,1],[4,1],[3,1],[2,1],[1,1]];
			firstDirection = 'ArrowRight';
			firstSpeed = 100;

		
		/* Initial snake lenght and position */
			var snake = initialSnake;

		/* Initial direction */
			var keycode = firstDirection;

		/* Initial animation's speed */
			var gameSpeed = firstSpeed;

		/* Initialise booleans */
			var gameover = false;

			var isBigger = false;

			var isLeft = false;
			var isRight = false;
			var isUp = false;
			var isDown = true;

		/* Create coordinates for the head of the snake */
			var snakeHeadCoordinates = {};
			snakeHeadCoordinates.x = 0;
			snakeHeadCoordinates.y = 0;

		/* Create coordinates for the snacks */
			var snackCoordinates = {};
			snackCoordinates.snackX = 0;
			snackCoordinates.snackY = 0;

		/* Score */
			var score = 0;
				score.innerHTML = "Score : 0";
		
		

	/* Controls settings */
		
		const up = 'ArrowUp';
		const down = 'ArrowDown';
		const right = 'ArrowRight';
		const left = 'ArrowLeft';
		const enter = 'Enter';



/* FUNCTIONS */


	/* Initiation of the game */

		function gameInit()
			{
				/* Initial snake lenght and position */
					 snake = initialSnake;

				/* Initial direction */
					 keycode = firstDirection;

				/* Initial animation's speed */
					 gameSpeed = firstSpeed;

				/* Initialise booleans */
					 gameover = false;

					 isBigger = false;

					 isLeft = false;
					 isRight = false;
					 isUp = false;
					 isDown = true;

				/* Score */
					 score = 0;
					score.innerHTML = "Score : 0";
			}



	/* Change the position of the snake by adding the new position of the snake head (snake[0]) and removing or not the last piece
	*		- x : new snake head's abscissa
	*		- y : new snake head's ordinate
	*		- isBigger : 	false -> same length, so remove the last piece
	*						true  -> length + 1, don't remove the last piece
	*	NEXT IMPROVEMENT : change the x,y parameters for an array [x,y] in order to create new function goUp, goDown, goLeft and goRight
	*/

		function newSnake (x,y, isBigger)
		{

			snake.unshift([x,y]);

			for (var i=0; i < snake.length - 1; i++)
			{
				context.fillRect(snake[i][0]*unit, snake[i][1]*unit, unit, unit);
			}
			if (!isBigger)
			{
				context.clearRect(snake[snake.length-1][0]*unit, snake[snake.length-1][1]*unit, unit, unit);
				snake.pop();
			}
			else
			{
				context.fillRect(snake[snake.length-1][0]*unit, snake[snake.length-1][1]*unit, unit, unit);
			}
		}



	/* Calculate the next coordinate of the head, then call gameOver function and newSnake function
	*		- where : keyboardEvent.code : direction of the snake   
	*/

		function moveMySnake(where)
		{
			// Do nothing if not the play keys
			if (!gameover && (where == up || where == down || where == left || where == right || where == enter))
			{
				switch (where)
				{
					// Haut
					case up :
						if (!isDown)
						{
							snakeHeadCoordinates = goUp();

							isUp = true;
							isLeft = false;
							isRight = false;
						}
						else
						{
							snakeHeadCoordinates = goDown();
						}
					break;

					// Bas
					case down :
						if (!isUp)
						{
							snakeHeadCoordinates = goDown();

							isDown = true;
							isLeft = false;
							isRight = false;
						}
						else
						{
							snakeHeadCoordinates = goUp();
						}
					break;

					// Droite
					case right : 
						if (!isLeft)
						{
							snakeHeadCoordinates = goRight();

							isDown = false;
							isUp = false;
							isRight = true;
						}
						else
						{
							snakeHeadCoordinates = goLeft();
						}
					break;

					// Gauche
					case left : 
						if (!isRight)
						{
							snakeHeadCoordinates = goLeft();

							isDown = false;
							isUp = false;
							isLeft = true;
						}
						else
						{
							snakeHeadCoordinates = goRight();
						}
					break;

					//Enter
					case enter :
						x = snake[0][0];
						y = snake[0][1];
					break;
		
				}

				gameOver();
				newSnake(snakeHeadCoordinates.x, snakeHeadCoordinates.y, isBigger);
				isBigger = false;
			}
		}



	/* Coordinates up to the head */

		function goUp()
		{
			var x =0;
			var y =0;

			if (snake[0][1] == 0)
			{
				y = nRow-1;
				x = snake[0][0];
			}
			else
			{
				y = snake[0][1] - 1;
				x = snake[0][0];
			}

			return {x,y};
		}



	/* Coordinates down to the head */

		function goDown()
		{
			var x =0;
			var y =0;

			if (snake[0][1] == nRow - 1)
			{
				y = 0;
				x = snake[0][0];
			}
			else
			{
				y = snake[0][1] + 1;
				x = snake[0][0];
			}

			return {x,y};
		}



	/* Coordinates left to the head */

		function goLeft()
		{
			var x =0;
			var y =0;

			if (snake[0][0] == 0 )
			{
				x = nColumn-1;
				y = snake[0][1];
			}
			else
			{
				x = snake[0][0] - 1;
				y = snake[0][1];
			}

			return {x,y};
		}



	/* Coordinates right to the head */

		function goRight()
		{
			var x =0;
			var y =0;
			
			if (snake[0][0] == nColumn - 1)
			{
				x = 0;
				y = snake[0][1];
			}
			else
			{
				x = snake[0][0] + 1;
				y = snake[0][1];
			}

			return {x,y};
		}



	/* Create snake snack 
	* IMPROVEMENT : empecher la creation de snack sur le corps du snake sinon glitch
	*/

		function createSnack()
		{
			var isOk = false;
			var isSame = false;
			var endWhile = 0;
			while(!isOk && endWhile < 1000)
			{
				endWhile ++; 
				snackCoordinates.snackX = Math.floor(Math.random() * nColumn);
				snackCoordinates.snackY = Math.floor(Math.random() * nRow);

				for (var i = 0; i < snake.length; i++)
				{
					if (snake[i][0] == snackCoordinates.snackX && snake[i][1] == snackCoordinates.snackY)
					{
						isSame = true;
					}
				}
				if (!isSame) 
				{
					isOk = true;
				}
			}
			
			
			context.fillRect(snackCoordinates.snackX*unit, snackCoordinates.snackY*unit, unit, unit);
		}


	/* Check if my snake ate my snack */


		function snakeSnack()
		{
			if (snake[0][0] == snackCoordinates.snackX && snake[0][1] == snackCoordinates.snackY)
			{
				isBigger = true;

				score ++;
				scoreContent.innerHTML = "Score : " + score;
				
				createSnack();
			}
		}



	/* Check if the head (snake[0][0]) is in the same place of a part of his body 
	*		- return gameover as true
	*/

		function gameOver()
		{
			for (var j=1; j<snake.length; j++)
			{
				if (snake[0][0] == snake[j][0] && snake[0][1] == snake[j][1])
				{
					gameover = true;
					alert("Game Over");
				}
			}
		}

	/* Reinitialisation of the game */
		resetButton.addEventListener('click', gameInit());



	/* Responsable for the snake animation speed and launch the gameOver function if needed
	*		- if gameover : end the game;
	*		- gameSpeed : speed of the animation in ms
	*/

		setInterval(
			function()
			{
				moveMySnake(keycode);
				snakeSnack();

				if (!gameover)
				{
					gameOver();
				}
			}
		, gameSpeed);






/* EVENTS */

	/* Change the value of the parameter keycode we use in moveMySnake function
	*		- keycode change if the permitted key are clicked (left, right, up, down, enter)
	*		- keycode take the value of the cliked key
	*/

		document.addEventListener("keydown", function(e)
		{
			if (e.code == up || e.code == down || e.code == left || e.code == right || e.code == enter)
			{
				keycode = e.code;
			}
		});


createSnack();

})();





