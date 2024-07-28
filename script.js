function getLocation() {
    console.log("getLocation called");  // ログメッセージを追加
    if (navigator.geolocation) {
        navigator.geolocation.watchPosition(showPosition, showError, { enableHighAccuracy: true });
    } else {
        document.getElementById("output").innerHTML = "Geolocation is not supported by this browser.";
    }
}

function showPosition(position) {
    console.log("showPosition called");  // ログメッセージを追加
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;
    const speed = position.coords.speed ? position.coords.speed : 0;
    const timestamp = new Date(position.timestamp).toLocaleTimeString();

    console.log(`Latitude: ${lat}, Longitude: ${lon}, Speed: ${speed}, Time: ${timestamp}`);  // ログメッセージを追加
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
window.onload = getLocation;
