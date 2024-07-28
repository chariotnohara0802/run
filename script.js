let distanceData = [];
let speedData = [];
let labels = [];
let startTime = new Date();

const ctxDistance = document.getElementById('distanceChart').getContext('2d');
const ctxSpeed = document.getElementById('speedChart').getContext('2d');

const distanceChart = new Chart(ctxDistance, {
    type: 'line',
    data: {
        labels: labels,
        datasets: [{
            label: 'Distance (m)',
            data: distanceData,
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1,
            fill: false
        }]
    },
    options: {
        scales: {
            x: {
                type: 'time',
                time: {
                    unit: 'minute'
                },
                title: {
                    display: true,
                    text: 'Time'
                }
            },
            y: {
                title: {
                    display: true,
                    text: 'Distance (m)'
                }
            }
        }
    }
});

const speedChart = new Chart(ctxSpeed, {
    type: 'line',
    data: {
        labels: labels,
        datasets: [{
            label: 'Speed (m/s)',
            data: speedData,
            borderColor: 'rgba(153, 102, 255, 1)',
            borderWidth: 1,
            fill: false
        }]
    },
    options: {
        scales: {
            x: {
                type: 'time',
                time: {
                    unit: 'minute'
                },
                title: {
                    display: true,
                    text: 'Time'
                }
            },
            y: {
                title: {
                    display: true,
                    text: 'Speed (m/s)'
                }
            }
        }
    }
});

function getLocation() {
    console.log("getLocation called");  // ログメッセージを追加
    if (navigator.geolocation) {
        navigator.geolocation.watchPosition(showPosition, showError, { enableHighAccuracy: true });
    } else {
        document.getElementById("output").innerHTML = "Geolocation is not supported by this browser.";
        console.log("Geolocation is not supported by this browser.");  // ログメッセージを追加
    }
}

function showPosition(position) {
    console.log("showPosition called");  // ログメッセージを追加
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;
    const speed = position.coords.speed ? position.coords.speed : 0;
    const timestamp = new Date(position.timestamp).toLocaleTimeString();
    const currentTime = new Date();

    const timeElapsed = (currentTime - startTime) / 1000 / 60; // 分単位

    labels.push(currentTime);
    distanceData.push(distanceData.length > 0 ? distanceData[distanceData.length - 1] + speed * 5 : 0);
    speedData.push(speed);

    distanceChart.update();
    speedChart.update();

    document.getElementById("output").innerHTML = `
        Time: ${timestamp}<br>
        Latitude: ${lat}<br>
        Longitude: ${lon}<br>
        Speed: ${speed} m/s
    `;
}

function showError(error) {
    console.log("showError called");  // ログメッセージを追加
    switch(error.code) {
        case error.PERMISSION_DENIED:
            document.getElementById("output").innerHTML = "User denied the request for Geolocation.";
            console.log("User denied the request for Geolocation.");  // ログメッセージを追加
            break;
        case error.POSITION_UNAVAILABLE:
            document.getElementById("output").innerHTML = "Location information is unavailable.";
            console.log("Location information is unavailable.");  // ログメッセージを追加
            break;
        case error.TIMEOUT:
            document.getElementById("output").innerHTML = "The request to get user location timed out.";
            console.log("The request to get user location timed out.");  // ログメッセージを追加
            break;
        case error.UNKNOWN_ERROR:
            document.getElementById("output").innerHTML = "An unknown error occurred.";
            console.log("An unknown error occurred.");  // ログメッセージを追加
            break;
    }
}

// 初期化
window.onload = () => {
    console.log("Window loaded, calling getLocation");  // ログメッセージを追加
    getLocation();
};
