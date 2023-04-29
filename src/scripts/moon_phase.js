

function moonphase(date)
{
    // A recent new moon occured on december, 26, 2019 = 18256 days since 1970.
    // An average synodic month takes 29 days, 12 hours, 44 minutes, 3 seconds.

    var days_after_new_moon = (date.getTime() / 86400000) - 18256.8;
    var synodic_month = 29.53059;
    var m = Math.abs(days_after_new_moon / synodic_month);         // Must be +.
    var f = (m - Math.floor(m)); // Fractional part = moonphase from 0 to 1 (ex).
    return (Math.floor(f * synodic_month))
}