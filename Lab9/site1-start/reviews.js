// local reviews data
const reviews = [
  {
    id: 1,
    name: 'susan smith',
    job: 'web developer',
    img: 'https://images2.imgbox.com/e0/57/qI5bbwvg_o.jpeg',
    text: "Twee health goth +1. Bicycle rights tumeric chartreuse before they sold out chambray pop-up. Shaman humblebrag pickled coloring book salvia hoodie, cold-pressed four dollar toast everyday carry",
  },
  {
    id: 2,
    name: 'anna johnson',
    job: 'web designer',
    img: 'https://images2.imgbox.com/2e/6e/JAMvTZ56_o.jpeg',
    text: 'Helvetica artisan kinfolk thundercats lumbersexual blue bottle. Disrupt glossier gastropub deep v vice franzen hell of brooklyn twee enamel pin fashion axe.photo booth jean shorts artisan narwhal.',
  },
  {
    id: 3,
    name: 'peter jones',
    job: 'intern',
    img: 'https://images2.imgbox.com/56/88/oJvFN3l5_o.jpeg',
    text: 'Sriracha literally flexitarian irony, vape marfa unicorn. Glossier tattooed 8-bit, fixie waistcoat offal activated charcoal slow-carb marfa hell of pabst raclette post-ironic jianbing swag.',
  },
  {
    id: 4,
    name: 'bill anderson',
    job: 'the boss',
    img: 'https://images2.imgbox.com/8b/1c/vwWNTsCd_o.jpeg',
    text: 'Edison bulb put a bird on it humblebrag, marfa pok pok heirloom fashion axe cray stumptown venmo actually seitan. VHS farm-to-table schlitz, edison bulb pop-up 3 wolf moon tote bag street art shabby chic. ',
  },
];

const img = document.getElementById("person-img");
const reviewAuthor = document.getElementById("reviewAuthor");
const job = document.getElementById("job");
const comment = document.getElementById("comment");

const prevBtn = document.querySelector(".prev-btn")
const nextBtn = document.querySelector(".next-btn")
const randBtn = document.querySelector(".random-btn")

let currentPersonID = 0;

window.addEventListener('DOMContentLoaded',()=>{
  changeInfo(currentPersonID)
});


randBtn.addEventListener('click', () => {
  let index = Math.floor(reviews.length * Math.random());

  changeInfo(index);
});

nextBtn.addEventListener('click', () => {
  currentPersonID++;
  if (currentPersonID >=
    reviews.length) {
    currentPersonID = 0
  }
  changeInfo(currentPersonID);

});

prevBtn.addEventListener('click', () => {
  currentPersonID--;
  if (currentPersonID < 0) { currentPersonID = reviews.length - 1; }

  changeInfo(currentPersonID);

});

function changeInfo(index) {

  img.src = reviews[index].img;
  reviewAuthor.textContent = reviews[index].name;
  job.innerHTML = reviews[index].job;
  comment.innerHTML = reviews[index].text;

  prevBtn.disabled = index === 0;
  nextBtn.disabled = index === -1;

}