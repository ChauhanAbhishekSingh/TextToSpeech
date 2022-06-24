const synth=window.speechSynthesis;

//DOM elements
const textform= document.querySelector('form');
const textInput= document.querySelector('#text-input');
const voiceSelect= document.querySelector('#voice-select');
const rate= document.querySelector('#rate');
const rateValue= document.querySelector('#rate-value');
const pitch= document.querySelector('#pitch');
const pitchValue= document.querySelector('#pitch-value');
const body= document.querySelector('body');

//Init Voices array
let voices=[];

const getVoices = () => {
    voices=synth.getVoices(); //All the voices come from this option only
    //Loop Through Voices And Create Option For Languages
    voices.forEach (voice=>
    {
    // Create option element
    const option=document.createElement('option');
    //Fill option with voices and languages
    option.textContent=voice.name + '('+voice.lang+')';
    //Set needed option attributes
    option.setAttribute('data-lang', voice.lang);
    option.setAttribute('data-name', voice.name);
    voiceSelect.appendChild(option);

    });

};
getVoices();
if (synth.onvoiceschanged!== undefined)
{
    synth.onvoiceschanged=getVoices;
}

//Speak
const speak= ()=> {
    // Add bg animation
    body.style.background='#141414 url(img/wave.gif)';
    body.style.backgroundRepeat='repat-x';
    body.style.backgroundSize='100% 100%';
    // Check if speaking
    if (synth.speaking)
    {
        console.error('Already Speaking...'); // It will happen if it's speaking and we are clicking the button
        return; 
    }

    if (textInput.value!=='')
    {
        //Get speak text
        const speakText= new SpeechSynthesisUtterance(textInput.value);
        // Speak end
        speakText.onend=e=>
        {
            console.log('Done speaking...');
        }
        //Speak error
        speakText.onerror=e=>
        {
            console.error('Oops! Something did not go right:(');
        }
        // Selected Voice
        const selectedVoice=voiceSelect.selectedOptions[0].getAttribute('data-name');
        // Loop through voices
        voices.forEach(voice=>
        {
            if (voice.name==selectedVoice)
             {
             speakText.voice=voice;
            }
        });

        //Set pitch and rate
        speakText.rate=rate.value;
        speakText.pitch=pitch.value;
        
        //speak
        synth.speak(speakText);
        }
    };

    //Event Listeners

    //Text form submit
    textform.addEventListener('submit', e=>{
    e.preventDefault();
    speak();
    textInput.blur()
    });

    //Rate Value Change
    rate.addEventListener('change', e=> rateValue.textContent=rate.value)


    //Pitch Value Change
    pitch.addEventListener('change', e=> pitchValue.textContent=pitch.value)
    

// voice select change
voiceSelect.addEventListener('change', e=>speak());