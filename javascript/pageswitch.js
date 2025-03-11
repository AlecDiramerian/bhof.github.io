const getElementById = id => document.getElementById(id);
const redirectToPage = page => {window.location.href = window.location.protocol === 'file:' ? `${page}.html` : page};
const openLink = url => window.open(url);

const home = getElementById("home");
const shortfilms = getElementById("shortfilms");
const candids = getElementById("candids");
const quotes = getElementById("quotes");

const showElement = (element, href) => {
	if (!home) return; 

	[home, shortfilms, candids, quotes].forEach(element => element.style.display = "none");

	element.style.display = "block";

	updateCSSLink(href);
};

const showHome = () => showElement(home, 'style/index.css');
const showShortFilms = () => showElement(shortfilms, 'style/shortfilms.css');
const showCandids = () => showElement(candids, 'style/candids.css');
const showQuotes = () => showElement(quotes, 'style/quotes.css');
const showClicker = () => redirectToPage("clicker");
const showSnake = () => redirectToPage("snake");
const showNote = () => redirectToPage("note");
const showSimulator = () => openLink("https://www.roblox.com/games/15409499206/get-hit-by-a-train-simulator");
const openQuotesForm = () => openLink("https://forms.gle/1rS7JwsfzxzZ4B2V7");
const openCandidsForm = () => openLink("https://forms.gle/19PAqcWP1ZffHae8A");
const openPetition = () => openLink("https://www.ipetitions.com/petition/concerns-at-bridgesacademy");
const openRepo = () => openLink("https://github.com/AlecDiramerian/bhof.github.io");

const updateCSSLink = href => {
    if (getElementById('hellomynameiscss')) {
        getElementById('hellomynameiscss').href = href;
    } else {
        const newLink = document.createElement('link');
        Object.assign(newLink, {id: 'hellomynameiscss', rel: 'stylesheet', type: 'text/css', href});
        document.head.appendChild(newLink);
    }
};
showHome();