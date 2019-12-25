//menu
var menuButton = document.querySelector('.hamburger-menu');
var hiddenMenu = document.querySelector('.hidden-menu');
var closeButton = document.querySelector('.close-btn');
menuButton.addEventListener("click", function (e) {
    e.preventDefault();
    hiddenMenu.style.display = 'flex';
});
closeButton.addEventListener('click', function (e) {
    e.preventDefault();
    hiddenMenu.style.display = 'none';
});

//slider
const left = document.querySelector("#left");
const right = document.querySelector("#right");
const slider = document.querySelector(".burgers__list");

right.addEventListener('click', function (event) {
    event.preventDefault();
    loop('right');
});

left.addEventListener("click", function (event) {
    event.preventDefault();
    loop('left');
});
function loop(direction) {
    if (direction === "right") {
        slider.appendChild(slider.firstElementChild);
    }
    else {
        slider.insertBefore(slider.lastElementChild, slider.firstElementChild);
    }
};

//accordion-vertical
const teamItems = document.querySelectorAll('.team__item');
teamItemsActive = document.getElementsByClassName('team__item--active');
Array.from(teamItems).forEach(function (items, i, teamItems) {
    items.addEventListener('click', function (e) {
        e.preventDefault();
        if (teamItemsActive.length > 0 && teamItemsActive[0] !== this)
            teamItemsActive[0].classList.remove('team__item--active');
        this.classList.toggle('team__item--active');
    });

});

//accordion-horizontal
const menuItems = document.querySelectorAll('.menu-accordion__item');
menuItemsActive = document.getElementsByClassName('menu-accordion__item--active');
Array.from(menuItems).forEach(function (elems, i, menuItems) {
    elems.addEventListener('click', function (e) {
        e.preventDefault();
        if (menuItemsActive.length > 0 && menuItemsActive[0] !== this)
            menuItemsActive[0].classList.remove('menu-accordion__item--active');
        this.classList.toggle('menu-accordion__item--active');
    });

});




//modal window

const modalWindowButton = document.querySelectorAll('.reviews__button');

const modalWindow = createModalWindow('<div class="modal-window__name"></div><div class="modal-window__review"></div>');



