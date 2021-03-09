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

class NavScrolling {
	constructor(element) {
		this.element = element;
		this.nav = $('nav#menu');
	}
	init() {
		this.handleEvents();
	}
	handleEvents() {
		let self = this;
		//Smooth anchor scrolling
		$('a[href^="#"]').click(function () {
			$('html, body').animate({
				scrollTop: $('[name="' + $.attr(this, 'href').substr(1) + '"]').offset().top - self.nav.height()
			}, 500);
			return false;
		});
		//On scroll
		document.onscroll = function(){
			self.onScroll();
		}
	}
	onScroll() {
		let self = this;
		let scrollPos = $(document).scrollTop();
    $(this.element).find('li').each(function () {
			let currentLink = $(this);
			let refElement = $('[name=' + currentLink.find('a').attr("href").replace('#', '') + ']');
			let elementTop = refElement.position().top - self.nav.height() - 5;
			if(elementTop <= scrollPos && elementTop + refElement.height() > scrollPos) {
				$(self.element).find('li').removeClass("active");
				currentLink.addClass("active");
			} else {
				currentLink.removeClass("active");
			}
    });
	}
}

$(document).ready(function() {

	//Handle navigation scrolling
	const navScrolling = new NavScrolling(document.getElementById("menu"));
	navScrolling.init();

	//Stick-ify navigation
	const stickyNav = new Sticky(document.getElementById("menu"));
	stickyNav.init();
	
});