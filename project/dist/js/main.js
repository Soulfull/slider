;(function(window, document, undefined) {
	function extend(a, b) {
		var key;
		for(key in b) {
			if ( b.hasOwnProperty(key) ) {
				a[key] = b[key];
			}
		}
		return a;
	}

	// проверка загрузки картинок
	// отрисовка слайдера по типу
	// 

	function Slider(el, options, type) { // конструктор
		this.options = {};
		extend(this.options, options);

		var self = this;
		var el = el;
		var type = type || 'fade';
		var elements = [];
		var prefix = 'slider-';
		var elementsLength;


		this.init = function() {
			elements = _takeElements();

			if (elements !== false) {
				_imagesLoad(elements, _render);
				_spinner('show');
			} else {
				throw new Error('not found images');
			}
		};

		function _takeElements() {
			var elems = el.children;
			elementsLength = elems.length;
			if (elementsLength != 0) {
				return elems;
			}

			return false;

		};

		function _imagesLoad(images, cb) {
			var i = 0;
			var imagesCount = 0;

			for (; i < elementsLength; i++) {
				var img = new Image();
				var src = images[i].getAttribute('src');

				img.setAttribute('src', src);
				img.onload = function() {
					imagesCount++;
					if (imagesCount === elementsLength) {
						cb();
					} 
				};
			}
		};

		function _spinner(action) {
			if (action === 'show') {
				var spin = document.createElement('div');
				spin.className = prefix + 'spinner';
				el.appendChild(spin);
			} else {
				el.removeChild(el.lastChild);
			}
		}

		function _render() {
			_spinner('hide');
			_position(1);


		};

		function _position(dir) {
			var currentElement = navigate.findCurrentEl();

			if (dir === 1) {
				var nextElement = navigate.next();
				nextElement.style.left = 100 + '%';
				nextElement.className = prefix + 'active';
			}



		}

		function _animate(draw, duration) {
			var start = perfomance.now();

			requestAnimationFrame(function _animate(time) {
				var timepassed = time - start;

				if (timepassed > duration) timepassed = duration;

				draw(timepassed);

				if (timepassed < duration) {
					requestAnimationFrame(_animate);
				}
			});
		};

		var navigate = {
			findCurrentEl: function() {
				var current = el.querySelector('.' + prefix + 'active');
				if (current == null) {
					current = elements[0];
					current.className = prefix + 'active';
				}
				return current;
			},
			next: function() {
				var current = this.findCurrentEl();
				return current.nextElementSibling ? current.nextElementSibling : elements[0];
			},
			previous: function() {
				var current = this.findCurrentEl();
				return current.previousElementSibling ? current.previousElementSibling : elements[elementsLength - 1];
			}
		}








	}


	window.Slider = Slider;

})(window, document);



var elem = document.querySelector('.slider');
var slider = new Slider(elem);
slider.init();




