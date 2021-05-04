const mapImage = document.querySelector('.map_image');
const wrapper = document.querySelector('.map-wrapper');
const headerElem = document.querySelector('.header__inner');
const footerElem = document.querySelector('.footer_bg');
const zoomOut = document.querySelector('.zoom_out');
const zoomIn = document.querySelector('.zoom_in');
const mapTooltips = document.querySelector('.map_tooltips')

let currentScale = 1;
let topIndent = 0;
let leftIndent = 0;
let counter = 0; 

const calculateCoords = (e, elem) => {
  var box = elem.getBoundingClientRect();
  topIndent = e.pageY - (box.top - 80 + pageYOffset);
  leftIndent = e.pageX - box.left + pageXOffset;
  console.log(`e.pageY: ${e.pageY}, box.top : ${box.top}, pageYOffset: ${pageYOffset}, topIndent: ${topIndent}`)
}

const moveAt = (e) => {
  if (e.pageX <= 0) {
    stopDrag();
  }
  mapImage.style.left = e.pageX - leftIndent + 'px';
  mapImage.style.top = e.pageY - topIndent + 'px';
  moveTooltips();
}

const stopDrag = () => {
  document.removeEventListener('mousemove', moveAt);
  mapImage.removeEventListener('mouseup', stopDrag);
  

}

const moveTooltips = () => {
  mapTooltips.style.left = mapImage.style.left
  mapTooltips.style.top =  mapImage.style.top
}

mapImage.addEventListener('mousedown', (e) => {

  if (mapImage.width <= wrapper.offsetWidth && mapImage.height <= wrapper.offsetHeight) {
    return;
  }

  calculateCoords(e, mapImage);
  moveAt(e);

  document.addEventListener('mousemove', moveAt);
  mapImage.addEventListener('mouseup', stopDrag);
  mapImage.addEventListener('mouseout', stopDrag)
  mapImage.ondragstart = () => false;
});


headerElem.addEventListener('mouseenter', stopDrag);
footerElem.addEventListener('mouseenter', stopDrag);

zoomIn.addEventListener('click', () => {
  if (counter <= 4) {
    counter++
      if (mapImage.style.position !== "absolute") {mapImage.style.position = "absolute";}
    const prevWidth = mapImage.width;
    const prevHeight = mapImage.height;
    mapImage.style.width = `${mapImage.width * 1.1}px`;
    mapImage.style.height = "auto";
    const nextWidth = mapImage.width;
    currentScale *= 1.1;
    mapTooltips.style.transform = `scale(${currentScale})`;
    const nextHeight = mapImage.height;
    const topPos = mapImage.offsetTop || 0;
    const leftPos = mapImage.offsetLeft || 0; 
    mapImage.style.left = `${leftPos - ((nextWidth - prevWidth) / 2)}px`;
    mapImage.style.top = `${topPos - ((nextHeight - prevHeight) / 2)}px`;
    moveTooltips()
  }
});

zoomOut.addEventListener('click', () => {
  if (counter >= -4) {
    counter--;
		if (mapImage.width >= wrapper.offsetWidth || mapImage.height >= wrapper.offsetHeight) {
			if (mapImage.style.position !== "absolute") {mapImage.style.position = "absolute";}
			const prevWidth = mapImage.width;
			const prevHeight = mapImage.height;
			mapImage.style.width = `${mapImage.width / 1.1}px`;
			mapImage.style.height = "auto";
			currentScale /= 1.1;
			mapTooltips.style.transform = `scale(${currentScale})`;
			const nextWidth = mapImage.width;
			const nextHeight = mapImage.height;
			const topPos = mapImage.offsetTop || 0;
			const leftPos = mapImage.offsetLeft || 0;
		
		
			mapImage.style.left = `${leftPos + ((prevWidth - nextWidth) / 2)}px`;
			mapImage.style.top = `${topPos + ((prevHeight - nextHeight) / 2)}px`;
      moveTooltips()
		
			if (mapImage.width <= wrapper.offsetWidth && mapImage.height <= wrapper.offsetHeight) {
			  mapImage.style.width = `${wrapper.offsetWidth}px`;
			  mapImage.style.height = "auto";
			  mapImage.style.top = `${(wrapper.offsetHeight - mapImage.height) / 2}px`;
			  mapImage.style.left = '0px';
			  if (mapImage.height >= wrapper.offsetHeight) {
				mapImage.style.height = `${wrapper.offsetHeight}px`;
				mapImage.style.width = 'auto';
				mapImage.style.top = '0px';
				mapImage.style.left = `${(wrapper.offsetWidth - mapImage.width) / 2}px`;
			  }
			}
		  }
	}
  
});