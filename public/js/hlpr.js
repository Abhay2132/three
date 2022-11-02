export function clamp(n, a, z) {
	if (n < a) return a;
	if (n > z) return z;
	return n;
}

export function cycle(n, a, z) {
	if (n < a) return z;
	if (n > z) return a;
	return n;
}

export function $(a) {
	return document.querySelector(a);
}

export function log (...a) {
	$("#logs").innerHTML = "";
	$("#logs").style.height = (a.length || 1) * 16 + "px";
	for(let i of a)
		$("#logs").innerHTML += i + "<br/>";
}