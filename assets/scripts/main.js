class Sticky {
	constructor(element) {
		this.element = element;
	}
	init() {
		this.handleScroll();
	}
	handleScroll() {
		let self = this,
			stickyTop = self.element.offsetTop;
		window.onscroll = function(){
			let windowTop = window.pageYOffset;
			if(stickyTop < windowTop) {
				self.stick();
			} else {
				self.unStick();
			}
		}
	}
	stick() {
		this.element.classList.add("sticky");
		this.element.style.position = 'fixed';
		this.element.style.top = 0;
	}
	unStick() {
		this.element.classList.remove("sticky");
		this.element.style.position = 'static';
		this.element.style.top = '';
	}
}

$(document).ready(function() {

	//Smooth anchor scrolling
	$('a[href^="#"]').click(function () {
		$('html, body').animate({
				scrollTop: $('[name="' + $.attr(this, 'href').substr(1) + '"]').offset().top
		}, 500);
		return false;
	});

	//Stick-ify navigation
	const stickyNav = new Sticky(document.getElementById("menu"));
	stickyNav.init();
	
});