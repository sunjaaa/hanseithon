var mapContainer = document.getElementById('map'), // 지도를 표시할 div 
    mapOption = { 
        center: new kakao.maps.LatLng(37.5547612436712, 126.97048332343608), // 지도의 중심좌표 (서울역으로 설정할게요^^)
        level: 10 // 지도의 확대 레벨
    };

// 지도를 표시할 div와  지도 옵션으로  지도를 생성합니다
var map = new kakao.maps.Map(mapContainer, mapOption);

var imageSrc = 'https://cdn.discordapp.com/attachments/921419397774589952/923912980465348628/starrrrrrrr.png', // 선별 진료소 이미지 링크   
    imageSize = new daum.maps.Size(33, 35), // 마커이미지의 크기
    imageOption = {offset: new daum.maps.Point(15, 30)}; // 마커이미지의 옵션입니다. 마커의 좌표와 일치시킬 이미지 안에서의 좌표를 설정합니다.

    var markerImage = new daum.maps.MarkerImage(imageSrc, imageSize, imageOption) //markerImage에 이미지 링크, 마커 이미지 크기, 이미지 안에서의 좌표를 담음

$.ajax({
    url: "/location",
    type: "GET",
}).done((response)=> {
    if (response.message !== "success") return;
    const data = response.data;

let markerList = [];
let infowindowList = [];

const getClickHandler = (i) => () => {
    const marker = markerList[i];
    const infowindow = infowindowList[i];
    if (infowindow.getMap()) {
        infowindow.close();
    }
    else {
        infowindow.open(map, marker);
    }
};

const getClickMap = (i) => () => {
    const infowindow = infowindowList[i];
    infowindow.close();
};

for(let i in data) {
    const target = data[i];
    const latlng = new kakao.maps.LatLng(target.lat, target.lng);

    let marker = new kakao.maps.Marker({
        map: map,
        position: latlng,
        image: markerImage
    })
    marker.setMap(map);

    const content = `
    <div style="padding:23px;">
        ${target.title}<br>
        ${target.address}<br>
    </div>
    `;

    const infowindow = new kakao.maps.InfoWindow({
        zIndex: 1,
        content: content
    });

    markerList.push(marker);
    infowindowList.push(infowindow);
}

for (let i = 0, ii = markerList.length; i< ii; i++) {
    kakao.maps.event.addListener(markerList[i], "click", getClickHandler(i));
    kakao.maps.event.addListener(map, "click", getClickMap(i));
}

})

const showMenu = (toggleId, navbarId, bodyId) => {
    const toggle = document.getElementById(toggleId),
    navbar = document.getElementById(navbarId),
    bodypadding = document.getElementById(bodyId)

    if( toggle && navbar ) {
        toggle.addEventListener('click', ()=>{
            navbar.classList.toggle('expander');

            bodypadding.classList.toggle('body-pd')
        })
    }
}

showMenu('nav-toggle', 'navbar', 'body-pd')

/* LINK ACTIVE */
const linkColor = document.querySelectorAll('.nav__link')
function colorLink() {
    linkColor.forEach(l=> l.classList.remove('active'))
    this.classList.add('active')
}
linkColor.forEach(l=> l.addEventListener('click', colorLink))

/* COLLAPSE MENU */
const linkCollapse = document.getElementsByClassName('collapse__link')
var i

for(i=0;i<linkCollapse.length;i++) {
    linkCollapse[i].addEventListener('click', function(){
        const collapseMenu = this.nextElementSibling
        collapseMenu.classList.toggle('showCollapse')

        const rotate = collapseMenu.previousElementSibling
        rotate.classList.toggle('rotate')
    });
}
