"use client";

const getCurrentPosition = () => {
    return new Promise((resolve, reject) => {
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    resolve({
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude,
                    });
                },
                (error) => {
                    switch (error.code) {
                        case error.PERMISSION_DENIED:
                            console.log("User denied the request for Geolocation.");
                            break;
                        case error.POSITION_UNAVAILABLE:
                            console.log("Location information is unavailable.");
                            break;
                        case error.TIMEOUT:
                            console.log("The request to get user location timed out.");
                            break;
                        default:
                            console.log("An unknown error occurred.");
                            break;
                    }
                    resolve({
                        latitude: 0,
                        longitude: 0,
                    });
                }
            );
        } else {
            reject(new Error("Geolocation is not available"));
        }
    });
};

export default getCurrentPosition;
