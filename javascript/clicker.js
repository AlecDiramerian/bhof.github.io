
/*jshint esversion: 6 */
import {newslist, tiplist} from './news.js'
window.addEventListener('load', function() {
	document.getElementById('loading').style.display = 'none';
	document.getElementById('bg').style.display = 'block';
	if (window.innerWidth < 768) document.getElementById('upgrades').innerText = 'Upgs.';
	if (window.innerWidth < 413) document.getElementById('changelogb').innerText = 'C.Logs';

	Game();
});
function Game() {
	//variables
	let alecAmount = 0; // # of currently owned alecs
	let totalAlecAmount = 0; // # of lifetime owned alecs
	let cps = 0; // # of alecs gained per second
	let timer; // news timer
	let lastFrameTime = performance.now(); // cps thing
	let rightdivtab = 0; // upgrades or stats
	let totalClicks = 0; // # of lifetime clicks
	let previousNewsIndex = -1; // news thing
	let tipIndex = -1; // tips thing
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
	let autoclickamounts = {ac1: 0, ac2: 0, ac3: 0, ac4: 0, ac5: 0, ac6: 0, ac7: 0, ac8: 0, ac9: 0, ac10: 0, ac11: 0, ac12: 0, ac13: 0, ac14: 0, ac15: 0, ac16: 0};
	let timeplayed = {weeks: 0, days: 0, hours: 0, minutes: 0, seconds: 0};
	let uploadedSkin = "none";
	let hoverInterval = null;
	const clickSFX = new Audio('audio/mcclick.mp3');
	const errorSFX = new Audio('audio/error.mp3');
	const purchaseSFX = new Audio('audio/purchase.mp3');
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
	const changelogbutton = document.getElementById('changelogb');
	const soonupg = document.getElementById('soonupg');
	const header = document.getElementById('header');
	const buttons = [autoclick1, autoclick2, autoclick3, autoclick4, autoclick5, autoclick6, autoclick7, autoclick8, autoclick9, autoclick10, autoclick11, autoclick12, autoclick13, autoclick14, autoclick15, autoclick16, soonupg, resetbutton, upgradesbutton, statsbutton, changelogbutton, num, aps, totalnum, timeplayedstat, totalclicks, fileSelectButton, defaultskin];

	const formatTime = (time) => {
		const addZero = (num) => (num < 10 ? `0${num}` : `${num}`);
		return `${addZero(time.weeks)}:${addZero(time.days)}:${addZero(time.hours)}:${addZero(time.minutes)}:${addZero(time.seconds)}`;
	};


	const parseTime = (timeString) => {
		if (!timeString || timeString === "0") {return{weeks: 0, days: 0, hours: 0, minutes: 0, seconds: 0}}

		const parts = timeString.split(':').map(num => isNaN(parseInt(num)) ? 0 : parseInt(num));

		return {weeks: parts[0] ?? 0, days: parts[1] ?? 0, hours: parts[2] ?? 0, minutes: parts[3] ?? 0, seconds: parts[4] ?? 0};
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
			timeplayed.weeks += Math.floor(timeplayed.days / 7);
			timeplayed.days %= 7;
		}
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
		do {randomIndex = Math.floor(Math.random() * newslist.length)} while (randomIndex === previousNewsIndex);
		previousNewsIndex = randomIndex;
		const randomNewsItem = newslist[randomIndex];
		return randomNewsItem;
	};

	const newsichooseyou = () => {
		news.innerText = 'News: ' + newsSelect();
	};

	news.addEventListener('click', () => {
		newsichooseyou();
		clearInterval(timer);
		startTimer();
	});

	const encodeData = (data) => btoa(JSON.stringify(data));
	const decodeData = (data) => JSON.parse(atob(data));

	const loadProgress = () => {
		const encodedData = localStorage.getItem('saveData');
		if (localStorage.getItem('alecAmount')) alecAmount = parseInt(localStorage.getItem('alecAmount'));
		if (localStorage.getItem('totalAlecAmount')) totalAlecAmount = parseInt(localStorage.getItem('totalAlecAmount'));
		if (localStorage.getItem('totalClicks')) totalClicks = parseInt(localStorage.getItem('totalClicks'));
		if (localStorage.getItem('cps')) cps = parseInt(localStorage.getItem('cps'));
		if (localStorage.getItem('timeplayed')) timeplayed = parseTime(localStorage.getItem('timeplayed'));
		if (localStorage.getItem('autoclickamounts')) autoclickamounts = JSON.parse(localStorage.getItem('autoclickamounts'));
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
		if (encodedData) {
			const saveData = decodeData(encodedData);
			alecAmount = saveData.alecAmount || 0;
			totalAlecAmount = saveData.totalAlecAmount || 0;
			totalClicks = saveData.totalClicks || 0;
			cps = saveData.cps || 0;
			timeplayed = parseTime(saveData.timeplayed || "0");
			autoclickamounts = saveData.autoclickamounts || {};
			autoclick1cost = saveData.autoclick1cost || 15;
			autoclick2cost = saveData.autoclick2cost || 100;
			autoclick3cost = saveData.autoclick3cost || 1100;
			autoclick4cost = saveData.autoclick4cost || 12000;
			autoclick5cost = saveData.autoclick5cost || 130000;
			autoclick6cost = saveData.autoclick6cost || 1400000;
			autoclick7cost = saveData.autoclick7cost || 20000000;
			autoclick8cost = saveData.autoclick8cost || 330000000;
			autoclick9cost = saveData.autoclick9cost || 5100000000;
			autoclick10cost = saveData.autoclick10cost || 75000000000;
			autoclick11cost = saveData.autoclick11cost || 1000000000000;
			autoclick12cost = saveData.autoclick12cost || 14000000000000;
			autoclick13cost = saveData.autoclick13cost || 170000000000000;
			autoclick14cost = saveData.autoclick14cost || 2100000000000000;
			autoclick15cost = saveData.autoclick15cost || 26000000000000000;
			autoclick16cost = saveData.autoclick16cost || 310000000000000000;
			return saveData.migrated || false;
		}
		return false;
	};

	const migrated = loadProgress();

	if (!migrated && localStorage.getItem('alecAmount')) {
		const oldSaveData = {
			alecAmount: parseInt(localStorage.getItem('alecAmount')),
			totalAlecAmount: parseInt(localStorage.getItem('totalAlecAmount')),
			totalClicks: parseInt(localStorage.getItem('totalClicks')),
			cps: parseInt(localStorage.getItem('cps')),
			timeplayed: localStorage.getItem('timeplayed'),
			autoclickamounts: JSON.parse(localStorage.getItem('autoclickamounts')),
			autoclick1cost: parseInt(localStorage.getItem('autoclick1cost')),
			autoclick2cost: parseInt(localStorage.getItem('autoclick2cost')),
			autoclick3cost: parseInt(localStorage.getItem('autoclick3cost')),
			autoclick4cost: parseInt(localStorage.getItem('autoclick4cost')),
			autoclick5cost: parseInt(localStorage.getItem('autoclick5cost')),
			autoclick6cost: parseInt(localStorage.getItem('autoclick6cost')),
			autoclick7cost: parseInt(localStorage.getItem('autoclick7cost')),
			autoclick8cost: parseInt(localStorage.getItem('autoclick8cost')),
			autoclick9cost: parseInt(localStorage.getItem('autoclick9cost')),
			autoclick10cost: parseInt(localStorage.getItem('autoclick10cost')),
			autoclick11cost: parseInt(localStorage.getItem('autoclick11cost')),
			autoclick12cost: parseInt(localStorage.getItem('autoclick12cost')),
			autoclick13cost: parseInt(localStorage.getItem('autoclick13cost')),
			autoclick14cost: parseInt(localStorage.getItem('autoclick14cost')),
			autoclick15cost: parseInt(localStorage.getItem('autoclick15cost')),
			autoclick16cost: parseInt(localStorage.getItem('autoclick16cost')),
			migrated: true
		};
		localStorage.setItem('saveData', encodeData(oldSaveData));

		localStorage.removeItem('alecAmount');
		localStorage.removeItem('totalAlecAmount');
		localStorage.removeItem('totalClicks');
		localStorage.removeItem('cps');
		localStorage.removeItem('timeplayed');
		localStorage.removeItem('autoclickamounts');
		localStorage.removeItem('autoclick1cost');
		localStorage.removeItem('autoclick2cost');
		localStorage.removeItem('autoclick3cost');
		localStorage.removeItem('autoclick4cost');
		localStorage.removeItem('autoclick5cost');
		localStorage.removeItem('autoclick6cost');
		localStorage.removeItem('autoclick7cost');
		localStorage.removeItem('autoclick8cost');
		localStorage.removeItem('autoclick9cost');
		localStorage.removeItem('autoclick10cost');
		localStorage.removeItem('autoclick11cost');
		localStorage.removeItem('autoclick12cost');
		localStorage.removeItem('autoclick13cost');
		localStorage.removeItem('autoclick14cost');
		localStorage.removeItem('autoclick15cost');
		localStorage.removeItem('autoclick16cost');
	}
	const saveProgress = () => {
		try {
			const sanitizedAutoclickAmounts = {};
			for (const key in autoclickamounts) {
				sanitizedAutoclickAmounts[key] = isNaN(autoclickamounts[key]) ? 0 : autoclickamounts[key];
			}
			const saveData = {
				alecAmount,
				totalAlecAmount,
				totalClicks,
				cps,
				timeplayed: formatTime(timeplayed),
				autoclickamounts: sanitizedAutoclickAmounts,
				autoclick1cost,
				autoclick2cost,
				autoclick3cost,
				autoclick4cost,
				autoclick5cost,
				autoclick6cost,
				autoclick7cost,
				autoclick8cost,
				autoclick9cost,
				autoclick10cost,
				autoclick11cost,
				autoclick12cost,
				autoclick13cost,
				autoclick14cost,
				autoclick15cost,
				autoclick16cost,
				migrated: true
			};
			localStorage.setItem('saveData', encodeData(saveData));
		} catch (error) {
			console.error('Failed to save game:', error);
		}
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

	setInterval(saveProgress, 10000);

	//skins
	document.getElementById("files").addEventListener("change", function() {changeImage(this)});

	function changeImage(input) {
		if (input.files && input.files[0]) {
			var reader = new FileReader();
			reader.onload = function(e) {
				uploadedSkin = e.target.result;
				localStorage.setItem("uploadedSkin", uploadedSkin);
				updateDisplay();
			};
			reader.readAsDataURL(input.files[0]);
		}
	}

	defaultskin.addEventListener('click', () => {
		localStorage.setItem("uploadedSkin", "none");
		uploadedSkin = "none";
		updateDisplay();
	})

	uploadedSkin = localStorage.getItem("uploadedSkin") || "none";

	const updateDisplay = () => {
		document.getElementById('num').innerText = 'Alecs: ' + abbreviateNumber(alecAmount);
		document.getElementById('aps').innerText = abbreviateNumber(cps);
		document.getElementById('totalnum').innerText = abbreviateNumber(totalAlecAmount);
		document.getElementById('timeplayed').innerText = formatTime(timeplayed);
		document.getElementById('totalclicks').innerText = abbreviateNumber(totalClicks);
		autoclickUpgrades.forEach((upgrade, index) => {
			document.getElementById(`autoclick${index + 1}cost`).innerText = `$${abbreviateNumber(upgrade.cost)}`;
		});

		if (uploadedSkin === "none") {
			alec.src = 'images/skins/alec.png';
		} else {
			alec.src = uploadedSkin;
		}
	};

	window.onload = function() {updateDisplay()};

	//rdiv
	upgradesbutton.addEventListener('click', () => {
		clickSFX.cloneNode().play();
		if (rightdivtab === 0) {
			rightdivtab = 1;
			document.getElementById('ucontainer').style.display = "none";
			document.getElementById('scontainer').style.display = "revert";
		} else {
			rightdivtab = 0;
			document.getElementById('ucontainer').style.display = "revert";
			document.getElementById('scontainer').style.display = "none";

		}
	});

	statsbutton.addEventListener('click', () => {
		clickSFX.cloneNode().play();
		if (rightdivtab === 0) {
			rightdivtab = 1;
			document.getElementById('ucontainer').style.display = "none";
			document.getElementById('scontainer').style.display = "revert";
		} else {
			rightdivtab = 0;
			document.getElementById('ucontainer').style.display = "revert";
			document.getElementById('scontainer').style.display = "none";

		}
	});
	window.onresize = function() {
		if (window.innerWidth < 768) {
			upgradesbutton.innerText = 'Upgs.';
			if (window.innerWidth < 413) {
				changelogbutton.innerText = 'C.Logs';
			}
		}
		else {
			upgradesbutton.innerText = 'Upgrades';
			changelogbutton.innerText = 'Changelog';
		}
	};
	//mdiv
	document.getElementById('nexttip').addEventListener('click', () => {
		if (tipIndex >= tiplist.length - 1) {
			tipIndex = 0;
		} else {
			tipIndex++;
		}
		document.getElementById('tip').innerText = tiplist[tipIndex];
	});

	//upgrades
	function addAutoclickListener(element, cost, cpsMultiplier, index) {
		element.addEventListener('click', () => {
			if (cost <= alecAmount) {
				purchaseSFX.cloneNode().play();
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
				const targetElement = document.getElementById(element.id + 'total');
				if (targetElement) {targetElement.innerText = (parseInt(targetElement.innerText) || 0) + 1}
				autoclickamounts["ac" + (index + 1)] = (autoclickamounts["ac" + (index + 1)] || 0) + 1;
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
	let autoclickUpgrades = [
		{element: autoclick1, cost: autoclick1cost, cpsMultiplier: 1, statname: "Autoclickers"},
		{element: autoclick2, cost: autoclick2cost, cpsMultiplier: 5, statname: "Alec Factories"},
		{element: autoclick3, cost: autoclick3cost, cpsMultiplier: 15, statname: "Sewing Kits"},
		{element: autoclick4, cost: autoclick4cost, cpsMultiplier: 50, statname: "Farms"},
		{element: autoclick5, cost: autoclick5cost, cpsMultiplier: 260, statname: "Flannel Factories"},
		{element: autoclick6, cost: autoclick6cost, cpsMultiplier: 1400, statname: "Summoners"},
		{element: autoclick7, cost: autoclick7cost, cpsMultiplier: 7800, statname: "Duplicators"},
		{element: autoclick8, cost: autoclick8cost, cpsMultiplier: 44000, statname: "Wizards"},
		{element: autoclick9, cost: autoclick9cost, cpsMultiplier: 260000, statname: "Blessings"},
		{element: autoclick10, cost: autoclick10cost, cpsMultiplier: 1600000, statname: "Stealing Machines"},
		{element: autoclick11, cost: autoclick11cost, cpsMultiplier: 10000000, statname: "Shipments"},
		{element: autoclick12, cost: autoclick12cost, cpsMultiplier: 65000000, statname: "Treasure Rooms"},
		{element: autoclick13, cost: autoclick13cost, cpsMultiplier: 430000000, statname: "Bought Fiverr Offers"},
		{element: autoclick14, cost: autoclick14cost, cpsMultiplier: 2900000000, statname: "Universes"},
		{element: autoclick15, cost: autoclick15cost, cpsMultiplier: 21000000000, statname: "Trillion Lumberjacks"},
		{element: autoclick16, cost: autoclick16cost, cpsMultiplier: 150000000000, statname: "Time Flannels"},
	];
	function getAutoClickUpgrades() {
		autoclickUpgrades = [
			{element: autoclick1, cost: autoclick1cost, cpsMultiplier: 1, statname: "Autoclickers"},
			{element: autoclick2, cost: autoclick2cost, cpsMultiplier: 5, statname: "Alec Factories"},
			{element: autoclick3, cost: autoclick3cost, cpsMultiplier: 15, statname: "Sewing Kits"},
			{element: autoclick4, cost: autoclick4cost, cpsMultiplier: 50, statname: "Farms"},
			{element: autoclick5, cost: autoclick5cost, cpsMultiplier: 260, statname: "Flannel Factories"},
			{element: autoclick6, cost: autoclick6cost, cpsMultiplier: 1400, statname: "Summoners"},
			{element: autoclick7, cost: autoclick7cost, cpsMultiplier: 7800, statname: "Duplicators"},
			{element: autoclick8, cost: autoclick8cost, cpsMultiplier: 44000, statname: "Wizards"},
			{element: autoclick9, cost: autoclick9cost, cpsMultiplier: 260000, statname: "Blessings"},
			{element: autoclick10, cost: autoclick10cost, cpsMultiplier: 1600000, statname: "Stealing Machines"},
			{element: autoclick11, cost: autoclick11cost, cpsMultiplier: 10000000, statname: "Shipments"},
			{element: autoclick12, cost: autoclick12cost, cpsMultiplier: 65000000, statname: "Treasure Rooms"},
			{element: autoclick13, cost: autoclick13cost, cpsMultiplier: 430000000, statname: "Bought Fiverr Offers"},
			{element: autoclick14, cost: autoclick14cost, cpsMultiplier: 2900000000, statname: "Universes"},
			{element: autoclick15, cost: autoclick15cost, cpsMultiplier: 21000000000, statname: "Trillion Lumberjacks"},
			{element: autoclick16, cost: autoclick16cost, cpsMultiplier: 150000000000, statname: "Time Flannels"},
		];
	}


	autoclickUpgrades.forEach((upgrade, index) => {addAutoclickListener(upgrade.element, upgrade.cost, upgrade.cpsMultiplier, index)});
	resetbutton.addEventListener('click', () => {
		if (confirm("Do you want to erase your progress? There is no getting it back!") == true) {
			if (confirm("Are you certain?") == true) {
				localStorage.clear();
				location.reload();
			}
		}
	});

	//changelog
	changelog.addEventListener('click', () => {changelog.style.bottom = (changelog.style.bottom === "40%") ? "-100%" : changelog.style.bottom});
	changelogbutton.addEventListener('click', () => {changelog.style.bottom = (changelog.style.bottom === "40%") ? "-100%" : "40%"});

	//clicks
	alec.addEventListener('click', () => {
		let clickAmount = Math.ceil(cps * 0.6 + totalAlecAmount * 0.0006);
		if (clickAmount <= 0) clickAmount = 1;
		clickSFX.cloneNode().play();
		totalClicks += 1;
		alecAmount += (clickAmount < 1) ? 1 : clickAmount;
		totalAlecAmount += (clickAmount < 1) ? 1 : clickAmount;
		document.getElementById('totalnum').innerText = totalAlecAmount;
		document.getElementById('num').innerText = 'Alecs: ' + alecAmount;
		updateDisplay();
		const number = document.createElement('div');
		number.textContent = "+" + abbreviateNumber(clickAmount);
		number.classList.add('numberUp');
		document.body.appendChild(number);
		number.addEventListener("animationend", () => {
			number.classList.remove('numberUp');
			number.classList.add('numberDown');
		})
		number.style.left = event.clientX + 'px';
		number.style.top = (event.clientY - 20) + 'px';
		saveProgress();
		setTimeout(() => {number.remove()}, 1500);
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
						const upgradeTextElement = document.getElementById(button.id);
						text = commifyNumber(Math.floor(cps)) + `\n`;
						autoclickUpgrades.forEach((upgrade, index) => {
							let amount = autoclickamounts[`ac${index + 1}`] || 0;
							if (amount > 0) {
								let alecsPerSecond = amount * upgrade.cpsMultiplier;
								text += `${amount} ${upgrade.statname} making ${commifyNumber(alecsPerSecond)} Alecs per second (${((alecsPerSecond / cps) * 100).toFixed(2)}%)\n`;
							}
						});
						break;
					case num:
						text = commifyNumber(Math.floor(alecAmount));
						break;
					case totalnum:
						text = commifyNumber(Math.floor(totalAlecAmount));
						break;
					case totalclicks:
						text = commifyNumber(Math.floor(totalClicks));
						break;
					case timeplayedstat:
						let timemessage;
						const totalSeconds = (timeplayed.weeks * 7 * 24 * 60 * 60) + (timeplayed.days * 24 * 60 * 60) + (timeplayed.hours * 60 * 60) + (timeplayed.minutes * 60) + timeplayed.seconds;
						if (totalSeconds < 5 * 60) {
							timemessage = `You've just started your adventure.`;
						} else if (totalSeconds < 30 * 60) {
							timemessage = `You're getting the hang of this.`;
						} else if (totalSeconds < 2 * 60 * 60) {
							timemessage = `You've been working for a little while now.`;
						} else if (totalSeconds < 8 * 60 * 60) {
							timemessage = `You've started to think about flannels.`;
						} else if (totalSeconds < 24 * 60 * 60) {
							timemessage = `You've worked a 9-5, but you still want to keep going.`;
						} else if (totalSeconds < 3 * 24 * 60 * 60) {
							timemessage = `You've worked for a day. No side effects yet.`;
						} else if (totalSeconds < 7 * 24 * 60 * 60) {
							timemessage = `You've started to see flannels that aren't there.`;
						} else if (totalSeconds < 11 * 24 * 60 * 60) {
							timemessage = `You feel your brain changing.`;
						} else if (totalSeconds < 3 * 7 * 24 * 60 * 60) {
							timemessage = `You broke a Guinness World Record for staying up for over 11 days.`;
						} else if (totalSeconds < 4 * 7 * 24 * 60 * 60) {
							timemessage = `Your family is worried about you.`;
						} else if (totalSeconds < 5 * 7 * 24 * 60 * 60) {
							timemessage = `Your sleepless weeks are in the news.`;
						} else if (totalSeconds < 6 * 7 * 24 * 60 * 60) {
							timemessage = `Your mind is breaking.`;
						} else if (totalSeconds < 7 * 7 * 24 * 60 * 60) {
							timemessage = `You're transcending reality.`;
						} else if (totalSeconds < 8 * 7 * 24 * 60 * 60) {
							timemessage = `God is getting worried.`;
						} else if (totalSeconds < 9 * 7 * 24 * 60 * 60) {
							timemessage = `The world military can no longer stop you.`;
						} else if (totalSeconds < 10 * 7 * 24 * 60 * 60) {
							timemessage = `Even Christopher Laurence can't stop you.`;
						} else if (totalSeconds < 54 * 7 * 24 * 60 * 60) {
							timemessage = `You are the world. You are everything. You need to go outside. Now.`;
						} else {
							timemessage = `You have played Alec Clicker for over a year. Stop.`;
						}
						text = timemessage;
						break;
					case autoclick1:
						text = `Not sure how this works, but it's free Alecs, so...`;
						break;
					case autoclick2:
						text = `A refurbished baby factory. What? Yes, that's where babies come from. Duh.`;
						break;
					case autoclick3:
						text = `Grandma would be proud. Keyword WOULD. She's dead.`;
						break;
					case autoclick4:
						text = `Local Stardew Valley players HATE this ONE TRICK.`;
						break;
					case autoclick5:
						text = `Pump out flannels like I pumped... gas.`;
						break;
					case autoclick6:
						text = `Command Blocks are real! Don't you know?`;
						break;
					case autoclick7:
						text = `Hey, anything is possible, right?`;
						break;
					case autoclick8:
						text = `Love this guy. Met him at a party and we clicked instantly. Really great dude.`;
						break;
					case autoclick9:
						text = `Technically, this money is actually just a bribe to the Flannelanity Religion following churches. This is a reference to the fact that Bridges is miserly and won't fix thier campus or students (not naming names but NINTH GRADE)`;
						break;
					case autoclick10:
						text = `"Oh, yeah, a flannel stealing machine. That'll help." Fine then, I'll make a machine that'll take away everything next.`;
						break;
					case autoclick11:
						text = `You'll get a bunch of flannels, but the best part is that they're from ZE MOOOOOOON!!!`;
						break;
					case autoclick12:
						text = `Well, actually, you fund an expedition to a treasure room... and that treasure room has like a bajillion flannels but shhhh,`;
						break;
					case autoclick13:
						text = `I'm sure it's legit!`;
						break;
					case autoclick14:
						text = `It's a really nice place to vacation. The locals are super friendly.`;
						break;
					case autoclick15:
						text = `The money used for this upgrade doesn't go to the Lumberjacks, it goes to charaties and orphanages and childrens hospitals- nah I'm kidding it goes to terrorist groups.`;
						break;
					case autoclick16:
						text = `Ah, the classic vintage flannels! The modern day flannels! The futuristic flannels with jetpacks!`;
						break;
					case soonupg:
						text = `Waiting for the day that fine shyt finally relizes she's in love with me.`;
						break;
					case statsbutton:
						text = `View some statistics recorded from your adventure.`;
						break;
					case resetbutton:
						text = `Be careful with this!`;
						break;
					case upgradesbutton:
						text = `Get others to make Alecs so you don't have to!`;
						break;
					case changelogbutton:
						text = `View the changelog.`;
						break;
					case fileSelectButton:
						text = `Upload your own custom skin.`;
						break;
					default:
						return `There's nothing here, how the hell did you even get this message?`;
				}
				handleMouseOver(event, text);
			};
			updateText();

			if (button === aps || button === totalnum || button === num || button === totalclicks) {hoverInterval = setInterval(updateText, 100)}
		});

		button.addEventListener('mouseout', () => {
			clearInterval(hoverInterval);
			handleMouseOut();
		});
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
		autoclickUpgrades.forEach((upgrade, index) => {
			if (upgrade.cost >= alecAmount) {
				upgrade.element.style.backgroundColor = `grey`;
				document.getElementById(upgrade.element.id + 'cost').style.backgroundColor = `grey`;
			} else {
				upgrade.element.style.backgroundColor = `white`;
				document.getElementById(upgrade.element.id + 'cost').style.backgroundColor = `white`;
			}
		});
		saveProgress()
		getAutoClickUpgrades()
	}
	requestAnimationFrame(updateAlecAmount);
	startTimer();
	updateDisplay();
}