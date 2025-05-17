// Slavoj Žižek quotes in English
const zizekQuotes = [
  "The only thing of which one can be guilty is having given ground relative to one's desire.",
  "We feel free because we lack the very language to articulate our unfreedom.",
  "The true ethical test is not only the readiness to die for an idea, but to live for it.",
  "Cynicism is not an escape from ideology; it is an ideology in its purest form.",
  "Enjoy your symptom!"
];

// Gilles Deleuze quotes in French
const deleuzeQuotes = [
  "Le désir ne manque de rien, il ne manque pas d'objet, il est production.",
  "La pensée ne commence pas dans la vérité, elle commence dans la surprise.",
  "Il n'y a pas de sujet, il n'y a que des agencements.",
  "Un rhizome ne commence et ne finit pas, il est toujours au milieu, entre les choses.",
  "Devenir, c'est ne plus se reconnaître."
];

// Choose random quotes
const randomZizek = zizekQuotes[Math.floor(Math.random() * zizekQuotes.length)];
const randomDeleuze = deleuzeQuotes[Math.floor(Math.random() * deleuzeQuotes.length)];

// Display the quotes
document.querySelector(".quote-en").innerHTML = `"${randomZizek}"<span class="author">— Slavoj Žižek</span>`;
document.querySelector(".quote-fr").innerHTML = `"${randomDeleuze}"<span class="author">— Gilles Deleuze</span>`; 