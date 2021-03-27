

API_KEY = "34fc7946";
NAME = "Death Note";
url = 'http://www.omdbapi.com/?t='+NAME+'&apikey='+API_KEY;
shows = [];
episodes = [];
x = 1;
SEASON = 1;
SEASON_MAX = 0;
EPISODE_BIG = [];
EPISODE_SMALL = [];
RATINGS = [];
EPISODE_COUNT = 1;
EPISODE_INDEX= [];



function apiCall() {
    // $.getJSON('http://www.omdbapi.com/?s='+NAME+'&apikey='+API_KEY).then((response) => {
    //    console.log(response) 
    //    RETURN = response;
    // });
    
    $.getJSON(url, function(result) {
        $.each(result, function(i, field){
            if (typeof field == "object") {
            $.each(field, function(content) {
                // console.log(field[content]);
                shows[shows.length] = field[content]["imdbID"];
                if (x < field.length) {
                    x++;
                } else {
                    display();
                }
            })
            }
        })
    })


}

function display() {
    for (i = 0; i < shows.length; i++) {
        // console.log(shows[i]);
        $.getJSON('http://www.omdbapi.com/?i='+shows[i]+'&apikey='+API_KEY, function(result) {
            console.log(result);
        })
    }
}

function getTotalSeasons() {
    $.getJSON(url, function(result) {
            console.log(result);
            SEASON_MAX = result["totalSeasons"]
            getEpisodes();
        })
}

function getEpisodes() {
    SEASON_COUNT = 1;
    for (SEASON = 1; SEASON <= SEASON_MAX; SEASON++) {
        $.getJSON('http://www.omdbapi.com/?t='+NAME+'&Season='+SEASON+'&apikey='+API_KEY, function(result) {
            console.log(result);
            // console.log(result["Response"]);
            
            EPISODE_BIG[result["Season"]-1] = result["Episodes"];
            SEASON_COUNT++;

            if (SEASON_COUNT > SEASON_MAX) {
                // console.log(EPISODE_BIG);
                displayEpisodes();
            }   
    });
    }
}

function displayEpisodes() {
    for (y = 0; y < EPISODE_BIG.length; y++) {
        // console.log(EPISODE_BIG[y]);
        for (z = 0; z < EPISODE_BIG[y].length; z++) {
            // console.log(EPISODE_BIG[y][z]["imdbRating"]);
            RATINGS.push(EPISODE_BIG[y][z]["imdbRating"]);
            EPISODE_INDEX.push(EPISODE_COUNT++)
            if (z == EPISODE_BIG[y].length-1) {
                // console.log(RATINGS);
                for (x = 0; x < RATINGS.length; x++) {
                    console.log(RATINGS[x]);
                }
                // var chart = new Chart(ctx, {
                //     type: 'line',
                //     data: RATINGS,
                //     options
                // })
                chart();
            }

        }
    }
}

function chart() {
    // var ctx = document.getElementById("chart-js");
    // new chart(ctx , {
    //     type: 'line',
    //     data: RATINGS,
    //     options: {}
    // });
    // 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23,24, 25, 26, 27, 28, 29, 30, 31, 32, 33
    title = document.getElementById('title');
    title.innerHTML = NAME;
    var ctx = document.getElementById('myChart');
    var myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: EPISODE_INDEX,
            datasets: [{
                label: 'Rating out of 10',
                data: RATINGS,
                // backgroundColor: [
                //     'rgba(255, 99, 132, 0.2)',
                //     'rgba(54, 162, 235, 0.2)',
                //     'rgba(255, 206, 86, 0.2)',
                //     'rgba(75, 192, 192, 0.2)',
                //     'rgba(153, 102, 255, 0.2)',
                //     'rgba(255, 159, 64, 0.2)'
                // ],

                // ],
                borderWidth: 4,
                borderColor: "rgba(0, 230, 142, 0.5)",
                // backgroundColor:  "rgba(255, 255, 255, 0)",
                // pointHoverBackgroundColor: ['rgba(75, 192, 192, 0.2)'],
                // pointHoverRadius: 20,

            }],
            
            
        },
        options: {
            layout: {
                // padding: {
                //     left: 50,
                //     right: 50,
                //     top: 5000,
                //     bottom: 50
                // }
            },
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true,
                        max: 10
                    }
                }]
            }
        }
        // options: {}
    });

    

}



getTotalSeasons();