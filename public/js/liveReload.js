var refresh = sessionStorage.getItem("refresh") || 0;
function live() {
	fetch("/refresh")
		.then((r) => r.text())
		.then((d) => {
			if (parseInt(d || 0) != refresh) {
				sessionStorage.setItem("refresh", d);
				//console.log({d});
				location.href = location.href;
			} else setTimeout(live, 20);
		})
		.catch((e) => {
			console.error({ e });
			setTimeout(live, 2000);
		});
}

live();
