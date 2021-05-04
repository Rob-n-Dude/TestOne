const secondaryFramesParent = document.querySelector('.page_another_frames')
const mainFrameParent = document.querySelector('.main-frame_holder');

const toolbarArrow = document.querySelector('.toolbar_arrow');
const toolbar = document.querySelector('.toolbar');

function changeFrames (e) {
    const target = e.target.closest('.page_frame_wrapper');
    const mainFrame = mainFrameParent.children[0];
    let frameToChange = target.children[1];
    mainFrame.remove();
    target.append(mainFrame)
    frameToChange.classList.add('main_frame');
    mainFrame.classList.remove('main_frame');
    mainFrameParent.append(frameToChange);
}

function toolbarArrowHandler () {
    toolbarArrow.classList.toggle('toolbar_arrow_active')
    toolbar.classList.toggle('toolbar_hiden')
}

function toolbarSizer () {
     if (window.innerWidth <= 1400) {
         if (toolbar.classList.contains('toolbar_hiden')) return;
         toolbar.classList.add('toolbar_hiden')
         toolbarArrow.style.display = 'block'
         return
     } else {
         if (toolbar.classList.contains('toolbar_hiden')) {
             toolbar.classList.remove('toolbar_hiden')
         }
     toolbarArrow.style.display = 'none'
     }
     
}

let pageFrameWidth;
let timer;

function setPageFrameWidth () {
    pageFrameWidth = getComputedStyle(secondaryFramesParent.children[0]).width.slice(0,-2)
}

function initAutoSlider() {
    setInterval(() => {
        autoSlider();
    }, 5000);
}

function removePageFrameChild () {
    secondaryFramesParent.removeChild(secondaryFramesParent.children[0])
}
function autoSlider () {
    setPageFrameWidth();
    let newPageFrame = document.createElement('div');
    newPageFrame.innerHTML = secondaryFramesParent.children[0].innerHTML;
    newPageFrame.classList.add('page_frame_wrapper');
    secondaryFramesParent.append(newPageFrame);
    const scrollPromise = new Promise((resolve,reject) => {
        setTimeout(() => {
            secondaryFramesParent.scroll({
            left: pageFrameWidth + 20,
            behavior: 'smooth'
        })
        resolve()},1000)
    })
    scrollPromise.then(() => setTimeout(removePageFrameChild, 500));
}

secondaryFramesParent.addEventListener('click',e => changeFrames(e))
toolbarArrow.addEventListener('click', toolbarArrowHandler)
window.addEventListener('resize', toolbarSizer);

toolbarSizer();
initAutoSlider();