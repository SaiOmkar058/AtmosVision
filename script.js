const weatherVideos = {
    'clear sky': 'https://res.cloudinary.com/decpgg8fe/video/upload/v1742281262/clear_sky_kz3313.mp4',
    'few clouds': 'https://res.cloudinary.com/decpgg8fe/video/upload/v1742278238/38278-418005695_small_onrp1l.mp4',
    'scattered clouds': 'https://res.cloudinary.com/decpgg8fe/video/upload/v1742278238/38278-418005695_small_onrp1l.mp4',
    'broken clouds': 'https://res.cloudinary.com/decpgg8fe/video/upload/v1742278238/38278-418005695_small_onrp1l.mp4',
    'overcast clouds': 'https://res.cloudinary.com/decpgg8fe/video/upload/v1742278238/38278-418005695_small_onrp1l.mp4',
    'mist': 'https://res.cloudinary.com/decpgg8fe/video/upload/v1742279418/mist_snow_roospz.mp4',
    'haze': 'https://res.cloudinary.com/ddnlumst5/video/upload/v1742292599/181972-867576063_tiny_q2tkgz.mp4',
    'fog': 'https://res.cloudinary.com/decpgg8fe/video/upload/v1742279418/mist_snow_roospz.mp4',
    'smoke': 'https://res.cloudinary.com/decpgg8fe/video/upload/v1742279418/mist_snow_roospz.mp4',
    'snow': 'https://res.cloudinary.com/decpgg8fe/video/upload/v1742279842/snow_xgw6vs.mp4',
    'light snow': 'https://res.cloudinary.com/decpgg8fe/video/upload/v1742279842/snow_xgw6vs.mp4',
    'heavy snow': 'https://res.cloudinary.com/decpgg8fe/video/upload/v1742279842/snow_xgw6vs.mp4',
    'rain': 'https://res.cloudinary.com/decpgg8fe/video/upload/v1742280886/rain_fl2juk.mp4',
    'light rain': 'https://res.cloudinary.com/decpgg8fe/video/upload/v1742280886/rain_fl2juk.mp4',
    'moderate rain': 'https://res.cloudinary.com/decpgg8fe/video/upload/v1742280886/rain_fl2juk.mp4',
    'heavy rain': 'https://res.cloudinary.com/decpgg8fe/video/upload/v1742280886/rain_fl2juk.mp4',    
    'default': 'https://res.cloudinary.com/decpgg8fe/video/upload/v1742289142/ezgif-70819f2398a582_gcvfgm.mp4'
};

const weatherImages = {
    'clear sky': 'https://res.cloudinary.com/decpgg8fe/image/upload/v1742274837/3731894_uyttpv.png',
    'few clouds': 'https://res.cloudinary.com/decpgg8fe/image/upload/v1742285921/clouds_w8m1zp.png',
    'scattered clouds': 'https://res.cloudinary.com/decpgg8fe/image/upload/v1742285921/clouds_w8m1zp.png',
    'broken clouds': 'https://res.cloudinary.com/decpgg8fe/image/upload/v1742285921/clouds_w8m1zp.png',
    'overcast clouds': 'https://res.cloudinary.com/decpgg8fe/image/upload/v1742285921/clouds_w8m1zp.png',
    'mist': 'https://res.cloudinary.com/decpgg8fe/image/upload/v1742295734/snoww-removebg-preview_amhksz.png',
    'haze': 'https://res.cloudinary.com/decpgg8fe/image/upload/v1742295734/snoww-removebg-preview_amhksz.png',
    'fog': 'https://res.cloudinary.com/decpgg8fe/image/upload/v1742295734/snoww-removebg-preview_amhksz.png',
    'smoke': 'https://res.cloudinary.com/decpgg8fe/image/upload/v1742295734/snoww-removebg-preview_amhksz.png',
    'snow': 'https://res.cloudinary.com/decpgg8fe/image/upload/v1742295734/snoww-removebg-preview_amhksz.png',
    'light snow': 'https://res.cloudinary.com/decpgg8fe/image/upload/v1742295734/snoww-removebg-preview_amhksz.png',
    'heavy snow': 'https://res.cloudinary.com/decpgg8fe/image/upload/v1742295734/snoww-removebg-preview_amhksz.png',
    'rain': 'https://res.cloudinary.com/decpgg8fe/image/upload/v1742286206/1332316_ygovxj.png',
    'light rain': 'https://res.cloudinary.com/decpgg8fe/image/upload/v1742286206/1332316_ygovxj.png',
    'moderate rain': 'https://res.cloudinary.com/decpgg8fe/image/upload/v1742286206/1332316_ygovxj.png',
    'heavy rain': 'https://res.cloudinary.com/decpgg8fe/image/upload/v1742286206/1332316_ygovxj.png',
    'heavy intensity rain': 'https://res.cloudinary.com/decpgg8fe/image/upload/v1742286206/1332316_ygovxj.png',
    'default': 'https://res.cloudinary.com/decpgg8fe/image/upload/v1742289458/weather_deffault-removebg-preview_wfcvgb.png'
};

