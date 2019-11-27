const readline = require('readline'); 

const fs = require('fs');

const readInterface = readline.createInterface({
    input: fs.createReadStream('test.txt'),
});

const ascenders = ['t', 'h', 'd', 'l', 'b', 'k', 'f'];
const descenders = ['y', 'g', 'p', 'q', 'j'];

let flatCount = 0;
let ascCount = 0;
let descCount = 0;
let wordCount = 0;
let bothCount = 0;
let eitherCount = 0;
readInterface.on('line', function(line) {
    if(!line){
      return;
    }
    words = line.split(/\s/);
    for(word of words){
      wordCount++;
      letters = word.replace(/[0-9]/g,'');
      if(!letters){
        console.log(`<span><b>${word}</b></span>`);
        continue;
      }

      let has_asc = false;
      let has_desc = false;

      for(ch of word){
        if(ascenders.indexOf(ch) !== -1){
          has_asc = true;
          ascCount++;
        }
        else if(descenders.indexOf(ch) !== -1){
          has_desc = true;
          descCount++;
        }
        else{
          flatCount++;
        }
      }

      if(has_asc && has_desc){
        bothCount++;
        console.log(`<span style='color:#0F0'>${word}</span>`);
      }
      else if(has_asc){
        eitherCount++;
        console.log(`<span style='color:#00F'>${word}</span>`);
      }
      else if(has_desc){
        eitherCount++;
        console.log(`<span style='color:#FF0'>${word}</span>`);
      }
      else{
        console.log(`<span><b>${word}</b></span>`);
      }
    }
});


readInterface.on('close', function(line) {
  console.log(`<br/><br/>`);
  console.log(`<p>num asc : ${ascCount}</p>`);
  console.log(`<p>num desc: ${descCount}</p>`);
  console.log(`<p>num flat: ${flatCount}</p>`);
  combo = ascCount + descCount;

  perc = combo / (flatCount + combo)
  perc = perc * 100;

  percAsc = ascCount / (flatCount + combo);
  percAsc = percAsc * 100;

  percDesc = descCount / (flatCount + combo);
  percDesc = percDesc * 100;

  percCombo = bothCount / wordCount;
  percCombo = percCombo * 100;

  percEither = eitherCount / wordCount;
  percEither = percEither * 100;
  console.log(`<p><b>perc Either: % ${percEither}</b></p>`);
  console.log(`<p><b>perc Combo: % ${percCombo}</b></p>`);

  console.log(`<p>words: ${wordCount}</p>`);
  console.log(`<p>either: ${eitherCount}</p>`);
  console.log(`<p>combo: ${bothCount}</p>`);

  console.log(`<p>perc ASC: % ${percAsc}</p>`);
  console.log(`<p>perc Desc: % ${percDesc}</p>`);
  console.log(`<p>percent: % ${perc}</p>`);
});
