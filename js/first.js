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
}

//form
const deliveryForm = document.querySelector('#deliveryForm');
const deliveryButton = document.querySelector('#deliveryButton');
const popup = document.querySelector('#popup');

deliveryForm.addEventListener('submit', event => {
    event.preventDefault();

    var formData = new FormData(deliveryForm);
    formData.append('name', deliveryForm.elements.name.value);
    formData.append('phone', deliveryForm.elements.phone.value);
    formData.append('comment', deliveryForm.elements.comment.value);
    formData.append('to', 'katya@nekatya');

    var xhr = new XMLHttpRequest();
    //xhr.responseType = 'json';
    xhr.open("POST", ' https://webdev-api.loftschool.com/sendmail');
    xhr.send(formData);

    xhr.addEventListener('load', () => {
        var answer = JSON.parse(xhr.response);
        if (xhr.status < 400) {
            popup.style.display = 'flex';
            console.log('Все ок');
        }
    });


});
const closePopupButton = document.querySelector('#popup');
closePopupButton.addEventListener('click', function (e) {
    e.preventDefault();
    popup.style.display = 'none';
});


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





