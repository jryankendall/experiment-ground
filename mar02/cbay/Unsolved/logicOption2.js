// Initialize Firebase
// Make sure to match the configuration to the script version number in the HTML
// (Ex. 3.0 != 3.7.0)

// Assign the reference to the database to a variable named 'database'
var database = firebase.database();


// Initial Values
var initialBid = 0;
var initialBidder = "No one :-(";
var highPrice = initialBid;
var highBidder = initialBidder;

// --------------------------------------------------------------

//  At the page load and subsequent value changes, get a snapshot of the stored data.
database.ref("/bidderdata").on("value", function(snapshot) {
    
    if (snapshot.child("highBidder").exists() && snapshot.child("highPrice").exists()) {

        // Set the variables for highBidder/highPrice equal to the stored values in firebase.
        highPrice = parseInt(snapshot.val().highPrice);
        highBidder = snapshot.val().highBidder;
    
    
        // Change the HTML to reflect the stored values
        $("#highest-bidder").text(highBidder);
        $("#highest-price").text(highPrice);
    
    
        // Print the data to the console.
        console.log(highBidder);
        console.log(highPrice);
    
      } 
       // Else Firebase doesn't have a highPrice/highBidder, so use the initial local values.
  else {

    // Change the HTML to reflect the initial values
    $("#highest-bidder").text(initialBidder);
    $("#highest-price").text(initialBid);


    // Print the data to the console.

    console.log(highBidder);
    console.log(highPrice);


  }
}, function(errorData) {
    console.log("Error: " + errorData.data);
})





// --------------------------------------------------------------

// Whenever a user clicks the submit-bid button
$("#submit-bid").on("click", function(event) {
    


// prevent form from submitting with event.preventDefault() or returning false
    event.preventDefault();

// Get the input values
    var bidderName = $("#bidder-name").val();
    var bidderPrice = parseInt($("#bidder-price").val());

    console.log("Bidder " + bidderName + ", Price: " + bidderPrice);

// Log the Bidder and Price (Even if not the highest)


// If Then statements to compare against previous high bidder
if ( bidderPrice > highPrice) {


// Alert that they are High Bidder
    alert("You are the new highest bidder");


// Save the new price in Firebase

    database.ref("/bidderdata").set( {
        highPrice: bidderPrice,
        highBidder: bidderName
    }
    )


// Log the new High Price
console.log("New High Price: " + bidderPrice);



// Store the new high price and bidder name as a local variable (could have also used the firebase variable)
highPrice = parseInt(bidderPrice);
highBidder = bidderName;



// Change the HTML to reflect the new high price and bidder
$("#highest-bidder").text(highBidder);
$("#highest-price").text(highPrice);
} else

    // Else tell user their bid was too low via alert
    {
        alert("That isn't enough money.");
    }
}
)