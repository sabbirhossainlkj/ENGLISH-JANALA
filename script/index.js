const createElement = (arr) => {
    const htmlElements = arr.map((el) => `<span class ='btn'>${el}</span>`);
    return htmlElements.join(" ");
};

function pronounceWord(word) {
  const utterance = new SpeechSynthesisUtterance(word);
  utterance.lang = "en-US";
  window.speechSynthesis.speak(utterance);
}

pronounceWord("JavaScript");


const manageSpinner = (status) => {
    if(status == true){
        document.getElementById("spinner").classList.remove('hidden');
        document.getElementById("word-container").classList.add('hidden');
    }
    else {
        document.getElementById("word-container").classList.remove('hidden');
        document.getElementById("spinner").classList.add('hidden');
    }
}


const loadLessons = () => {
    fetch('https://openapi.programming-hero.com/api/levels/all')
    .then(rest => rest.json())
    .then(json => displayLesson(json.data))
}

const removeActive = () => {
    const lessonButtons = document.querySelectorAll(".lesson-btn");
    // console.log(lessonButtons)
    lessonButtons.forEach(btn => btn.classList.remove("active"));
}

const loadLevelWord =(id) => {
    manageSpinner(true);
    const url = `https://openapi.programming-hero.com/api/level/${id}`;
    fetch(url)
    .then(res => res.json())
    .then(data => {
        removeActive();
        const clickBtn = document.getElementById(`lesson-btn-${id}`);
        clickBtn.classList.add("active");
        displayLevelWord(data.data)
    })
};


const displayLevelWord = (words) => {
    console.log(words)
    // 1 get the container $ empty
    const wordContainer = document.getElementById('word-container');
    wordContainer.innerHTML='';
    //
   if(words.length == 0){
        wordContainer.innerHTML=`
        <div class="text-center col-span-full py-8 font-bangla space-y-3">
        <img class="mx-auto" src="./assets/alert-error.png" alt="">
        <p class="text-xl text-gray-500">এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।</p>
        <h2 class="font-bold text-4xl">নেক্সট Lesson এ যান</h2>
    </div>`;
    manageSpinner(false)
    return;
   }
    words.forEach(word => {
        console.log(word)
        // 2 create element
        const card = document.createElement('div');
        card.innerHTML=`
         <div class="bg-white rounded-xl shadow-sm text-center py-10 px-5">
     <h2 class="font-bold text-2xl">${word.word ? word.word :'sobdo paoa jai nai'}</h2>
     <p class="font-semibold">Meaning /Pronounciation</p>
     <div class="text-2xl font-medium font-bangla">"${word.meaning ? word.meaning :'ortho paoa jai nai'} /
      ${word.pronunciation ? word.pronunciation : 'pronunciation paoa jai nai'}"</div>
     <div class="flex justify-between items-center">
         <button onclick="loadWordDetail(${word.id})" class="btn bg-[#1A91FF10] hover:bg-[#1A91FF80]"><i class="fa-solid fa-circle-info"></i></button>
         <button onclick="pronounceWord('${word.word}')" class="btn bg-[#1A91FF10] hover:bg-[#1A91FF80]"><i class="fa-solid fa-volume-high"></i></button>
    </div>
     </div>
        `;
        // 3 append into container
        wordContainer.append(card)
    })
manageSpinner(false);
};


// {
//     "word": "Eager",
//     "meaning": "আগ্রহী",
//     "pronunciation": "ইগার",
//     "level": 1,
//     "sentence": "The kids were eager to open their gifts.",
//     "points": 1,
//     "partsOfSpeech": "adjective",
//     "synonyms": [
//         "enthusiastic",
//         "excited",
//         "keen"
//     ],
//     "id": 5
// }

const loadWordDetail =async (id) => {
    const url =`https://openapi.programming-hero.com/api/word/${id}`;
    const res = await fetch(url);
    const details = await res.json();
    displayWordDetails(details.data)
}


const displayWordDetails = (word) => {
    console.log(word)
    const detailsBox = document.getElementById('details-container');
    detailsBox.innerHTML=` <div class="">
        <h2 class="text-2xl font-bold">${word.word} (<i class="fa-solid fa-microphone-lines"></i> :${word.pronunciation})</h2>
       </div>
       <div class="">
        <h2 class=" font-bold">meaning</h2>
        <p>${word.meaning}}</p>
       </div>
       <div class="">
        <h2 class="font-bold">Example</h2>
        <p>${word.sentence}}</p>
       </div>
       <div class="">
        <h2 class="font-bold">synonym</h2>
       <div class="">${createElement(word.synonyms)}</div>
       </div>
       `;
    document.getElementById('word_modal').showModal();
}

//  <span class="btn">syn1</span>
//         <span class="btn">syn2</span>
//         <span class="btn">syn3</span>

const displayLesson = (lessons) =>{
    // 1 get the container $ empty
    const levelContainer = document.getElementById('lavel-container');
    levelContainer.innerHTML= '';
    // 2 get into evey lessons 
    for(let lesson of lessons){
        // 3 create element
        const btnLaval = document.createElement('div');
        btnLaval.innerHTML =`
        <button id='lesson-btn-${lesson.level_no}' 
        onclick="loadLevelWord(${lesson.level_no})"
        class="btn btn-outline btn-primary lesson-btn">
        <i class="fa-solid fa-book-open"></i>
        lesson- ${lesson.level_no}
        </button>`;
         // 4 append into container
         levelContainer.append(btnLaval)
    }
}
loadLessons();

document.getElementById("btn-search").addEventListener('click', ()=> {
    removeActive();
    const input = document.getElementById('input-search');
    const searchValue = input.value.trim().toLowerCase( );
    console.log(searchValue);


    fetch('https://openapi.programming-hero.com/api/words/all')
    .then(res => res.json())
    .then(data => {
        const allWord = data.data;
        console.log(allWord);
        const filterWords = allWord.filter((word) =>
        word.word.toLowerCase().includes(searchValue));
        displayLevelWord(filterWords);
    });
});