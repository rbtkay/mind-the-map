exports.calculatePoints = (distance, timeTaken) => {
    const limit_m = 2000;
    const remainingTime = 10000 - timeTaken;
    const distanceInFormula = limit_m - distance > 0 ? limit_m - distance : 0;

    const finalScore = Number(
        remainingTime * ((distanceInFormula * 5) / 2000)
    ).toFixed(3);

    return finalScore;
};

exports.getDistanceFromLatLonInKm = (lat1, lon1, lat2, lon2) => {
    var R = 6371; // Radius of the earth in km
    var dLat = deg2rad(lat2 - lat1); // deg2rad below
    var dLon = deg2rad(lon2 - lon1);
    var a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(deg2rad(lat1)) *
            Math.cos(deg2rad(lat2)) *
            Math.sin(dLon / 2) *
            Math.sin(dLon / 2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = (R * c) * 1000; // Distance in m
    return d;
};
function deg2rad(deg) {
    return deg * (Math.PI / 180);
}

exports.getTimeTakenFromAnimation = (animation_value, total_time_in_ms) => {
    return (parseFloat(animation_value) * parseFloat(total_time_in_ms)) / 100;
};

