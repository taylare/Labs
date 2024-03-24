$(document).ready(function() {
    let username = "";
    // Define the questions
    const questions = [
        {
            question: "Which animal is the closest living relative to the T-Rex?",
            choices: ["Cat", "Ostrich", "Chicken", "Dolphin"],
            answer: "Chicken",
            hint: "Chickens"
        },
        {
            question: "In the Great Emu War of 1932, who won?",
            choices: ["The Australian military", "The emus"],
            answer: "The emus",
            hint: "the emus lol"
        },
        {
            question: "Which country invented Hawaiian pizza?",
            choices: ["Hawaii", "Italy", "Canada", "England"],
            answer: "Canada",
            hint: "Canada!"
        },
        {
            question: "How do lizards communicate?",
            choices: ["Making sounds", "Blinking", "Doing push-ups"],
            answer: "Doing push-ups",
            hint: "doing push-ups"
        },
        {
            question: "Peanuts are a type of nut.",
            choices: ["True", "False"],
            answer: "False",
            hint: "false"
        }
    ];

    // Timer variables
    let timerInterval;
    let timerSeconds = 0;

    // Timer function
    function startTimer() {
        timerInterval = setInterval(function() {
            timerSeconds++;
            updateTimer();
        }, 1000);
    }

    // Function to update timer display
    function updateTimer() {
        $('#timer').text(formatTime(timerSeconds));
    }

    // Function to format time as MM:SS
    function formatTime(seconds) {
        let minutes = Math.floor(seconds / 60);
        let remainingSeconds = seconds % 60;
        return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
    }

    function loadQuestions() {
        let delay = 1000; // Initial delay for first question
        let colorIndex = 0; // Initialize color index
    
        // Array of predefined colors
        const colors = ["#caffbf", "#ecbcfd", "#baf2e9", "#fad2e1", "#fff185"];
    
        function fadeInCard() {
            // Select the current card and animate its properties
            $('.card').eq(colorIndex).animate({
                opacity: 1,
                top: 0
            }, 500); // Adjust duration as needed
    
            colorIndex++; // Move to the next card
    
            // Call fadeInCard function recursively until all cards are animated
            if (colorIndex < questions.length) {
                setTimeout(fadeInCard, 100); // Adjust delay between animations as needed
            }
        }
    
        // Loop through each question and construct HTML for each card
        questions.forEach(function(question, index) {
            // Get the color for the current card header
            let cardHeaderColor = colors[index % colors.length]; // Cycle through colors without duplicates
    
            // Construct HTML for each question card with the assigned header color
            let questionCard = `
                <div class="card mb-3" style="opacity:0; position:relative; top:-20px;"> <!-- Initially hide the card -->
                    <div class="card-header" style="background-color: ${cardHeaderColor};">
                        <div class="text-center">${index + 1}. ${question.question}</div>
                    </div>
                    <div class="card-body">
                        <form id="question${index}">
                            ${question.choices.map((choice, i) => `
                                <div class="form-check">
                                    <input class="form-check-input" type="radio" name="question${index}" id="question${index}_choice${i}" value="${choice}">
                                    <label class="form-check-label" for="question${index}_choice${i}">
                                        ${choice}
                                    </label>
                                </div>
                            `).join("")}
                        </form>
                        <a href="#" class="hint">[HINT]</a>
                        <div class="hint-text" style="display: none;">${question.hint}</div>
                    </div>
                </div>
            `;
            $('#questions').append(questionCard);
        });
    
        // Call fadeInCard function after initial delay
        setTimeout(fadeInCard, delay);
    
        // Add event listeners for hint functionality
        $('.hint').mouseover(function() {
            $(this).next('.hint-text').fadeIn();
        }).mouseout(function() {
            $(this).next('.hint-text').fadeOut();
        });
    }
    

   // Function to calculate score
    function calculateScore() {
        let correctAnswers = 0;
        questions.forEach(function(question, index) {
            let selectedAnswer = $(`input[name='question${index}']:checked`).val();
            if (selectedAnswer === question.answer) {
                correctAnswers++;
            }
        });
        return correctAnswers;
    }


    // Function to animate score display
    function animateScoreDisplay() {
        $('#scoreMessage').fadeIn(3000);
        // Your code to animate score display here
    }

    $('#beginQuiz').click(function() {
        // Get the username from the input field
        username = $('#username').val().trim();
        if (username === "") {
            alert("Please enter your name.");
            return;
        }
        $('#initialPage').fadeOut(1000, function() {
            // Hide the initial page
            $(this).remove(); // Remove the initial page from the DOM
            $('#welcomeMessage').text("Welcome, " + username + ". Good luck!");
            $('#quizPage').fadeIn(500); // Show the quiz page
            startTimer();
            loadQuestions();
            // Call displayResults function with username as an argument
            displayResults(0, username); // Pass 0 as score for now, as the score is calculated later
        });
    });
    
    function displayResults(score) {
        const timeTaken = formatTime(timerSeconds);
        let message = "";
        if (score === 5) {
            message = `<span class="highlight-pink">${username}!</span><br><span class="highlight-pink">You scored ${score}/${questions.length}. Perfect!</span><br><span class="highlight-green">You finished in ${timeTaken} seconds!</span>`;
            // Flash timer results and message 10 times rapidly
            for (let i = 0; i < 10; i++) {
                setTimeout(function() {
                    $('#timerResults').fadeIn(100).fadeOut(100);
                    $('#scoreMessage').fadeOut(100).fadeIn(100); // Flash the score message
                }, i * 200); // Change the value (200ms) for faster or slower flashing
            }
        } else if (score === 0) {
            message = `<span class="highlight-pink">${username}!</span><br><span class="highlight-pink">You scored ${score}/${questions.length}. You suck! (jk)</span><br><span class="highlight-green">You finished in ${timeTaken} seconds!</span>`;
        } else {
            message = `<span class="highlight-pink">${username}!</span><br><span class="highlight-pink">You scored ${score}/${questions.length}.</span><br><span class="highlight-green">You finished in ${timeTaken} seconds!</span>`;
        }
        $('#scoreMessage').html(message);
        // Fade in username over 3 seconds
        $('#usernameDisplay').html(username + "!").fadeIn(3000);
        // Animate score display
        $('#scoreMessage').fadeIn(3000);
    }
    

    $('#submitAnswers').click(function() {
        // Stop timer
        clearInterval(timerInterval);
    
        // Calculate score
        let score = calculateScore();
    
        // Scroll to the top of the page
        $('html, body').animate({ scrollTop: 0 }, 'slow');
    
        // Show score underneath the timer after a delay
        setTimeout(function() {
            $('#scoreDisplay').text(`Your score is: ${score} out of ${questions.length}`).fadeIn();
        }, 1000); 
    
        // Display modal after 3 seconds
        setTimeout(function() {
            $('#resultsModal').modal('show');
            // Pass score to displayResults function
            displayResults(score);
        }, 3000);
    
        // Animate score display
        animateScoreDisplay();
    });
    
});
