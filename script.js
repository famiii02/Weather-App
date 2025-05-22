const apiKey = "1e9b20caf5e833877bb379b0ab0615d7"; // Replace with your real OpenWeatherMap key

function getWeather() {
  const location = document.getElementById("locationInput").value;
  if (!location) return alert("Please enter a location");

  const weatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`;
  const forecastURL = `https://api.openweathermap.org/data/2.5/forecast?q=${location}&appid=${apiKey}&units=metric`;

  fetch(weatherURL)
    .then(res => res.json())
    .then(data => {
      if (data.cod !== 200) throw new Error(data.message);

      const temp = Math.round(data.main.temp);
      document.getElementById("cityName").innerText = data.name;
      document.getElementById("temperature").innerText = `${temp}°C`;
      document.getElementById("description").innerText = data.weather[0].description;

      updateBackground(temp);
      updateFunnyMessage(temp);
    })
    .catch(err => {
      alert("Error: " + err.message);
    });

  fetch(forecastURL)
    .then(res => res.json())
    .then(data => {
      const dailyData = data.list.filter(item => item.dt_txt.includes("12:00:00"));
      const forecastContainer = document.getElementById("forecastContainer");
      forecastContainer.innerHTML = "";

      dailyData.slice(0, 5).forEach(day => {
        const date = new Date(day.dt_txt);
        const weekday = date.toLocaleDateString("en-US", { weekday: "short" });
        forecastContainer.innerHTML += `
          <div class="forecast-day">
            <strong>${weekday}</strong><br/>
            ${Math.round(day.main.temp)}°C<br/>
            <small>${day.weather[0].description}</small>
          </div>
        `;
      });
    });
}

function updateBackground(temp) {
  if (temp <= 15) {
    document.body.style.backgroundImage = "url('images/cold.jpg')";
  } else if (temp <= 20) {
    document.body.style.backgroundImage = "url('images/cool.jpg')";
  } else if (temp <= 35 ) {
    document.body.style.backgroundImage = "url('images/warm.jpg')";
  } else {
    document.body.style.backgroundImage = "url('images/hot.jpeg')";
  }
}

function updateFunnyMessage(temp) {
  const msg = document.getElementById("funnyMessage");

  if (temp <= 15) {
    msg.innerText = "🧥 Brrr... Bring your jacket!";
  } else if (temp <= 20) {
    msg.innerText = "🌤️ Nice weather for a walk!";
  } else if (temp <= 35) {
    msg.innerText = "☀️ Stay hydrated!";
  } else {
    msg.innerText = "🔥 Wear SPF. Don’t melt!";
  }
}
