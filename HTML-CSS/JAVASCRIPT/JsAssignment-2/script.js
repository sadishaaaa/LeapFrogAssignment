// Variables
let prev = document.querySelector(".prev");
let next = document.querySelector(".next");
let imgs = document.querySelectorAll(".carousel-img");
let dots = document.querySelectorAll(".dot");
let titles = document.querySelectorAll(".carousel-title");
let totalImgs = imgs.length;
let imgPosition = 0;
let slideInterval;

// Event Listeners
next.addEventListener("click", nextImg); //nextImg is called when the button is clicked
prev.addEventListener("click", prevImg); //prevImg is called when the button is clicked

// Update function is defied to update the visibility of images, dots , title based on position of image
function update() {
  //   Images
  //   Removes the "visible class" and adds the "hidden class"
  for (let img of imgs) {
    img.classList.remove("visible");
    img.classList.add("hidden");
  }

  //Removes the visible class and adds hidden class
  imgs[imgPosition].classList.remove("hidden");
  imgs[imgPosition].classList.add("visible");

  //   Dots
  //   removes the active class by replacing it with ""
  for (let dot of dots) {
    dot.className = dot.className.replace(" active", "");
  }
  //After deactivating all dots, this code activates the dot at the current imgPosition by adding the "active" class.
  dots[imgPosition].classList.add("active");

  //   titles
  //   it removes the "visible" class and adds the "hidden" class. This hides all the titles.
  for (let title of titles) {
    title.classList.remove("visible");
    title.classList.add("hidden");
  }

  //   After hiding all titles, this code reveals the title at the current imgPosition by removing the "hidden" class and adding the "visible" class.
  titles[imgPosition].classList.remove("hidden");
  titles[imgPosition].classList.add("visible");
}

// Function to start the slideshow
function startSlideShow() {
  slideInterval = setInterval(nextImg, 4000); // Change image every 4 seconds
}

// Function to stop the slideshow
function stopSlideShow() {
  clearInterval(slideInterval);
}

// Next Img
function nextImg() {
  if (imgPosition === totalImgs - 1) {
    imgPosition = 0;
  } else {
    imgPosition++;
  }
  update();
}
//Previous Image
function prevImg() {
  if (imgPosition === 0) {
    imgPosition = totalImgs - 1;
  } else {
    imgPosition--;
  }
  update();
}

// Dot Position
// Function to append dots dynamically
function appendDots() {
  let slideDotsContainer = document.querySelector(".slide-dots");

  for (let i = 0; i < totalImgs; i++) {
    let dot = document.createElement("span");
    dot.className = "dot";
    slideDotsContainer.appendChild(dot);
  }

  // Update the 'dots' variable after appending new dots
  dots = document.querySelectorAll(".dot");

  // Add event listeners to the new dots
  dots.forEach((dot, dotPosition) => {
    dot.addEventListener("click", () => {
      imgPosition = dotPosition;
      update(dotPosition);
    });
  });
}

// Call the function to append dots
appendDots();
// Start the slideshow initially
startSlideShow();

// Event listener to stop the slideshow when the interactions with next or previous buttons takes place
next.addEventListener("click", () => {
  stopSlideShow();
  setTimeout(startSlideShow, 2000); // Restart the slideshow after 2 seconds
});

prev.addEventListener("click", () => {
  stopSlideShow();
  setTimeout(startSlideShow, 2000); // Restart the slideshow after 2 seconds
});
