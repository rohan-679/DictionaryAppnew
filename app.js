const resultDiv = document.querySelector('.result');
const wordEle = document.querySelector('.word');
const phonetics = document.querySelector('.phonetics')
const audio = document.querySelector('audio')
const wordMeaning = document.querySelector('.word-definition')
const synonyms = document.querySelector('.synonyms')

const url = "https://api.dictionaryapi.dev/api/v2/entries/en_US/";


const handle = async (event)=>{
    if(event.keyCode==13){
        const word = event.target.value;
        // alert(word);
        //make a request to the api
        const result = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en_US/${word}`);
        
        if(!result.ok){
            alert("No definition found");
            return;
        }
        
        const data = await result.json();
        resultDiv.style.display = "block";
        // alert(data[0].word);
        wordEle.innerText = data[0].word;
        phonetics.innerText = data[0].phonetics[0].text;
        audio.src=data[0].phonetics[0].audio;
        wordMeaning.innerText = data[0].meanings[0].definitions[0].definition;
    
        const synonymsArray = data[0].meanings[0].definitions[0].synonyms;
        
        if(synonymsArray){
            let synonymsData = "";
        for(let i=0;i<synonymsArray.length;i++){
            synonymsData+=`<p class="pills">${synonymsArray[i]}</p>`
            synonyms.innerHTML = synonymsData; 
         }
        }
    }
};


