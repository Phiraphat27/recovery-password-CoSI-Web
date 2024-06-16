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
