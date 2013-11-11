Flashcard = (function(){
	var con;
	var shownCon = {};

	var curr = -1;
	var isShown = 0;

	var noMore = false;

	function display(content){
		if(content != undefined){
			con = fisherYates(content);
			displayCard();
		}
	}

	function displayCard(){
		if(curr < con.length){
			curr++;
			if(con[curr] != undefined)
				$("#value").html(con[curr].value);
			else
				noMore = true;
		}
	}

	function displayNoMore(){
		$("#value").html('Sorry, no more content.  <a href="javascript:window.location.href=window.location.href">Click here</a> to replay');
		$("#value").fadeIn(500);
	}

	$(document).delegate("div[id^='card']", "click", function() {
		if(curr < con.length){
			if(isShown == 0){
				isShown = 1;
				$("#key").fadeOut(500, function(){
					$("#key").html(con[curr].key);
				});
				$("#key").fadeIn(500);
			} else{
				nextCard();
			}
		}
	});

	$(document).delegate("a[id^='skip']", "click", function() {
		nextCard();
	});

	$(document).delegate("div[id^='instructions']", "click", function() {
		$("#instructions").fadeOut(500, function(){
		});
	});


	function nextCard(){
		if(curr < con.length){
			isShown = 0;
			$("#value").fadeOut(500, function(){
				displayCard();
				if(!noMore){
					$("#value").fadeIn(500);
					$("#key").fadeIn(500);
				} else{
					displayNoMore();
				}
			});
			$("#key").fadeOut(500, function(){
				$("#key").html("____________");
			});


		}
	}

//----------------------------------------------------------------------------//
// Utilities                                                                  //
//----------------------------------------------------------------------------//
	// Function to get a random integer
	function getRandomInt (min, max) {
	    return Math.floor(Math.random() * (max - min + 1)) + min;
	}

	function fisherYates ( myArray ) {
	  var i = myArray.length, j, tempi, tempj;
	  if ( i === 0 ) return false;
	  while ( --i ) {
	     j = Math.floor( Math.random() * ( i + 1 ) );
	     tempi = myArray[i];
	     tempj = myArray[j];
	     myArray[i] = tempj;
	     myArray[j] = tempi;
	   }
	   return myArray;
	}

	return{
	initializeFlashcard: function(content){
		display(content);
	}
}
})();