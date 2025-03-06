/*jshint esversion: 6 */
import {newslist} from './news.js'
window.addEventListener('load', function() {
	document.getElementById('loading').style.display = 'none';
	document.getElementById('content').style.display = 'block';
	Game();
});
function Game() {
	//variables
	let alecAmount = 0;
	let totalAlecAmount = 0;
	let alectype = 0;
	let skin = 0;
	let cps = 0;
	let timer;
	let wyattmode = 0;
	let lastFrameTime = performance.now();
	let boughtwyattmode = 0;
	let upgradesonscreen = 0;
	let statsonscreen = 0;
	let navbarornews = 0;
	let radioornews = 0;
	let hoverInterval = null;
	let previousNewsIndex = -1;
	let autoclick1cost = 15;
	let autoclick2cost = 100;
	let autoclick3cost = 1100;
	let autoclick4cost = 12000;
	let autoclick5cost = 130000;
	let autoclick6cost = 1400000;
	let autoclick7cost = 20000000;
	let autoclick8cost = 330000000;
	let autoclick9cost = 5100000000;
	let autoclick10cost = 75000000000;
	let autoclick11cost = 1000000000000;
	let autoclick12cost = 14000000000000;
	let autoclick13cost = 170000000000000;
	let autoclick14cost = 2100000000000000;
	let autoclick15cost = 26000000000000000;
	let autoclick16cost = 310000000000000000;
	let timeplayed = {
		weeks: 0,
		days: 0,
		hours: 0,
		minutes: 0,
		seconds: 0
	};
	const clickSFX = new Audio('audio/mcclick.mp3');
	const errorSFX = new Audio('audio/error.mp3');
	const purchaseSFX = new Audio('audio/purchase.mp3');
	/*const autoclickSFX = new Audio('audio/autoclick.mp3');
	const factorySFX = new Audio('audio/factory.mp3');
	const scotlandSFX = new Audio('audio/scotland.mp3');
	const flannelSFX = new Audio('audio/flannel.mp3');
	const chairSFX = new Audio('audio/chair.mp3');
	const duoSFX = new Audio('audio/spanish.mp3');
	const trainSFX = new Audio('audio/train.mp3');
	const milkSFX = new Audio('audio/milk.mp3');
	const cloneSFX = new Audio('audio/clone.mp3');
	const meowSFX = new Audio('audio/meow.mp3');
	const chompSFX = new Audio('audio/chomp.mp3');
	const summonSFX = new Audio('audio/summon.mp3');
	const birdSFX = new Audio('audio/bird.mp3');
	const whooshSFX = new Audio('audio/whoosh.mp3');
	const buttonclickSFX = new Audio('audio/command.mp3');*/
	const news = document.getElementById('news');
	const alec = document.getElementById('alec');
	const change = document.getElementById('change');
	const station = document.getElementById('station');
	const descbox = document.getElementById('descbox');
	const timeplayedstat = document.getElementById('timeplayed');
	const skinbutton = document.getElementById('skin');
	const resetbutton = document.getElementById('reset');
	const upgradesbutton = document.getElementById('upgrades');
	const statsbutton = document.getElementById('stats');
	const wyattmodebutton = document.getElementById('wyattmode');
	const changelogbutton = document.getElementById('changelogb');
	const soonupg = document.getElementById('soonupg');
	const buttons = [autoclick1, autoclick2, autoclick3, autoclick4, autoclick5, autoclick6, autoclick7, autoclick8, autoclick9, autoclick10, autoclick11, autoclick12, autoclick13, autoclick14, autoclick15, autoclick16, soonupg, skinbutton, resetbutton, upgradesbutton, statsbutton, changelogbutton, aps, totalnum];
	
	const formatTime = (time) => {
		return `${time.weeks}:${time.days}:${time.hours}:${time.minutes}:${time.seconds}`;
	};

	const parseTime = (timeString) => {
    if (!timeString || timeString === "0") { 
        return { weeks: 0, days: 0, hours: 0, minutes: 0, seconds: 0 }; 
    }

    const parts = timeString.split(':').map(num => isNaN(parseInt(num)) ? 0 : parseInt(num));

    return {
        weeks: parts[0] ?? 0,
        days: parts[1] ?? 0,
        hours: parts[2] ?? 0,
        minutes: parts[3] ?? 0,
        seconds: parts[4] ?? 0
    };
}

	const updateTimePlayed = () => {
		timeplayed.seconds += 1;
		if (timeplayed.seconds >= 60) {
			timeplayed.seconds = 0;
			timeplayed.minutes++;
		}
		if (timeplayed.minutes >= 60) {
			timeplayed.minutes = 0;
			timeplayed.hours++;
		}
		if (timeplayed.hours >= 24) {
			timeplayed.hours = 0;
			timeplayed.days++;
		}
		if (timeplayed.days >= 7) {
			timeplayed.days = 0;
			timeplayed.weeks++;
		}
		console.log(timeplayed);
		updateDisplay();
	}
	setInterval(updateTimePlayed, 1000);

	function abbreviateNumber(number) {
		const abbreviations = ["", "K", "M", "B", "T", "Qa", "Qi", "Sx", "Sp", "Oc", "No", "AA", "AB", "AC", "AD", "AE", "AF", "AG", "AH", "AI", "AJ", "AK", "AL", "AM", "AN", "AO", "AP", "AQ", "AR", "AS", "AT", "AU", "AV", "AW", "AX", "AY", "AZ"];
		const tier = Math.log10(Math.abs(number)) / 3 | 0;
		if (tier === 0) return number;
		const suffix = abbreviations[tier];
		const scale = Math.pow(10, tier * 3);
		const scaled = number / scale;
		return scaled.toFixed(1) + suffix;
	}

	function commifyNumber(number) {
		number = number.toString();
		var pattern = /(-?\d+)(\d{3})/;
		while (pattern.test(number))
			number = number.replace(pattern, "$1,$2");
		return number;
	}

	//news
	const startTimer = () => timer = setInterval(newsichooseyou, 7500);

	const newsSelect = () => {
		let randomIndex;
		if (radioornews === 0) {
			do {
				randomIndex = Math.floor(Math.random() * newslist.length);
			} while (randomIndex === previousNewsIndex);
			previousNewsIndex = randomIndex;
			const randomNewsItem = newslist[randomIndex];
			return randomNewsItem;
		} else {
			do {
				randomIndex = Math.floor(Math.random() * radiolist.length);
			} while (randomIndex === previousNewsIndex);
			previousNewsIndex = randomIndex;
			const randomNewsItem = radiolist[randomIndex];
			return randomNewsItem;
		}
	};

	const newsichooseyou = () => {
		const finalnews = newsSelect();
		if (radioornews === 0) {
			news.innerText = 'News: ' + finalnews;
		} else {
			news.innerText = 'Radio: ' + finalnews;
		}
	};

	news.addEventListener('click', () =>{
		newsichooseyou();
		clearInterval(timer);
		startTimer();
	});

	//saving
	const loadProgress = () => {
		if (localStorage.getItem('alecAmount')) alecAmount = parseInt(localStorage.getItem('alecAmount'));
		if (localStorage.getItem('totalAlecAmount')) totalAlecAmount = parseInt(localStorage.getItem('totalAlecAmount'));
		if (localStorage.getItem('alectype')) alectype = parseInt(localStorage.getItem('alectype'));
		if (localStorage.getItem('cps')) cps = parseInt(localStorage.getItem('cps'));
		if (localStorage.getItem('skin')) skin = parseInt(localStorage.getItem('skin'));
		if (localStorage.getItem('timeplayed')) timeplayed = parseTime(localStorage.getItem('timeplayed'));
		if (localStorage.getItem('autoclick1cost')) autoclick1cost = parseInt(localStorage.getItem('autoclick1cost'));
		if (localStorage.getItem('autoclick2cost')) autoclick2cost = parseInt(localStorage.getItem('autoclick2cost'));
		if (localStorage.getItem('autoclick3cost')) autoclick3cost = parseInt(localStorage.getItem('autoclick3cost'));
		if (localStorage.getItem('autoclick4cost')) autoclick4cost = parseInt(localStorage.getItem('autoclick4cost'));
		if (localStorage.getItem('autoclick5cost')) autoclick5cost = parseInt(localStorage.getItem('autoclick5cost'));
		if (localStorage.getItem('autoclick6cost')) autoclick6cost = parseInt(localStorage.getItem('autoclick6cost'));
		if (localStorage.getItem('autoclick7cost')) autoclick7cost = parseInt(localStorage.getItem('autoclick7cost'));
		if (localStorage.getItem('autoclick8cost')) autoclick8cost = parseInt(localStorage.getItem('autoclick8cost'));
		if (localStorage.getItem('autoclick9cost')) autoclick9cost = parseInt(localStorage.getItem('autoclick9cost'));
		if (localStorage.getItem('autoclick10cost')) autoclick10cost = parseInt(localStorage.getItem('autoclick10cost'));
		if (localStorage.getItem('autoclick11cost')) autoclick11cost = parseInt(localStorage.getItem('autoclick11cost'));
		if (localStorage.getItem('autoclick12cost')) autoclick12cost = parseInt(localStorage.getItem('autoclick12cost'));
		if (localStorage.getItem('autoclick13cost')) autoclick13cost = parseInt(localStorage.getItem('autoclick13cost'));
		if (localStorage.getItem('autoclick14cost')) autoclick14cost = parseInt(localStorage.getItem('autoclick14cost'));
		if (localStorage.getItem('autoclick15cost')) autoclick15cost = parseInt(localStorage.getItem('autoclick15cost'));
		if (localStorage.getItem('autoclick16cost')) autoclick16cost = parseInt(localStorage.getItem('autoclick16cost'));
		if (localStorage.getItem('boughtwyattmode')) boughtwyattmode = parseInt(localStorage.getItem('boughtwyattmode'));
	};

	loadProgress();

	const saveProgress = () => {
		localStorage.setItem('alecAmount', alecAmount);
		localStorage.setItem('totalAlecAmount', totalAlecAmount);
		localStorage.setItem('alectype', alectype);
		localStorage.setItem('cps', cps);
		localStorage.setItem('skin', skin);
		localStorage.setItem('timeplayed', formatTime(timeplayed));
		localStorage.setItem('autoclick1cost', autoclick1cost);
		localStorage.setItem('autoclick2cost', autoclick2cost);
		localStorage.setItem('autoclick3cost', autoclick3cost);
		localStorage.setItem('autoclick4cost', autoclick4cost);
		localStorage.setItem('autoclick5cost', autoclick5cost);
		localStorage.setItem('autoclick6cost', autoclick6cost);
		localStorage.setItem('autoclick7cost', autoclick7cost);
		localStorage.setItem('autoclick8cost', autoclick8cost);
		localStorage.setItem('autoclick9cost', autoclick9cost);
		localStorage.setItem('autoclick10cost', autoclick10cost);
		localStorage.setItem('autoclick11cost', autoclick11cost);
		localStorage.setItem('autoclick12cost', autoclick12cost);
		localStorage.setItem('autoclick13cost', autoclick13cost);
		localStorage.setItem('autoclick14cost', autoclick14cost);
		localStorage.setItem('autoclick15cost', autoclick15cost);
		localStorage.setItem('autoclick16cost', autoclick16cost);
		localStorage.setItem('boughtwyattmode', boughtwyattmode);
	};

	if (autoclick1cost < 15) {
		autoclick1cost = 15;
		document.getElementById(`autoclick1cost`).innerText = `$${abbreviateNumber(autoclick1cost)}`;
	}
	if (autoclick2cost < 100) {
		autoclick2cost = 100;
		document.getElementById(`autoclick2cost`).innerText = `$${abbreviateNumber(autoclick2cost)}`;
	}
	if (autoclick3cost < 1100) {
		autoclick3cost = 1100;
		document.getElementById(`autoclick3cost`).innerText = `$${abbreviateNumber(autoclick3cost)}`;
	}
	if (autoclick4cost < 12000) {
		autoclick4cost = 12000;
		document.getElementById(`autoclick4cost`).innerText = `$${abbreviateNumber(autoclick4cost)}`;
	}
	if (autoclick5cost < 130000) {
		autoclick5cost = 130000;
		document.getElementById(`autoclick5cost`).innerText = `$${abbreviateNumber(autoclick5cost)}`;
	}
	if (autoclick6cost < 1400000) {
		autoclick6cost = 1400000;
		document.getElementById(`autoclick6cost`).innerText = `$${abbreviateNumber(autoclick6cost)}`;
	}
	if (autoclick7cost < 20000000) {
		autoclick7cost = 20000000;
		document.getElementById(`autoclick7cost`).innerText = `$${abbreviateNumber(autoclick7cost)}`;
	}
	if (autoclick8cost < 300000000) {
		autoclick8cost = 330000000;
		document.getElementById(`autoclick8cost`).innerText = `$${abbreviateNumber(autoclick8cost)}`;
	}
	if (autoclick9cost < 5100000000) {
		autoclick9cost = 5100000000;
		document.getElementById(`autoclick9cost`).innerText = `$${abbreviateNumber(autoclick9cost)}`;
	}
	if (autoclick10cost < 75000000000) {
		autoclick10cost = 75000000000;
		document.getElementById(`autoclick10cost`).innerText = `$${abbreviateNumber(autoclick10cost)}`;
	}
	if (autoclick11cost < 1000000000000) {
		autoclick11cost = 1000000000000;
		document.getElementById(`autoclick11cost`).innerText = `$${abbreviateNumber(autoclick11cost)}`;
	}
	if (autoclick12cost < 14000000000000) {
		autoclick12cost = 14000000000000;
		document.getElementById(`autoclick12cost`).innerText = `$${abbreviateNumber(autoclick12cost)}`;
	}
	if (autoclick13cost < 170000000000000) {
		autoclick13cost = 170000000000000;
		document.getElementById(`autoclick13cost`).innerText = `$${abbreviateNumber(autoclick13cost)}`;
	}
	if (autoclick14cost < 2100000000000000) {
		autoclick14cost = 2100000000000000;
		document.getElementById(`autoclick14cost`).innerText = `$${abbreviateNumber(autoclick14cost)}`;
	}
	if (autoclick15cost < 26000000000000000) {
		autoclick15cost = 26000000000000000;
		document.getElementById(`autoclick15cost`).innerText = `$${abbreviateNumber(autoclick15cost)}`;
	}
	if (autoclick16cost < 310000000000000000) {
		autoclick16cost = 310000000000000000;
		document.getElementById(`autoclick16cost`).innerText = `$${abbreviateNumber(autoclick16cost)}`;
	}

	setInterval(saveProgress, 1000);

	//skins
	const updateDisplay = () => {
		document.getElementById('num').innerText = 'Alecs: ' + abbreviateNumber(alecAmount);
		document.getElementById('aps').innerText = abbreviateNumber(cps);
		document.getElementById('totalnum').innerText = abbreviateNumber(totalAlecAmount);
		document.getElementById('timeplayed').innerText = timeplayed.weeks + ':' + timeplayed.days + ':' + timeplayed.hours + ':' + timeplayed.minutes + ':' + timeplayed.seconds;
		document.getElementById('autoclick1cost').innerText = '$' + abbreviateNumber(autoclick1cost);
		document.getElementById('autoclick2cost').innerText = '$' + abbreviateNumber(autoclick2cost);
		document.getElementById('autoclick3cost').innerText = '$' + abbreviateNumber(autoclick3cost);
		document.getElementById('autoclick4cost').innerText = '$' + abbreviateNumber(autoclick4cost);
		document.getElementById('autoclick5cost').innerText = '$' + abbreviateNumber(autoclick5cost);
		document.getElementById('autoclick6cost').innerText = '$' + abbreviateNumber(autoclick6cost);
		document.getElementById('autoclick7cost').innerText = '$' + abbreviateNumber(autoclick7cost);
		document.getElementById('autoclick8cost').innerText = '$' + abbreviateNumber(autoclick8cost);
		document.getElementById('autoclick9cost').innerText = '$' + abbreviateNumber(autoclick9cost);
		document.getElementById('autoclick10cost').innerText = '$' + abbreviateNumber(autoclick10cost);
		document.getElementById('autoclick11cost').innerText = '$' + abbreviateNumber(autoclick11cost);
		document.getElementById('autoclick12cost').innerText = '$' + abbreviateNumber(autoclick12cost);
		document.getElementById('autoclick13cost').innerText = '$' + abbreviateNumber(autoclick13cost);
		document.getElementById('autoclick14cost').innerText = '$' + abbreviateNumber(autoclick14cost);
		document.getElementById('autoclick15cost').innerText = '$' + abbreviateNumber(autoclick15cost);
		document.getElementById('autoclick16cost').innerText = '$' + abbreviateNumber(autoclick16cost);
		if (wyattmode === 1) {
			alec.src = 'images/skins/why.jpeg';
		} else {
			if (skin === 1) {
				alec.src = alectype === 0 ? 'images/skins/abby.png' : (alectype === 1 ? 'images/skins/abby2.png' : 'images/skins/abby3.png');
			} else if (skin === 2) {
				alec.src = alectype === 0 ? 'images/skins/nate.png' : (alectype === 1 ? 'images/skins/nate2.png' : 'images/skins/nate3.png');
			} else if (skin === 3) {
				alec.src = alectype === 0 ? 'images/skins/dash.png' : (alectype === 1 ? 'images/skins/dash2.png' : 'images/skins/dash3.png');
			} else if (skin === 4) {
				alec.src = alectype === 0 ? 'images/skins/chris.png' : (alectype === 1 ? 'images/skins/chris2.png' : 'images/skins/chris3.png');
			} else if (skin === 5) {
				alec.src = alectype === 0 ? 'images/skins/ava.png' : (alectype === 1 ? 'images/skins/ava2.png' : 'images/skins/ava3.png');
			} else if (skin === 6) {
				alec.src = alectype === 0 ? 'images/skins/rence.png' : (alectype === 1 ? 'images/skins/rence2.png' : 'images/skins/rence3.png');
			} else if (skin === 7) {
				alec.src = alectype === 0 ? 'images/skins/riley.png' : (alectype === 1 ? 'images/skins/riley2.png' : 'images/skins/riley3.png');
			} else if (skin === 8) {
				alec.src = alectype === 0 ? 'images/skins/henry.png' : (alectype === 1 ? 'images/skins/henry2.png' : 'images/skins/henry3.png');
			} else {
				alec.src = alectype === 0 ? 'images/skins/alec.png' : (alectype === 1 ? 'images/skins/alec.png' : 'images/skins/alec.png');
			}
		}
	};

	skinbutton.addEventListener('click', () => {
		clickSFX.cloneNode().play();

		const skinImages = {
			alec: ['alec.png', 'alec.png', 'alec.png'],
			abby: ['abby.png', 'abby2.png', 'abby3.png'],
			nate: ['nate.png', 'nate2.png', 'nate3.png'],
			dash: ['dash.png', 'dash2.png', 'dash3.png'],
			chris: ['chris.png', 'chris2.png', 'chris3.png'],
			ava: ['ava.png', 'ava2.png', 'ava3.png'],
			rence: ['rence.png', 'rence2.png', 'rence3.png'],
			riley: ['riley.png', 'riley2.png', 'riley3.png'],
			henry: ['henry.png', 'henry2.png', 'henry3.png'],
		};

		const skinchange = prompt("Which skin do you want to use? (Alec, Abby, Nate, Dash, Chris, Ava, Rence, Riley, or Henry?)", "").toLowerCase();

		if (skinImages.hasOwnProperty(skinchange)) {
			skin = Object.keys(skinImages).indexOf(skinchange);
			alec.src = `images/skins/${skinImages[skinchange][alectype]}`;
		}
	});

	//menus
	upgradesbutton.addEventListener('click', () => {
		clickSFX.cloneNode().play();
		if (upgradesonscreen === 0) {
			upgradesonscreen = 1;
			news.classList.toggle("active");
			document.getElementById('upgradesdiv').style.right = "0%";
		} else {
			upgradesonscreen = 0;
			document.getElementById('upgradesdiv').style.right = "-460px";
		}
	});

	statsbutton.addEventListener('click', () => {
		clickSFX.cloneNode().play();
		if (statsonscreen === 0) {
			statsonscreen = 1;
			news.classList.toggle("active");
			document.getElementById('statsdiv').style.left = "0%";
		} else {
			statsonscreen = 0;
			document.getElementById('statsdiv').style.left = "-340px";
		}
	});

	//buying upgrades
	function addAutoclickListener(element, cost, cpsMultiplier, index) {
		element.addEventListener('click', () => {

			if (cost <= alecAmount) {
				purchaseSFX.cloneNode().play();
				/*
				LEGACY: upgrade sfx

				const soundEffects = {
					0: autoclickSFX,
					1: factorySFX,
					2: scotlandSFX,
					3: flannelSFX,
					4: chairSFX,
					5: duoSFX,
					6: trainSFX,
					7: milkSFX,
					8: cloneSFX,
					9: meowSFX,
					10: chompSFX,
					11: summonSFX,
					12: birdSFX,
					13: whooshSFX,
					14: buttonclickSFX,
				};

				const excludedIndices = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];
				(index !== 0 && !excludedIndices.includes(index)) ? clickSFX.cloneNode().play(): (soundEffects[index] && soundEffects[index].cloneNode().play());

				UNFINISHED: old stat screen
				const container = document.querySelector(".container");
				const newImage = document.createElement("img");
				const upgradeAmount = document.createElement("p");
				let posImgIndex = index * 10
				let posTxtIndex = index + 1 * 11
				newImage.style.height = "100px"
				upgradeAmount.innerText = '1'
				newImage.className = "shape";
				upgradeAmount.className = "shape";
				newImage.style.left = posImgIndex += '%'
				upgradeAmount.style.left = posTxtIndex += '%'
				newImage.src = index + 1 === 10 ? (Math.round(Math.random()) === 0 ? 'images/autoclickimgs/storm.png' : 'images/autoclickimgs/star.png') : `images/autoclickimgs/autoclick${index + 1}.png`;
				container.appendChild(newImage);
				container.appendChild(upgradeAmount);


				newImage.addEventListener("animationend", () => {
					newImage.remove();
				});*/

				cps += cpsMultiplier;
				alecAmount -= cost;
				cost += Math.ceil(cost * 0.15);
				element.setAttribute("data-cost", cost);
				document.getElementById(`autoclick${index + 1}cost`).innerText = `$${abbreviateNumber(cost)}`;
				document.getElementById('num').innerText = `Alecs: ${abbreviateNumber(alecAmount)}`;
				document.getElementById('aps').innerText = abbreviateNumber(cps);
				if (element === autoclick1) {
					autoclick1cost = cost;
				} else if (element === autoclick2) {
					autoclick2cost = cost;
				} else if (element === autoclick3) {
					autoclick3cost = cost;
				} else if (element === autoclick4) {
					autoclick4cost = cost;
				} else if (element === autoclick5) {
					autoclick5cost = cost;
				} else if (element === autoclick6) {
					autoclick6cost = cost;
				} else if (element === autoclick7) {
					autoclick7cost = cost;
				} else if (element === autoclick8) {
					autoclick8cost = cost;
				} else if (element === autoclick9) {
					autoclick9cost = cost;
				} else if (element === autoclick10) {
					autoclick10cost = cost;
				} else if (element === autoclick11) {
					autoclick11cost = cost;
				} else if (element === autoclick12) {
					autoclick12cost = cost;
				} else if (element === autoclick13) {
					autoclick13cost = cost;
				} else if (element === autoclick14) {
					autoclick14cost = cost;
				} else if (element === autoclick15) {
					autoclick15cost = cost;
				} else if (element === autoclick16) {
					autoclick16cost = cost;
				}
				const elementId = element.id + 'total';
				const targetElement = document.getElementById(elementId);

				if (targetElement) {
					targetElement.innerText = (parseInt(targetElement.innerText) || 0) + 1;
				}
				saveProgress();
			} else {
				errorSFX.cloneNode().play();
				for (let i = 0; i < 5; i++) {
					setTimeout(() => {
						element.style.backgroundColor = "red";
						document.getElementById(`autoclick${index + 1}cost`).style.backgroundColor = "red";
					}, i * 200);
					setTimeout(() => {
						element.style.backgroundColor = "white";
						document.getElementById(`autoclick${index + 1}cost`).style.backgroundColor = "white";
					}, (i + 0.5) * 200);
				}
			}
		});
	}

	const autoclickUpgrades = [
		{
			element: autoclick1,
			cost: autoclick1cost,
			cpsMultiplier: 1
		},
		{
			element: autoclick2,
			cost: autoclick2cost,
			cpsMultiplier: 5
		},
		{
			element: autoclick3,
			cost: autoclick3cost,
			cpsMultiplier: 15
		},
		{
			element: autoclick4,
			cost: autoclick4cost,
			cpsMultiplier: 47
		},
		{
			element: autoclick5,
			cost: autoclick5cost,
			cpsMultiplier: 260
		},
		{
			element: autoclick6,
			cost: autoclick6cost,
			cpsMultiplier: 1400
		},
		{
			element: autoclick7,
			cost: autoclick7cost,
			cpsMultiplier: 7800
		},
		{
			element: autoclick8,
			cost: autoclick8cost,
			cpsMultiplier: 44000
		},
		{
			element: autoclick9,
			cost: autoclick9cost,
			cpsMultiplier: 260000
		},
		{
			element: autoclick10,
			cost: autoclick10cost,
			cpsMultiplier: 1600000
		},
		{
			element: autoclick11,
			cost: autoclick11cost,
			cpsMultiplier: 10000000
		},
		{
			element: autoclick12,
			cost: autoclick12cost,
			cpsMultiplier: 65000000
		},
		{
			element: autoclick13,
			cost: autoclick13cost,
			cpsMultiplier: 430000000
		},
		{
			element: autoclick14,
			cost: autoclick14cost,
			cpsMultiplier: 2900000000
		},
		{
			element: autoclick15,
			cost: autoclick15cost,
			cpsMultiplier: 21000000000
		},
		{
			element: autoclick16,
			cost: autoclick16cost,
			cpsMultiplier: 150000000000
		},
	];

	autoclickUpgrades.forEach((upgrade, index) => {
		addAutoclickListener(upgrade.element, upgrade.cost, upgrade.cpsMultiplier, index);
	});


	//reset
	resetbutton.addEventListener('click', () => {
		clickSFX.cloneNode().play();
		const yn = prompt("Do you want to reset? THERE IS NO UNDOING THIS!", "").toLowerCase();
		if (["yes", "si", "yeah", "sure"].includes(yn)) {
			alecAmount = 0;
			totalAlecAmount = 0;
			alectype = 0;
			cps = 0;
			timeplayed = 0;
			boughtwyattmode = 0;
			autoclick1cost = 15;
			autoclick2cost = 100;
			autoclick3cost = 1100;
			autoclick4cost = 12000;
			autoclick5cost = 130000;
			autoclick6cost = 1400000;
			autoclick7cost = 20000000;
			autoclick8cost = 330000000;
			autoclick9cost = 5100000000;
			autoclick10cost = 75000000000;
			autoclick11cost = 1000000000000;
			autoclick12cost = 14000000000000;
			autoclick13cost = 170000000000000;
			autoclick14cost = 2100000000000000;
			autoclick15cost = 26000000000000000;
			autoclick16cost = 310000000000000000;
			saveProgress();
			document.location.reload();
		}
	});

	//changelog
	changelog.addEventListener('click', () => {
		changelog.style.bottom = (changelog.style.bottom === "40%") ? "-100%" : changelog.style.bottom;
	});

	changelogbutton.addEventListener('click', () => {
		changelog.style.bottom = (changelog.style.bottom === "40%") ? "-100%" : "40%";
	});

	//clicks
	alec.addEventListener('click', () => {
		const a = Math.ceil(cps * 0.6 + totalAlecAmount * 0.0006);
		clickSFX.cloneNode().play();
		alecAmount += (a < 1) ? 1 : a;
		totalAlecAmount += (a < 1) ? 1 : a;
		document.getElementById('totalnum').innerText = totalAlecAmount;
		document.getElementById('num').innerText = 'Alecs: ' + alecAmount;
		/*if (totalAlecAmount >= 50 && alectype === 0) {
			alectype = 1;
			const evolve = document.createElement('div');
			evolve.textContent = "Your big Alec has evolved";
			evolve.classList.add('add');
			document.body.appendChild(evolve);
		} else if (totalAlecAmount >= 500 && alectype === 1) {
			alectype = 2;
		}*/

		const add = document.createElement('div');
		add.textContent = "+" + abbreviateNumber(a);
		add.classList.add('add');
		document.body.appendChild(add);

		const x = event.clientX;
		const y = event.clientY;
		add.style.left = x + 'px';
		add.style.top = (y - 20) + 'px';

		setTimeout(() => {
			add.remove();
		}, 500);
		saveProgress();
	});

	alec.addEventListener('mousedown', () => {
		if (wyattmode === 1) {
			alec.src = 'images/skins/why.jpeg';
		} else {
			if (skin === 1) {
				alec.src = alectype === 0 ? 'images/skins/abbymush.png' : (alectype === 1 ? 'images/skins/abby2mush.png' : 'images/skins/abby3mush.png');
			} else if (skin === 2) {
				alec.src = alectype === 0 ? 'images/skins/natemush.png' : (alectype === 1 ? 'images/skins/nate2mush.png' : 'images/skins/nate3mush.png');
			} else if (skin === 3) {
				alec.src = alectype === 0 ? 'images/skins/dashmush.png' : (alectype === 1 ? 'images/skins/dash2mush.png' : 'images/skins/dash3mush.png');
			} else if (skin === 4) {
				alec.src = alectype === 0 ? 'images/skins/chrismush.png' : (alectype === 1 ? 'images/skins/chris2mush.png' : 'images/skins/chris3mush.png');
			} else if (skin === 5) {
				alec.src = alectype === 0 ? 'images/skins/avamush.png' : (alectype === 1 ? 'images/skins/ava2mush.png' : 'images/skins/ava3mush.png');
			} else if (skin === 6) {
				alec.src = alectype === 0 ? 'images/skins/rencemush.png' : (alectype === 1 ? 'images/skins/rence2mush.png' : 'images/skins/rence3mush.png');
			} else if (skin === 7) {
				alec.src = alectype === 0 ? 'images/skins/rileymush.png' : (alectype === 1 ? 'images/skins/riley2mush.png' : 'images/skins/riley3mush.png');
			} else if (skin === 8) {
				alec.src = alectype === 0 ? 'images/skins/henrymush.png' : (alectype === 1 ? 'images/skins/henry2mush.png' : 'images/skins/henry3mush.png');
			} else {
				alec.src = alectype === 0 ? 'images/skins/alecmush.png' : (alectype === 1 ? 'images/skins/alecmush.png' : 'images/skins/alecmush.png');
			}
		}
	});

	alec.addEventListener('mouseup', () => {
		if (wyattmode === 1) {
			alec.src = 'images/skins/why.jpeg';
		} else {
			if (skin === 1) {
				alec.src = alectype === 0 ? 'images/skins/abby.png' : (alectype === 1 ? 'images/skins/abby2.png' : 'images/skins/abby3.png');
			} else if (skin === 2) {
				alec.src = alectype === 0 ? 'images/skins/nate.png' : (alectype === 1 ? 'images/skins/nate2.png' : 'images/skins/nate3.png');
			} else if (skin === 3) {
				alec.src = alectype === 0 ? 'images/skins/dash.png' : (alectype === 1 ? 'images/skins/dash2.png' : 'images/skins/dash3.png');
			} else if (skin === 4) {
				alec.src = alectype === 0 ? 'images/skins/chris.png' : (alectype === 1 ? 'images/skins/chris2.png' : 'images/skins/chris3.png');
			} else if (skin === 5) {
				alec.src = alectype === 0 ? 'images/skins/ava.png' : (alectype === 1 ? 'images/skins/ava2.png' : 'images/skins/ava3.png');
			} else if (skin === 6) {
				alec.src = alectype === 0 ? 'images/skins/rence.png' : (alectype === 1 ? 'images/skins/rence2.png' : 'images/skins/rence3.png');
			} else if (skin === 7) {
				alec.src = alectype === 0 ? 'images/skins/riley.png' : (alectype === 1 ? 'images/skins/riley2.png' : 'images/skins/riley3.png');
			} else if (skin === 8) {
				alec.src = alectype === 0 ? 'images/skins/henry.png' : (alectype === 1 ? 'images/skins/henry2.png' : 'images/skins/henry3.png');
			} else {
				alec.src = alectype === 0 ? 'images/skins/alec.png' : (alectype === 1 ? 'images/skins/alec.png' : 'images/skins/alec.png');
			}
		}
	});

	//more
	function handleMouseOver(event, text) {
		descbox.style.display = 'block';
		descbox.innerText = text;
		document.addEventListener('mousemove', (event) => {
			const x = event.clientX;
			const y = event.clientY;
			descbox.style.left = x + 'px';
			descbox.style.top = (y + 20) + 'px';
		});
	}

	function handleMouseOut() {
		descbox.style.display = 'none';
		document.removeEventListener('mousemove', () => {});
	}

	buttons.forEach((button) => {
		button.addEventListener('mouseover', (event) => {
			let text = '';
			const updateText = () => {
				switch (button) {
					case aps:
						text = commifyNumber(Math.floor(cps));
						break;
					case totalnum:
						text = commifyNumber(Math.floor(totalAlecAmount));
						break;
					case autoclick1:
						text = "Not sure how this works, but hey, free Alecs!";
						break;
					case autoclick2:
						text = "Like a baby factory, but better";
						break;
					case autoclick3:
						text = "Grandma would be proud";
						break;
					case autoclick4:
						text = "Local Stardew Valley players HATE this ONE TRICK";
						break;
					case autoclick5:
						text = "Pump out flannels like I pumped... gas";
						break;
					case autoclick6:
						text = "Command Blocks are real! Don't you know?";
						break;
					case autoclick7:
						text = "Hey, anything is possible, right?";
						break;
					case autoclick8:
						text = "Love this guy. Met him at a party and we clicked instantly";
						break;
					case autoclick9:
						text = "Technically, this money is just a bribe to the churches, but shhhhhh";
						break;
					case autoclick10:
						text = "Works like a charm. Just remember not to take mine...";
						break;
					case autoclick11:
						text = "You'll get a bunch of flannels, but the best part is that they're from ZE MOOOOOOON!!!";
						break;
					case autoclick12:
						text = "Well, actually, you 'buy' an expidition to a treasure room...";
						break;
					case autoclick13:
						text = "I'm sure It's legit!";
						break;
					case autoclick14:
						text = "It's a really nice place to vacation";
						break;
					case autoclick15:
						text = "No, this is not slavery. These lumberjacks are paid... in... uh... weed";
						break;
					case autoclick16:
						text = "Ah, the classic vintage flannels! The modern day flannels! The futuristic flannels with jetpacks!";
						break;
					case soonupg:
						text = "Waiting for the day that fine shyt finally relizes she's in love with me";
						break;
					case skinbutton:
						text = "Make your Alecs look different!";
						break;
					case resetbutton:
						text = "BE CAREFUL WITH THIS!";
						break;
					case upgradesbutton:
						text = "Get others to make Alecs so you don't have to!";
						break;
					case changelogbutton:
						text = "View the changelog";
						break;
					default:
						return "There's nothing here.";
				}
				handleMouseOver(event, text);
			};

			updateText();

			if (button === aps || button === totalnum) {
				hoverInterval = setInterval(updateText, 100);
			}
		});

		button.addEventListener('mouseout', () => {
			clearInterval(hoverInterval);
			handleMouseOut();
		});
	});
	
	/*if (boughtwyattmode === 1) {
		wyattmodebutton.innerText = 'TOGGLE WYATT MODE';
	}

	wyattmodebutton.addEventListener('click', () => {
		clickSFX.cloneNode().play();
		if (boughtwyattmode === 0 && alecAmount >= 100000000) {
			boughtwyattmode = 1;
			wyattmodebutton.innerText = 'TOGGLE WYATT MODE';
		} else if (wyattmode === 0 && boughtwyattmode === 1) {
			document.body.style.backgroundImage = 'url("images/skins/why.jpeg")';
			document.body.style.backgroundSize = 'cover';
			news.innerText = 'WYATT MODE ACTIVATED';
			skinbutton.innerText = 'WYCHANGE WYSKIN';
			resetbutton.innerText = 'WYRESET';
			upgradesbutton.innerText = 'WYUPGRADES';
			wyattmode = 1;
			updateDisplay();
		} else if (wyattmode === 1 && boughtwyattmode === 1) {
			document.body.style.backgroundImage = 'none';
			news.innerText = 'WYATT MODE deactivated';
			skinbutton.innerText = 'Change Skin';
			resetbutton.innerText = 'Reset';
			upgradesbutton.innerText = 'Upgrades';
			wyattmode = 0;
			updateDisplay();
		}
	});*/

	change.addEventListener('click', () => {
		clickSFX.cloneNode().play();

		const header = document.getElementById('header');

		if (navbarornews === 0) {
			navbarornews = 1;
			news.classList.remove("topslide");
			header.classList.remove("bottomslide2");
			news.classList.add("bottomslide");
			header.classList.add("topslide2");
			news.style.display = "block";
			header.style.display = "block";
			change.innerText = "Show news";
		} else {
			navbarornews = 0;
			header.classList.remove("topslide2");
			news.classList.remove("bottomslide");
			header.classList.add("bottomslide2");
			news.classList.add("topslide");
			header.style.display = "block";
			news.style.display = "block";
			change.innerText = "Show navbar";
		}
	});

	station.addEventListener('click', () => {
		if (navbarornews === 0) {
			clickSFX.cloneNode().play();

			if (radioornews === 0) {
				radioornews = 1;
			} else {
				radioornews = 0;
			}
		}
	});

	//(gasp) MATH?!?!?!??!? but the math is BAD, is very very BAD!
	function updateAlecAmount(currentTime) {
		const frameTime = currentTime - lastFrameTime;
		const secondsElapsed = frameTime / 1000;
		alecAmount += cps * secondsElapsed;
		totalAlecAmount += cps * secondsElapsed;
		document.getElementById('num').innerText = 'Alecs: ' + '$' + abbreviateNumber(Math.floor(alecAmount));
		document.getElementById('totalnum').innerText = abbreviateNumber(Math.floor(totalAlecAmount));
		lastFrameTime = currentTime;
		requestAnimationFrame(updateAlecAmount);
		/*function slide(element, cost, cpsMultiplier, index) {
			if (Math.floor(Math.random() * 1000) === 1) {
				const container = document.querySelector(".container");
				const newImage = document.createElement("img");
				let b = 1 + Math.round(Math.random() * 12);
				newImage.className = "slider";
				newImage.src = b !== 10 ? `images/autoclickimgs/autoclick${b}.png` : (Math.round(Math.random()) === 0 ? `images/autoclickimgs/storm.png` : `images/autoclickimgs/star.png`);
				container.appendChild(newImage);
				newImage.addEventListener("animationend", () => newImage.remove());
			}
		}
		slide(autoclickUpgrades.element, autoclickUpgrades.cost, autoclickUpgrades.cpsMultiplier, autoclickUpgrades.index);*/
	}

	/*document.getElementById("pform").addEventListener('click', () => {
		window.open("https://forms.gle/SFhY9UY3p1LoqJbeA");
	});*/

	requestAnimationFrame(updateAlecAmount);
	startTimer();
	updateDisplay();
}