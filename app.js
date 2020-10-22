// create(choose) a polyphonic synth
const synth = new Tone.PolySynth().toDestination();
// need a note or array of notes
const notes = ['C', 'D', 'E', 'F', 'G', 'A', 'B'];

// BPM : 60
Tone.Transport.bpm.value = 60;

let html = '';

// 2 octaves
for (let octave = 0; octave < 2; octave++) {
  for (let i = 0; i < notes.length; i++) {    // 7notes * 2octaves
    let hasSharp = true;
    let note = notes[i];
  
    if (note === 'E' || note === 'B') {       // E#,B# is not exist
      hasSharp = false;
    }

    // white keys(this = div, false => backgroundColor : up(white), down(#ccc))
    html += `<div class='whitenote' onmousedown='noteDown(this, false)' onmouseup='noteUp(this, false)' onmouseleave='noteUp(this, false)' data-note='${note + (octave + 4)}'>`;

    // black keys(true => backgroundColor : up(#777), down(black))
    if (hasSharp) {
      html += `<div class='blacknote' onmousedown='noteDown(this, true)' onmouseup='noteUp(this, true)' onmouseleave='noteUp(this, true)' data-note='${note + '#' + (octave + 4)}'></div>`;
    }
  
    html += '</div>';
  }
}

document.getElementById('container').innerHTML = html;    // html -> container

const noteUp = (elem, isSharp) => {
  elem.style.background = isSharp ? '#777' : 'white';     // (conditionl exp.) ? (true) : (false), isSharp = false
}

let noteDown = (elem, isSharp) => {
  let note = elem.dataset.note;
  // alert(note);
  elem.style.background = isSharp ? 'black' : '#ccc';
  synth.triggerAttackRelease(note, '32n');
  event.stopPropagation();                                // white and black => no event
}

// a measure or 8th note
let Choice = () => {
  noteDown = (elem, isSharp) => {
    let note = elem.dataset.note;
    elem.style.background = isSharp ? 'black' : '#ccc';

    if (document.Choice_form.choice.value === 'btn4') {
      synth.triggerAttackRelease(note, '1n');
      event.stopPropagation();

    } else if (document.Choice_form.choice.value === 'btn8') {
      synth.triggerAttackRelease(note, '8n');
      event.stopPropagation();
    }
  }
  
}

// prevent the event for submission
document.querySelector('.btn').addEventListener("click", (event) => {
  event.preventDefault()
});

