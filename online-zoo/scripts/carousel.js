// Карусель ддя how-it-works
const carouselList = document.querySelector('.how-it-works_images');
const carouselItems = document.querySelectorAll('.hiw-list');
const elems = Array.from(carouselItems);

const update = function(newActive) {
  const newActivePos = newActive.dataset.pos;

  const current = elems.find((elem) => elem.dataset.pos == 0);
  const prev = elems.find((elem) => elem.dataset.pos == -1);
  const next = elems.find((elem) => elem.dataset.pos == 1);
  const first = elems.find((elem) => elem.dataset.pos == -2);
  const last = elems.find((elem) => elem.dataset.pos == 2);
  
//   current.classList.remove('carousel__item_active');
  
  [current, prev, next, first, last].forEach(item => {
    var itemPos = item.dataset.pos;

    item.dataset.pos = getPos(itemPos, newActivePos)
  });
};

const getPos = function (current, active) {
  const diff = current - active;

  if (Math.abs(current - active) > 2) {
    return -current
  }

  return diff;
}

carouselList.addEventListener('click', function (event) {
    var newActive = event.target;
    var isItem = newActive.closest('.hiw-list');
    console.log(isItem)
  
    if (!isItem) {
      return;
    };
    
    update(isItem); // было newActive
  });


// Карусель для Pets-in-zoo

const petCarouselList = document.querySelector('.pets_content_images');
const petCarouselItem = petCarouselList.querySelectorAll('.pets_content_item_img');
const leftArrow = document.getElementById('arrow_left')
const rightArrow = document.getElementById('arrow_right')


function appendItemsFromRight () {
  leftArrow.removeEventListener('click', appendItemsFromRight)
  const newItem = [];
  const itemToRemove = [];

  //Создаем элементы для добавления и удаления
  for (let i of petCarouselList.children) {
    const a = document.createElement('div');
    a.classList.add('pets_content_item')
    a.innerHTML = i.innerHTML;
    newItem.push(a)
    itemToRemove.push(i);
  }

  //Добавляем - прокручиваем - удаляем
  for (let j of newItem) {
    petCarouselList.append(j)
  }
  petCarouselList.scrollBy(petCarouselList.offsetWidth + 30 ,0)
  const remover = function () {
    itemToRemove.forEach(x => {
      petCarouselList.removeChild(x)
    })
    leftArrow.addEventListener('click', appendItemsFromRight)
  };
  setTimeout(remover, 600)
}


function appendItemsFromLeft () {
  rightArrow.removeEventListener('click', appendItemsFromLeft)
  const newItem = [];
  const itemToRemove = [];

  //Создаем элементы для добавления и удаления
  for (let i of petCarouselList.children) {
    const a = document.createElement('div');
    a.classList.add('pets_content_item')
    a.innerHTML = i.innerHTML;
    newItem.push(a)
    itemToRemove.push(i);
  }

  //Добавляем - прокручиваем - удаляем
  for (let j of newItem) {
    petCarouselList.prepend(j)
  }
  petCarouselList.scroll({
    left: petCarouselList.offsetWidth + 30,
    behavior: 'instant'
  })
  petCarouselList.scrollBy( - (petCarouselList.offsetWidth + 30) ,0)
  const remover = function () {
    itemToRemove.forEach(x => {
      petCarouselList.removeChild(x)
    })
    rightArrow.addEventListener('click', appendItemsFromLeft)
  };
  setTimeout(remover, 600)
}



leftArrow.addEventListener('click', appendItemsFromRight)
rightArrow.addEventListener('click', appendItemsFromLeft)