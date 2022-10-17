export function date() {
  let dateOptions = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  setInterval(() => {
    let currentDate = new Date();
    let date = currentDate.toLocaleDateString("zh-CN", dateOptions);
    const time = currentDate.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit', second:'2-digit', hour12: false});
    document.getElementById("header_date").innerHTML = `<span class="date">${date}</span><span class="time">${time}</span>`;
  }, 1000)
}

export function greet() {
  let currentTime = new Date();
  let greet = Math.floor(currentTime.getHours() / 6);
  switch (greet) {
    case 0:
      // document.getElementById("header_greet").innerHTML = "Good night :)";
      document.getElementById("header_greet").innerHTML = "晚安 :)";
      break;
    case 1:
      // document.getElementById("header_greet").innerHTML = "Good morning :)";
      document.getElementById("header_greet").innerHTML = "早上好 :)";
      break;
    case 2:
      // document.getElementById("header_greet").innerHTML = "Good afternoon :)";
      document.getElementById("header_greet").innerHTML = "下午好 :)";
      break;
    case 3:
      // document.getElementById("header_greet").innerHTML = "Good evening :)";
      document.getElementById("header_greet").innerHTML = "晚上好 :)";
      break;
  }
}
