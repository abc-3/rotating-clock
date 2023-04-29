d = new Date();
Y = d.getFullYear()
M = d.getMonth()
DD = new Date(Y, M+1, 0).getDate();
const latitude = null;
const longitude = null;

const options = {
  method: 'GET',
  params: String(DD)+"."+String(M+1)+"."+String(Y),
  headers: {'API-Key': 'KEY'}
};

async function getPositions (url, data={}) {
  const response = await fetch(url, data);
  return response.json()
}
// p = getPositions("", options)

function draw() {
  for (let i = 0; i < 60; i++) {
    let x = i < 10 ? "0"+i : i;
    $("#second").append("<li data-item=" + x + ">" + x + "</li>");
  }
  for (i = 0; i < 60; i++) {
    let x = i < 10 ? "0"+i : i;
    $("#minute").append("<li data-item=" + x + ">" + x + "</li>");
  }
  for (i = 1; i <= DD; i++) {
    $("#day").append("<li data-item=" + i + ">" + i + "</li>");
  }
  for (i = 1; i <= 24; i++) {
    let x = i % 12 + 1
    $("#hour").append("<li data-item=" + x + ">" + x + "</li>");
  }
  for (i = 1; i <= 12; i++) {
    $("#month").append("<li data-item=" + i + ">" + i + "</li>");
  }
}

function geoloc() {
  const status = document.querySelector('#status');
  function success(position) {
    latitude  = position.coords.latitude;
    longitude = position.coords.longitude;
    status.textContent = '';
  }
  function error() {
    status.textContent = 'Unable to retrieve your location';
  }
  if (!navigator.geolocation) {
    status.textContent = 'Geolocation is not supported by your browser';
  } else {
    status.textContent = 'Locating…';
    navigator.geolocation.getCurrentPosition(success, error);
  }
}

function set_time() {
  const month_deg = 30;
  const day_deg = (360 / DD);
  const hour_deg = 15;
  const minsec_deg = 6;
  $("#second li").each(function (index) {
    $(this).css({
      transform:
        "rotateZ(" + minsec_deg * index + "deg) translateX(" + Number(200) + "px)"
    });
  });
  $("#minute li").each(function (index) {
    $(this).css({
      transform:
        "rotateZ(" + minsec_deg * index + "deg) translateX(" + Number(170) + "px)"
    });
  });
  $("#hour li").each(function (index) {
    $(this).css({
      transform:
        "rotateZ(" + hour_deg * index + "deg) translateX(" + Number(140) + "px)"
    });
  });
  $("#day li").each(function (index) {
    $(this).css({
      transform:
        "rotateZ(" + day_deg * index + "deg) translateX(" + Number(110) + "px)"
    });
  });
  $("#month li").each(function (index) {
    $(this).css({
      transform:
        "rotateZ(" + month_deg * index + "deg) translateX(" + Number(80) + "px)"
    });
  });
}

//TIMER
function sec(ts, timer) {
  TS = ts % 60;
  if (ts == 0 && timer) min(0, timer);
  deg = (360 / 60) * ts;
  $("#second li").removeClass("active");
  $("#second li").eq(TS).addClass("active");
  $("#second").css({ transform: "rotateZ(-" + deg + "deg)" });
  ts++;
  if (timer)
    setTimeout(function () {
      sec(ts, timer);
    }, TIME * 1000);
}

function min(tm, timer) {
  TM = tm % 60;
  if (tm == 0 && timer) hour(0, timer);
  deg = (360 / 60) * tm;
  $("#minute li").removeClass("active");
  $("#minute li").eq(TM).addClass("active");
  $("#minute").css({ transform: "rotateZ(-" + deg + "deg)" });
  tm++;
  if (timer)
    setTimeout(function () {
      min(tm, timer);
    }, TIME * 60000);
}

function day(td, days, timer) {
  TD = td % days;
  deg = (360 / days) * td;
  $("#day li").removeClass("date_active");
  $("#day li").eq(TD).addClass("date_active");
  $("#day").css({ transform: "rotateZ(-" + deg + "deg)" });
  td++;
  if (timer)
    setTimeout(function () {
      day(td, timer);
    }, TIME * 3600000);
}

function hour(th, timer) {
  TH = th % 24;
  deg = (360 / 24) * th;
  $("#hour li").removeClass("active");
  $("#hour li").eq(TH).addClass("active");
  $("#hour").css({ transform: "rotateZ(-" + deg + "deg)" });
  th++;
  if (timer)
    setTimeout(function () {
      hour(th, timer);
    }, TIME * 3600000);
}

function month(tm, timer) {
  TM = tm % 12;
  deg = (360 / 12) * tm;
  $("#month li").removeClass("date_active");
  $("#month li").eq(TM).addClass("date_active");
  $("#month").css({ transform: "rotateZ(-" + deg + "deg)" });
  tm++;
  if (timer)
    setTimeout(function () {
      month(tm, timer);
    }, TIME * 120000);
}

//CLOCK
function clock() {
    d = new Date();
    D = d.getDate()-1;
    H = d.getHours()-2;
    MM = d.getMinutes();
    S = d.getSeconds();
    M = d.getMonth();
    Y = d.getFullYear()
    DD = new Date(Y, M+1, 0).getDate();
    month(M, 0);
    day(D, DD, 0);
    hour(H, 0);
    min(MM, 0);
    sec(S, 0);
    setTimeout(function () {
	clock();
    }, 1000);
}

$(document).ready(function () {
  draw();
  set_time();
  //CLOCK
  clock();
  //LIGHT
  $("h1").click(function () {
    $(this).toggleClass("off");
    $("body").toggleClass("off");
    $("li").toggleClass("off");
  });
});