function updateBackgroundVideo(weatherCondition) {
    const videoElement = document.getElementById('bgVideo');
    const videoSource = weatherVideos[weatherCondition.toLowerCase()] || weatherVideos['default'];
    
    // Log for debugging
    console.log('Weather condition:', weatherCondition);
    console.log('Video source:', videoSource);
    
    if (videoElement.src !== videoSource) {
        videoElement.src = videoSource;
        videoElement.load();
        videoElement.play().catch(e => console.error('Video playback error:', e));
    }
}

function updateWeatherImage(weatherCondition) {
    const imageElement = document.getElementById('weatherImage');
    const imageSource = weatherImages[weatherCondition.toLowerCase()] || weatherImages['default'];
    
    // Log for debugging
    console.log('Weather condition for image:', weatherCondition);
    console.log('Image source:', imageSource);
    
    imageElement.src = imageSource;
}

async function getWeather() {
    let city = document.getElementById("cityInput").value;
    if (city === "") return;

    let apiKey = "ad5161cf6e669805458e24ceea422013";
    let weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

    try {
        let weatherResponse = await fetch(weatherUrl);
        let weatherData = await weatherResponse.json();

        if (weatherData.cod === 200) {
            // Update background video and image based on weather condition
            updateBackgroundVideo(weatherData.weather[0].description);
            updateWeatherImage(weatherData.weather[0].description);

            const lat = weatherData.coord.lat;
            const lon = weatherData.coord.lon;
            
            // Get Air Quality Data
            const aqiUrl = `https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${apiKey}`;
            const aqiResponse = await fetch(aqiUrl);
            const aqiData = await aqiResponse.json();

            // Create weather display HTML
            const weatherHtml = `
                <div class="weather-details mt-4">
                    <h3>Weather in ${weatherData.name}</h3>
                    <div class="row mt-3">
                        <div class="col-md-4">
                            <p><strong>Temperature:</strong> ${weatherData.main.temp}°C</p>
                            <p><strong>Humidity:</strong> ${weatherData.main.humidity}%</p>
                        </div>
                        <div class="col-md-4">
                            <p><strong>Air Quality Index:</strong> ${aqiData.list[0].main.aqi}/5</p>
                        </div>
                        <div class="col-md-4">
                            <p><strong>Pressure:</strong> ${weatherData.main.pressure} hPa</p>
                            <p><strong>Condition:</strong> ${weatherData.weather[0].description}</p>
                        </div>
                    </div>
                </div>`;
            
            document.getElementById("weatherResult").innerHTML = weatherHtml;
            
            // Log success
            console.log('Weather data updated successfully');
        } else {
            console.error('Error fetching weather data:', weatherData);
            document.getElementById("weatherResult").innerHTML = "City not found";
        }
    } catch (error) {
        console.error('Error in getWeather:', error);
        document.getElementById("weatherResult").innerHTML = "Error fetching data";
    }
}

document.getElementById("cityInput").addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        document.getElementById("getWeather").click();
    }
});

// Set default background video and image on page load
window.onload = function() {
    updateBackgroundVideo('default');
    updateWeatherImage('default');
};