Array.from(modalWindowButton).forEach(function (elems, i, modalWindowButton) {
    elems.addEventListener('click', function (e) {
        e.preventDefault;
        document.body.appendChild(modalWindow);
    });
});
function createModalWindow(content) {
    const modalWindowElement = document.createElement('div');
    modalWindowElement.classList.add('modal-window');

    const template = document.querySelector("#modal-windowTemplate");
    modalWindowElement.innerHTML = template.innerHTML;
    modalWindowElement.addEventListener('click', function (e) {
        if (e.target === modalWindowElement) {
            closeModalWindow.click();
        }
    });

    const modalWindowBlock = modalWindowElement.querySelector(".modal-window__block");
    const closeModalWindow = modalWindowBlock.querySelector(".modal-window__close-btn");
    closeModalWindow.addEventListener("click", function (e) {
        e.preventDefault();
        document.body.removeChild(modalWindowElement);
    });

    const modalWindowContent = modalWindowBlock.querySelector(".modal-window__content");
    modalWindowContent.innerHTML = content;

    const reviewName = modalWindowContent.querySelector('.modal-window__name');
    reviewName.textContent = 'Константин Спилберг';
    const reviewText = modalWindowContent.querySelector('.modal-window__review');
    reviewText.textContent = 'Мысли все о них и о них, о них и о них. Нельзя устоять, невозможно забыть... Никогда не думал, что булочки могут быть такими мягкими, котлетка такой сочной, а сыр таким расплавленным.';


    // var reviewName = document.querySelectorAll('.reviews__title');
    //var reviewText = document.querySelectorAll('.reviews__desc');

    //Array.from(reviewName).forEach(function (elems, i, reviewName) {

    //       modalWindowContent.innerHTML = reviewName;


    // });




    return modalWindowElement;




//form
const myForm = document.querySelector('.delivery-form__item');
const deliveryButton = document.querySelector('#deliveryButton');
const popup = document.querySelector('#popup');



myForm.addEventListener("submit", function(e) {
    e.preventDefault();
    const formData = new FormData(myForm);
    formData.append("to", "myExamplEmail@mail.ru");
    const request = new XMLHttpRequest();
    request.open("POST", "https://webdev-api.loftschool.com/sendmail");
    request.send(formData);
    request.addEventListener("load", function() {
        const responce = JSON.parse(request.response);
        if (request.status < 400) {
            myForm.reset();
            popup.style.display = 'flex';
        }
    });
});
deliveryButton.addEventListener('click', function() {
    popup.style.display = 'none';
})




//map

function ready() {

    $('#fullpage').fullpage();

    ymaps.ready(function () {
        var myMap = new ymaps.Map('map', {

            center: [54.71024095, 20.51061681],
            zoom: 9
        }, {
            searchControlProvider: 'yandex#search'

        }),

            // Создаём макет содержимого.
            MyIconContentLayout = ymaps.templateLayoutFactory.createClass(
                '<div style="color: #FFFFFF; font-weight: bold;">$[properties.iconContent]</div>'
            ),

            myPlacemark = new ymaps.Placemark(myMap.getCenter(), {
                hintContent: 'Собственный значок метки',
                balloonContent: 'Это красивая метка'
            }, {
                // Опции.
                // Необходимо указать данный тип макета.
                iconLayout: 'default#image',
                // Своё изображение иконки метки.
                iconImageHref: './img/icons/map-marker.svg',
                // Размеры метки.
                iconImageSize: [30, 42],
                // Смещение левого верхнего угла иконки относительно
                // её "ножки" (точки привязки).
                iconImageOffset: [-5, -38]
            }),



            myPlacemarkWithContent = new ymaps.Placemark([54.70051194, 20.49861694], {
                hintContent: 'Собственный значок метки с контентом',
                balloonContent: 'А эта — новогодняя',

            }, {
                // Опции.
                // Необходимо указать данный тип макета.
                iconLayout: 'default#image',
                // Своё изображение иконки метки.
                iconImageHref: './img/icons/map-marker.svg',
                // Размеры метки.
                iconImageSize: [48, 48],
                // Смещение левого верхнего угла иконки относительно
                // её "ножки" (точки привязки).
                iconImageOffset: [-24, -24],

            }),

            mySecondPlacemark = new ymaps.Placemark([54.7212675, 20.46990062], {
                hintContent: 'Собственный значок метки с контентом',
                balloonContent: 'А эта — новогодняя',

            }, {
                // Опции.
                // Необходимо указать данный тип макета.
                iconLayout: 'default#image',
                // Своё изображение иконки метки.
                iconImageHref: './img/icons/map-marker.svg',
                // Размеры метки.
                iconImageSize: [48, 48],
                // Смещение левого верхнего угла иконки относительно
                // её "ножки" (точки привязки).
                iconImageOffset: [-14, -4],
                // Смещение слоя с содержимым относительно слоя с картинкой.

            });

        myMap.geoObjects
            .add(myPlacemark)
            .add(myPlacemarkWithContent)
            .add(mySecondPlacemark);

        myMap.behaviors.disable('scrollZoom');
    });


}

document.addEventListener("DOMContentLoaded", ready);

        //fullpage scroll

        //$('#fullpage').fullpage();


}

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImZpcnN0LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6Im1haW4ubWluLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLy9tZW51XG52YXIgbWVudUJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5oYW1idXJnZXItbWVudScpO1xudmFyIGhpZGRlbk1lbnUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuaGlkZGVuLW1lbnUnKTtcbnZhciBjbG9zZUJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5jbG9zZS1idG4nKTtcbm1lbnVCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGZ1bmN0aW9uIChlKSB7XG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIGhpZGRlbk1lbnUuc3R5bGUuZGlzcGxheSA9ICdmbGV4Jztcbn0pO1xuY2xvc2VCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbiAoZSkge1xuICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICBoaWRkZW5NZW51LnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG59KTtcblxuLy9zbGlkZXJcbmNvbnN0IGxlZnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2xlZnRcIik7XG5jb25zdCByaWdodCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjcmlnaHRcIik7XG5jb25zdCBzbGlkZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmJ1cmdlcnNfX2xpc3RcIik7XG5cbnJpZ2h0LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICBsb29wKCdyaWdodCcpO1xufSk7XG5cbmxlZnQuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGZ1bmN0aW9uIChldmVudCkge1xuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgbG9vcCgnbGVmdCcpO1xufSk7XG5mdW5jdGlvbiBsb29wKGRpcmVjdGlvbikge1xuICAgIGlmIChkaXJlY3Rpb24gPT09IFwicmlnaHRcIikge1xuICAgICAgICBzbGlkZXIuYXBwZW5kQ2hpbGQoc2xpZGVyLmZpcnN0RWxlbWVudENoaWxkKTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIHNsaWRlci5pbnNlcnRCZWZvcmUoc2xpZGVyLmxhc3RFbGVtZW50Q2hpbGQsIHNsaWRlci5maXJzdEVsZW1lbnRDaGlsZCk7XG4gICAgfVxufTtcblxuLy9hY2NvcmRpb24tdmVydGljYWxcbmNvbnN0IHRlYW1JdGVtcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy50ZWFtX19pdGVtJyk7XG50ZWFtSXRlbXNBY3RpdmUgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCd0ZWFtX19pdGVtLS1hY3RpdmUnKTtcbkFycmF5LmZyb20odGVhbUl0ZW1zKS5mb3JFYWNoKGZ1bmN0aW9uIChpdGVtcywgaSwgdGVhbUl0ZW1zKSB7XG4gICAgaXRlbXMuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbiAoZSkge1xuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIGlmICh0ZWFtSXRlbXNBY3RpdmUubGVuZ3RoID4gMCAmJiB0ZWFtSXRlbXNBY3RpdmVbMF0gIT09IHRoaXMpXG4gICAgICAgICAgICB0ZWFtSXRlbXNBY3RpdmVbMF0uY2xhc3NMaXN0LnJlbW92ZSgndGVhbV9faXRlbS0tYWN0aXZlJyk7XG4gICAgICAgIHRoaXMuY2xhc3NMaXN0LnRvZ2dsZSgndGVhbV9faXRlbS0tYWN0aXZlJyk7XG4gICAgfSk7XG5cbn0pO1xuXG4vL2FjY29yZGlvbi1ob3Jpem9udGFsXG5jb25zdCBtZW51SXRlbXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcubWVudS1hY2NvcmRpb25fX2l0ZW0nKTtcbm1lbnVJdGVtc0FjdGl2ZSA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ21lbnUtYWNjb3JkaW9uX19pdGVtLS1hY3RpdmUnKTtcbkFycmF5LmZyb20obWVudUl0ZW1zKS5mb3JFYWNoKGZ1bmN0aW9uIChlbGVtcywgaSwgbWVudUl0ZW1zKSB7XG4gICAgZWxlbXMuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbiAoZSkge1xuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIGlmIChtZW51SXRlbXNBY3RpdmUubGVuZ3RoID4gMCAmJiBtZW51SXRlbXNBY3RpdmVbMF0gIT09IHRoaXMpXG4gICAgICAgICAgICBtZW51SXRlbXNBY3RpdmVbMF0uY2xhc3NMaXN0LnJlbW92ZSgnbWVudS1hY2NvcmRpb25fX2l0ZW0tLWFjdGl2ZScpO1xuICAgICAgICB0aGlzLmNsYXNzTGlzdC50b2dnbGUoJ21lbnUtYWNjb3JkaW9uX19pdGVtLS1hY3RpdmUnKTtcbiAgICB9KTtcblxufSk7XG5cblxuXG5cbi8vbW9kYWwgd2luZG93XG5cbmNvbnN0IG1vZGFsV2luZG93QnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnJldmlld3NfX2J1dHRvbicpO1xuXG5jb25zdCBtb2RhbFdpbmRvdyA9IGNyZWF0ZU1vZGFsV2luZG93KCc8ZGl2IGNsYXNzPVwibW9kYWwtd2luZG93X19uYW1lXCI+PC9kaXY+PGRpdiBjbGFzcz1cIm1vZGFsLXdpbmRvd19fcmV2aWV3XCI+PC9kaXY+Jyk7XG5cblxuXG5BcnJheS5mcm9tKG1vZGFsV2luZG93QnV0dG9uKS5mb3JFYWNoKGZ1bmN0aW9uIChlbGVtcywgaSwgbW9kYWxXaW5kb3dCdXR0b24pIHtcbiAgICBlbGVtcy5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uIChlKSB7XG4gICAgICAgIGUucHJldmVudERlZmF1bHQ7XG4gICAgICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQobW9kYWxXaW5kb3cpO1xuICAgIH0pO1xufSk7XG5mdW5jdGlvbiBjcmVhdGVNb2RhbFdpbmRvdyhjb250ZW50KSB7XG4gICAgY29uc3QgbW9kYWxXaW5kb3dFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgbW9kYWxXaW5kb3dFbGVtZW50LmNsYXNzTGlzdC5hZGQoJ21vZGFsLXdpbmRvdycpO1xuXG4gICAgY29uc3QgdGVtcGxhdGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI21vZGFsLXdpbmRvd1RlbXBsYXRlXCIpO1xuICAgIG1vZGFsV2luZG93RWxlbWVudC5pbm5lckhUTUwgPSB0ZW1wbGF0ZS5pbm5lckhUTUw7XG4gICAgbW9kYWxXaW5kb3dFbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgaWYgKGUudGFyZ2V0ID09PSBtb2RhbFdpbmRvd0VsZW1lbnQpIHtcbiAgICAgICAgICAgIGNsb3NlTW9kYWxXaW5kb3cuY2xpY2soKTtcbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgY29uc3QgbW9kYWxXaW5kb3dCbG9jayA9IG1vZGFsV2luZG93RWxlbWVudC5xdWVyeVNlbGVjdG9yKFwiLm1vZGFsLXdpbmRvd19fYmxvY2tcIik7XG4gICAgY29uc3QgY2xvc2VNb2RhbFdpbmRvdyA9IG1vZGFsV2luZG93QmxvY2sucXVlcnlTZWxlY3RvcihcIi5tb2RhbC13aW5kb3dfX2Nsb3NlLWJ0blwiKTtcbiAgICBjbG9zZU1vZGFsV2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBmdW5jdGlvbiAoZSkge1xuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIGRvY3VtZW50LmJvZHkucmVtb3ZlQ2hpbGQobW9kYWxXaW5kb3dFbGVtZW50KTtcbiAgICB9KTtcblxuICAgIGNvbnN0IG1vZGFsV2luZG93Q29udGVudCA9IG1vZGFsV2luZG93QmxvY2sucXVlcnlTZWxlY3RvcihcIi5tb2RhbC13aW5kb3dfX2NvbnRlbnRcIik7XG4gICAgbW9kYWxXaW5kb3dDb250ZW50LmlubmVySFRNTCA9IGNvbnRlbnQ7XG5cbiAgICBjb25zdCByZXZpZXdOYW1lID0gbW9kYWxXaW5kb3dDb250ZW50LnF1ZXJ5U2VsZWN0b3IoJy5tb2RhbC13aW5kb3dfX25hbWUnKTtcbiAgICByZXZpZXdOYW1lLnRleHRDb250ZW50ID0gJ9Ca0L7QvdGB0YLQsNC90YLQuNC9INCh0L/QuNC70LHQtdGA0LMnO1xuICAgIGNvbnN0IHJldmlld1RleHQgPSBtb2RhbFdpbmRvd0NvbnRlbnQucXVlcnlTZWxlY3RvcignLm1vZGFsLXdpbmRvd19fcmV2aWV3Jyk7XG4gICAgcmV2aWV3VGV4dC50ZXh0Q29udGVudCA9ICfQnNGL0YHQu9C4INCy0YHQtSDQviDQvdC40YUg0Lgg0L4g0L3QuNGFLCDQviDQvdC40YUg0Lgg0L4g0L3QuNGFLiDQndC10LvRjNC30Y8g0YPRgdGC0L7Rj9GC0YwsINC90LXQstC+0LfQvNC+0LbQvdC+INC30LDQsdGL0YLRjC4uLiDQndC40LrQvtCz0LTQsCDQvdC1INC00YPQvNCw0LssINGH0YLQviDQsdGD0LvQvtGH0LrQuCDQvNC+0LPRg9GCINCx0YvRgtGMINGC0LDQutC40LzQuCDQvNGP0LPQutC40LzQuCwg0LrQvtGC0LvQtdGC0LrQsCDRgtCw0LrQvtC5INGB0L7Rh9C90L7QuSwg0LAg0YHRi9GAINGC0LDQutC40Lwg0YDQsNGB0L/Qu9Cw0LLQu9C10L3QvdGL0LwuJztcblxuXG4gICAgLy8gdmFyIHJldmlld05hbWUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcucmV2aWV3c19fdGl0bGUnKTtcbiAgICAvL3ZhciByZXZpZXdUZXh0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnJldmlld3NfX2Rlc2MnKTtcblxuICAgIC8vQXJyYXkuZnJvbShyZXZpZXdOYW1lKS5mb3JFYWNoKGZ1bmN0aW9uIChlbGVtcywgaSwgcmV2aWV3TmFtZSkge1xuXG4gICAgLy8gICAgICAgbW9kYWxXaW5kb3dDb250ZW50LmlubmVySFRNTCA9IHJldmlld05hbWU7XG5cblxuICAgIC8vIH0pO1xuXG5cblxuXG4gICAgcmV0dXJuIG1vZGFsV2luZG93RWxlbWVudDtcblxuXG5cblxuLy9mb3JtXG5jb25zdCBteUZvcm0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZGVsaXZlcnktZm9ybV9faXRlbScpO1xuY29uc3QgZGVsaXZlcnlCdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjZGVsaXZlcnlCdXR0b24nKTtcbmNvbnN0IHBvcHVwID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3BvcHVwJyk7XG5cblxuXG5teUZvcm0uYWRkRXZlbnRMaXN0ZW5lcihcInN1Ym1pdFwiLCBmdW5jdGlvbihlKSB7XG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIGNvbnN0IGZvcm1EYXRhID0gbmV3IEZvcm1EYXRhKG15Rm9ybSk7XG4gICAgZm9ybURhdGEuYXBwZW5kKFwidG9cIiwgXCJteUV4YW1wbEVtYWlsQG1haWwucnVcIik7XG4gICAgY29uc3QgcmVxdWVzdCA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xuICAgIHJlcXVlc3Qub3BlbihcIlBPU1RcIiwgXCJodHRwczovL3dlYmRldi1hcGkubG9mdHNjaG9vbC5jb20vc2VuZG1haWxcIik7XG4gICAgcmVxdWVzdC5zZW5kKGZvcm1EYXRhKTtcbiAgICByZXF1ZXN0LmFkZEV2ZW50TGlzdGVuZXIoXCJsb2FkXCIsIGZ1bmN0aW9uKCkge1xuICAgICAgICBjb25zdCByZXNwb25jZSA9IEpTT04ucGFyc2UocmVxdWVzdC5yZXNwb25zZSk7XG4gICAgICAgIGlmIChyZXF1ZXN0LnN0YXR1cyA8IDQwMCkge1xuICAgICAgICAgICAgbXlGb3JtLnJlc2V0KCk7XG4gICAgICAgICAgICBwb3B1cC5zdHlsZS5kaXNwbGF5ID0gJ2ZsZXgnO1xuICAgICAgICB9XG4gICAgfSk7XG59KTtcbmRlbGl2ZXJ5QnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24oKSB7XG4gICAgcG9wdXAuc3R5bGUuZGlzcGxheSA9ICdub25lJztcbn0pXG5cblxuXG5cbi8vbWFwXG5cbmZ1bmN0aW9uIHJlYWR5KCkge1xuXG4gICAgJCgnI2Z1bGxwYWdlJykuZnVsbHBhZ2UoKTtcblxuICAgIHltYXBzLnJlYWR5KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIG15TWFwID0gbmV3IHltYXBzLk1hcCgnbWFwJywge1xuXG4gICAgICAgICAgICBjZW50ZXI6IFs1NC43MTAyNDA5NSwgMjAuNTEwNjE2ODFdLFxuICAgICAgICAgICAgem9vbTogOVxuICAgICAgICB9LCB7XG4gICAgICAgICAgICBzZWFyY2hDb250cm9sUHJvdmlkZXI6ICd5YW5kZXgjc2VhcmNoJ1xuXG4gICAgICAgIH0pLFxuXG4gICAgICAgICAgICAvLyDQodC+0LfQtNCw0ZHQvCDQvNCw0LrQtdGCINGB0L7QtNC10YDQttC40LzQvtCz0L4uXG4gICAgICAgICAgICBNeUljb25Db250ZW50TGF5b3V0ID0geW1hcHMudGVtcGxhdGVMYXlvdXRGYWN0b3J5LmNyZWF0ZUNsYXNzKFxuICAgICAgICAgICAgICAgICc8ZGl2IHN0eWxlPVwiY29sb3I6ICNGRkZGRkY7IGZvbnQtd2VpZ2h0OiBib2xkO1wiPiRbcHJvcGVydGllcy5pY29uQ29udGVudF08L2Rpdj4nXG4gICAgICAgICAgICApLFxuXG4gICAgICAgICAgICBteVBsYWNlbWFyayA9IG5ldyB5bWFwcy5QbGFjZW1hcmsobXlNYXAuZ2V0Q2VudGVyKCksIHtcbiAgICAgICAgICAgICAgICBoaW50Q29udGVudDogJ9Ch0L7QsdGB0YLQstC10L3QvdGL0Lkg0LfQvdCw0YfQvtC6INC80LXRgtC60LgnLFxuICAgICAgICAgICAgICAgIGJhbGxvb25Db250ZW50OiAn0K3RgtC+INC60YDQsNGB0LjQstCw0Y8g0LzQtdGC0LrQsCdcbiAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICAvLyDQntC/0YbQuNC4LlxuICAgICAgICAgICAgICAgIC8vINCd0LXQvtCx0YXQvtC00LjQvNC+INGD0LrQsNC30LDRgtGMINC00LDQvdC90YvQuSDRgtC40L8g0LzQsNC60LXRgtCwLlxuICAgICAgICAgICAgICAgIGljb25MYXlvdXQ6ICdkZWZhdWx0I2ltYWdlJyxcbiAgICAgICAgICAgICAgICAvLyDQodCy0L7RkSDQuNC30L7QsdGA0LDQttC10L3QuNC1INC40LrQvtC90LrQuCDQvNC10YLQutC4LlxuICAgICAgICAgICAgICAgIGljb25JbWFnZUhyZWY6ICcuL2ltZy9pY29ucy9tYXAtbWFya2VyLnN2ZycsXG4gICAgICAgICAgICAgICAgLy8g0KDQsNC30LzQtdGA0Ysg0LzQtdGC0LrQuC5cbiAgICAgICAgICAgICAgICBpY29uSW1hZ2VTaXplOiBbMzAsIDQyXSxcbiAgICAgICAgICAgICAgICAvLyDQodC80LXRidC10L3QuNC1INC70LXQstC+0LPQviDQstC10YDRhdC90LXQs9C+INGD0LPQu9CwINC40LrQvtC90LrQuCDQvtGC0L3QvtGB0LjRgtC10LvRjNC90L5cbiAgICAgICAgICAgICAgICAvLyDQtdGRIFwi0L3QvtC20LrQuFwiICjRgtC+0YfQutC4INC/0YDQuNCy0Y/Qt9C60LgpLlxuICAgICAgICAgICAgICAgIGljb25JbWFnZU9mZnNldDogWy01LCAtMzhdXG4gICAgICAgICAgICB9KSxcblxuXG5cbiAgICAgICAgICAgIG15UGxhY2VtYXJrV2l0aENvbnRlbnQgPSBuZXcgeW1hcHMuUGxhY2VtYXJrKFs1NC43MDA1MTE5NCwgMjAuNDk4NjE2OTRdLCB7XG4gICAgICAgICAgICAgICAgaGludENvbnRlbnQ6ICfQodC+0LHRgdGC0LLQtdC90L3Ri9C5INC30L3QsNGH0L7QuiDQvNC10YLQutC4INGBINC60L7QvdGC0LXQvdGC0L7QvCcsXG4gICAgICAgICAgICAgICAgYmFsbG9vbkNvbnRlbnQ6ICfQkCDRjdGC0LAg4oCUINC90L7QstC+0LPQvtC00L3Rj9GPJyxcblxuICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIC8vINCe0L/RhtC40LguXG4gICAgICAgICAgICAgICAgLy8g0J3QtdC+0LHRhdC+0LTQuNC80L4g0YPQutCw0LfQsNGC0Ywg0LTQsNC90L3Ri9C5INGC0LjQvyDQvNCw0LrQtdGC0LAuXG4gICAgICAgICAgICAgICAgaWNvbkxheW91dDogJ2RlZmF1bHQjaW1hZ2UnLFxuICAgICAgICAgICAgICAgIC8vINCh0LLQvtGRINC40LfQvtCx0YDQsNC20LXQvdC40LUg0LjQutC+0L3QutC4INC80LXRgtC60LguXG4gICAgICAgICAgICAgICAgaWNvbkltYWdlSHJlZjogJy4vaW1nL2ljb25zL21hcC1tYXJrZXIuc3ZnJyxcbiAgICAgICAgICAgICAgICAvLyDQoNCw0LfQvNC10YDRiyDQvNC10YLQutC4LlxuICAgICAgICAgICAgICAgIGljb25JbWFnZVNpemU6IFs0OCwgNDhdLFxuICAgICAgICAgICAgICAgIC8vINCh0LzQtdGJ0LXQvdC40LUg0LvQtdCy0L7Qs9C+INCy0LXRgNGF0L3QtdCz0L4g0YPQs9C70LAg0LjQutC+0L3QutC4INC+0YLQvdC+0YHQuNGC0LXQu9GM0L3QvlxuICAgICAgICAgICAgICAgIC8vINC10ZEgXCLQvdC+0LbQutC4XCIgKNGC0L7Rh9C60Lgg0L/RgNC40LLRj9C30LrQuCkuXG4gICAgICAgICAgICAgICAgaWNvbkltYWdlT2Zmc2V0OiBbLTI0LCAtMjRdLFxuXG4gICAgICAgICAgICB9KSxcblxuICAgICAgICAgICAgbXlTZWNvbmRQbGFjZW1hcmsgPSBuZXcgeW1hcHMuUGxhY2VtYXJrKFs1NC43MjEyNjc1LCAyMC40Njk5MDA2Ml0sIHtcbiAgICAgICAgICAgICAgICBoaW50Q29udGVudDogJ9Ch0L7QsdGB0YLQstC10L3QvdGL0Lkg0LfQvdCw0YfQvtC6INC80LXRgtC60Lgg0YEg0LrQvtC90YLQtdC90YLQvtC8JyxcbiAgICAgICAgICAgICAgICBiYWxsb29uQ29udGVudDogJ9CQINGN0YLQsCDigJQg0L3QvtCy0L7Qs9C+0LTQvdGP0Y8nLFxuXG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgLy8g0J7Qv9GG0LjQuC5cbiAgICAgICAgICAgICAgICAvLyDQndC10L7QsdGF0L7QtNC40LzQviDRg9C60LDQt9Cw0YLRjCDQtNCw0L3QvdGL0Lkg0YLQuNC/INC80LDQutC10YLQsC5cbiAgICAgICAgICAgICAgICBpY29uTGF5b3V0OiAnZGVmYXVsdCNpbWFnZScsXG4gICAgICAgICAgICAgICAgLy8g0KHQstC+0ZEg0LjQt9C+0LHRgNCw0LbQtdC90LjQtSDQuNC60L7QvdC60Lgg0LzQtdGC0LrQuC5cbiAgICAgICAgICAgICAgICBpY29uSW1hZ2VIcmVmOiAnLi9pbWcvaWNvbnMvbWFwLW1hcmtlci5zdmcnLFxuICAgICAgICAgICAgICAgIC8vINCg0LDQt9C80LXRgNGLINC80LXRgtC60LguXG4gICAgICAgICAgICAgICAgaWNvbkltYWdlU2l6ZTogWzQ4LCA0OF0sXG4gICAgICAgICAgICAgICAgLy8g0KHQvNC10YnQtdC90LjQtSDQu9C10LLQvtCz0L4g0LLQtdGA0YXQvdC10LPQviDRg9Cz0LvQsCDQuNC60L7QvdC60Lgg0L7RgtC90L7RgdC40YLQtdC70YzQvdC+XG4gICAgICAgICAgICAgICAgLy8g0LXRkSBcItC90L7QttC60LhcIiAo0YLQvtGH0LrQuCDQv9GA0LjQstGP0LfQutC4KS5cbiAgICAgICAgICAgICAgICBpY29uSW1hZ2VPZmZzZXQ6IFstMTQsIC00XSxcbiAgICAgICAgICAgICAgICAvLyDQodC80LXRidC10L3QuNC1INGB0LvQvtGPINGBINGB0L7QtNC10YDQttC40LzRi9C8INC+0YLQvdC+0YHQuNGC0LXQu9GM0L3QviDRgdC70L7RjyDRgSDQutCw0YDRgtC40L3QutC+0LkuXG5cbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgIG15TWFwLmdlb09iamVjdHNcbiAgICAgICAgICAgIC5hZGQobXlQbGFjZW1hcmspXG4gICAgICAgICAgICAuYWRkKG15UGxhY2VtYXJrV2l0aENvbnRlbnQpXG4gICAgICAgICAgICAuYWRkKG15U2Vjb25kUGxhY2VtYXJrKTtcblxuICAgICAgICBteU1hcC5iZWhhdmlvcnMuZGlzYWJsZSgnc2Nyb2xsWm9vbScpO1xuICAgIH0pO1xuXG5cbn1cblxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcIkRPTUNvbnRlbnRMb2FkZWRcIiwgcmVhZHkpO1xuXG4gICAgICAgIC8vZnVsbHBhZ2Ugc2Nyb2xsXG5cbiAgICAgICAgLy8kKCcjZnVsbHBhZ2UnKS5mdWxscGFnZSgpO1xuXG5cbn1cbiJdfQ==
